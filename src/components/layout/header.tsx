"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, FileText, MessageSquare, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    title: "New document uploaded",
    description: "Q3 Strategy Report was added to the knowledge base",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    icon: <MessageSquare className="h-4 w-4 text-emerald-500" />,
    title: "AI chat completed",
    description: "Customer onboarding FAQ conversation finished",
    time: "22 min ago",
    read: false,
  },
  {
    id: "3",
    icon: <Users className="h-4 w-4 text-violet-500" />,
    title: "Team member joined",
    description: "Jordan Lee accepted the workspace invitation",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    icon: <Settings className="h-4 w-4 text-muted-foreground" />,
    title: "Workspace settings updated",
    description: "API access was enabled for your workspace",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    title: "Knowledge source synced",
    description: "Product Documentation source was re-indexed",
    time: "Yesterday",
    read: true,
  },
];

interface HeaderProps {
  title: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuToggle?: () => void;
}

export function Header({ title, user, onMenuToggle }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/70 px-6 backdrop-blur-xl">
      <button
        onClick={onMenuToggle}
        className="rounded-xl border border-border p-2 hover:bg-muted transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-xl border border-border/60 bg-muted/40 pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "relative rounded-xl border border-border/60 p-2 transition-all duration-200",
              open ? "bg-muted border-border" : "hover:bg-muted/60 hover:border-border/80"
            )}
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-sm shadow-primary/20">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/10 animate-slide-down z-50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <h3 className="text-[13px] font-bold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 px-4 py-3 transition-colors hover:bg-muted/40 cursor-pointer",
                      !n.read && "bg-primary/[0.03]"
                    )}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/80">
                      {n.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-[13px]", !n.read ? "font-semibold" : "text-muted-foreground")}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-[12px] text-muted-foreground/70 truncate mt-0.5">
                        {n.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground/40 mt-1">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/50 px-4 py-2.5">
                <button className="w-full text-center text-[12px] font-semibold text-primary hover:text-primary/80 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 border-l border-border/50 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-[11px] font-bold">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
            ) : (
              (user?.name || "U")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            )}
          </div>
          <span className="hidden text-[13px] font-semibold md:block">
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
