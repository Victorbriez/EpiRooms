import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/models/Activity";

interface RoomProps {
  title: string;
  activities: Activity[];
}

export const Room = memo(function Room({ title, activities }: RoomProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-muted">
            <CardContent className="p-4">
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-muted-foreground">
                {activity.start.toLocaleTimeString()} -{" "}
                {activity.end.toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
});
