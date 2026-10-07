import { db } from "@/server/db";
import type { LeadInput } from "./schema";
import { LEAD_STATUS_LABELS, type LeadStatusValue } from "@/lib/lead-status";

export const LEADS_PAGE_SIZE = 10;

export async function listLeads(
  userId: string,
  options: { q?: string; status?: LeadStatusValue; page?: number }
) {
  const page = Math.max(1, options.page ?? 1);
  const q = options.q?.trim();

  const where = {
    userId,
    // Archived leads stay hidden unless you filter for them
    status: options.status
      ? options.status
      : { not: "ARCHIVED" as const },
    ...(q
      ? {
          OR: [
            { businessName: { contains: q, mode: "insensitive" as const } },
            { websiteUrl: { contains: q, mode: "insensitive" as const } },
            { industry: { contains: q, mode: "insensitive" as const } },
            { location: { contains: q, mode: "insensitive" as const } },
            { contactName: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [leads, total] = await Promise.all([
    db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * LEADS_PAGE_SIZE,
      take: LEADS_PAGE_SIZE,
      select: {
        id: true,
        businessName: true,
        websiteUrl: true,
        industry: true,
        location: true,
        status: true,
        score: true,
        createdAt: true,
      },
    }),
    db.lead.count({ where }),
  ]);

  return {
    leads,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / LEADS_PAGE_SIZE)),
  };
}
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
export async function getLead(userId: string, id: string) {
  // Filtering by userId means you can never open someone else's lead
  return db.lead.findFirst({ where: { id, userId } });
}

export async function listLeadActivities(userId: string, leadId: string) {
  return db.activity.findMany({
    where: { userId, leadId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function updateLead(userId: string, id: string, input: LeadInput) {
  const lead = await db.lead.findFirst({
    where: { id, userId },
    select: { id: true },
  });
  if (!lead) return { outcome: "not_found" as const };

  const duplicate = await db.lead.findFirst({
    where: { userId, websiteUrl: input.websiteUrl, NOT: { id } },
    select: { id: true },
  });
  if (duplicate) return { outcome: "duplicate" as const };

  // Empty fields become null, so clearing a field in the form really clears it
  await db.lead.updateMany({
    where: { id, userId },
    data: {
      businessName: input.businessName,
      websiteUrl: input.websiteUrl,
      industry: input.industry ?? null,
      location: input.location ?? null,
      contactName: input.contactName ?? null,
      contactEmail: input.contactEmail ?? null,
      notes: input.notes ?? null,
    },
  });

  await db.activity.create({
    data: { userId, leadId: id, type: "Lead updated" },
  });

  return { outcome: "ok" as const };
}

export async function setLeadStatus(
  userId: string,
  id: string,
  status: LeadStatusValue
) {
  const result = await db.lead.updateMany({
    where: { id, userId },
    data: { status },
  });
  if (result.count === 0) return { found: false as const };

  await db.activity.create({
    data: {
      userId,
      leadId: id,
      type:
        status === "ARCHIVED"
          ? "Lead archived"
          : `Status changed to ${LEAD_STATUS_LABELS[status]}`,
      metadata: { status },
    },
  });

  return { found: true as const };
}