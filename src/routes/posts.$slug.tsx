import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, posts } from "@/data/posts";

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
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl">Essay not found</h1>
      <p className="mt-3 text-ink-soft">
        That piece may have been unpublished or renamed.
      </p>
      <Link to="/" className="mt-6 inline-block text-accent underline underline-offset-4">
        Back to the latest
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" />
        All essays
      </Link>

      <article className="mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-line pb-6 text-sm text-ink-soft">
          <span className="text-ink">{post.author}</span>
          <span>{post.authorRole}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} read</span>
        </div>

        <div className="mt-8 space-y-6 text-lg leading-relaxed">
          <p className="font-display text-2xl leading-snug text-ink">
            {post.excerpt}
          </p>
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="mt-16 border-t border-line pt-8">
        <h2 className="font-display text-2xl">Keep reading</h2>
        <ul className="mt-4 space-y-3">
          {more.map((p) => (
            <li key={p.slug}>
              <Link
                to="/posts/$slug"
                params={{ slug: p.slug }}
                className="text-ink-soft transition-colors hover:text-accent"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
