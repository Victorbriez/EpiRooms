import React from "react";
import { Activite } from "@/models/Activite";
import { memo } from "react";

interface DrawRoomProps {
  title: string;
  activities: Activite[];
}

export const DrawRoom: React.FC<DrawRoomProps> = memo(
  ({ title, activities }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="bg-gray-700 p-2 rounded">
            <p className="text-white">{activity.title}</p>
            <p className="text-sm text-gray-300">
              {activity.start.toLocaleTimeString()} -{" "}
              {activity.end.toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
);

DrawRoom.displayName = "DrawRoom";
