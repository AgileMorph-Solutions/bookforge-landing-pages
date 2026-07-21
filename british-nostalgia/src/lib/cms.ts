export function isSanityEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_USE_SANITY === "true" &&
    Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  );
}
