/**
 * Shimmer skeleton shown by `src/app/loading.tsx` while the page's server
 * component is still awaiting content from Sanity. Palette-neutral (translucent
 * grey + a light sweep) so it reads correctly on every site's theme.
 */

function SkeletonStyles() {
  return (
    <style>{`
      @keyframes bf-skeleton-sweep { 100% { transform: translateX(100%); } }
      .bf-skeleton {
        position: relative;
        overflow: hidden;
        background-color: rgba(130, 130, 130, 0.16);
      }
      .bf-skeleton::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          transparent,
          rgba(165, 165, 165, 0.28),
          transparent
        );
        animation: bf-skeleton-sweep 1.5s infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .bf-skeleton::after { animation: none; }
      }
    `}</style>
  );
}

export default function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading content">
      <SkeletonStyles />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <div className="bf-skeleton h-5 w-32 rounded-full" />
            <div className="space-y-3">
              <div className="bf-skeleton h-10 w-full rounded-lg" />
              <div className="bf-skeleton h-10 w-11/12 rounded-lg" />
              <div className="bf-skeleton h-10 w-3/4 rounded-lg" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="bf-skeleton h-4 w-full rounded" />
              <div className="bf-skeleton h-4 w-5/6 rounded" />
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="bf-skeleton h-12 w-48 rounded-lg" />
              <div className="bf-skeleton h-12 w-40 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bf-skeleton aspect-[3/4] w-full max-w-sm rounded-xl" />
          </div>
        </div>
      </section>

      {/* Content sections */}
      {[0, 1, 2].map((section) => (
        <section
          key={section}
          className="mx-auto max-w-6xl px-4 py-14 md:py-20"
        >
          <div className="mx-auto mb-10 max-w-md space-y-3 text-center">
            <div className="bf-skeleton mx-auto h-8 w-2/3 rounded-lg" />
            <div className="bf-skeleton mx-auto h-4 w-5/6 rounded" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((card) => (
              <div key={card} className="space-y-3">
                <div className="bf-skeleton h-40 w-full rounded-xl" />
                <div className="bf-skeleton h-4 w-3/4 rounded" />
                <div className="bf-skeleton h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
