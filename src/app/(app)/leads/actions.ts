"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import { leadInputSchema } from "@/server/services/leads/schema";
import { createLead } from "@/server/services/leads/service";

export type CreateLeadResult = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createLeadAction(
  formData: FormData
): Promise<CreateLeadResult> {
  // Always check the session on the server. Never trust the browser.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Your session expired. Please log in again." };

  const parsed = leadInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const result = await createLead(session.user.id, parsed.data);
  if (result.duplicate) {
    return { fieldErrors: { websiteUrl: "You already added this website." } };
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  return { ok: true };
}