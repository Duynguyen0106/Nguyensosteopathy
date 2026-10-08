import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { getAllPosts, getPost } from "@/lib/blog";
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
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

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
  };

  return (
    <article className="bg-slate-50 pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <div className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-teal hover:text-teal-dark"
        >
          ← All articles
        </Link>
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
            <h2 className="font-display text-2xl text-navy">Keep reading</h2>
            <ul className="mt-5 grid gap-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="block rounded-xl border border-slate-200 bg-white px-5 py-4 transition hover:border-teal"
                  >
                    <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-xl text-navy">
                      {item.title}
                    </span>
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
