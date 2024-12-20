import { type ActivityStatus } from "@/types/activity";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  ActivityStatus,
  { label: string; variant: "default" | "warning" | "success" }
> = {
  upcoming: { label: "Upcoming", variant: "default" },
  "starting-soon": { label: "Starting Soon", variant: "warning" },
  ongoing: { label: "In Use", variant: "success" },
  "ending-soon": { label: "Ending Soon", variant: "warning" },
  ended: { label: "Ended", variant: "default" },
};

interface StatusBadgeProps {
  status: ActivityStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
