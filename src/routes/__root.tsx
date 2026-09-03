/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
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
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600&display=swap",
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
];

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-ink">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-line">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-5">
              <Link to="/" className="group flex items-baseline gap-2">
                <span className="font-display text-3xl leading-none tracking-tight">
                  Inkwell
                </span>
                <span className="hidden text-xs uppercase tracking-[0.2em] text-ink-soft sm:inline">
                  est. 2026
                </span>
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="text-ink-soft transition-colors hover:text-accent [&.active]:text-ink [&.active]:underline [&.active]:decoration-accent [&.active]:underline-offset-8"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-line">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
              <p>Inkwell — a small publication about making things.</p>
              <p>© {new Date().getFullYear()} Inkwell Press</p>
            </div>
          </footer>
        </div>
        <Toaster position="top-center" />
        <Scripts />
      </body>
    </html>
  );
}
