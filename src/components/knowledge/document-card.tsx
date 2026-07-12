"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Pencil,
  Trash2,
  Layers,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate, formatRelativeTime, truncate } from "@/lib/utils";

export interface DocumentCardProps {
  id: string;
  title: string;
  content: string;
  chunkCount: number;
  createdAt: Date;
  sourceName?: string;
  wordCount: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DocumentCard({
  id,
  title,
  content,
  chunkCount,
  createdAt,
  sourceName,
  wordCount,
  onView,
  onEdit,
  onDelete,
}: DocumentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight">{title}</CardTitle>
            {sourceName && (
              <p className="text-xs text-muted-foreground mt-1">{sourceName}</p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <span className="sr-only">Actions</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete?.(id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {expanded ? content : truncate(content, 150)}
        </p>
        {content.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        )}
        <Separator className="my-3" />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {chunkCount} chunks
          </span>
          <span>{wordCount.toLocaleString()} words</span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
