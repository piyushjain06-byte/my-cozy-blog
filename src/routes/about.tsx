import { Link, createFileRoute } from "@tanstack/react-router";
import { Newsletter } from "@/components/Newsletter";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Inkwell — who writes here and why" },
      {
        name: "description",
        content:
          "Inkwell is an independent publication run by a small editorial team writing about craft, engineering practice and internet culture.",
      },
      { property: "og:title", content: "About Inkwell — who writes here and why" },
      {
        property: "og:description",
        content:
          "An independent publication about craft, engineering practice and internet culture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const team = [
  {
    name: "Piyush Rana",
    role: "Editor",
    note: "Writes the field notes and decides what ships.",
  },
  {
    name: "Ana Ferreira",
    role: "Design & Community",
    note: "Thinks about shape, type, and the rooms we build for readers.",
  },
  {
    name: "Devon Hale",
    role: "Engineering",
    note: "Keeps the archive standing and the pages fast.",
  },
];

const principles = [
  {
    title: "Publish slowly",
    body: "Two essays a month, each one edited until it earns the reader's time.",
  },
  {
    title: "Nothing is deleted",
    body: "Corrections are appended, never quietly swapped in. The archive is the record.",
  },
  {
    title: "Written by humans",
    body: "No generated filler, no keyword padding, no posts written to a trend.",
  },
];

function About() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12">
      <header className="border-b border-border pb-8">
        <p className="rule-label text-accent">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight">
          A small publication about making things well
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Inkwell covers the craft of writing, the practice of engineering, and
          the culture that grows around both.
        </p>
      </header>

      <dl className="grid gap-6 border-b border-border py-8 sm:grid-cols-3">
        {[
          { k: "Essays published", v: String(posts.length) },
          { k: "Founded", v: "2026" },
          { k: "Editorial staff", v: String(team.length) },
        ].map((stat) => (
          <div key={stat.k}>
            <dt className="rule-label text-muted-foreground">{stat.k}</dt>
            <dd className="mt-2 font-display text-4xl">{stat.v}</dd>
          </div>
        ))}
      </dl>

      <section className="grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-3xl">How we work</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {principles.map((p) => (
              <article
                key={p.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>

          <h2 className="mt-12 font-display text-3xl">Who writes here</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {team.map((member) => (
              <li key={member.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5">
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft font-display text-lg text-accent"
                >
                  {member.name.charAt(0)}
                </span>
                <span className="font-medium">{member.name}</span>
                <span className="rule-label text-accent">{member.role}</span>
                <span className="w-full text-muted-foreground sm:w-auto sm:flex-1">
                  {member.note}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-muted-foreground">
            Want to write for us?{" "}
            <Link to="/contact" className="text-accent underline underline-offset-4">
              Send a pitch
            </Link>
            .
          </p>
        </div>

        <aside>
          <Newsletter />
        </aside>
      </section>
    </div>
  );
}
