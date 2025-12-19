const ReviewSkeletonCard = () => (
  <div className="h-full bg-base-200/40 animate-pulse backdrop-blur rounded-xl p-6 border border-base-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-base-300" />
      <div className="flex flex-col gap-1 flex-1">
        <div className="h-4 w-32 bg-base-300 rounded"></div>
        <div className="h-3 w-20 bg-base-300 rounded"></div>
      </div>
    </div>
    <div className="h-10 bg-base-300 rounded mb-3"></div>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-4 h-4 bg-base-300 rounded"></div>
      ))}
    </div>
  </div>
);

export default ReviewSkeletonCard;
