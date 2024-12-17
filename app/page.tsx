"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { useMemo, useCallback } from "react";
import Location from "@/location.json";
import LocationInterface from "@/types/LocationInterface";
import LoadingIndicator from "@/components/LoadingIndicator";
import { DrawRoom } from "@/components/DrawRoom";

export default function Home() {
  const { eventList, isLoading, error } = usePlanning();
  const roomList = useMemo(() => Location as LocationInterface[], []);

  const getRoomEvents = useCallback(
    (room: LocationInterface) => {
      return eventList.filter((e) => e.roomCode === room.key);
    },
    [eventList]
  );

  if (isLoading) return <LoadingIndicator />;

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-4 grid-flow-row">
        <ModeToggle />
        {roomList.map((room) => (
          <DrawRoom
            key={room.key}
            title={room.title}
            activities={getRoomEvents(room)}
          />
        ))}
      </div>
    </div>
  );
}
