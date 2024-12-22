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
        <DialogHeader>
          <div className="flex items-start gap-4">
            <DialogTitle className="text-xl">{activity.title}</DialogTitle>
            <StatusBadge status={status} />
          </div>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div>
                  <time dateTime={activity.start.toISOString()}>
                    {activity.start.toLocaleDateString([], {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="text-muted-foreground">
                  <time dateTime={activity.start.toISOString()}>
                    {activity.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <span className="mx-2">-</span>
                  <time dateTime={activity.end.toISOString()}>
                    {activity.end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            </div>
            {activity.seats && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{activity.seats} seats</span>
              </div>
            )}
          </div>
          {activity.codemodule && (
            <div>
              <h3 className="text-sm font-medium mb-1.5">Module</h3>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {activity.codemodule}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
