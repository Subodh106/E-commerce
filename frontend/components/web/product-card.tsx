import { ProductType } from "@/Types/HomeTypes";
import { Heart, Star } from "lucide-react";

export default function ProductCard({
  product,
  liked,
  onWishlist,
}: {
  product: ProductType;
  liked: boolean;
  onWishlist: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          onClick={onWishlist}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:scale-105"
        >
          <Heart
            size={17}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-slate-700"
            }
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="mb-1 text-xs text-slate-500">
          {product.category}
        </p>

        <h3 className="truncate text-sm font-semibold">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1 text-xs">
            <Star
              size={13}
              className="fill-yellow-400 text-yellow-400"
            />
            <span>{product.rating}</span>
            <span className="text-slate-400">
              ({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}