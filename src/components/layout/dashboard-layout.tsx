"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  workspace?: {
    name: string;
    slug: string;
  };
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function DashboardLayout({
  children,
  title = "Dashboard",
  workspace = { name: "Acme Design Co", slug: "acme-design" },
  user = { name: "Alex Morgan", email: "alex@acme.co" },
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        workspaceName={workspace.name}
        workspaceSlug={workspace.slug}
        currentPath={typeof window !== "undefined" ? window.location.pathname : "/dashboard"}
        user={user}
      />

      <div className="lg:pl-[260px]">
        <Header
          title={title}
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
