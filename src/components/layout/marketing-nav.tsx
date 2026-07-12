"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo size="md" theme="dark" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/#features"
            className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <div className="mx-3 h-4 w-px bg-border/60" />
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="ml-2 inline-flex h-9 items-center rounded-xl bg-primary px-4 text-[13.5px] font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:bg-primary/90 transition-all"
          >
            Get started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 hover:bg-muted transition-colors lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 pb-4 pt-2 lg:hidden animate-slide-down">
          <div className="flex flex-col gap-0.5">
            <Link
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <div className="my-1.5 h-px bg-border/60" />
            <Link
              href="/privacy"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <div className="my-1.5 h-px bg-border/60" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
