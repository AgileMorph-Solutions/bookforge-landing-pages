interface StarDividerProps {
  className?: string;
}

export function StarDivider({ className = "" }: StarDividerProps) {
  return (
    <div className={`star-divider my-4 ${className}`} aria-hidden>
      ★
    </div>
  );
}
