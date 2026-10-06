import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import Card from "@/components/ui/Card";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
  <main className="mx-auto max-w-2xl">
      <Card>
        <h1 className="text-2xl font-bold">Your profile</h1>
        <ProfileForm name={session.user.name} email={session.user.email} />
      </Card>
    </main>
  );
}