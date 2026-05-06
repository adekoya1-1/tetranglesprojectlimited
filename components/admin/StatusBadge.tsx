import { cn } from "@/lib/utils";

const statusConfig = {
  NEW: { label: "New", className: "bg-blue-100 text-blue-700" },
  IN_REVIEW: { label: "In Review", className: "bg-amber-100 text-amber-700" },
  CONTACTED: { label: "Contacted", className: "bg-orange-100 text-orange-700" },
  CONVERTED: { label: "Converted", className: "bg-green-100 text-green-700" },
  CLOSED: { label: "Closed", className: "bg-gray-100 text-gray-600" },
} as const;

type Status = keyof typeof statusConfig;

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: "bg-gray-100 text-gray-600" };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
