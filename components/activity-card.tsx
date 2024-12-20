import { memo } from "react";
import { Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Activity, type ActivityStatus } from "@/types/activity";
import {
  getActivityProgress,
  getActivityStatus,
} from "@/utils/activity-status";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
}

const statusStyles: Record<ActivityStatus, string> = {
  upcoming:
    "border-l-4 border-l-primary hover:border-l-6 dark:border-opacity-50",
  "starting-soon":
    "border-l-4 border-l-warning hover:border-l-6 dark:border-opacity-50",
  ongoing:
    "border-l-4 border-l-success hover:border-l-6 dark:border-opacity-50",
  "ending-soon":
    "border-l-4 border-l-warning hover:border-l-6 dark:border-opacity-50",
  ended:
    "border-l-4 border-l-muted hover:border-l-6 opacity-60 dark:border-opacity-30",
};

export const ActivityCard = memo(function ActivityCard({
  activity,
}: ActivityCardProps) {
  const status = getActivityStatus(activity.start, activity.end);
  const progress =
    status === "ongoing" || status === "ending-soon"
      ? getActivityProgress(activity.start, activity.end)
      : 0;

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-lg bg-card",
        statusStyles[status]
      )}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium line-clamp-2 text-foreground">
              {activity.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1.5">
              <Clock className="h-3.5 w-3.5" />
              <time dateTime={activity.start.toISOString()}>
                {activity.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
              <span aria-hidden="true">-</span>
              <time dateTime={activity.end.toISOString()}>
                {activity.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
          {(activity.seats || activity.codemodule) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              {activity.seats && (
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{activity.seats}</span>
                </div>
              )}
              {activity.codemodule && (
                <span className="px-1.5 py-0.5 rounded-md bg-muted text-xs">
                  {activity.codemodule}
                </span>
              )}
            </div>
          )}
        </div>
        {status === "ongoing" ||
          (status === "ending-soon" && (
            <div className="space-y-1">
              <Progress
                value={progress}
                className={cn(
                  "h-1.5",
                  progress > 85 ? "bg-warning" : "bg-success"
                )}
              />
              <p className="text-xs text-muted-foreground text-right">
                {Math.round(progress)}% complete
              </p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
});
