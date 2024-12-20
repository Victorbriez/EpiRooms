export interface Activity {
  id: number;
  title: string;
  start: Date;
  end: Date;
  seats?: number;
  codemodule?: string;
}

export type ActivityStatus =
  | "upcoming"
  | "starting-soon"
  | "ongoing"
  | "ending-soon"
  | "ended";

export interface ActivityGroup {
  currentActivity: Activity | null;
  upcomingActivities: Activity[];
}
