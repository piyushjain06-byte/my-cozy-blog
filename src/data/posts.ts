export type Section = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  tags: string[];
  /** two hues used for the generated cover artwork */
  cover: [string, string];
  sections: Section[];
};

export const categories = [
  "Craft",
  "Engineering",
  "Culture",
  "Field Notes",
] as const;

export type Category = (typeof categories)[number];

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
    tags: ["writing", "process", "publishing"],
    cover: ["#B4762A", "#6C3B12"],
    sections: [
      {
        id: "the-safe-draft",
        heading: "The safe draft",
        paragraphs: [
          "There is a particular kind of silence that settles over a draft nobody has read. It feels safe. It is also where most writing quietly dies.",
          "Publishing early forces a decision: the sentence either carries its weight in front of a stranger, or it does not. No amount of private editing produces that verdict.",
        ],
      },
      {
        id: "the-practice",
        heading: "The practice",
        paragraphs: [
          "The practice is simple to describe and hard to keep. Write the thing badly. Put a date on it. Let readers meet it while it is still moving.",
          "Then revise in public, where the revisions themselves become part of the record rather than a secret you keep from your readers.",
        ],
      },
      {
        id: "what-you-end-up-with",
        heading: "What you end up with",
        paragraphs: [
          "Over a year of doing this, the archive turns into something better than a portfolio. It becomes a map of how your thinking changed, with the wrong turns left visible.",
          "That map is the most useful thing you can hand a reader who is one step behind you.",
        ],
      },
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
    tags: ["community", "moderation", "design"],
    cover: ["#2F6D5B", "#123A2E"],
    sections: [
      {
        id: "the-same-feature",
        heading: "Everyone ships the same feature",
        paragraphs: [
          "Every community platform eventually ships the same thing and gets the same result: a fast box, an immediate post button, and a ranking system tuned to volume.",
          "The outcome is not a people problem. It is the predictable output of the defaults.",
        ],
      },
      {
        id: "three-traits",
        heading: "Three traits of healthy threads",
        paragraphs: [
          "The healthiest threads we studied were slow to open, easy to leave, and hard to dominate.",
          "Slow to open meant a short delay or a prompt before the first reply. Easy to leave meant no penalty for silence. Hard to dominate meant one voice could not stack ten consecutive replies.",
        ],
      },
      {
        id: "shape-over-policy",
        heading: "Shape beats policy",
        paragraphs: [
          "None of these are moderation tools. They are shape tools, and shape does more work than policy ever will.",
          "Write the rules you must, but design the room first.",
        ],
      },
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
    tags: ["markdown", "security", "performance"],
    cover: ["#3A5AA8", "#16264C"],
    sections: [
      {
        id: "untrusted-by-default",
        heading: "Untrusted by default",
        paragraphs: [
          "Markdown looks like a solved problem until an author pastes raw HTML into a paragraph and your renderer cheerfully executes it.",
          "Treat every stored document as untrusted. Parse to an abstract tree, walk it, and allow only the node types your design system can actually style.",
        ],
      },
      {
        id: "cache-the-output",
        heading: "Cache the output, not the source",
        paragraphs: [
          "Rendering is deterministic. Doing it on every request is a tax you pay for nothing at all.",
          "Invalidate on save, serve from cache everywhere else, and your slowest page becomes your fastest.",
        ],
      },
      {
        id: "keep-the-plain-text",
        heading: "Keep the plain text forever",
        paragraphs: [
          "Frameworks rotate every few years. Plain text is the only format that reliably survives the migration.",
          "Store the original, version it, and never let a rendering pipeline become the system of record.",
        ],
      },
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
    tags: ["analytics", "archive"],
    cover: ["#8A4A6B", "#3C1B31"],
    sections: [
      {
        id: "the-quiet-month",
        heading: "The quiet month",
        paragraphs: [
          "August was the quietest month since launch. It was also the month with the highest share of returning readers.",
          "Spikes bring people who arrive from one link and leave from the same page. Slow months reveal the readers who came back on purpose.",
        ],
      },
      {
        id: "the-archive-works",
        heading: "The archive did the work",
        paragraphs: [
          "Four posts published over a year ago accounted for more than half of the total reading time.",
          "None of them were topical. All of them answered a question people still have.",
        ],
      },
      {
        id: "the-lesson",
        heading: "The boring lesson",
        paragraphs: [
          "Write things that are still true in eighteen months. That is the entire strategy.",
        ],
      },
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
    tags: ["typography", "design", "reading"],
    cover: ["#A2452C", "#511A0F"],
    sections: [
      {
        id: "not-attention",
        heading: "It is not an attention problem",
        paragraphs: [
          "Most reading failures are not attention failures. They are layout failures wearing a disguise.",
          "Before blaming the reader, measure the line.",
        ],
      },
      {
        id: "measure-and-rhythm",
        heading: "Measure and rhythm",
        paragraphs: [
          "Keep the measure between sixty and seventy-five characters. Longer lines cost the reader a return sweep they will eventually refuse to make.",
          "Give paragraphs air, but not so much that the page loses its spine. Rhythm beats spacing rules.",
        ],
      },
      {
        id: "contrast",
        heading: "Contrast over size",
        paragraphs: [
          "A page set at sixteen pixels with real contrast reads better than twenty pixels of grey on grey.",
          "Test the body text in daylight on a cheap screen. If it survives that, it survives anything.",
        ],
      },
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
    tags: ["workflow", "tools", "editorial"],
    cover: ["#4B5563", "#1F242C"],
    sections: [
      {
        id: "museum-of-overdue-cards",
        heading: "A museum of overdue cards",
        paragraphs: [
          "Every editorial calendar begins as a grid of confident dates and ends as a museum of overdue cards.",
          "The dates were never data. They were hopes with a timestamp.",
        ],
      },
      {
        id: "model-state",
        heading: "Model state, not intent",
        paragraphs: [
          "Stop tracking planned publish dates and start tracking draft state transitions.",
          "A post is idea, outline, draft, edit, or shipped. Dates are derived from state, not promised in advance.",
        ],
      },
      {
        id: "shorter-meetings",
        heading: "Shorter meetings",
        paragraphs: [
          "Suddenly the calendar shows what is actually moving, and the standing meeting about it gets much shorter.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postBody(post: Post) {
  return post.sections.flatMap((s) => s.paragraphs);
}

export function relatedPosts(post: Post, limit = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (p: Post) =>
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
