"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { ZodError } from "zod";
import { auth } from "@/server/auth";
import { leadInputSchema } from "@/server/services/leads/schema";
import {
  createLead,
  updateLead,
  setLeadStatus,
} from "@/server/services/leads/service";
import { isLeadStatus } from "@/lib/lead-status";

export type LeadActionResult = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// Always check the session on the server. Never trust the browser.
async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.id ?? null;
}

function toFieldErrors(error: ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

const SESSION_ERROR = "Your session expired. Please log in again.";

export async function createLeadAction(
  formData: FormData
): Promise<LeadActionResult> {
  const userId = await requireUserId();
  if (!userId) return { error: SESSION_ERROR };

  const parsed = leadInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: toFieldErrors(parsed.error) };

  const result = await createLead(userId, parsed.data);
  if (result.duplicate) {
    return { fieldErrors: { websiteUrl: "You already added this website." } };
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  return { ok: true };
}

export async function updateLeadAction(
  id: string,
  formData: FormData
): Promise<LeadActionResult> {
  const userId = await requireUserId();
  if (!userId) return { error: SESSION_ERROR };

  const parsed = leadInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: toFieldErrors(parsed.error) };

  const result = await updateLead(userId, id, parsed.data);
  if (result.outcome === "not_found") return { error: "Lead not found." };
  if (result.outcome === "duplicate") {
    return {
      fieldErrors: { websiteUrl: "Another lead already uses this website." },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath(`/leads/${id}`);
  return { ok: true };
}

export async function setLeadStatusAction(
  id: string,
  status: string
): Promise<LeadActionResult> {
  const userId = await requireUserId();
  if (!userId) return { error: SESSION_ERROR };
  if (!isLeadStatus(status)) return { error: "Unknown status." };

  const result = await setLeadStatus(userId, id, status);
  if (!result.found) return { error: "Lead not found." };

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath(`/leads/${id}`);
  return { ok: true };
}