const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="aspect-[4/3] lg:aspect-square rounded-2xl bg-sky-100 dark:bg-slate-800" />

        {/* Content Skeleton */}
        <div className="space-y-5">
          <div className="h-8 w-3/4 rounded bg-sky-100 dark:bg-slate-800" />
          <div className="h-4 w-1/2 rounded bg-sky-100 dark:bg-slate-800" />

          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-sky-100 dark:bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-sky-100 dark:bg-slate-800" />
            <div className="h-4 w-4/6 rounded bg-sky-100 dark:bg-slate-800" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-slate-800" />
            <div className="h-4 w-32 rounded bg-sky-100 dark:bg-slate-800" />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="h-8 w-24 rounded bg-sky-100 dark:bg-slate-800" />
            <div className="h-10 w-32 rounded-xl bg-sky-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
