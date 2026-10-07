import { db } from "@/server/db";
import type { LeadInput } from "./schema";

export async function createLead(userId: string, input: LeadInput) {
  const existing = await db.lead.findUnique({
    where: {
      userId_websiteUrl: { userId, websiteUrl: input.websiteUrl },
    },
    select: { id: true },
  });
  if (existing) return { duplicate: true as const };

  const lead = await db.lead.create({
    data: { userId, ...input },
    select: { id: true },
  });

  await db.activity.create({
    data: {
      userId,
      leadId: lead.id,
      type: "Lead added",
      metadata: { businessName: input.businessName },
    },
  });

  return { duplicate: false as const, id: lead.id };
}