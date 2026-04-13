/* Shimmer skeleton components for loading states */

function SkeletonBase({ className = '' }) {
  return (
    <div
      className={`rounded-xl bg-white/[0.04] relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div  
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

export function WorkshopCardSkeleton() {
  return (
    <div className="card-glass flex flex-col gap-4 pointer-events-none">
      <div className="flex items-start justify-between">
        <SkeletonBase className="w-12 h-12 rounded-2xl" />
        <SkeletonBase className="w-20 h-6 rounded-full" />
      </div>
      <SkeletonBase className="w-16 h-3 rounded" />
      <SkeletonBase className="w-4/5 h-5 rounded" />
      <SkeletonBase className="w-full h-4 rounded" />
      <SkeletonBase className="w-3/4 h-4 rounded" />
      <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
        <div className="flex gap-3">
          <SkeletonBase className="w-16 h-3 rounded" />
          <SkeletonBase className="w-20 h-3 rounded" />
        </div>
        <SkeletonBase className="w-14 h-3 rounded" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card-glass flex flex-col items-center gap-3 py-8">
      <SkeletonBase className="w-10 h-10 rounded-2xl" />
      <SkeletonBase className="w-24 h-10 rounded" />
      <SkeletonBase className="w-32 h-3 rounded" />
    </div>
  );
}

export function BookingRowSkeleton() {
  return (
    <div className="card-glass flex gap-5 items-center">
      <SkeletonBase className="w-2 h-2 rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonBase className="w-3/5 h-5 rounded" />
        <div className="flex gap-4">
          <SkeletonBase className="w-20 h-3 rounded" />
          <SkeletonBase className="w-28 h-3 rounded" />
          <SkeletonBase className="w-24 h-3 rounded" />
        </div>
      </div>
      <SkeletonBase className="w-24 h-6 rounded-full flex-shrink-0" />
    </div>
  );
}

export function PageSkeleton({ type = 'workshops' }) {
  if (type === 'workshops') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <WorkshopCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (type === 'dashboard') {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingRowSkeleton key={i} />
        ))}
      </div>
    );
  }
  return null;
}
