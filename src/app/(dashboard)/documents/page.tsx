"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentCard } from "@/components/knowledge/document-card";
import toast from "react-hot-toast";

interface Document {
  id: string;
  title: string;
  content: string;
  chunkCount: number;
  createdAt: Date;
  sourceName: string;
  wordCount: number;
}

const mockDocuments: Document[] = [
  {
    id: "doc_1",
    title: "Getting Started with KnowBase AI",
    content:
      "KnowBase AI is an intelligent knowledge base platform that helps teams organize, search, and leverage their collective knowledge. This guide walks you through the initial setup process, including creating your first knowledge source, importing documents, and configuring AI-powered search. You'll learn how to connect external data sources like documentation websites, upload files directly, or manually enter content for the AI to index and reference.",
    chunkCount: 8,
    createdAt: new Date("2026-07-10T14:22:00"),
    sourceName: "Company Documentation",
    wordCount: 2450,
  },
  {
    id: "doc_2",
    title: "API Authentication & Security",
    content:
      "All API requests must include a valid API key in the Authorization header. Keys can be generated from the Settings > API Keys panel. Each key has configurable rate limits and permission scopes. For production environments, we recommend using organization-level keys with restricted scopes. All API traffic is encrypted using TLS 1.3.",
    chunkCount: 12,
    createdAt: new Date("2026-07-08T09:15:00"),
    sourceName: "Company Documentation",
    wordCount: 3100,
  },
  {
    id: "doc_3",
    title: "Team Management & Permissions",
    content:
      "KnowBase AI supports role-based access control with three default roles: Admin, Editor, and Viewer. Admins can manage all settings, members, and billing. Editors can create and modify knowledge sources and documents. Viewers have read-only access to the knowledge base and can use the AI chat.",
    chunkCount: 10,
    createdAt: new Date("2026-07-05T16:45:00"),
    sourceName: "Company Documentation",
    wordCount: 2800,
  },
  {
    id: "doc_4",
    title: "Integrations Guide",
    content:
      "Connect KnowBase AI with your existing tools through our integration platform. Supported integrations include Slack, Microsoft Teams, Notion, Confluence, Google Drive, and more. Each integration can be configured to sync content automatically on a schedule or triggered manually.",
    chunkCount: 15,
    createdAt: new Date("2026-07-01T11:30:00"),
    sourceName: "Product Help Center",
    wordCount: 4200,
  },
  {
    id: "doc_5",
    title: "Billing & Subscription Plans",
    content:
      "KnowBase AI offers three subscription tiers: Starter, Professional, and Enterprise. The Starter plan includes up to 5 knowledge sources and 1,000 documents. Professional adds unlimited sources, advanced analytics, and priority support. Enterprise includes SSO, custom SLAs, dedicated support, and on-premise deployment options.",
    chunkCount: 6,
    createdAt: new Date("2026-06-28T08:00:00"),
    sourceName: "Product Help Center",
    wordCount: 1800,
  },
  {
    id: "doc_6",
    title: "Troubleshooting Common Issues",
    content:
      "This guide covers the most frequently encountered issues and their solutions. Topics include: document processing failures, sync delays, search quality improvements, and performance tuning for large knowledge bases with millions of chunks.",
    chunkCount: 9,
    createdAt: new Date("2026-06-25T13:20:00"),
    sourceName: "Engineering Wiki",
    wordCount: 2600,
  },
  {
    id: "doc_7",
    title: "Product Roadmap Q3 2026",
    content:
      "This document outlines the planned features and improvements for Q3 2026. Key initiatives include: advanced semantic search with multi-language support, real-time collaboration on knowledge sources, enhanced analytics dashboard, custom AI model fine-tuning capabilities, and enterprise SSO integration improvements.",
    chunkCount: 7,
    createdAt: new Date("2026-07-11T10:00:00"),
    sourceName: "Engineering Wiki",
    wordCount: 2100,
  },
  {
    id: "doc_8",
    title: "Customer Success Playbook",
    content:
      "A comprehensive guide for customer success teams covering onboarding workflows, health scoring, churn prevention strategies, expansion playbooks, and best practices for maintaining high NPS scores. Includes templates for customer check-ins, quarterly business reviews, and escalation procedures.",
    chunkCount: 11,
    createdAt: new Date("2026-06-20T09:00:00"),
    sourceName: "Sales Playbook 2026",
    wordCount: 3500,
  },
  {
    id: "doc_9",
    title: "API Rate Limiting Best Practices",
    content:
      "Understanding and managing API rate limits is crucial for building reliable integrations. This guide covers tier-specific limits, optimal request patterns, exponential backoff strategies, and how to implement caching to minimize API calls. Includes code examples in Python, JavaScript, and Go.",
    chunkCount: 8,
    createdAt: new Date("2026-07-09T15:30:00"),
    sourceName: "Engineering Wiki",
    wordCount: 2900,
  },
  {
    id: "doc_10",
    title: "Data Privacy & Compliance",
    content:
      "KnowBase AI is committed to data privacy and regulatory compliance. This document covers GDPR, CCPA, and SOC 2 compliance measures, data retention policies, encryption standards, audit logging, and how to handle data subject access requests. Updated for 2026 regulatory changes.",
    chunkCount: 14,
    createdAt: new Date("2026-06-15T11:00:00"),
    sourceName: "Legal Documents",
    wordCount: 4800,
  },
  {
    id: "doc_11",
    title: "Onboarding Checklist for New Hires",
    content:
      "Welcome to the team! This checklist ensures a smooth onboarding experience. Week 1 covers account setup, team introductions, and tool access. Week 2 focuses on product deep-dive and shadowing sessions. Week 3 includes first project assignment and code review participation. Week 4 is for independent work and feedback collection.",
    chunkCount: 5,
    createdAt: new Date("2026-07-02T08:30:00"),
    sourceName: "Onboarding Guide",
    wordCount: 1500,
  },
  {
    id: "doc_12",
    title: "Advanced Search Configuration",
    content:
      "Fine-tune your knowledge base search with advanced configuration options. Learn about semantic vs keyword search modes, custom boosting rules, synonym dictionaries, content filtering, and how to optimize search quality using relevance feedback. Covers both UI configuration and API-based settings.",
    chunkCount: 9,
    createdAt: new Date("2026-07-06T14:00:00"),
    sourceName: "Product Help Center",
    wordCount: 2700,
  },
];

const ITEMS_PER_PAGE = 6;

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedDocuments = useMemo(() => {
    const filtered = mockDocuments.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    switch (sortBy) {
      case "date-asc":
        return [...filtered].sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      case "chunks-desc":
        return [...filtered].sort((a, b) => b.chunkCount - a.chunkCount);
      default:
        return [...filtered].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(sortedDocuments.length / ITEMS_PER_PAGE);
  const paginatedDocuments = sortedDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage all documents across your knowledge sources.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(v) => {
            setSortBy(v);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="date-asc">Oldest first</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="chunks-desc">Most chunks</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {paginatedDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Brain className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No documents found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm">
            {searchQuery
              ? "No documents match your search. Try a different query."
              : "Your knowledge base is empty. Add a source to get started."}
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-3"
            }
          >
            {paginatedDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                content={doc.content}
                chunkCount={doc.chunkCount}
                createdAt={doc.createdAt}
                sourceName={doc.sourceName}
                wordCount={doc.wordCount}
                onView={(id) => {
                  window.location.href = `/documents/${id}`;
                }}
                onEdit={() => toast.success("Edit mode activated")}
                onDelete={() => toast.success("Document deleted")}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedDocuments.length)}{" "}
                of {sortedDocuments.length} documents
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-9"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
