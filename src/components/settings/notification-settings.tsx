"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const DEFAULT_PREFS: NotificationPref[] = [
  { id: "email", label: "Email Notifications", description: "Receive email updates for important events", enabled: true },
  { id: "digest", label: "Weekly Digest", description: "Get a weekly summary of workspace activity", enabled: true },
  { id: "ai-updates", label: "AI Feature Updates", description: "Be notified about new AI features and improvements", enabled: false },
  { id: "security", label: "Security Alerts", description: "Get alerts for suspicious login attempts and security events", enabled: true },
  { id: "marketing", label: "Marketing Emails", description: "Receive product updates, tips, and offers", enabled: false },
];

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(DEFAULT_PREFS);
  const [saving, setSaving] = useState(false);

  const togglePref = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Notification preferences saved");
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose what notifications you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        {prefs.map((pref, i) => (
          <div key={pref.id}>
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5">
                <Label className="text-base cursor-pointer">{pref.label}</Label>
                <p className="text-sm text-muted-foreground">{pref.description}</p>
              </div>
              <Switch checked={pref.enabled} onCheckedChange={() => togglePref(pref.id)} />
            </div>
            {i < prefs.length - 1 && <Separator />}
          </div>
        ))}
        <div className="pt-4">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
