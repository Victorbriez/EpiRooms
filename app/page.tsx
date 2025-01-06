"use client";

import { useMemo, useCallback, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Location from "@/location.json";
import type { LocationInterface } from "@/types/LocationInterface";
import { Room } from "@/components/Room";
import { usePlanning } from "@/hooks/usePlanning";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OccupationStatus = "all" | "occupied" | "available";

export default function Page() {
  const { eventList, isLoading, error, refresh } = usePlanning();
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [occupationStatus, setOccupationStatus] =
    useState<OccupationStatus>("all");

  const roomList = useMemo(() => {
    const rooms = Location as LocationInterface[];
    let filteredRooms = rooms;

    if (selectedFloor !== "all") {
      filteredRooms = filteredRooms.filter(
        (room) => room.floor === selectedFloor
      );
    }

    if (occupationStatus !== "all") {
      filteredRooms = filteredRooms.filter((room) => {
        const roomEvents = eventList.filter((e) => e.roomCode === room.key);
        const isOccupied = roomEvents.some((event) => event.isOngoing());
        return occupationStatus === "occupied" ? isOccupied : !isOccupied;
      });
    }

    return filteredRooms;
  }, [selectedFloor, occupationStatus, eventList]);

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
      <div className="flex items-center gap-4 flex-wrap">
        <Select onValueChange={setSelectedFloor} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner un étage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les étages</SelectItem>
            <SelectItem value="0">RDC</SelectItem>
            <SelectItem value="1">1er Étage</SelectItem>
            <SelectItem value="2">2ème Étage</SelectItem>
            <SelectItem value="3">3ème Étage</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setOccupationStatus(value as OccupationStatus)
          }
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut d'occupation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les salles</SelectItem>
            <SelectItem value="occupied">Salles occupées</SelectItem>
            <SelectItem value="available">Salles disponibles</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {roomList.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted">
          <p className="text-muted-foreground">
            Aucune salle ne correspond aux critères sélectionnés
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
