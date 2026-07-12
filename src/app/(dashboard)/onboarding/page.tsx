"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  BookOpen,
  Users,
  Rocket,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Check,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const STEPS = [
  { id: 1, title: "Welcome", icon: Sparkles },
  { id: 2, title: "Workspace", icon: BookOpen },
  { id: 3, title: "Invite Team", icon: Users },
  { id: 4, title: "Launch", icon: Rocket },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDesc, setWorkspaceDesc] = useState("");
  const [invites, setInvites] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");

  const progress = (step / STEPS.length) * 100;

  const addInvite = () => {
    if (!inviteEmail.trim()) return;
    if (!inviteEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (invites.includes(inviteEmail)) {
      toast.error("Email already added");
      return;
    }
    setInvites((prev) => [...prev, inviteEmail]);
    setInviteEmail("");
  };

  const removeInvite = (email: string) => {
    setInvites((prev) => prev.filter((e) => e !== email));
  };

  const canProceed = () => {
    if (step === 2) return workspaceName.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 2 && !workspaceName.trim()) {
      toast.error("Workspace name is required");
      return;
    }
    if (step < 4) setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium transition-colors",
                    step >= s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 sm:w-20 mx-2 transition-colors",
                      step > s.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Welcome to KnowBase AI</h2>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Your AI-powered knowledge base that helps teams find answers faster.
                    Let&apos;s get you set up in just a few steps.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <BookOpen className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm font-medium">Smart Search</p>
                    <p className="text-xs text-muted-foreground">AI-powered answers from your docs</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <Users className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm font-medium">Team Collaboration</p>
                    <p className="text-xs text-muted-foreground">Share knowledge seamlessly</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <Rocket className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm font-medium">Instant Setup</p>
                    <p className="text-xs text-muted-foreground">Up and running in minutes</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Create Your Workspace</h2>
                  <p className="text-muted-foreground mt-1">
                    Set up a workspace for your team to collaborate.
                  </p>
                </div>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="ws-name">Workspace Name *</Label>
                    <Input
                      id="ws-name"
                      placeholder="e.g. Acme Engineering"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ws-desc">Description (optional)</Label>
                    <Textarea
                      id="ws-desc"
                      placeholder="What is this workspace for?"
                      value={workspaceDesc}
                      onChange={(e) => setWorkspaceDesc(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Invite Your Team</h2>
                  <p className="text-muted-foreground mt-1">
                    Add team members to start collaborating. You can skip this step.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="colleague@company.com"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addInvite()}
                  />
                  <Button variant="outline" onClick={addInvite}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {invites.length > 0 && (
                  <div className="space-y-2">
                    {invites.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                      >
                        <span className="text-sm">{email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeInvite(email)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {invites.length} team member{invites.length !== 1 ? "s" : ""} invited
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PartyPopper className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">You&apos;re All Set!</h2>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Your workspace <span className="font-semibold">{workspaceName || "Acme KB"}</span> is
                    ready. Start adding documents and invite your team to begin collaborating.
                  </p>
                </div>
                {invites.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {invites.length} invitation{invites.length !== 1 ? "s" : ""} will be sent once you launch.
                  </p>
                )}
                <Link href="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {step < 4 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === 3 ? "Launch" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
