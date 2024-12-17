import { useState, useEffect, useMemo } from "react";
import { ActiviteInterface, ActiviteProps } from "@/types/ActiviteInterface";
import { Activite } from "@/models/Activite";
import { getPlanningAction } from "@/app/actions/getPlanningAction";

export const usePlanning = () => {
  const [activities, setActivities] = useState<Activite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const currentDate = new Date().toISOString().split("T")[0];
        const data: ActiviteProps[] = await getPlanningAction(currentDate);
        const processedData = processActivities(data);
        setActivities(processedData);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [processActivities]);

  const processActivities = useMemo(
    () =>
      (data: ActiviteInterface[]): Activite[] => {
        const now = new Date();
        return data
          .map((item) => new Activite(item))
          .filter((activity) => now <= activity.end)
          .sort((a, b) => a.start.getTime() - b.start.getTime());
      },
    []
  );

  return { activities, isLoading, error };
};
