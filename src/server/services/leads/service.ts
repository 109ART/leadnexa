import { db } from "@/server/db";
import type { LeadInput } from "./schema";
import type { LeadStatusValue } from "@/lib/lead-status";

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