import Image from "next/image";

interface BrandSealProps {
  size?: number;
  className?: string;
  logoUrl?: string;
}

export function BrandSeal({ size = 40, className = "", logoUrl }: BrandSealProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logoUrl ?? "/images/logo.png"}
        alt="Küche von Früher"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
