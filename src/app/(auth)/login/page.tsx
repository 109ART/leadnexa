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
  const [notVerified, setNotVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    setNotVerified(false);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const emailValue = String(data.get("email"));
    setEmail(emailValue);

    const { error } = await authClient.signIn.email({
      email: emailValue,
      password: String(data.get("password")),
    });

    setLoading(false);
    if (error) {
      if (error.status === 403 || /verif/i.test(error.message ?? "")) {
        setNotVerified(true);
        setError("Your email is not verified yet. Check your inbox for the link.");
      } else {
        setError(error.message ?? "Could not log in. Please try again.");
      }
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function resendVerification() {
    setInfo("");
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/dashboard",
    });
    setInfo(
      error
        ? error.message ?? "Could not send the email. Try again later."
        : "Verification email sent. Check your inbox and spam folder."
    );
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">Log in to your LeadNexa account.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <PasswordInput
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-error">{error}</p>}
        {notVerified && (
          <button
            type="button"
            onClick={resendVerification}
            className="text-sm font-medium text-primary hover:underline"
          >
            Resend verification email
          </button>
        )}
        {info && <p className="text-sm text-muted">{info}</p>}
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