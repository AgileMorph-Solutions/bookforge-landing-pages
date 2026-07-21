interface SectionShellProps {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "parchment" | "wood" | "navy" | "cream" | "hero";
  className?: string;
}

const variantClasses: Record<NonNullable<SectionShellProps["variant"]>, string> = {
  default: "",
  parchment: "bg-parchment-texture",
  wood: "bg-wood-surface text-cream",
  navy: "bg-navy text-cream",
  cream: "bg-cream",
  hero: "bg-hero-kitchen",
};

export function SectionShell({
  children,
  id,
  variant = "default",
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
