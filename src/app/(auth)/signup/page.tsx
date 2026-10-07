"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getPasswordError } from "@/lib/password";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const password = String(data.get("password"));

    const passwordError = getPasswordError(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(data.get("name")),
      email: String(data.get("email")),
      password,
      callbackURL: "/dashboard",
    });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-2 text-sm text-muted">
          We sent a verification link to your email. Open it to activate your
          account, then log in.
        </p>
        <Link
          href="/login"
          className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-medium text-white"
        >
          Go to login
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-muted">Start finding clients with LeadNexa.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input name="name" placeholder="Full name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <PasswordInput
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          showRules
        />
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  );
}