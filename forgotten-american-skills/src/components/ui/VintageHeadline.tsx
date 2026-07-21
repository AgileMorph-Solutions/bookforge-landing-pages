interface VintageHeadlineProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function VintageHeadline({
  children,
  as: Tag = "h1",
  className = "",
}: VintageHeadlineProps) {
  return (
    <Tag className={`headline-vintage ${className}`}>{children}</Tag>
  );
}

interface AccentWordProps {
  children: React.ReactNode;
  color?: "red" | "navy";
}

export function AccentWord({ children, color = "red" }: AccentWordProps) {
  return (
    <span className={color === "red" ? "accent-red" : "accent-navy"}>
      {children}
    </span>
  );
}
