"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  MessageSquare,
  Users,
  HardDrive,
  Upload,
  Bot,
  UserPlus,
  TrendingUp,
  FilePlus,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRelativeTime } from "@/lib/utils";

const usageData = [
  { date: "Mon", tokens: 12400, queries: 34 },
  { date: "Tue", tokens: 18200, queries: 52 },
  { date: "Wed", tokens: 15800, queries: 41 },
  { date: "Thu", tokens: 22100, queries: 67 },
  { date: "Fri", tokens: 19500, queries: 55 },
  { date: "Sat", tokens: 8300, queries: 18 },
  { date: "Sun", tokens: 11200, queries: 29 },
];

const recentActivity = [
  {
    id: "1",
    type: "document_uploaded" as const,
    title: "Engineering Handbook v2.4.pdf",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    id: "2",
    type: "conversation_started" as const,
    title: "Q4 planning questions",
    user: "Marcus Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "3",
    type: "member_joined" as const,
    title: "Alex Rivera joined as Member",
    user: "Alex Rivera",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    type: "document_updated" as const,
    title: "API Documentation - Auth Endpoints.md",
    user: "Jordan Park",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "5",
    type: "document_uploaded" as const,
    title: "Product Roadmap Q1 2026.docx",
    user: "You",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
];

const activityIcons: Record<string, React.ReactNode> = {
  document_uploaded: <FilePlus className="h-3.5 w-3.5 text-blue-500" />,
  conversation_started: <Bot className="h-3.5 w-3.5 text-violet-500" />,
  member_joined: <UserPlus className="h-3.5 w-3.5 text-emerald-500" />,
  document_updated: <FileText className="h-3.5 w-3.5 text-amber-500" />,
};

const activityLabels: Record<string, string> = {
  document_uploaded: "Document uploaded",
  conversation_started: "AI conversation started",
  member_joined: "New member",
  document_updated: "Document updated",
};

interface Stats {
  documents: number;
  conversations: number;
  members: number;
  storage: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    documents: 0,
    conversations: 0,
    members: 0,
    storage: "0 GB",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        documents: 347,
        conversations: 89,
        members: 12,
        storage: "4.2 GB",
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: "Total Documents",
      value: stats.documents,
      icon: <FileText className="h-5 w-5" />,
      trend: "+12%",
      trendUp: true,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "AI Conversations",
      value: stats.conversations,
      icon: <MessageSquare className="h-5 w-5" />,
      trend: "+24%",
      trendUp: true,
      color: "bg-violet-500/10 text-violet-500",
    },
    {
      title: "Team Members",
      value: stats.members,
      icon: <Users className="h-5 w-5" />,
      trend: "+2",
      trendUp: true,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Storage Used",
      value: stats.storage,
      icon: <HardDrive className="h-5 w-5" />,
      trend: "60% of 10 GB",
      trendUp: false,
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Welcome back, Alex
        </h1>
        <p className="text-muted-foreground text-[15px] mt-1">
          Here&apos;s what&apos;s happening with your knowledge base today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className="hover:card-shadow-hover transition-all duration-200">
            <CardContent className="p-6">
              {loading ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-muted-foreground">{card.title}</p>
                    <div className={`rounded-xl p-2.5 ${card.color}`}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-extrabold tracking-tight">{card.value}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="font-semibold text-emerald-500">{card.trend}</span>
                    <span className="text-muted-foreground">vs last week</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">Token Usage</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                      tickFormatter={(value: number) =>
                        `${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stroke="hsl(217, 91%, 60%)"
                      fill="hsl(217, 91%, 60%)"
                      fillOpacity={0.08}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/documents">
                  <Button variant="outline" className="justify-start gap-2.5 h-auto py-4 w-full rounded-xl">
                    <div className="rounded-lg bg-blue-500/10 p-1.5">
                      <Upload className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[13px]">Upload Document</p>
                      <p className="text-[11px] text-muted-foreground font-normal">
                        Add to knowledge base
                      </p>
                    </div>
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="justify-start gap-2.5 h-auto py-4 w-full rounded-xl">
                    <div className="rounded-lg bg-violet-500/10 p-1.5">
                      <Bot className="h-4 w-4 text-violet-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[13px]">Start AI Chat</p>
                      <p className="text-[11px] text-muted-foreground font-normal">
                        Ask your docs anything
                      </p>
                    </div>
                  </Button>
                </Link>
                <Link href="/team">
                  <Button variant="outline" className="justify-start gap-2.5 h-auto py-4 w-full rounded-xl">
                    <div className="rounded-lg bg-emerald-500/10 p-1.5">
                      <UserPlus className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[13px]">Invite Member</p>
                      <p className="text-[11px] text-muted-foreground font-normal">
                        Grow your team
                      </p>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-[15px]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-xl" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-0.5 rounded-xl bg-muted/80 p-2">
                        {activityIcons[activity.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium truncate">
                          {activity.title}
                        </p>
                        <p className="text-[12px] text-muted-foreground/70">
                          {activityLabels[activity.type]} by {activity.user}{" "}
                          · {formatRelativeTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
