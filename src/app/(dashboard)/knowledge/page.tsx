"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Globe,
  FileText,
  File,
  Keyboard,
  MoreHorizontal,
  ExternalLink,
  RefreshCw,
  Trash2,
  Database,
  FileStack,
  Layers,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Brain,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddSourceDialog } from "@/components/knowledge/add-source-dialog";
import { cn, formatDate, formatRelativeTime } from "@/lib/utils";

interface KnowledgeSource {
  id: string;
  name: string;
  type: "url" | "file" | "manual";
  status: "active" | "processing" | "error";
  documentsCount: number;
  lastSynced: Date;
  url?: string;
  errorMessage?: string;
}

const mockSources: KnowledgeSource[] = [
  {
    id: "src_1",
    name: "Company Documentation",
    type: "url",
    status: "active",
    documentsCount: 42,
    lastSynced: new Date("2026-07-12T08:30:00"),
    url: "https://docs.company.com",
  },
  {
    id: "src_2",
    name: "Product Help Center",
    type: "url",
    status: "active",
    documentsCount: 89,
    lastSynced: new Date("2026-07-12T07:15:00"),
    url: "https://help.product.com",
  },
  {
    id: "src_3",
    name: "Sales Playbook 2026",
    type: "file",
    status: "active",
    documentsCount: 12,
    lastSynced: new Date("2026-07-11T14:00:00"),
  },
  {
    id: "src_4",
    name: "API Reference",
    type: "url",
    status: "processing",
    documentsCount: 34,
    lastSynced: new Date("2026-07-12T09:00:00"),
    url: "https://api.docs.com",
  },
  {
    id: "src_5",
    name: "Onboarding Guide",
    type: "manual",
    status: "active",
    documentsCount: 8,
    lastSynced: new Date("2026-07-10T11:45:00"),
  },
  {
    id: "src_6",
    name: "Legal Documents",
    type: "file",
    status: "error",
    documentsCount: 5,
    lastSynced: new Date("2026-07-09T16:20:00"),
    errorMessage: "Failed to parse PDF: encrypted document",
  },
  {
    id: "src_7",
    name: "Engineering Wiki",
    type: "url",
    status: "active",
    documentsCount: 156,
    lastSynced: new Date("2026-07-12T06:00:00"),
    url: "https://wiki.eng.company.com",
  },
  {
    id: "src_8",
    name: "Customer FAQs",
    type: "manual",
    status: "active",
    documentsCount: 24,
    lastSynced: new Date("2026-07-11T09:30:00"),
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  url: <Globe className="h-4 w-4" />,
  file: <File className="h-4 w-4" />,
  manual: <Keyboard className="h-4 w-4" />,
};

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

const totalDocuments = mockSources.reduce((acc, s) => acc + s.documentsCount, 0);
const totalChunks = totalDocuments * 12;
const lastUpdated = mockSources.reduce((latest, s) =>
  s.lastSynced > latest ? s.lastSynced : latest,
  new Date(0)
);

export default function KnowledgePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [addSourceOpen, setAddSourceOpen] = useState(false);

  const filteredSources = mockSources.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">
            Manage your knowledge sources and documents for AI-powered search.
          </p>
        </div>
        <Button onClick={() => setAddSourceOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Source
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSources.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockSources.filter((s) => s.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Across all sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chunks</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChunks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Embeddings ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(lastUpdated, "short")}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatRelativeTime(lastUpdated)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No sources found</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                {searchQuery
                  ? "No sources match your search. Try a different query."
                  : "Get started by adding your first knowledge source."}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setAddSourceOpen(true)}
                  className="mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Source
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Documents</TableHead>
                  <TableHead>Last Synced</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSources.map((source) => (
                  <TableRow
                    key={source.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/knowledge/sources/${source.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-muted p-2">
                          {typeIcons[source.type]}
                        </div>
                        <div>
                          <p className="font-medium">{source.name}</p>
                          {source.url && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              {source.url}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {source.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig[source.status].variant}
                        className="gap-1"
                      >
                        {statusConfig[source.status].icon}
                        {statusConfig[source.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {source.documentsCount}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatRelativeTime(source.lastSynced)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/knowledge/sources/${source.id}`);
                            }}
                          >
                            <FileStack className="mr-2 h-4 w-4" />
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddSourceDialog open={addSourceOpen} onOpenChange={setAddSourceOpen} />
    </div>
  );
}
