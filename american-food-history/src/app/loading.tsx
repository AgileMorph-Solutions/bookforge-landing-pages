import PageSkeleton from "@/components/ui/PageSkeleton";

// Next.js renders this instantly while the route's server component awaits
// content from Sanity, then streams the real page in when it resolves.
export default function Loading() {
  return <PageSkeleton />;
}
