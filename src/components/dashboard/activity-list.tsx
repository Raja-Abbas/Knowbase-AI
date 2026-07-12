"use client";

import {
  FileText,
  MessageSquare,
  UserPlus,
  RefreshCw,
  Upload,
  Trash2,
  Settings,
  CreditCard,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface Activity {
  id: string;
  type: "document_uploaded" | "conversation_started" | "member_joined" | "source_synced" | "document_deleted" | "settings_changed" | "subscription_updated";
  description: string;
  timestamp: Date;
  user?: string;
}

const mockActivities: Activity[] = [
  {
    id: "act_1",
    type: "document_uploaded",
    description: "Product Roadmap Q3 2026 was added to Engineering Wiki",
    timestamp: new Date("2026-07-12T08:30:00"),
    user: "Alex Morgan",
  },
  {
    id: "act_2",
    type: "conversation_started",
    description: "New conversation started: API Rate Limits & Best Practices",
    timestamp: new Date("2026-07-12T09:10:00"),
    user: "Alex Rivera",
  },
  {
    id: "act_3",
    type: "member_joined",
    description: "Jordan Kim joined the workspace as an Editor",
    timestamp: new Date("2026-07-11T14:20:00"),
  },
  {
    id: "act_4",
    type: "source_synced",
    description: "Company Documentation was synced successfully (42 documents)",
    timestamp: new Date("2026-07-12T07:15:00"),
  },
  {
    id: "act_5",
    type: "document_deleted",
    description: "Draft Meeting Notes was removed from Manual Entries",
    timestamp: new Date("2026-07-11T11:00:00"),
    user: "Alex Morgan",
  },
];

const activityIcons: Record<string, React.ReactNode> = {
  document_uploaded: <Upload className="h-4 w-4" />,
  conversation_started: <MessageSquare className="h-4 w-4" />,
  member_joined: <UserPlus className="h-4 w-4" />,
  source_synced: <RefreshCw className="h-4 w-4" />,
  document_deleted: <Trash2 className="h-4 w-4" />,
  settings_changed: <Settings className="h-4 w-4" />,
  subscription_updated: <CreditCard className="h-4 w-4" />,
};

const activityColors: Record<string, string> = {
  document_uploaded: "bg-blue-100 text-blue-600",
  conversation_started: "bg-purple-100 text-purple-600",
  member_joined: "bg-emerald-100 text-emerald-600",
  source_synced: "bg-amber-100 text-amber-600",
  document_deleted: "bg-red-100 text-red-600",
  settings_changed: "bg-gray-100 text-gray-600",
  subscription_updated: "bg-indigo-100 text-indigo-600",
};

export function ActivityList() {
  return (
    <div className="space-y-0">
      {mockActivities.map((activity, index) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 py-3"
        >
          <div
            className={`rounded-full p-2 shrink-0 ${activityColors[activity.type]}`}
          >
            {activityIcons[activity.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed">{activity.description}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {activity.user && (
                <span className="text-xs text-muted-foreground">
                  {activity.user}
                </span>
              )}
              {activity.user && (
                <span className="text-xs text-muted-foreground">·</span>
              )}
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(activity.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
