"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import BreadCrumb from "@/components/web/bread-crumb";
import FilterContent from "@/components/web/filter-content";
import ProductCard from "@/components/web/product-card";
import DesktopSideBar from "@/components/web/desktop-sidebar";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    rating: 4.6,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 149.99,
    rating: 4.4,
    reviews: 69,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    category: "Bags",
    price: 79.99,
    rating: 4.7,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Denim Jacket",
    category: "Clothing",
    price: 58.99,
    rating: 4.3,
    reviews: 68,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "Accessories",
    price: 29.99,
    rating: 4.6,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Table Lamp",
    category: "Home & Living",
    price: 34.99,
    rating: 4.5,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 18.99,
    rating: 4.2,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "White Sneakers",
    category: "Shoes",
    price: 56.99,
    rating: 4.5,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Leather Wallet",
    category: "Accessories",
    price: 24.99,
    rating: 4.3,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Clothing",
  "Shoes",
  "Bags",
  "Accessories",
  "Home & Living",
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileFilter, setMobileFilter] = useState(false);

  const filteredProducts =
    selectedCategory === "All Categories"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "Price: Low to High") {
      return a.price - b.price;
    }

    if (sort === "Price: High to Low") {
      return b.price - a.price;
    }

    if (sort === "Rating") {
      return b.rating - a.rating;
    }

    return b.id - a.id;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Breadcrumb */}
        <BreadCrumb/>

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8">
        {/* Desktop Sidebar */}
        <DesktopSideBar categories = {categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory} />

        {/* Mobile Filter */}
        {mobileFilter && (
          <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
            <div className="absolute right-0 h-full w-80 overflow-y-auto bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>

                <button
                  onClick={() => setMobileFilter(false)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <FilterContent
                categories = {categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        )}

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="mt-1 text-sm text-slate-500">
                Showing 1–{sortedProducts.length} of 120 products
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setMobileFilter(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-4 pr-10 text-sm outline-none focus:border-slate-900"
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-900"
            />
          </div>

          {/* Products */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  liked={wishlist.includes(product.id)}
                  onWishlist={() => toggleWishlist(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-slate-300">
              <div className="text-center">
                <p className="font-medium">No products found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another category.
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50">
                <ChevronLeft size={16} />
              </button>

              <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm text-white">
                1
              </button>

              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
                2
              </button>

              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
                3
              </button>

              <span className="px-2 text-slate-400">...</span>

              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
                10
              </button>

              <button className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}