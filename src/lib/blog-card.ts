import type { BlogCategory, BlogPost } from "@/lib/blog";

/** Slim card DTO for the blog index client — no sections/body payload. */
export type BlogCard = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  category: BlogCategory;
  image: {
    src: string;
    alt: string;
  };
};

export function categoryToId(category: BlogCategory) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function toBlogCard(post: BlogPost): BlogCard {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readingMinutes: post.readingMinutes,
    keywords: post.keywords,
    category: post.category,
    image: post.image,
  };
}
