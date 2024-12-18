"use client";

import { useMemo, useCallback } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Location from "@/location.json";
import { LocationInterface } from "@/types/LocationInterface";
import { Room } from "@/components/Room";
import { usePlanning } from "@/hooks/usePlanning";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { eventList, isLoading, error } = usePlanning();
  const roomList = useMemo(() => Location as LocationInterface[], []);

  const getRoomEvents = useCallback(
    (room: LocationInterface) => {
      return eventList.filter((e) => e.roomCode === room.key);
    },
    [eventList]
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 space-y-4">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roomList.map((room) => (
          <Room
            key={room.key}
            title={room.title}
            activities={getRoomEvents(room)}
          />
        ))}
      </div>
    </div>
  );
}
