"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  MessageSquare,
  Clock,
  ThumbsUp,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";

const USAGE_DATA = [
  { day: "Mon", queries: 42 },
  { day: "Tue", queries: 58 },
  { day: "Wed", queries: 73 },
  { day: "Thu", queries: 65 },
  { day: "Fri", queries: 89 },
  { day: "Sat", queries: 34 },
  { day: "Sun", queries: 28 },
];

const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const SOURCE_DATA = [
  { name: "API Docs", value: 450 },
  { name: "Help Center", value: 320 },
  { name: "Internal Wiki", value: 280 },
  { name: "Codebase", value: 190 },
  { name: "Other", value: 80 },
];

const RESPONSE_TIME_DATA = [
  { hour: "6am", avg: 0.8, p95: 1.2 },
  { hour: "8am", avg: 1.1, p95: 1.8 },
  { hour: "10am", avg: 1.4, p95: 2.3 },
  { hour: "12pm", avg: 1.6, p95: 2.8 },
  { hour: "2pm", avg: 1.3, p95: 2.1 },
  { hour: "4pm", avg: 1.0, p95: 1.6 },
  { hour: "6pm", avg: 0.9, p95: 1.4 },
  { hour: "8pm", avg: 0.7, p95: 1.1 },
];

const TOP_QUERIES = [
  { query: "How do I reset my password?", count: 234, category: "Account" },
  { query: "API rate limiting documentation", count: 189, category: "API" },
  { query: "Webhook setup guide", count: 156, category: "Integration" },
  { query: "Billing and subscription FAQ", count: 142, category: "Billing" },
  { query: "Team permissions explained", count: 128, category: "Admin" },
  { query: "Data export instructions", count: 98, category: "Data" },
  { query: "SSO configuration steps", count: 87, category: "Security" },
  { query: "Mobile app troubleshooting", count: 76, category: "Support" },
];

const MODEL_USAGE = [
  { model: "GPT-4o", percentage: 52, color: "#3b82f6" },
  { model: "GPT-4o-mini", percentage: 28, color: "#10b981" },
  { model: "Claude 3.5 Sonnet", percentage: 15, color: "#f59e0b" },
  { model: "Other", percentage: 5, color: "#8b5cf6" },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");

  const kpis = useMemo(
    () => ({
      totalQueries: dateRange === "7d" ? 389 : dateRange === "30d" ? 1547 : 4823,
      avgResponseTime: dateRange === "7d" ? "1.2s" : dateRange === "30d" ? "1.4s" : "1.3s",
      satisfactionRate: dateRange === "7d" ? "94%" : dateRange === "30d" ? "91%" : "92%",
      activeUsers: dateRange === "7d" ? 47 : dateRange === "30d" ? 89 : 156,
    }),
    [dateRange]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Monitor usage and performance across your knowledge base"
        actions={
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalQueries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12%</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">-8%</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.satisfactionRate}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+3%</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+18%</span> from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={USAGE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} />
                <Tooltip />
                <Bar dataKey="queries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documents by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SOURCE_DATA.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Response Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={RESPONSE_TIME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} unit="s" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} name="Average" />
                <Line type="monotone" dataKey="p95" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="P95" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Model Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MODEL_USAGE.map((model) => (
              <div key={model.model} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{model.model}</span>
                  <span className="text-muted-foreground">{model.percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${model.percentage}%`,
                      backgroundColor: model.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TOP_QUERIES.map((q, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm font-mono text-muted-foreground w-6">{i + 1}.</span>
                <span className="flex-1 text-sm">{q.query}</span>
                <Badge variant="secondary" className="text-xs">
                  {q.category}
                </Badge>
                <span className="text-sm text-muted-foreground w-12 text-right">{q.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
