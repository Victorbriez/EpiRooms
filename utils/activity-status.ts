export type ActivityStatus = "upcoming" | "ongoing" | "ending-soon" | "ended";

export function getActivityProgress(start: Date, end: Date): number {
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const current = now.getTime() - start.getTime();

  return Math.min(Math.max(0, (current / total) * 100), 100);
}

export function getActivityStatus(start: Date, end: Date): ActivityStatus {
  const now = new Date();
  const minutesUntilEnd = (end.getTime() - now.getTime()) / 1000 / 60;

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  if (minutesUntilEnd <= 15) return "ending-soon";
  return "ongoing";
}
