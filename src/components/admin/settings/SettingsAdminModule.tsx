"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSettingsSchema,
  footerSettingsSchema,
  type ContactSettingsValues,
  type FooterSettingsValues,
} from "@/lib/validations/settings";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";
import type { ActionResult } from "@/types";

interface SettingsAdminModuleProps {
  initialFooter: FooterSettingsValues;
  initialContact: ContactSettingsValues;
  updateFooterSettingsAction: (payload: FooterSettingsValues) => Promise<ActionResult>;
  updateContactSettingsAction: (payload: ContactSettingsValues) => Promise<ActionResult>;
}

export function SettingsAdminModule({
  initialFooter,
  initialContact,
  updateFooterSettingsAction,
  updateContactSettingsAction,
}: SettingsAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register: registerFooter,
    handleSubmit: handleFooterSubmit,
    formState: { errors: footerErrors },
  } = useForm<FooterSettingsValues>({
    resolver: zodResolver(footerSettingsSchema) as Resolver<FooterSettingsValues>,
    values: initialFooter,
  });

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors },
  } = useForm<ContactSettingsValues>({
    resolver: zodResolver(contactSettingsSchema) as Resolver<ContactSettingsValues>,
    values: initialContact,
  });

  return (
    <section>
      <AdminPageHeading
        title="Settings"
        description="Manage structured footer and contact settings saved in the settings table."
        pending={isPending}
      />

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <form
          onSubmit={handleFooterSubmit(async (values) => {
            startTransition(async () => {
              const result = await updateFooterSettingsAction(values);
              if (!result.success) {
                toast.error(result.error);
                return;
              }
              toast.success("Footer settings saved");
              router.refresh();
            });
          })}
          className="space-y-5 rounded-lg border border-border bg-white p-5"
        >
          <h2 className="text-base font-semibold text-foreground">Footer Content</h2>

          <div className="space-y-1.5">
            <Label>Company Name</Label>
            <Input {...registerFooter("company_name")} />
            {footerErrors.company_name && <p className="text-xs text-destructive">{footerErrors.company_name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Tagline</Label>
            <Input {...registerFooter("tagline")} />
          </div>

          <div className="space-y-1.5">
            <Label>Copyright Text</Label>
            <Input {...registerFooter("copyright_text")} />
            {footerErrors.copyright_text && <p className="text-xs text-destructive">{footerErrors.copyright_text.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Footer Note</Label>
            <Textarea rows={4} {...registerFooter("footer_note")} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Footer"}</Button>
          </div>
        </form>

        <form
          onSubmit={handleContactSubmit(async (values) => {
            startTransition(async () => {
              const result = await updateContactSettingsAction(values);
              if (!result.success) {
                toast.error(result.error);
                return;
              }
              toast.success("Contact settings saved");
              router.refresh();
            });
          })}
          className="space-y-5 rounded-lg border border-border bg-white p-5"
        >
          <h2 className="text-base font-semibold text-foreground">Contact Details</h2>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input {...registerContact("email")} />
            {contactErrors.email && <p className="text-xs text-destructive">{contactErrors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input {...registerContact("phone")} />
            {contactErrors.phone && <p className="text-xs text-destructive">{contactErrors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Address</Label>
            <Textarea rows={3} {...registerContact("address")} />
            {contactErrors.address && <p className="text-xs text-destructive">{contactErrors.address.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Map URL</Label>
            <Input {...registerContact("map_url")} />
            <p className="text-xs text-muted-foreground">
              Paste a Google Maps link, the &quot;Embed a map&quot; URL, or the full <code>&lt;iframe&gt;</code> code. We&apos;ll automatically convert it for you!
            </p>
            {contactErrors.map_url && <p className="text-xs text-destructive">{contactErrors.map_url.message}</p>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Contact"}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
