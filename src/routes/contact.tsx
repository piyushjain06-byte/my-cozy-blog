import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Newsletter } from "@/components/Newsletter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Inkwell — pitches, corrections and letters" },
      {
        name: "description",
        content:
          "Pitch an essay, send a correction, or write the editors a letter. Inkwell reads everything and answers within a week.",
      },
      { property: "og:title", content: "Contact Inkwell — pitches, corrections and letters" },
      {
        property: "og:description",
        content: "Pitch an essay, send a correction, or write the editors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: "Pitch",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function set(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.message.trim().length < 20)
      next.message = "A little more detail, please — at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setValues({ name: "", email: "", topic: "Pitch", message: "" });
    toast.success("Message sent", {
      description: "An editor will reply within a week.",
    });
  }

  const field =
    "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none";

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12">
      <header className="border-b border-border pb-8">
        <p className="rule-label text-accent">Say hello</p>
        <h1 className="mt-3 font-display text-5xl">Contact the editors</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pitches, corrections, and disagreements all welcome. We read every
          message and reply within a week.
        </p>
      </header>

      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={field}
                placeholder="Ada Lovelace"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-accent">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={field}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-accent">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="topic" className="mb-2 block text-sm font-medium">
              Topic
            </label>
            <select
              id="topic"
              value={values.topic}
              onChange={(e) => set("topic", e.target.value)}
              className={field}
            >
              <option>Pitch</option>
              <option>Correction</option>
              <option>Letter to the editor</option>
              <option>Something else</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={7}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={field}
              placeholder="What would you like to write about?"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1.5 text-sm text-accent">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            <Send className="size-4" aria-hidden />
            Send message
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5 text-sm">
            <p className="rule-label text-muted-foreground">Direct</p>
            <p className="mt-3 flex items-center gap-2">
              <Mail className="size-4 text-accent" aria-hidden />
              <a
                href="mailto:editors@inkwell.press"
                className="text-accent hover:underline"
              >
                editors@inkwell.press
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden />
              Remote — Lisbon, Bengaluru, Toronto
            </p>
          </div>
          <Newsletter />
        </aside>
      </div>
    </div>
  );
}
