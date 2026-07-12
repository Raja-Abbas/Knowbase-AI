"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getInitials, formatRelativeTime } from "@/lib/utils";
import { MoreHorizontal, Shield, ShieldCheck, UserMinus } from "lucide-react";
import toast from "react-hot-toast";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  lastActiveAt: string;
  status: "active" | "pending";
  joinedAt: string;
}

const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
  owner: { label: "Owner", className: "bg-amber-100 text-amber-800 border-amber-200" },
  admin: { label: "Admin", className: "bg-blue-100 text-blue-800 border-blue-200" },
  member: { label: "Member", className: "bg-green-100 text-green-800 border-green-200" },
};

interface MemberRowProps {
  member: Member;
  onRemove: (id: string) => void;
  onChangeRole: (id: string, role: string) => void;
}

export function MemberRow({ member, onRemove, onChangeRole }: MemberRowProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const roleConfig = ROLE_CONFIG[member.role];

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{member.name}</span>
            {member.status === "pending" && (
              <Badge variant="outline" className="text-xs">Pending</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{member.email}</p>
        </div>
        <Badge variant="outline" className={roleConfig.className}>
          {roleConfig.label}
        </Badge>
        <span className="text-sm text-muted-foreground w-28 text-right hidden sm:block">
          {formatRelativeTime(member.lastActiveAt)}
        </span>
        {member.role !== "owner" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {member.role !== "admin" && (
                <DropdownMenuItem onClick={() => onChangeRole(member.id, "admin")}>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Make Admin
                </DropdownMenuItem>
              )}
              {member.role !== "member" && (
                <DropdownMenuItem onClick={() => onChangeRole(member.id, "member")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Make Member
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setRemoveDialogOpen(true)}
              >
                <UserMinus className="mr-2 h-4 w-4" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {member.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {member.name} from the workspace. They will lose access to all resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onRemove(member.id);
                toast.success(`${member.name} has been removed`);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
