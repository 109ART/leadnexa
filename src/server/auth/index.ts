import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "@/server/db";
import { getPasswordError } from "@/lib/password";
import { emailProvider } from "@/server/services/email/provider";
import {
  verificationEmail,
  resetPasswordEmail,
  loginAlertEmail,
} from "@/server/services/email/templates";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await emailProvider.send(resetPasswordEmail(user.email, url));
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await emailProvider.send(verificationEmail(user.email, url));
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          try {
            const user = await db.user.findUnique({
              where: { id: session.userId },
            });
            if (!user) return;
            await emailProvider.send(
              loginAlertEmail(user.email, {
                time: new Date(),
                userAgent: session.userAgent,
                ip: session.ipAddress,
              })
            );
          } catch (error) {
            // A failed alert email must never block the login itself
            console.error("Login alert email failed:", error);
          }
        },
      },
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