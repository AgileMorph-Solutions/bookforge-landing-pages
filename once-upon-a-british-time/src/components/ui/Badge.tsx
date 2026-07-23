interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "red" | "cream" | "vintage";
}

export function Badge({ children, variant = "navy" }: BadgeProps) {
  const variants = {
    navy: "bg-navy text-cream",
    red: "bg-red text-cream",
    cream: "bg-parchment text-navy border border-parchment-dark",
    vintage:
      "bg-red text-cream font-display font-bold uppercase tracking-wider text-[0.65rem] rounded-sm",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
