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

export type Testimonial = {
  id: string;
  person_name: string;
  person_role: string;
  company: string;
  video_url: string;
  poster_url: string | null;
  quote: string;
  sort_order: number;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

export type VideoEmbed = { kind: "youtube"; id: string } | { kind: "vimeo"; id: string } | { kind: "instagram"; id: string } | { kind: "file"; src: string };

export function parseVideoUrl(url: string): VideoEmbed {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "vimeo", id: vm[1] };
  const ig = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)/);
  if (ig) return { kind: "instagram", id: ig[1] };
  return { kind: "file", src: url };
}

export function defaultPoster(embed: VideoEmbed): string | null {
  return embed.kind === "youtube" ? `https://i.ytimg.com/vi/${embed.id}/hqdefault.jpg` : null;
}

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
