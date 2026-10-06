import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import AppShell from "@/components/dashboard/AppShell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <AppShell user={{ name: session.user.name, email: session.user.email }}>
      {children}
    </AppShell>
  );
}