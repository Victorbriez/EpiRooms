import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Activity } from "@/types/activity";
import { ActivityCard } from "./activity-card";
import { getActivityStatus, groupActivities } from "@/utils/activity-status";
import { StatusBadge } from "@/components/status-badge";

interface RoomProps {
  title: string;
  activities: Activity[];
}

export const Room = memo(function Room({ title, activities }: RoomProps) {
  const { currentActivity, upcomingActivities } = useMemo(
    () => groupActivities(activities),
    [activities]
  );

  const status = currentActivity
    ? getActivityStatus(currentActivity.start, currentActivity.end)
    : null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {status && <StatusBadge status={status} />}
      </CardHeader>
      <CardContent className="space-y-6">
        {currentActivity && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Current Session
            </h2>
            <ActivityCard activity={currentActivity} />
          </section>
        )}
        {upcomingActivities.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Upcoming Sessions
            </h2>
            <div className="space-y-3">
              {upcomingActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}
        {!currentActivity && upcomingActivities.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No scheduled activities
          </div>
        )}
      </CardContent>
    </Card>
  );
});
