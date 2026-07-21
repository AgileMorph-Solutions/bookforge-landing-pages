export function isSanityEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_USE_SANITY === "false") return false;
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}
