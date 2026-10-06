"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
   import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Could not log in. Please try again.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">Log in to your LeadNexa account.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <PasswordInput name="password" placeholder="Password" autoComplete="current-password" />
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <Link href="/forgot-password" className="hover:text-text">
          Forgot password?
        </Link>
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Create account
        </Link>
      </div>
    </Card>
  );
}