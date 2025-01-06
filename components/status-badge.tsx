import { type ActivityStatus } from "@/types/activity";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  ActivityStatus,
  { label: string; variant: "default" | "warning" | "success" }
> = {
  upcoming: { label: "A venir", variant: "default" },
  "starting-soon": { label: "Commence bientôt", variant: "warning" },
  ongoing: { label: "En cours", variant: "success" },
  "ending-soon": { label: "Fini bientôt", variant: "warning" },
  ended: { label: "Fini", variant: "default" },
};

interface StatusBadgeProps {
  status: ActivityStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
