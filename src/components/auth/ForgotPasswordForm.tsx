"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { error } = await authClient.requestPasswordReset({
      email: String(data.get("email")),
      redirectTo: "/reset-password",
    });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }
    setSent(true);
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold">Reset your password</h1>

      {sent ? (
        <div className="mt-4 space-y-3 text-sm text-muted">
          <p>
            If an account exists for that email, a reset link has been sent.
            The link expires after a short time.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="rounded-xl bg-amber-50 p-3 text-warning">
              Development mode: the link is printed in your terminal, not sent
              by email.
            </p>
          )}
        </div>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted">
            Enter your email and we will send you a reset link.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </Card>
  );
}