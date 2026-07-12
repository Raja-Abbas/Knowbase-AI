"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InviteDialog } from "@/components/team/invite-dialog";
import { MemberRow, Member } from "@/components/team/member-row";
import {
  Users,
  UserCheck,
  Clock,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

const MOCK_MEMBERS: Member[] = [
  { id: "m-1", name: "Alex Morgan", email: "alex@acme.co", role: "owner", lastActiveAt: "2026-07-12T10:30:00Z", status: "active", joinedAt: "2026-01-15T00:00:00Z" },
  { id: "m-2", name: "James Wilson", email: "james@acme.com", role: "admin", lastActiveAt: "2026-07-12T09:45:00Z", status: "active", joinedAt: "2026-02-20T00:00:00Z" },
  { id: "m-3", name: "Emily Rodriguez", email: "emily@acme.com", role: "member", lastActiveAt: "2026-07-11T18:00:00Z", status: "active", joinedAt: "2026-03-10T00:00:00Z" },
  { id: "m-4", name: "Alex Kim", email: "alex@acme.com", role: "member", lastActiveAt: "2026-07-10T14:20:00Z", status: "active", joinedAt: "2026-04-05T00:00:00Z" },
  { id: "m-5", name: "Maria Santos", email: "maria@acme.com", role: "admin", lastActiveAt: "2026-07-12T08:00:00Z", status: "active", joinedAt: "2026-02-28T00:00:00Z" },
  { id: "m-6", name: "David Park", email: "david@acme.com", role: "member", lastActiveAt: "2026-07-09T11:30:00Z", status: "active", joinedAt: "2026-05-12T00:00:00Z" },
  { id: "m-invite-1", name: "", email: "lisa@acme.com", role: "member", lastActiveAt: "2026-07-10T10:00:00Z", status: "pending", joinedAt: "2026-07-10T10:00:00Z" },
  { id: "m-invite-2", name: "", email: "tom@acme.com", role: "admin", lastActiveAt: "2026-07-11T12:00:00Z", status: "pending", joinedAt: "2026-07-11T12:00:00Z" },
];

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const activeMembers = members.filter((m) => m.status === "active");
  const pendingMembers = members.filter((m) => m.status === "pending");

  const onlineCount = activeMembers.filter((m) => {
    const diff = Date.now() - new Date(m.lastActiveAt).getTime();
    return diff < 3600000;
  }).length;

  const handleRemove = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleChangeRole = useCallback((id: string, role: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: role as Member["role"] } : m))
    );
    toast.success("Role updated");
  }, []);

  const handleCancelInvite = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Invite cancelled");
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Members"
        description="Manage your workspace team and invitations"
        actions={
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingMembers.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg">
        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold">Active Members</h3>
        </div>
        <div>
          {activeMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onRemove={handleRemove}
              onChangeRole={handleChangeRole}
            />
          ))}
        </div>
      </div>

      {pendingMembers.length > 0 && (
        <div className="border rounded-lg">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold">Pending Invitations</h3>
          </div>
          <div>
            {pendingMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {member.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{member.email}</p>
                  <p className="text-sm text-muted-foreground">Invitation sent</p>
                </div>
                <Badge variant="outline">{member.role === "admin" ? "Admin" : "Member"}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleCancelInvite(member.id)}
                >
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
}
