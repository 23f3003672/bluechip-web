import { AdminSignOutButton } from "./AdminSignOutButton";

interface AdminTopbarProps {
  email: string;
}

export function AdminTopbar({ email }: AdminTopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-5">
      <div>
        <p className="text-sm font-semibold text-foreground">Admin Panel</p>
        <p className="text-xs text-muted-foreground">Manage website content</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="hidden text-sm text-muted-foreground md:block">{email}</p>
        <AdminSignOutButton />
      </div>
    </header>
  );
}
