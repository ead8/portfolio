/**
 * Route-level loading state.
 *
 * A static skeleton in the shape of the real page. It does not shimmer: a
 * pulsing placeholder is motion on something the visitor sees on every
 * navigation, and it makes the wait feel longer rather than shorter.
 */
export default function Loading() {
  return (
    <div className="container-page py-24" aria-busy="true" aria-label="Loading">
      <div className="h-11 w-full max-w-[16ch] rounded bg-surface" />
      <div className="mt-3 h-11 w-full max-w-[12ch] rounded bg-surface" />
      <div className="mt-10 h-4 w-full max-w-prose rounded-xs bg-surface" />
      <div className="mt-3 h-4 w-full max-w-[46ch] rounded-xs bg-surface" />

      <div className="mt-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 border-t border-line py-6">
            <div className="hidden h-16 w-24 shrink-0 rounded bg-surface sm:block" />
            <div className="flex-1">
              <div className="h-4 w-40 rounded-xs bg-surface" />
              <div className="mt-2.5 h-3 w-64 max-w-full rounded-xs bg-surface" />
            </div>
          </div>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  );
}
