const ProductCardSkeleton = () => {
  return (
    <div
      className="
        col-span-1
        rounded-2xl
        overflow-hidden
        border
        border-sky-200/40 dark:border-sky-500/20
        bg-white/80 dark:bg-slate-900/70
        backdrop-blur-md
        shadow-sm
        animate-pulse
      "
    >
      <div className="flex flex-col h-full">
        {/* Image Skeleton */}
        <div className="aspect-square bg-slate-200 dark:bg-slate-800" />

        {/* Content Skeleton */}
        <div className="flex flex-col gap-3 p-4">
          <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
