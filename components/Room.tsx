import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/models/Activity";
import { ActivityCard } from "@/components/activity-card";
import { getActivityStatus } from "@/utils/activity-status";
import { Badge } from "@/components/ui/badge";

interface RoomProps {
  title: string;
  activities: Activity[];
}

export const Room = memo(function Room({ title, activities }: RoomProps) {
  const { currentActivity, upcomingActivities } = useMemo(() => {
    const now = new Date();
    const current = activities.find(
      (activity) =>
        getActivityStatus(activity.start, activity.end) === "ongoing" ||
        getActivityStatus(activity.start, activity.end) === "ending-soon"
    );
    const upcoming = activities.filter(
      (activity) => activity !== current && activity.end > now
    );
    return { currentActivity: current, upcomingActivities: upcoming };
  }, [activities]);

  const status = currentActivity
    ? getActivityStatus(currentActivity.start, currentActivity.end)
    : null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {status && (
          <Badge variant={status === "ending-soon" ? "warning" : "success"}>
            {status === "ending-soon" ? "Ending Soon" : "In Use"}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {currentActivity && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Current Session
            </h3>
            <ActivityCard activity={currentActivity} />
          </div>
        )}
        {upcomingActivities.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Upcoming Sessions
            </h3>
            <div className="space-y-2">
              {upcomingActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}
        {!currentActivity && upcomingActivities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No scheduled activities
          </div>
        )}
      </CardContent>
    </Card>
  );
});
