"use client";

import { Clock, Users } from "lucide-react";
import { type Activity } from "@/types/activity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getActivityStatus } from "@/utils/activity-status";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ActivityDialogProps {
  activity: Activity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivityDialog({
  activity,
  open,
  onOpenChange,
}: ActivityDialogProps) {
  const status = getActivityStatus(activity.start, activity.end);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <div className="flex justify-start">
            <StatusBadge status={status} />
          </div>
          <DialogTitle className="text-xl font-semibold">
            {activity.title}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="space-y-6">
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 p-0">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                <div className="space-y-1.5">
                  <p className="font-medium">
                    <time dateTime={activity.start.toISOString()}>
                      {activity.start.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <time dateTime={activity.start.toISOString()}>
                      {activity.start.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                    h<span className="mx-2">-</span>
                    <time dateTime={activity.end.toISOString()}>
                      {activity.end.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                    h
                  </p>
                </div>
              </div>

              {activity.seats && (
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">
                    {activity.seats} places disponibles
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {activity.codemodule && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-medium">Module</h3>
              <Badge variant="outline" className="text-sm">
                {activity.codemodule}
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
