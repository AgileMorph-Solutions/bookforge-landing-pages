import Image from "next/image";

type BookCoverVariant = "hero" | "feature" | "card";

interface BookCoverProps {
  src: string;
  alt: string;
  variant: BookCoverVariant;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<
  BookCoverVariant,
  { wrapper: string; sizes: string }
> = {
  hero: {
    wrapper: "w-full max-w-[460px]",
    sizes: "(max-width: 1024px) 90vw, 460px",
  },
  feature: {
    wrapper: "w-full max-w-[280px] lg:max-w-none lg:w-full",
    sizes: "(max-width: 1024px) 280px, 300px",
  },
  card: {
    wrapper: "w-full",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
};

export function BookCover({
  src,
  alt,
  variant,
  priority = false,
  className = "",
  children,
}: BookCoverProps) {
  const { wrapper, sizes } = variantClasses[variant];

  const imageBox = (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-parchment">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-contain object-center cover-vintage"
        sizes={sizes}
        priority={priority}
      />
      {children}
    </div>
  );

  if (variant === "card") {
    return (
      <div
        className={`overflow-hidden border border-parchment-dark ${wrapper} ${className}`}
      >
        {imageBox}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`relative ${wrapper} ${className}`}>
        <div className="cover-frame">
          <div className="overflow-hidden book-lift">{imageBox}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto ${wrapper} ${className}`}>
      <div className="cover-frame">
        <div className="overflow-hidden book-lift">{imageBox}</div>
      </div>
    </div>
  );
}
