import { createFileRoute } from "@tanstack/react-router";

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
  { name: "Piyush Rana", role: "Editor", note: "Writes the field notes." },
  { name: "Ana Ferreira", role: "Design & Community", note: "Thinks about shape." },
  { name: "Devon Hale", role: "Engineering", note: "Keeps the archive standing." },
];

function About() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14">
      <h1 className="font-display text-5xl">About Inkwell</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
        <p>
          Inkwell is a small independent publication about making things: the
          craft of writing, the practice of engineering, and the culture that
          grows around both.
        </p>
        <p>
          We publish a handful of essays a month. Nothing is written to a
          trend, and nothing is deleted when it ages. The archive is the point.
        </p>
      </div>

      <h2 className="mt-12 font-display text-3xl text-ink">Who writes here</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {team.map((member) => (
          <li key={member.name} className="flex flex-wrap gap-x-4 gap-y-1 py-5">
            <span className="font-medium">{member.name}</span>
            <span className="text-sm uppercase tracking-[0.18em] text-accent">
              {member.role}
            </span>
            <span className="w-full text-ink-soft sm:w-auto">{member.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
