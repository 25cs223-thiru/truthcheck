import type { Page } from "@/App";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  activePage?: Page;
  onNavigate?: (page: Page) => void;
}

export function Layout({
  children,
  activePage = "home",
  onNavigate,
}: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="header.link"
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shadow-xs">
              <ShieldCheck
                className="w-4 h-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display text-base font-700 tracking-tight text-foreground">
              Truth<span className="text-primary">Check</span>
            </span>
          </a>

          <nav
            className="flex items-center gap-1"
            aria-label="Main navigation"
            data-ocid="header.nav"
          >
            <button
              type="button"
              onClick={() => onNavigate?.("home")}
              data-ocid="header.nav.detect"
              aria-current={activePage === "home" ? "page" : undefined}
              className={`px-3.5 py-1.5 rounded-full text-sm font-600 transition-smooth ${
                activePage === "home"
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
              }`}
            >
              Detect
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.("learn")}
              data-ocid="header.nav.learn"
              aria-current={activePage === "learn" ? "page" : undefined}
              className={`px-3.5 py-1.5 rounded-full text-sm font-600 transition-smooth ${
                activePage === "learn"
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
              }`}
            >
              Learn
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 border border-border px-2.5 py-1 rounded-full ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--success))] animate-pulse" />
              AI-Powered
            </span>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Fact-check with confidence — not with certainty
          </p>
        </div>
      </footer>
    </div>
  );
}
