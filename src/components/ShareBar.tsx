import { Check, Link2, Share2, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ShareBar({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  function url() {
    if (typeof window === "undefined") return `/posts/${slug}`;
    return `${window.location.origin}/posts/${slug}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link");
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url: url() });
        return;
      } catch {
        /* user dismissed */
      }
    }
    void copy();
  }

  const btn =
    "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rule-label text-muted-foreground">Share</span>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link to this essay">
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share this essay on X"
      >
        <Twitter className="size-4" aria-hidden />
        Post
      </a>
      <button type="button" onClick={share} className={btn} aria-label="Share this essay">
        <Share2 className="size-4" aria-hidden />
        More
      </button>
    </div>
  );
}
