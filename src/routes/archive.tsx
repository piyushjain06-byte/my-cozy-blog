import { Link, createFileRoute } from "@tanstack/react-router";
import { formatDate, posts } from "@/data/posts";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — every essay published on Inkwell" },
      {
        name: "description",
        content:
          "Browse the complete Inkwell archive: every published essay on craft, engineering, culture and field notes, newest first.",
      },
      { property: "og:title", content: "Archive — every essay published on Inkwell" },
      {
        property: "og:description",
        content: "The complete Inkwell archive, newest essays first.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Archive,
});

function Archive() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14">
      <h1 className="font-display text-5xl">Archive</h1>
      <p className="mt-3 text-ink-soft">
        {sorted.length} essays, newest first.
      </p>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {sorted.map((post) => (
          <li key={post.slug} className="py-5">
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-display text-2xl transition-colors group-hover:text-accent">
                {post.title}
              </span>
              <span className="shrink-0 text-sm text-ink-soft">
                {post.category} · {formatDate(post.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
