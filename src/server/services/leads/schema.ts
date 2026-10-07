import { z } from "zod";
import { normalizeWebsiteUrl } from "@/lib/url";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .transform((value) => (value === "" ? undefined : value))
    .optional();

export const leadInputSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, "Business name is required")
    .max(120, "Keep this under 120 characters"),
  websiteUrl: z
    .string()
    .trim()
    .min(1, "Website address is required")
    .refine((value) => normalizeWebsiteUrl(value) !== null, {
      message: "Enter a valid website address, like example.com",
    })
    .transform((value) => normalizeWebsiteUrl(value) as string),
  industry: optionalText(80),
  location: optionalText(120),
  contactName: optionalText(80),
  contactEmail: z
    .string()
    .trim()
    .max(254)
    .refine((value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Enter a valid email address",
    })
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  notes: optionalText(2000),
});

export type LeadInput = z.output<typeof leadInputSchema>;