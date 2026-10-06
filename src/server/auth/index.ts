import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "@/server/db";
import { getPasswordError } from "@/lib/password";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      // Development only: print the link instead of sending an email.
      console.log(`Password reset link for ${user.email}: ${url}`);
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      let password: string | undefined;

      if (ctx.path === "/sign-up/email") {
        password = String(ctx.body?.password ?? "");
      } else if (ctx.path === "/reset-password") {
        password = String(ctx.body?.newPassword ?? "");
      }

      if (password === undefined) return;

      const error = getPasswordError(password);
      if (error) {
        throw new APIError("BAD_REQUEST", { message: error });
      }
    }),
  },
  plugins: [nextCookies()],
});