import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { BlogRichText } from "@/components/BlogRichText";
import { ButtonLink } from "@/components/Button";
import { categoryToId, getAllPosts, getPost } from "@/lib/blog";
import { breadcrumbJsonLd, fitSerpTitle, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  const canonicalPath = `/blog/${post.slug}`;
  const canonicalUrl = `${site.websiteUrl}${canonicalPath}`;
  const description = trimDescription(post.description);
  const title = fitSerpTitle(post.title);
  return {
    title,
    description,
    keywords: post.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.practitioner.name],
      images: [
        {
          url: post.image.src,
          width: 1200,
          height: 800,
          alt: post.image.alt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sameCategory = getAllPosts().filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );
  const others = [
    ...sameCategory,
    ...getAllPosts().filter(
      (item) => item.slug !== post.slug && item.category !== post.category,
    ),
  ].slice(0, 3);
  const categoryHref = `/blog#${categoryToId(post.category)}`;
  const updated = post.updated ?? post.date;
  const ctaHref = post.ctaHref ?? "/book";
  const ctaLabel = post.ctaLabel ?? "Book online";

  const postUrl = `${site.websiteUrl}/blog/${post.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished: post.date,
    dateModified: updated,
    author: {
      "@id": `${site.websiteUrl}/#practitioner`,
    },
    publisher: {
      "@id": `${site.websiteUrl}/#clinic`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.keywords.join(", "),
    image: [`${site.websiteUrl}${post.image.src}`],
  };

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <article className="bg-slate-50 pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <div className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link href="/blog" className="text-teal hover:text-teal-dark">
            ← All articles
          </Link>
          <Link href={categoryHref} className="text-slate-500 hover:text-teal">
            {post.category}
          </Link>
        </div>
        <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-teal uppercase">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          By{" "}
          <Link
            href="/about"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            {site.practitioner.name}
          </Link>{" "}
          · {post.readingMinutes} min read
        </p>
        <p className="mt-1 text-sm text-slate-500">
          <span className="font-medium text-slate-600">Published</span>{" "}
          {formatDate(post.date)}
          {updated !== post.date ? (
            <>
              {" · "}
              <span className="font-medium text-slate-600">Last updated</span>{" "}
              {formatDate(updated)}
            </>
          ) : null}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          {post.description}
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-12 md:px-8 md:pb-16">
        <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            fetchPriority="high"
            quality={70}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          {post.sections.map((section, index) => {
            const HeadingTag = section.level === 3 ? "h3" : "h2";
            const headingClass =
              section.level === 3
                ? "font-display text-xl text-navy md:text-2xl"
                : "font-display text-2xl text-navy md:text-3xl";

            return (
              <section key={index}>
                {section.heading ? (
                  <HeadingTag className={headingClass}>
                    {section.heading}
                  </HeadingTag>
                ) : null}
                {section.image ? (
                  <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={`text-base leading-relaxed text-slate-700 md:text-[1.05rem] ${
                      section.heading || section.image
                        ? "mt-3"
                        : index === 0
                          ? ""
                          : "mt-3"
                    }`}
                  >
                    <BlogRichText text={paragraph} />
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item}>
                        <BlogRichText text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}

          {post.cta ? (
            <div className="rounded-xl border border-teal/25 bg-teal/5 px-5 py-5">
              <p className="font-semibold text-navy">{post.cta}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
                <ButtonLink href={site.phoneHref} variant="secondary">
                  Call {site.phone}
                </ButtonLink>
              </div>
            </div>
          ) : null}

          <AuthorBio />
        </div>

        {others.length ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-navy">
              {sameCategory.length
                ? `More in ${post.category}`
                : "Keep reading"}
            </h2>
            <ul className="mt-5 grid gap-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-teal md:grid-cols-[7rem_1fr]"
                  >
                    <div className="relative aspect-square bg-slate-100">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="112px"
                        loading="lazy"
                        decoding="async"
                        quality={60}
                        className="object-cover"
                      />
                    </div>
                    <div className="py-3 pr-4">
                      <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                        {item.category}
                      </span>
                      <span className="mt-1 block font-display text-xl text-navy">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
