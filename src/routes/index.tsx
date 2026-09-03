import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { categories, formatDate, posts } from "@/data/posts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inkwell — Essays on craft, code and culture" },
      {
        name: "description",
        content:
          "Inkwell is a small independent publication with long-form essays on writing craft, engineering practice and internet culture.",
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
  const [active, setActive] = useState<string>("All");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const filtered =
    active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <section className="border-b border-line py-14">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          Featured essay
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl">
          {featured.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{featured.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          <span>{featured.author}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(featured.date)}</span>
          <span aria-hidden>·</span>
          <span>{featured.readingTime} read</span>
        </div>
        <Link
          to="/posts/$slug"
          params={{ slug: featured.slug }}
          className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-medium text-ink transition-colors hover:text-accent"
        >
          Read the essay
          <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="py-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border border-line px-4 py-1.5 text-sm transition-colors",
                active === c
                  ? "border-accent bg-accent text-paper"
                  : "text-ink-soft hover:border-accent hover:text-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <p className="py-10 text-ink-soft">
              Nothing filed under {active} yet.
            </p>
          ) : (
            filtered.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </div>
  );
}
