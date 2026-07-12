"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { cn, slugify } from "@/lib/utils";

const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z.string().max(200, "Description must be at most 200 characters").optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(50, "Slug must be at most 50 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

interface Invitee {
  email: string;
  role: "ADMIN" | "MEMBER";
}

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"ADMIN" | "MEMBER">("MEMBER");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const watchName = watch("name");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);
    setValue("slug", slugify(name));
  };

  const handleAddInvitee = () => {
    if (!inviteEmail || invitees.find((i) => i.email === inviteEmail)) return;
    setInvitees([...invitees, { email: inviteEmail, role: inviteRole }]);
    setInviteEmail("");
    setInviteRole("MEMBER");
  };

  const handleRemoveInvitee = (email: string) => {
    setInvitees(invitees.filter((i) => i.email !== email));
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = watch();
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          members: invitees,
        }),
      });

      if (!response.ok) throw new Error("Failed to create workspace");

      toast.success("Workspace created successfully!");
      setStep(3);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, label: "Workspace Details", icon: <Building2 className="h-4 w-4" /> },
    { number: 2, label: "Invite Team", icon: <Users className="h-4 w-4" /> },
    { number: 3, label: "All Done", icon: <Sparkles className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create a Workspace
          </h1>
          <p className="text-muted-foreground mt-1">
            Set up a new workspace for your team&apos;s knowledge base.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  step === s.number
                    ? "bg-primary text-primary-foreground"
                    : step > s.number
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  s.icon
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 sm:w-16 mx-2",
                    step > s.number ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            {step === 1 && (
              <form
                onSubmit={handleSubmit(() => setStep(2))}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Workspace Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Engineering Team"
                    value={watchName}
                    onChange={handleNameChange}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">knowbase.ai/</span>
                    <Input
                      id="slug"
                      placeholder="engineering-team"
                      {...register("slug")}
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What is this workspace for?"
                    rows={3}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="colleague@company.com"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInvitee())}
                    />
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as "ADMIN" | "MEMBER")}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="MEMBER">Member</option>
                    </select>
                    <Button type="button" variant="outline" onClick={handleAddInvitee}>
                      Add
                    </Button>
                  </div>

                  {invitees.length > 0 && (
                    <div className="space-y-2">
                      {invitees.map((invitee) => (
                        <div
                          key={invitee.email}
                          className="flex items-center justify-between rounded-lg border px-4 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{invitee.email}</span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                              {invitee.role}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveInvitee(invitee.email)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {invitees.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No team members added yet. You can also invite them later.
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={onSubmit} disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Creating...
                      </>
                    ) : (
                      <>
                        Create Workspace <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Workspace Created!</h2>
                  <p className="text-muted-foreground">
                    Your workspace &quot;{watchName}&quot; is ready. Start by uploading documents or inviting your team.
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Go to Dashboard
                  </Button>
                  <Button onClick={() => router.push("/documents")}>
                    Upload Documents
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
