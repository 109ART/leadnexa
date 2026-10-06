import { headers } from "next/headers";
import { auth } from "@/server/auth";
import Card from "@/components/ui/Card";
import LogoutButton from "@/components/dashboard/LogoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Card>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted">
          Logged in as {session?.user.name} ({session?.user.email})
        </p>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </Card>
    </main>
  );
}
