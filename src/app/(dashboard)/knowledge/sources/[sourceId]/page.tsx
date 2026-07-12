"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Globe,
  File,
  Keyboard,
  ExternalLink,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatRelativeTime, truncate } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  content: string;
  chunkCount: number;
  createdAt: Date;
  wordCount: number;
}

interface SourceDetail {
  id: string;
  name: string;
  type: "url" | "file" | "manual";
  status: "active" | "processing" | "error";
  url?: string;
  documentsCount: number;
  chunkCount: number;
  lastSynced: Date;
  createdAt: Date;
  errorMessage?: string;
}

const mockSource: SourceDetail = {
  id: "src_1",
  name: "Company Documentation",
  type: "url",
  status: "active",
  url: "https://docs.company.com",
  documentsCount: 42,
  chunkCount: 504,
  lastSynced: new Date("2026-07-12T08:30:00"),
  createdAt: new Date("2026-03-15T10:00:00"),
};

const mockDocuments: Document[] = [
  {
    id: "doc_1",
    title: "Getting Started with KnowBase AI",
    content:
      "KnowBase AI is an intelligent knowledge base platform that helps teams organize, search, and leverage their collective knowledge. This guide walks you through the initial setup process, including creating your first knowledge source, importing documents, and configuring AI-powered search. You'll learn how to connect external data sources like documentation websites, upload files directly, or manually enter content for the AI to index and reference.",
    chunkCount: 8,
    createdAt: new Date("2026-07-10T14:22:00"),
    wordCount: 2450,
  },
  {
    id: "doc_2",
    title: "API Authentication & Security",
    content:
      "All API requests must include a valid API key in the Authorization header. Keys can be generated from the Settings > API Keys panel. Each key has configurable rate limits and permission scopes. For production environments, we recommend using organization-level keys with restricted scopes. All API traffic is encrypted using TLS 1.3. Webhook endpoints must validate request signatures using your signing secret.",
    chunkCount: 12,
    createdAt: new Date("2026-07-08T09:15:00"),
    wordCount: 3100,
  },
  {
    id: "doc_3",
    title: "Team Management & Permissions",
    content:
      "KnowBase AI supports role-based access control with three default roles: Admin, Editor, and Viewer. Admins can manage all settings, members, and billing. Editors can create and modify knowledge sources and documents. Viewers have read-only access to the knowledge base and can use the AI chat. Custom roles can be created with specific permission combinations. Team invitations are sent via email and can be configured with SSO requirements.",
    chunkCount: 10,
    createdAt: new Date("2026-07-05T16:45:00"),
    wordCount: 2800,
  },
  {
    id: "doc_4",
    title: "Integrations Guide",
    content:
      "Connect KnowBase AI with your existing tools through our integration platform. Supported integrations include Slack, Microsoft Teams, Notion, Confluence, Google Drive, and more. Each integration can be configured to sync content automatically on a schedule or triggered manually. Integration settings are managed under the Settings > Integrations panel. Webhook-based integrations support custom payload mapping.",
    chunkCount: 15,
    createdAt: new Date("2026-07-01T11:30:00"),
    wordCount: 4200,
  },
  {
    id: "doc_5",
    title: "Billing & Subscription Plans",
    content:
      "KnowBase AI offers three subscription tiers: Starter, Professional, and Enterprise. The Starter plan includes up to 5 knowledge sources and 1,000 documents. Professional adds unlimited sources, advanced analytics, and priority support. Enterprise includes SSO, custom SLAs, dedicated support, and on-premise deployment options. All plans include a 14-day free trial with full feature access. Annual billing provides a 20% discount.",
    chunkCount: 6,
    createdAt: new Date("2026-06-28T08:00:00"),
    wordCount: 1800,
  },
  {
    id: "doc_6",
    title: "Troubleshooting Common Issues",
    content:
      "This guide covers the most frequently encountered issues and their solutions. Topics include: document processing failures (usually caused by unsupported file formats or corrupted files), sync delays (check your source's connection status and rate limits), search quality improvements (optimize your document structure and metadata), and performance tuning for large knowledge bases with millions of chunks.",
    chunkCount: 9,
    createdAt: new Date("2026-06-25T13:20:00"),
    wordCount: 2600,
  },
];

const statusConfig: Record<
  string,
  { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; label: string }
> = {
  active: {
    variant: "default",
    icon: <CheckCircle2 className="h-3 w-3" />,
    label: "Active",
  },
  processing: {
    variant: "secondary",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    label: "Processing",
  },
  error: {
    variant: "destructive",
    icon: <AlertCircle className="h-3 w-3" />,
    label: "Error",
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  url: <Globe className="h-5 w-5" />,
  file: <File className="h-5 w-5" />,
  manual: <Keyboard className="h-5 w-5" />,
};

export default function SourceDetailPage() {
  const router = useRouter();
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/knowledge")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2.5">
              {typeIcons[mockSource.type]}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {mockSource.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge
                  variant={statusConfig[mockSource.status].variant}
                  className="gap-1"
                >
                  {statusConfig[mockSource.status].icon}
                  {statusConfig[mockSource.status].label}
                </Badge>
                {mockSource.url && (
                  <a
                    href={mockSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {mockSource.url}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={syncing}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`}
            />
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Knowledge Source</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{mockSource.name}&quot;?
                  This will permanently remove {mockSource.documentsCount}{" "}
                  documents and {mockSource.chunkCount} chunks from your knowledge
                  base. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Source
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSource.documentsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chunks</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSource.chunkCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Synced</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(mockSource.lastSynced, "short")}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatRelativeTime(mockSource.lastSynced)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="space-y-3">
          {mockDocuments.map((doc) => (
            <Card
              key={doc.id}
              className="transition-colors hover:bg-muted/50"
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedDoc(expandedDoc === doc.id ? null : doc.id)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{doc.chunkCount} chunks</span>
                      <span>{doc.wordCount.toLocaleString()} words</span>
                      <span>{formatRelativeTime(doc.createdAt)}</span>
                    </div>
                  </div>
                  {expandedDoc === doc.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedDoc === doc.id && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {doc.content}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
