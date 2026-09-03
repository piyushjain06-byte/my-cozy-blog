import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Enter a valid email address, e.g. you@example.com");
      return;
    }
    setError(null);
    setEmail("");
    toast.success("You're subscribed", {
      description: "One considered essay every other week. No spam, ever.",
    });
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-surface-muted p-6 sm:p-8",
        className,
      )}
      aria-labelledby="newsletter-heading"
    >
      <div className="flex items-center gap-2 text-accent">
        <Mail className="size-4" aria-hidden />
        <span className="rule-label">The Inkwell letter</span>
      </div>
      <h2 id="newsletter-heading" className="mt-3 font-display text-2xl">
        One essay, every other Thursday
      </h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        No roundups, no growth hacks. Just the piece we spent two weeks writing.
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </section>
  );
}
