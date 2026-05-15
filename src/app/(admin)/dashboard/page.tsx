import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-[#202a40]">Content Dashboard</h1>
      <p className="mt-2 text-sm text-[#5f6a7f]">
        Manage recognitions and media records used by public pages.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/recognitions" className="rounded-lg border border-border bg-white p-5 hover:bg-[#f7f9fc]">
          <p className="text-lg font-semibold text-[#23304a]">Recognitions</p>
          <p className="mt-1 text-sm text-[#62708a]">Add, review, and remove recognition entries.</p>
        </Link>

        <Link href="/dashboard/media" className="rounded-lg border border-border bg-white p-5 hover:bg-[#f7f9fc]">
          <p className="text-lg font-semibold text-[#23304a]">Media</p>
          <p className="mt-1 text-sm text-[#62708a]">Add and manage media gallery items.</p>
        </Link>
      </div>
    </main>
  );
}
