export default function TagsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}