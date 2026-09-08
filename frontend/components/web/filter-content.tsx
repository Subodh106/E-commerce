import { Star, Heart } from "lucide-react";

export default function FilterContent({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories :string[] ,
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {

  return (
    <div>
      <h2 className="mb-5 font-semibold">Categories</h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-center gap-3 text-sm"
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="h-4 w-4 accent-slate-900"
            />

            <span
              className={
                selectedCategory === category
                  ? "font-medium text-slate-900"
                  : "text-slate-600"
              }
            >
              {category}
            </span>
          </label>
        ))}
      </div>

      <div className="my-7 border-t border-slate-200" />

      {/* Price */}
      <h2 className="mb-5 font-semibold">Price Range</h2>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>$0</span>
        <span>$500</span>
      </div>

      <input
        type="range"
        min="0"
        max="500"
        defaultValue="500"
        className="mt-3 w-full accent-slate-900"
      />

      <div className="my-7 border-t border-slate-200" />

      {/* Rating */}
      <h2 className="mb-5 font-semibold">Rating</h2>

      <div className="space-y-3">
        {[4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-slate-900"
            />

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}
            </div>
          </label>
        ))}
      </div>

      <div className="my-7 border-t border-slate-200" />

      <button className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50">
        Clear Filters
      </button>
    </div>
  );
}
