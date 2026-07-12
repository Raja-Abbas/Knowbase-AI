"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { formatRelativeTime } from "@/lib/utils";
import { Copy, Plus, Trash2, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

interface ApiKey {
  id: string;
  name: string;
  keyPreview: string;
  createdAt: string;
  lastUsedAt: string | null;
}

const MOCK_KEYS: ApiKey[] = [
  { id: "k-1", name: "Production API", keyPreview: "sk-prod-...a8f2", createdAt: "2026-06-15T10:00:00Z", lastUsedAt: "2026-07-12T09:30:00Z" },
  { id: "k-2", name: "Development", keyPreview: "sk-dev-...3c91", createdAt: "2026-06-20T14:00:00Z", lastUsedAt: "2026-07-11T16:45:00Z" },
  { id: "k-3", name: "CI/CD Pipeline", keyPreview: "sk-cicd-...7d45", createdAt: "2026-07-01T08:00:00Z", lastUsedAt: "2026-07-10T12:00:00Z" },
];

export function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_KEYS);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [revokeDialogId, setRevokeDialogId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the key");
      return;
    }
    setCreating(true);
    await new Promise((r) => setTimeout(r, 1000));
    const generatedKey = `sk-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;
    setNewKey(generatedKey);
    setKeys((prev) => [
      {
        id: `k-${Date.now()}`,
        name: newKeyName,
        keyPreview: `${generatedKey.substring(0, 8)}...${generatedKey.substring(generatedKey.length - 4)}`,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
      },
      ...prev,
    ]);
    setNewKeyName("");
    setCreating(false);
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setRevokeDialogId(null);
    toast.success("API key revoked");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Key copied to clipboard");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {keys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <KeyRound className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No API keys yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="border rounded-lg divide-y">
              {keys.map((key) => (
                <div key={key.id} className="flex items-center gap-4 p-4">
                  <KeyRound className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{key.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
                        {key.keyPreview}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(key.keyPreview)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground shrink-0">
                    <div>Created {formatRelativeTime(key.createdAt)}</div>
                    <div>
                      {key.lastUsedAt
                        ? `Last used ${formatRelativeTime(key.lastUsedAt)}`
                        : "Never used"}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive shrink-0"
                    onClick={() => setRevokeDialogId(key.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={(open) => {
        setCreateDialogOpen(open);
        if (!open) {
          setNewKey(null);
          setNewKeyName("");
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{newKey ? "API Key Created" : "Create API Key"}</DialogTitle>
            <DialogDescription>
              {newKey
                ? "Copy your API key now. You won't be able to see it again."
                : "Give your API key a descriptive name to help you identify it later."}
            </DialogDescription>
          </DialogHeader>
          {newKey ? (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-muted p-3 rounded font-mono break-all">
                  {newKey}
                </code>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newKey)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-destructive">
                Make sure to copy this key. It will not be shown again.
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g. Production API, CI/CD Pipeline"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCreateDialogOpen(false);
              setNewKey(null);
              setNewKeyName("");
            }}>
              {newKey ? "Done" : "Cancel"}
            </Button>
            {!newKey && (
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create Key"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!revokeDialogId} onOpenChange={() => setRevokeDialogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              Any application using this key will immediately lose access. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => revokeDialogId && handleRevoke(revokeDialogId)}
            >
              Revoke Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
