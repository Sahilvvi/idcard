export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  author_name: string;
  read_minutes: number;
  featured: boolean;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  hero_title: string;
  hero_sub: string;
  content: string;
  cta_label: string;
  cta_href: string;
  show_in_nav: boolean;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

export type Lead = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  business: string | null;
  interest: string | null;
  message: string | null;
  source: string;
  page_path: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "owner" | "admin";
  created_at: string;
};

export const BLOG_CATEGORIES = ["Guides", "Materials", "Software", "Products", "Case Studies", "Insights"] as const;

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
