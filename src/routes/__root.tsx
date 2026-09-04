/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "sonner";
import { ThemeToggle, themeScript } from "@/components/ThemeToggle";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inkwell — Essays on craft, code and culture" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fira+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const nav = [
  { to: "/", label: "Latest" },
  { to: "/archive", label: "Archive" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-accent [&.active]:text-foreground [&.active]:underline [&.active]:decoration-accent [&.active]:decoration-2 [&.active]:underline-offset-8";

function RootDocument({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
              <Link to="/" className="flex items-baseline gap-2">
                <span className="font-display text-2xl leading-none tracking-tight">
                  Inkwell
                </span>
                <span className="hidden rule-label text-muted-foreground sm:inline">
                  est. 2026
                </span>
              </Link>

              <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? (
                    <X className="size-4" aria-hidden />
                  ) : (
                    <Menu className="size-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {open && (
              <nav
                id="mobile-nav"
                aria-label="Mobile"
                className="border-t border-border md:hidden"
              >
                <ul className="mx-auto grid w-full max-w-6xl gap-1 px-5 py-3">
                  {nav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/" }}
                        onClick={() => setOpen(false)}
                        className={`${linkClass} block py-2`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </header>

          <main id="main" className="flex-1">
            {children}
          </main>

          <footer className="border-t border-border bg-surface-muted">
            <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
              <div>
                <p className="font-display text-2xl">Inkwell</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  An independent publication about craft, engineering practice
                  and internet culture.
                </p>
              </div>
              <div>
                <p className="rule-label text-muted-foreground">Read</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {nav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-muted-foreground transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="rule-label text-muted-foreground">Elsewhere</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      className="text-muted-foreground transition-colors hover:text-accent"
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-muted-foreground transition-colors hover:text-accent"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      X / Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-muted-foreground transition-colors hover:text-accent"
                      href="/rss.xml"
                    >
                      RSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border">
              <p className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Inkwell Press. Written by humans.
              </p>
            </div>
          </footer>
        </div>
        <Toaster position="top-center" closeButton richColors />
        <Scripts />
      </body>
    </html>
  );
}
