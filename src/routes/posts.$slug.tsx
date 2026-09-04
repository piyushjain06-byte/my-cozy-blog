import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CategoryPill, PostCard } from "@/components/PostCard";
import { PostCover } from "@/components/PostCover";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareBar } from "@/components/ShareBar";
import { Newsletter } from "@/components/Newsletter";
import { formatDate, getPost, relatedPosts } from "@/data/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Inkwell` : "Essay — Inkwell";
    const description = loaderData?.excerpt ?? "An essay from Inkwell.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl">Essay not found</h1>
      <p className="mt-3 text-muted-foreground">
        That piece may have been unpublished or renamed.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-accent px-5 py-2.5 font-medium text-accent-foreground hover:bg-accent-hover"
      >
        Back to the latest
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const related = relatedPosts(post);

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <Link
          to="/archive"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All essays
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_240px]">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryPill category={post.category} />
              <span className="rule-label text-muted-foreground">
                {post.readingTime} read
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft font-display text-lg text-accent"
                >
                  {post.author.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{post.author}</span>
                  <span className="block text-muted-foreground">
                    {post.authorRole} ·{" "}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                </span>
              </div>
              <ShareBar title={post.title} slug={post.slug} />
            </div>

            <PostCover post={post} className="mt-8 h-56 w-full sm:h-80" />

            <div className="prose-inkwell mt-10 max-w-[68ch]">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="mt-10 font-display text-3xl first:mt-0">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="mt-4 text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    to="/archive"
                    search={{ tag: t }}
                    className="inline-block rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    #{t}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-6">
              <ShareBar title={post.title} slug={post.slug} />
            </div>

            <Newsletter className="mt-12" />
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit" aria-label="Essay contents">
            <nav aria-label="Table of contents">
              <p className="rule-label text-muted-foreground">In this essay</p>
              <ol className="mt-3 space-y-2 border-l border-border pl-4 text-sm">
                {post.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="related">
          <h2 id="related" className="font-display text-3xl">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
