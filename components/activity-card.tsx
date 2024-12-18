import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "@/models/Activity";
import {
  getActivityProgress,
  getActivityStatus,
} from "@/utils/activity-status";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
}

const statusStyles = {
  upcoming: "border-2 border-blue-500",
  ongoing: "border-2 border-green-500",
  "ending-soon": "border-2 border-yellow-500",
  ended: "border-2 border-gray-500 opacity-60",
} as const;

export const ActivityCard = memo(function ActivityCard({
  activity,
}: ActivityCardProps) {
  const status = getActivityStatus(activity.start, activity.end);
  const progress =
    status === "ongoing"
      ? getActivityProgress(activity.start, activity.end)
      : 0;

  return (
    <Card
      className={cn("transition-all hover:shadow-md", statusStyles[status])}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium line-clamp-2">{activity.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>
                {activity.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {activity.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          {activity.seats && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{activity.seats}</span>
            </div>
          )}
        </div>
        {status === "ongoing" && (
          <Progress
            value={progress}
            className={cn(
              "h-1",
              progress > 85 ? "bg-yellow-500" : "bg-green-500"
            )}
          />
        )}
      </CardContent>
    </Card>
  );
});
