import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PostCard, CategoryPill } from "@/components/PostCard";
import { PostCover } from "@/components/PostCover";
import { Newsletter } from "@/components/Newsletter";
import { categories, formatDate, posts } from "@/data/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inkwell — Essays on craft, code and culture" },
      {
        name: "description",
        content:
          "Inkwell is an independent publication with long-form essays on writing craft, engineering practice and internet culture.",
      },
      { property: "og:title", content: "Inkwell — Essays on craft, code and culture" },
      {
        property: "og:description",
        content:
          "Long-form essays on writing craft, engineering practice and internet culture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const secondary = rest.slice(0, 2);
  const grid = rest.slice(2);
  const mostRead = [...rest].slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      {/* Masthead */}
      <section className="border-b border-border py-8">
        <p className="rule-label text-accent">Issue 14 · September 2026</p>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          Slow essays about making things well — writing craft, engineering
          practice, and the culture around both.
        </p>
      </section>

      {/* Magazine hero */}
      <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-[1.35fr_1fr]">
        <article className="fade-up">
          <PostCover post={featured} className="h-56 w-full sm:h-72" />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <CategoryPill category={featured.category} />
            <span className="rule-label text-muted-foreground">
              Featured essay
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] sm:text-5xl">
            <Link
              to="/posts/$slug"
              params={{ slug: featured.slug }}
              className="transition-colors hover:text-accent"
            >
              {featured.title}
            </Link>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {featured.excerpt}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {featured.author} ·{" "}
            <time dateTime={featured.date}>{formatDate(featured.date)}</time> ·{" "}
            {featured.readingTime} read
          </p>
          <Link
            to="/posts/$slug"
            params={{ slug: featured.slug }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Read the essay
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </article>

        <div className="flex flex-col gap-6 lg:border-l lg:border-border lg:pl-10">
          {secondary.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Browse by section */}
      <section className="border-b border-border py-10" aria-labelledby="sections-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="sections-heading" className="font-display text-3xl">
            Browse by section
          </h2>
          <Link
            to="/archive"
            className="text-sm text-accent underline underline-offset-4 hover:text-accent-hover"
          >
            Search the full archive
          </Link>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c}>
              <Link
                to="/archive"
                search={{ category: c }}
                className="inline-block rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Story grid + sidebar */}
      <section className="grid gap-10 py-12 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="font-display text-3xl">Latest essays</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="space-y-8" aria-label="Sidebar">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="rule-label text-muted-foreground">Most read</h2>
            <ol className="mt-3">
              {mostRead.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} variant="compact" />
                </li>
              ))}
            </ol>
          </div>
          <Newsletter />
        </aside>
      </section>
    </div>
  );
}
