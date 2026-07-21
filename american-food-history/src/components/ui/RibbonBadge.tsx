interface RibbonBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "red" | "navy";
}

export function RibbonBadge({
  children,
  className = "",
  variant = "red",
}: RibbonBadgeProps) {
  const colors =
    variant === "red"
      ? "bg-red text-cream"
      : "bg-navy text-cream";

  return (
    <span
      className={`ribbon-badge ${colors} ${className}`}
    >
      {children}
    </span>
  );
}
