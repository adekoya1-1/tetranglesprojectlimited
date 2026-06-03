import { z } from "zod";

// ─── Inquiry ──────────────────────────────────────────────────────────────────

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number").max(20),
  service: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const inquiryPatchSchema = z.object({
  status: z
    .enum(["NEW", "IN_REVIEW", "CONTACTED", "CONVERTED", "CLOSED"])
    .optional(),
  adminNotes: z.string().max(2000).optional(),
  respondedAt: z.string().datetime().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryPatchInput = z.infer<typeof inquiryPatchSchema>;

// ─── Project ──────────────────────────────────────────────────────────────────

export const projectSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  category: z.enum([
    "RESIDENTIAL",
    "COMMERCIAL",
    "INFRASTRUCTURE",
    "FACILITY_MANAGEMENT",
    "REAL_ESTATE",
  ]),
  client: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  year: z.string().max(10).optional(),
  features: z.array(z.string().max(200)).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  images: z
    .array(z.object({ url: z.string().url(), publicId: z.string() }))
    .optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ─── Team Member ──────────────────────────────────────────────────────────────

export const teamMemberSchema = z.object({
  name: z.string().min(2).max(200),
  role: z.string().min(2).max(200),
  bio: z.string().max(1000).nullish(),
  imageUrl: z.string().url().nullish().or(z.literal("")),
  publicId: z.string().max(200).nullish(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int().min(0),
    })
  ),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

// ─── Service ──────────────────────────────────────────────────────────────────

export const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  longDesc: z.string().max(5000).optional(),
  icon: z.string().max(100).optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
