"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Layers,
  Clock,
  Database,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
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
import { cn, formatDate, formatRelativeTime } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import toast from "react-hot-toast";

interface DocumentDetail {
  id: string;
  title: string;
  content: string;
  chunkCount: number;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
  characterCount: number;
  sourceName: string;
  sourceId: string;
  sourceType: string;
  tags: string[];
}

interface Chunk {
  id: string;
  index: number;
  content: string;
  tokenCount: number;
}

const mockDocument: DocumentDetail = {
  id: "doc_1",
  title: "Getting Started with KnowBase AI",
  content: `KnowBase AI is an intelligent knowledge base platform that helps teams organize, search, and leverage their collective knowledge. This guide walks you through the initial setup process.

## Setting Up Your Workspace

After creating your account, you'll be directed to the workspace setup wizard. Here you can configure your organization settings, invite team members, and choose your initial plan.

### Step 1: Create Your First Knowledge Source

Knowledge sources are the foundation of your knowledge base. You can add content from multiple sources:

- **URL Sources**: Connect to documentation websites, wikis, or any publicly accessible web content. KnowBase AI will crawl and index the content automatically.
- **File Upload**: Upload documents directly. Supported formats include PDF, DOCX, TXT, and Markdown files.
- **Manual Entry**: Create documents manually by entering content directly in the editor.

### Step 2: Configure AI Search

Once your sources are set up, KnowBase AI automatically indexes the content and makes it searchable via AI-powered natural language queries. The AI understands context and can find relevant information across all your knowledge sources.

### Step 3: Invite Your Team

Collaboration is key to maintaining a valuable knowledge base. Invite team members with appropriate roles:

- **Admins**: Full access to all features and settings
- **Editors**: Can create and modify knowledge sources and documents
- **Viewers**: Read-only access with AI chat capabilities

## Best Practices

1. **Organize by Topic**: Group related documents within knowledge sources for better organization.
2. **Use Descriptive Titles**: Clear titles help the AI provide more relevant results.
3. **Keep Content Updated**: Regular syncing ensures your knowledge base stays current.
4. **Leverage Tags**: Use tags to categorize and filter documents effectively.
5. **Monitor Analytics**: Track which queries are most common to identify knowledge gaps.

## Troubleshooting

If you encounter issues during setup, check the following:

- Ensure your API key is valid and has the correct permissions
- Verify that file uploads don't exceed the size limit (50MB per file)
- Check that URL sources are publicly accessible or provide valid authentication
- Contact support if processing seems stuck for more than 30 minutes`,
  chunkCount: 8,
  createdAt: new Date("2026-07-10T14:22:00"),
  updatedAt: new Date("2026-07-12T08:30:00"),
  wordCount: 2450,
  characterCount: 14200,
  sourceName: "Company Documentation",
  sourceId: "src_1",
  sourceType: "url",
  tags: ["onboarding", "getting-started", "setup", "guide"],
};

const mockChunks: Chunk[] = [
  {
    id: "chunk_1",
    index: 1,
    content:
      "KnowBase AI is an intelligent knowledge base platform that helps teams organize, search, and leverage their collective knowledge.",
    tokenCount: 22,
  },
  {
    id: "chunk_2",
    index: 2,
    content:
      "After creating your account, you'll be directed to the workspace setup wizard. Here you can configure your organization settings, invite team members, and choose your initial plan.",
    tokenCount: 32,
  },
  {
    id: "chunk_3",
    index: 3,
    content:
      "Knowledge sources are the foundation of your knowledge base. You can add content from multiple sources including URL Sources, File Upload, and Manual Entry.",
    tokenCount: 28,
  },
  {
    id: "chunk_4",
    index: 4,
    content:
      "URL Sources: Connect to documentation websites, wikis, or any publicly accessible web content. KnowBase AI will crawl and index the content automatically.",
    tokenCount: 27,
  },
  {
    id: "chunk_5",
    index: 5,
    content:
      "Once your sources are set up, KnowBase AI automatically indexes the content and makes it searchable via AI-powered natural language queries.",
    tokenCount: 24,
  },
  {
    id: "chunk_6",
    index: 6,
    content:
      "Collaboration is key to maintaining a valuable knowledge base. Invite team members with appropriate roles: Admins, Editors, and Viewers.",
    tokenCount: 25,
  },
  {
    id: "chunk_7",
    index: 7,
    content:
      "Best practices include organizing by topic, using descriptive titles, keeping content updated, leveraging tags, and monitoring analytics.",
    tokenCount: 22,
  },
  {
    id: "chunk_8",
    index: 8,
    content:
      "If you encounter issues during setup, check API key validity, file upload size limits, URL accessibility, and contact support if processing is stuck.",
    tokenCount: 26,
  },
];

export default function DocumentDetailPage() {
  const router = useRouter();
  const [copiedChunk, setCopiedChunk] = useState<string | null>(null);

  const copyToClipboard = (text: string, chunkId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChunk(chunkId);
    setTimeout(() => setCopiedChunk(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/documents")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockDocument.title}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <Badge variant="outline">{mockDocument.sourceName}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {formatRelativeTime(mockDocument.updatedAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit
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
                <AlertDialogTitle>Delete Document</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{mockDocument.title}
                  &quot;? This will remove the document and all{" "}
                  {mockDocument.chunkCount} chunks from your knowledge base.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Document
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer content={mockDocument.content} className="prose prose-sm max-w-none text-muted-foreground leading-relaxed" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Chunk Breakdown
                <Badge variant="secondary" className="ml-auto">
                  {mockChunks.length} chunks
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockChunks.map((chunk) => (
                  <div
                    key={chunk.id}
                    className="group relative rounded-lg border p-3 text-sm hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Chunk {chunk.index}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {chunk.tokenCount} tokens
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            copyToClipboard(chunk.content, chunk.id)
                          }
                        >
                          {copiedChunk === chunk.id ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {chunk.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Source</p>
                <button
                  onClick={() =>
                    router.push(`/knowledge/sources/${mockDocument.sourceId}`)
                  }
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <Database className="h-3.5 w-3.5" />
                  {mockDocument.sourceName}
                </button>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-sm font-medium">
                  {mockDocument.wordCount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Characters</p>
                <p className="text-sm font-medium">
                  {mockDocument.characterCount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Chunks</p>
                <p className="text-sm font-medium">{mockDocument.chunkCount}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium">
                  {formatDate(mockDocument.createdAt, "long")}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">
                  {formatDate(mockDocument.updatedAt, "long")}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {mockDocument.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
