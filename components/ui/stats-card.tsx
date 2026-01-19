import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-ember",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-xs",
                changeType === "positive" && "text-green-500",
                changeType === "negative" && "text-red-500",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg bg-muted p-3", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
