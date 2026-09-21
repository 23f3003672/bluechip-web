import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const BYPASS_COOKIE_NAME = "maintenance_bypass";
const DEFAULT_BYPASS_SECRET = "bluechip-preview-secret";

/**
 * Handles Maintenance Mode interception and Supabase session refresh.
 * Protects /admin routes — redirects to /login if unauthenticated.
 */
export default async function proxy(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET || DEFAULT_BYPASS_SECRET;
  const currentPath = request.nextUrl.pathname;
  const bypassParam = request.nextUrl.searchParams.get("bypass");
  const bypassCookie = request.cookies.get(BYPASS_COOKIE_NAME)?.value;

  // 1. Handle clearing bypass: ?bypass=clear
  if (bypassParam === "clear") {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("bypass");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.delete(BYPASS_COOKIE_NAME);
    return response;
  }

  // 2. Handle setting bypass: ?bypass=<secret>
  if (bypassParam && bypassParam === bypassSecret) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("bypass");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(BYPASS_COOKIE_NAME, bypassSecret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  const isBypassed = bypassCookie === bypassSecret;

  // 3. If maintenance mode is OFF:
  if (!isMaintenance) {
    // Prevent accidental direct access to /maintenance when site is live
    if (currentPath === "/maintenance") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // 4. If maintenance mode is ON and visitor is NOT bypassed:
    if (!isBypassed) {
      // API requests: return 503 JSON
      if (
        currentPath.startsWith("/api") ||
        request.headers.get("accept")?.includes("application/json")
      ) {
        return NextResponse.json(
          { error: "Service temporarily unavailable due to scheduled maintenance" },
          {
            status: 503,
            headers: {
              "Retry-After": "3600",
            },
          }
        );
      }

      // If already on /maintenance, serve with 503 Retry-After headers
      if (currentPath === "/maintenance") {
        const response = NextResponse.next();
        response.headers.set("Retry-After", "3600");
        return response;
      }

      // For all other routes (frontend & admin), rewrite to /maintenance with 503
      return NextResponse.rewrite(new URL("/maintenance", request.url), {
        status: 503,
        headers: {
          "Retry-After": "3600",
        },
      });
    }
  }

  // 5. Normal Supabase Session & Route Protection (Active when live OR bypassed)
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — do NOT remove this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect all admin routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-authenticated users away from login page
  if (user && request.nextUrl.pathname === "/login") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin";
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
