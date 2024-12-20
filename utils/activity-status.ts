export type ActivityStatus =
  | "upcoming"
  | "starting-soon"
  | "ongoing"
  | "ending-soon"
  | "ended";

export function getActivityProgress(start: Date, end: Date): number {
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const current = now.getTime() - start.getTime();

  return Math.min(Math.max(0, (current / total) * 100), 100);
}

export function getActivityStatus(start: Date, end: Date): ActivityStatus {
  const now = new Date();
  const minutesUntilStart = (start.getTime() - now.getTime()) / 1000 / 60;
  const minutesUntilEnd = (end.getTime() - now.getTime()) / 1000 / 60;

  if (minutesUntilStart > 15) return "upcoming";
  if (minutesUntilStart <= 15 && now < start) return "starting-soon";
  if (now > end) return "ended";
  if (minutesUntilEnd <= 15) return "ending-soon";
  return "ongoing";
}
