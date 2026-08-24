import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"

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
          {products.map((product) => {
              return (
                <ProductCard key={product.id} id={product.id} name={product.name} rating={product.rating} price={product.rating} reviews={product.reviews} image={product.image} />
              )
          })
}
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