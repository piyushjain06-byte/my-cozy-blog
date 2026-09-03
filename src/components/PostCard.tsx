import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Post } from "@/data/posts";
import { PostCover } from "@/components/PostCover";
import { cn } from "@/lib/utils";

export function CategoryPill({ category }: { category: string }) {
  return (
    <span className="rule-label rounded-full bg-accent-soft px-2.5 py-1 text-accent">
      {category}
    </span>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-sm text-muted-foreground">
      {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
      {post.readingTime} read
    </p>
  );
}

export function PostCard({
  post,
  variant = "default",
  className,
}: {
  post: Post;
  variant?: "default" | "compact" | "wide";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group flex gap-4 border-b border-border py-4 last:border-b-0",
          className,
        )}
      >
        <PostCover post={post} label={false} className="size-16 shrink-0" />
        <div className="min-w-0">
          <CategoryPill category={post.category} />
          <h3 className="mt-2 font-display text-lg leading-snug">
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="transition-colors hover:text-accent"
            >
              {post.title}
            </Link>
          </h3>
          <PostMeta post={post} />
        </div>
      </article>
    );
  }

  if (variant === "wide") {
    return (
      <article
        className={cn(
          "group grid gap-6 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent sm:grid-cols-[220px_1fr]",
          className,
        )}
      >
        <PostCover post={post} className="h-40 w-full sm:h-full" />
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryPill category={post.category} />
            <span className="rule-label text-muted-foreground">
              {post.readingTime} read
            </span>
          </div>
          <h3 className="mt-3 font-display text-2xl leading-snug">
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="transition-colors hover:text-accent"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-auto pt-4">
            <PostMeta post={post} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:card-shadow",
        className,
      )}
    >
      <PostCover post={post} className="h-36 w-full" />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CategoryPill category={post.category} />
        <span className="rule-label text-muted-foreground">
          {post.readingTime} read
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug">
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-start gap-1 transition-colors hover:text-accent"
        >
          {post.title}
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-4">
        <PostMeta post={post} />
      </div>
    </article>
  );
}
