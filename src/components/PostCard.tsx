import { Link } from "@tanstack/react-router";
import { formatDate, type Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-b border-line py-8 first:pt-0">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-soft">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">
          {post.category}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime} read</span>
      </div>
      <h3 className="mt-3 font-display text-3xl leading-tight">
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="transition-colors group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl text-ink-soft">{post.excerpt}</p>
      <p className="mt-4 text-sm text-ink-soft">
        By {post.author} · {post.authorRole}
      </p>
    </article>
  );
}
