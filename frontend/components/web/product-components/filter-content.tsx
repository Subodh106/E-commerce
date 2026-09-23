import { Star, Heart } from "lucide-react";
import PriceRange from "./price-range";

export default function FilterContent({
  categories,
  selectedCategory,
  setSelectedCategory,
  price , 
  setPrice
}: {
  categories :string[] ;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  price : number;
  setPrice :(price : number)=>void;

}) {

  return (
    <div className="dark:bg-slate-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
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
              className="h-4 w-4 dark:text-zinc-100"
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
          <PriceRange price={price} setPrice = {setPrice} />

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
