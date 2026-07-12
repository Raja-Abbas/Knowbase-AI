"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";
import {
  Search,
  MoreHorizontal,
  MessageSquare,
  Trash2,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import toast from "react-hot-toast";

interface Conversation {
  id: string;
  title: string;
  messageCount: number;
  createdAt: string;
  lastActiveAt: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "conv-1", title: "How to deploy Next.js to Vercel?", messageCount: 12, createdAt: "2026-07-10T14:30:00Z", lastActiveAt: "2026-07-12T09:15:00Z" },
  { id: "conv-2", title: "React Server Components explained", messageCount: 8, createdAt: "2026-07-10T11:00:00Z", lastActiveAt: "2026-07-11T16:45:00Z" },
  { id: "conv-3", title: "Debugging TypeScript strict mode errors", messageCount: 15, createdAt: "2026-07-09T09:20:00Z", lastActiveAt: "2026-07-11T14:30:00Z" },
  { id: "conv-4", title: "Database schema design for multi-tenant SaaS", messageCount: 22, createdAt: "2026-07-08T16:00:00Z", lastActiveAt: "2026-07-10T20:00:00Z" },
  { id: "conv-5", title: "Setting up CI/CD pipeline with GitHub Actions", messageCount: 6, createdAt: "2026-07-07T13:45:00Z", lastActiveAt: "2026-07-09T11:20:00Z" },
  { id: "conv-6", title: "Implementing dark mode with CSS variables", messageCount: 10, createdAt: "2026-07-06T10:30:00Z", lastActiveAt: "2026-07-08T09:00:00Z" },
  { id: "conv-7", title: "Authentication best practices with NextAuth", messageCount: 18, createdAt: "2026-07-05T08:15:00Z", lastActiveAt: "2026-07-07T17:30:00Z" },
  { id: "conv-8", title: "Optimizing re-renders in React 19", messageCount: 9, createdAt: "2026-07-04T15:00:00Z", lastActiveAt: "2026-07-06T12:00:00Z" },
  { id: "conv-9", title: "Tailwind CSS v4 migration guide", messageCount: 14, createdAt: "2026-07-03T09:00:00Z", lastActiveAt: "2026-07-05T14:45:00Z" },
  { id: "conv-10", title: "Webhook integration with Stripe payments", messageCount: 20, createdAt: "2026-07-02T11:30:00Z", lastActiveAt: "2026-07-04T18:15:00Z" },
];

const ITEMS_PER_PAGE = 5;

export default function ConversationsPage() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = MOCK_CONVERSATIONS;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q));
    }
    if (dateFilter === "7d") {
      const cutoff = new Date(Date.now() - 7 * 86400000);
      result = result.filter((c) => new Date(c.createdAt) >= cutoff);
    } else if (dateFilter === "30d") {
      const cutoff = new Date(Date.now() - 30 * 86400000);
      result = result.filter((c) => new Date(c.createdAt) >= cutoff);
    }
    return result;
  }, [search, dateFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((c) => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    toast.success(`${selected.size} conversation(s) deleted`);
    setSelected(new Set());
    setDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conversations"
        description="Review all AI chat history across your workspace"
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select value={dateFilter} onValueChange={(v) => { setDateFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[160px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete ({selected.size})
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">No conversations found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            {search ? "Try adjusting your search or filters." : "Start a conversation to see it here."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr>
                  <th className="h-10 px-4 w-10">
                    <Checkbox
                      checked={selected.size === paginated.length && paginated.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Title</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Messages</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Created</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Last Active</th>
                  <th className="h-10 px-4 w-10" />
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {paginated.map((conv) => (
                  <tr key={conv.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <Checkbox
                        checked={selected.has(conv.id)}
                        onCheckedChange={() => toggleSelect(conv.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium">{conv.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{conv.messageCount}</Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(conv.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {formatRelativeTime(conv.lastActiveAt)}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.success("Conversation exported")}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => toast.success("Conversation deleted")}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {paginated.length} of {filtered.length} conversations
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Conversations</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selected.size} conversation(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
