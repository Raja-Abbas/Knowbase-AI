"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Check,
  Users,
  FileText,
  MessageSquare,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/ui/page-header";
import { cn, getInitials, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  role: string;
  memberCount: number;
  documentCount: number;
  conversationCount: number;
  createdAt: string;
  isCurrent: boolean;
}

const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Acme Design Co",
    slug: "acme-design",
    description: "Design agency knowledge base and client documentation",
    role: "Owner",
    memberCount: 8,
    documentCount: 124,
    conversationCount: 89,
    createdAt: "2025-06-15",
    isCurrent: true,
  },
  {
    id: "ws-2",
    name: "Personal Projects",
    slug: "personal",
    description: "Personal workspace for side projects and notes",
    role: "Owner",
    memberCount: 1,
    documentCount: 32,
    conversationCount: 15,
    createdAt: "2025-09-20",
    isCurrent: false,
  },
  {
    id: "ws-3",
    name: "StartupXYZ Team",
    slug: "startupxyz",
    description: "Product documentation and internal knowledge base",
    role: "Admin",
    memberCount: 12,
    documentCount: 256,
    conversationCount: 178,
    createdAt: "2025-10-03",
    isCurrent: false,
  },
  {
    id: "ws-4",
    name: "Freelance Hub",
    slug: "freelance",
    description: "Freelancer collaboration and shared resources",
    role: "Member",
    memberCount: 5,
    documentCount: 67,
    conversationCount: 41,
    createdAt: "2026-01-12",
    isCurrent: false,
  },
];

export default function WorkspacesPage() {
  const [workspaces] = useState(mockWorkspaces);

  function handleSwitch(id: string) {
    const ws = workspaces.find((w) => w.id === id);
    if (ws?.isCurrent) return;
    toast.success(`Switched to ${ws?.name}`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspaces"
        description="Switch between your workspaces or create a new one"
        actions={
          <Link href="/workspace/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Workspace
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {workspaces.map((ws) => (
          <Card
            key={ws.id}
            className={cn(
              "transition-all hover:shadow-md",
              ws.isCurrent && "ring-2 ring-primary"
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{ws.name}</h3>
                      {ws.isCurrent && (
                        <Badge variant="default" className="shrink-0 gap-1">
                          <Check className="h-3 w-3" />
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {ws.description}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{ws.role}</Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {ws.memberCount} members
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {ws.documentCount} docs
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {ws.conversationCount} chats
                </span>
              </div>

              <Separator className="mb-4" />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Created {formatDate(ws.createdAt)}
                </span>
                <div className="flex items-center gap-2">
                  {ws.isCurrent ? (
                    <Link href="/settings">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => handleSwitch(ws.id)}
                    >
                      Switch
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
