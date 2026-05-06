import type {
  Project,
  ProjectImage,
  ProjectCategory,
  Inquiry,
  InquiryStatus,
  TeamMember,
  Service,
  SiteSettings,
} from "@prisma/client";

// ─── Re-exports from Prisma ───────────────────────────────────────────────────
export type {
  Project,
  ProjectImage,
  ProjectCategory,
  Inquiry,
  InquiryStatus,
  TeamMember,
  Service,
  SiteSettings,
};

// ─── Extended Types ───────────────────────────────────────────────────────────

export type ProjectWithImages = Project & {
  images: ProjectImage[];
};

export type ProjectSummary = Pick<
  Project,
  "id" | "title" | "slug" | "category" | "location" | "year" | "featured"
> & {
  primaryImage?: ProjectImage | null;
};

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: ProjectCategory;
  client?: string;
  location?: string;
  year?: string;
  features: string[];
  featured: boolean;
  published: boolean;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface ProjectFilters {
  category?: ProjectCategory | "ALL";
  year?: string;
  featured?: boolean;
  search?: string;
}

export interface InquiryFilters {
  status?: InquiryStatus | "ALL";
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalInquiries: number;
  newInquiries: number;
  convertedInquiries: number;
  teamMembers: number;
}
