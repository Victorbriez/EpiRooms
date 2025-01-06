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
              Activité en cours
            </h2>
            <ActivityCard activity={currentActivity} />
          </section>
        )}
        {upcomingActivities.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Activité{upcomingActivities.length > 1 ? "s" : ""} à venir
            </h2>
            <div className="space-y-3">
              <ActivityCard activity={upcomingActivities[0]} />
              {upcomingActivities.length > 1 && (
                <p className="justify-start text-muted-foreground hover:text-foreground">
                  +{upcomingActivities.length - 1} activité
                  {upcomingActivities.length > 2 ? "s" : ""} supplémentaire
                  {upcomingActivities.length > 2 ? "s" : ""}
                </p>
              )}
            </div>
          </section>
        )}
        {!currentActivity && upcomingActivities.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Libre toute la journée
          </div>
        )}
      </CardContent>
    </Card>
  );
});
