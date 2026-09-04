import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { allTags, categories, posts, type Category } from "@/data/posts";
import { cn } from "@/lib/utils";

type ArchiveSearch = {
  category?: Category | "All";
  q?: string;
  tag?: string;
  sort?: "newest" | "oldest";
};

export const Route = createFileRoute("/archive")({
  validateSearch: (search: Record<string, unknown>): ArchiveSearch => {
    const category = search['category'];
    const sort = search['sort'];
    return {
      category:
        typeof category === "string" &&
        (category === "All" || (categories as readonly string[]).includes(category))
          ? (category as Category | "All")
          : "All",
      q: typeof search['q'] === "string" && search['q'] ? search['q'] : undefined,
      tag: typeof search['tag'] === "string" && search['tag'] ? search['tag'] : undefined,
      sort: sort === "oldest" ? "oldest" : "newest",
    };
  },
  head: () => ({
    meta: [
      { title: "Archive — search every Inkwell essay" },
      {
        name: "description",
        content:
          "Search and filter the complete Inkwell archive by keyword, section and tag — every essay on craft, engineering, culture and field notes.",
      },
      { property: "og:title", content: "Archive — search every Inkwell essay" },
      {
        property: "og:description",
        content: "Search and filter the complete Inkwell archive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Archive,
});

function Archive() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/archive" });
  const [query, setQuery] = useState(search.q ?? "");

  const category = search.category ?? "All";
  const sort = search.sort ?? "newest";

  function update(next: Partial<ArchiveSearch>) {
    void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) => (search.tag ? p.tags.includes(search.tag) : true))
      .filter((p) =>
        q
          ? [p.title, p.excerpt, p.author, p.category, ...p.tags]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      )
      .sort((a, b) =>
        sort === "newest"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date),
      );
  }, [query, category, search.tag, sort]);

  const hasFilters = category !== "All" || !!search.tag || !!query;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12">
      <header className="border-b border-border pb-8">
        <p className="rule-label text-accent">The archive</p>
        <h1 className="mt-3 font-display text-5xl">Every essay we've published</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {posts.length} essays. Search by keyword, narrow by section or tag.
        </p>
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-8" aria-label="Filters">
          <div>
            <label htmlFor="archive-search" className="rule-label text-muted-foreground">
              Search
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  update({ q: e.target.value || undefined });
                }}
                placeholder="Typography, caching, community…"
                className="w-full rounded-md border border-border bg-surface py-2.5 pl-9 pr-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <fieldset>
            <legend className="rule-label text-muted-foreground">Section</legend>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {(["All", ...categories] as const).map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => update({ category: c })}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      category === c
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:border-accent hover:text-accent",
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="rule-label text-muted-foreground">Tags</legend>
            <ul className="mt-3 flex flex-wrap gap-2">
              {allTags.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    aria-pressed={search.tag === t}
                    onClick={() => update({ tag: search.tag === t ? undefined : t })}
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      search.tag === t
                        ? "border-accent text-accent"
                        : "border-border text-muted-foreground hover:border-accent hover:text-accent",
                    )}
                  >
                    #{t}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          <div>
            <label htmlFor="archive-sort" className="rule-label text-muted-foreground">
              Sort
            </label>
            <select
              id="archive-sort"
              value={sort}
              onChange={(e) =>
                update({ sort: e.target.value as ArchiveSearch["sort"] })
              }
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground focus:border-accent focus:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                update({ category: "All", tag: undefined, q: undefined });
              }}
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <X className="size-4" aria-hidden />
              Clear filters
            </button>
          )}
        </aside>

        <section aria-label="Results">
          <p className="text-sm text-muted-foreground" role="status">
            {results.length} {results.length === 1 ? "essay" : "essays"} found
          </p>
          <div className="mt-5 space-y-6">
            {results.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No essays match those filters yet.
              </p>
            ) : (
              results.map((post) => (
                <PostCard key={post.slug} post={post} variant="wide" />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
