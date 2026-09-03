export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  body: string[];
};

export const categories = [
  "All",
  "Craft",
  "Engineering",
  "Culture",
  "Field Notes",
] as const;

export const posts: Post[] = [
  {
    slug: "writing-in-the-open",
    title: "Writing in the Open",
    category: "Craft",
    excerpt:
      "Publishing unfinished thinking is uncomfortable, and that discomfort is exactly where the useful work lives.",
    author: "Piyush Rana",
    authorRole: "Editor",
    date: "2026-08-24",
    readingTime: "6 min",
    featured: true,
    body: [
      "There is a particular kind of silence that settles over a draft nobody has read. It feels safe. It is also where most writing quietly dies.",
      "Publishing early forces a decision: the sentence either carries its weight in front of a stranger, or it does not. No amount of private editing produces that verdict.",
      "The practice is simple to describe and hard to keep. Write the thing badly. Put a date on it. Let readers meet it while it is still moving. Then revise in public, where the revisions themselves become part of the record.",
      "Over a year of doing this, the archive turns into something better than a portfolio. It becomes a map of how your thinking changed, with the wrong turns left visible.",
    ],
  },
  {
    slug: "the-shape-of-a-good-comment-thread",
    title: "The Shape of a Good Comment Thread",
    category: "Culture",
    excerpt:
      "Comment sections are not broken by people. They are broken by defaults that reward speed over care.",
    author: "Ana Ferreira",
    authorRole: "Community",
    date: "2026-08-11",
    readingTime: "5 min",
    body: [
      "Every community platform eventually ships the same feature and gets the same result: a fast box, an immediate post button, and a ranking system tuned to volume.",
      "The healthiest threads we studied shared three traits. They were slow to open, easy to leave, and hard to dominate.",
      "Slow to open meant a short delay or a prompt before the first reply. Easy to leave meant no penalty for silence. Hard to dominate meant one voice could not stack ten consecutive replies.",
      "None of these are moderation tools. They are shape tools, and shape does more work than policy ever will.",
    ],
  },
  {
    slug: "rendering-markdown-without-regret",
    title: "Rendering Markdown Without Regret",
    category: "Engineering",
    excerpt:
      "A practical tour of sanitising, caching, and shipping author-written content that will outlive your framework.",
    author: "Devon Hale",
    authorRole: "Engineering",
    date: "2026-07-29",
    readingTime: "9 min",
    body: [
      "Markdown looks like a solved problem until an author pastes raw HTML into a paragraph and your renderer cheerfully executes it.",
      "Treat every stored document as untrusted. Parse to an abstract tree, walk it, and allow only the node types your design system can actually style.",
      "Cache the rendered output, not the source. Rendering is deterministic; doing it on every request is a tax you pay for nothing.",
      "Finally, store the original text forever. Frameworks rotate every few years. Plain text is the only format that reliably survives the migration.",
    ],
  },
  {
    slug: "notes-from-a-slow-month",
    title: "Notes From a Slow Month",
    category: "Field Notes",
    excerpt:
      "Traffic fell, the archive kept working, and the numbers told a more interesting story than the spike ever did.",
    author: "Piyush Rana",
    authorRole: "Editor",
    date: "2026-07-06",
    readingTime: "4 min",
    body: [
      "August was the quietest month since launch. It was also the month with the highest share of returning readers.",
      "Spikes bring people who arrive from one link and leave from the same page. Slow months reveal the readers who came back on purpose.",
      "The archive did most of the work. Four posts published over a year ago accounted for more than half of the reading time.",
      "The lesson is boring and durable: write things that are still true in eighteen months.",
    ],
  },
  {
    slug: "typography-for-long-reads",
    title: "Typography for Long Reads",
    category: "Craft",
    excerpt:
      "Measure, rhythm, and contrast decide whether a two-thousand-word essay gets finished or abandoned.",
    author: "Ana Ferreira",
    authorRole: "Design",
    date: "2026-06-18",
    readingTime: "7 min",
    body: [
      "Most reading failures are not attention failures. They are layout failures wearing a disguise.",
      "Keep the measure between sixty and seventy-five characters. Longer lines cost the reader a return sweep they will eventually refuse to make.",
      "Give paragraphs air, but not so much that the page loses its spine. Rhythm beats spacing rules.",
      "Contrast matters more than size. A page set at sixteen pixels with real contrast reads better than twenty pixels of grey on grey.",
    ],
  },
  {
    slug: "an-editorial-calendar-that-survives-contact",
    title: "An Editorial Calendar That Survives Contact",
    category: "Engineering",
    excerpt:
      "Scheduling tools fail because they model intentions. Model drafts instead, and the calendar starts telling the truth.",
    author: "Devon Hale",
    authorRole: "Engineering",
    date: "2026-05-30",
    readingTime: "6 min",
    body: [
      "Every editorial calendar begins as a grid of confident dates and ends as a museum of overdue cards.",
      "The fix is to stop tracking planned publish dates and start tracking draft state transitions.",
      "A post is idea, outline, draft, edit, or shipped. Dates are derived from state, not promised in advance.",
      "Suddenly the calendar shows what is actually moving, and the standing meeting about it gets much shorter.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
