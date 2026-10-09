import { PageShell } from "@/components/layout/page-shell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell size="sm" align="center">
      {children}
    </PageShell>
  );
}
