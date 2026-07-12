"use client";

import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Source {
  id: string;
  title: string;
  preview?: string;
}

interface SourceCitationProps {
  source: Source;
}

export function SourceCitation({ source }: SourceCitationProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`/documents/${source.id}`}
            className="inline-flex items-center gap-1 rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <FileText className="h-3 w-3" />
            {source.title}
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium text-sm">{source.title}</p>
            {source.preview && (
              <p className="text-xs text-muted-foreground">{source.preview}</p>
            )}
            <p className="text-xs text-muted-foreground">Click to view source</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
