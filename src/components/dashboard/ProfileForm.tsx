"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ProfileForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { error } = await authClient.updateUser({
      name: String(data.get("name")),
    });

    setLoading(false);
    if (error) {
      setMessage(error.message ?? "Could not save your profile.");
      return;
    }
    setMessage("Profile saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <Input name="name" defaultValue={name} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input value={email} disabled readOnly />
      </div>
      {message && <p className="text-sm text-muted">{message}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}