"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getPasswordError } from "@/lib/password";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PasswordInput from "@/components/ui/PasswordInput";

export default function ResetPasswordForm({
  token,
  invalid,
}: {
  token?: string;
  invalid: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (invalid || !token) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">Link expired</h1>
        <p className="mt-2 text-sm text-muted">
          This reset link is invalid or has expired. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-medium text-white"
        >
          Request a new link
        </Link>
      </Card>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const newPassword = String(data.get("password"));

    const passwordError = getPasswordError(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.resetPassword({
      newPassword,
      token: token as string,
    });
    setLoading(false);

    if (error) {
      setError(error.message ?? "Could not reset the password.");
      return;
    }
    router.push("/login");
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold">Choose a new password</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <PasswordInput
          name="password"
          placeholder="New password"
          autoComplete="new-password"
          showRules
        />
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save new password"}
        </Button>
      </form>
    </Card>
  );
}