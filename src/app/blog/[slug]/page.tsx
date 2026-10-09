import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { categoryToId, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: site.practitioner.name,
      jobTitle: site.practitioner.title,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.websiteUrl}/images/logo-mark.png`,
      },
    },
    mainEntityOfPage: `${site.websiteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    image: [`${site.websiteUrl}${post.image.src}`],
  };

  return (
    <article className="bg-slate-50 pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
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
          By {site.practitioner.name} · {post.readingMinutes} min read ·{" "}
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          {post.sections.map((section, index) => (
            <section key={index}>
              {section.heading ? (
                <h2 className="font-display text-2xl text-navy md:text-3xl">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className={`text-base leading-relaxed text-slate-700 md:text-[1.05rem] ${
                    section.heading ? "mt-3" : index === 0 ? "" : "mt-3"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {post.cta ? (
            <div className="rounded-xl border border-teal/25 bg-teal/5 px-5 py-5">
              <p className="font-semibold text-navy">{post.cta}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href="/book">Book online</ButtonLink>
                <ButtonLink href={site.phoneHref} variant="secondary">
                  Call {site.phone}
                </ButtonLink>
              </div>
            </div>
          ) : null}
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
