"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  MessagesSquare,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  User,
  Building2,
  Menu,
  X,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

interface SidebarProps {
  workspaceName: string;
  workspaceSlug: string;
  currentPath: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const platformNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Knowledge Base", href: "/knowledge", icon: BookOpen },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
  { label: "Conversations", href: "/conversations", icon: MessagesSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const workspaceNav: NavItem[] = [
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({
  workspaceName,
  workspaceSlug,
  currentPath,
  user,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 h-[72px] border-b border-sidebar-border">
        <Logo size="sm" theme="dark" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[13px] font-semibold text-sidebar-primary truncate">
            {workspaceName}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto rounded-lg p-1.5 hover:bg-sidebar-accent transition-colors lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-7">
        <div>
          <p className="px-3 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/35">
            Platform
          </p>
          <ul className="space-y-0.5">
            {platformNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150",
                      active
                        ? "bg-white/[0.08] text-sidebar-primary shadow-sm"
                        : "text-sidebar-foreground/60 hover:bg-white/[0.04] hover:text-sidebar-foreground/90"
                    )}
                  >
                    <span
                      className={cn(
                        "relative flex h-[18px] w-[18px] shrink-0 items-center justify-center transition-colors",
                        active && "text-primary"
                      )}
                    >
                      {active && (
                        <span className="absolute -left-3 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="px-3 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/35">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {workspaceNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150",
                      active
                        ? "bg-white/[0.08] text-sidebar-primary shadow-sm"
                        : "text-sidebar-foreground/60 hover:bg-white/[0.04] hover:text-sidebar-foreground/90"
                    )}
                  >
                    <span
                      className={cn(
                        "relative flex h-[18px] w-[18px] shrink-0 items-center justify-center transition-colors",
                        active && "text-primary"
                      )}
                    >
                      {active && (
                        <span className="absolute -left-3 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary text-[11px] font-bold">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-lg object-cover"
                />
              ) : (
                user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              )}
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-[13px] font-medium text-sidebar-primary truncate max-w-full">
                {user.name}
              </span>
              <span className="text-[11px] text-sidebar-foreground/40 truncate max-w-full">
                {user.email}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-sidebar-foreground/30 transition-transform duration-200",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 z-50 rounded-xl border border-sidebar-border bg-sidebar shadow-2xl shadow-black/30 animate-slide-down overflow-hidden">
                <div className="p-1.5">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/60 hover:bg-white/[0.06] hover:text-sidebar-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/workspaces"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/60 hover:bg-white/[0.06] hover:text-sidebar-foreground transition-colors"
                  >
                    <Building2 className="h-4 w-4" />
                    Switch Workspace
                  </Link>
                  <div className="my-1.5 border-t border-sidebar-border" />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-border bg-card p-2.5 shadow-lg card-shadow lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-250 ease-out lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
