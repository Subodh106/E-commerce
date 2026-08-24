import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    rating: 4.8,
    reviews: 128,
    image: "/images/products/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    rating: 4.6,
    reviews: 80,
    image: "/images/products/smart-watch.jpg",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    price: 79.99,
    rating: 4.7,
    reviews: 96,
    image: "/images/products/backpack.jpg",
  },
  {
    id: 4,
    name: "Classic White Sneakers",
    price: 89.99,
    rating: 4.5,
    reviews: 74,
    image: "/images/products/sneakers.jpg",
  },
]

export function FeaturedProductsSection() {
  return (
    <section className="border-t py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Discover some of our most popular products.
            </p>
          </div>

          <Button
            variant="ghost"
            className="hidden gap-2 sm:flex"
          >
            <Link href="/products">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-xl border bg-card"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </Link>

                {/* Wishlist */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 size-8 rounded-full"
                >
                  <Heart className="size-4" />
                  <span className="sr-only">
                    Add {product.name} to wishlist
                  </span>
                </Button>
              </div>

              {/* Product Information */}
              <div className="space-y-3 p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="line-clamp-1 font-semibold transition-colors hover:text-primary">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />

                  <span className="font-medium">
                    {product.rating}
                  </span>

                  <span className="text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold sm:text-base">
                    ${product.price.toFixed(2)}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8"
                  >
                    <ShoppingCart className="size-4" />
                    <span className="sr-only">
                      Add {product.name} to cart
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-6 sm:hidden">
          <Button variant="outline" className="w-full">
            <Link href="/products">
              View all products
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}