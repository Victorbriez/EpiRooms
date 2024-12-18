"use client";

import { useMemo, useCallback } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Location from "@/location.json";
import type { LocationInterface } from "@/types/LocationInterface";
import { Room } from "@/components/Room";
import { usePlanning } from "@/hooks/usePlanning";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { eventList, isLoading, error, refresh } = usePlanning();
  const roomList = useMemo(() => Location as LocationInterface[], []);

  const getRoomEvents = useCallback(
    (room: LocationInterface) => {
      return eventList.filter((e) => e.roomCode === room.key);
    },
    [eventList]
  );

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading room planning</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error.message}</span>
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">EpiRooms</h1>
        <div className="flex items-center gap-4">
          {!isLoading && (
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))
          : roomList.map((room) => (
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
