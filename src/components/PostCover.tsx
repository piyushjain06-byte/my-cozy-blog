import type { Post } from "@/data/posts";
import { cn } from "@/lib/utils";

export function PostCover({
  post,
  className,
  label,
}: {
  post: Post;
  className?: string;
  label?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Abstract cover artwork for ${post.title}`}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${post.cover[0]} 0%, ${post.cover[1]} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(0,0,0,0.4), transparent 55%)",
        }}
      />
      {label !== false && (
        <span
          aria-hidden
          className="absolute bottom-2 right-4 font-display text-6xl leading-none text-white/25"
        >
          {post.title.charAt(0)}
        </span>
      )}
    </div>
  );
}
