import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Armchair,
  Headphones,
  Shirt,
  ShoppingBag,
  Watch,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    productCount: 24,
    image: "/images/categories/electronics.jpg",
    icon: Headphones,
  },
  {
    name: "Clothing",
    slug: "clothing",
    productCount: 48,
    image: "/images/categories/clothing.jpg",
    icon: Shirt,
  },
  {
    name: "Shoes",
    slug: "shoes",
    productCount: 36,
    image: "/images/categories/shoes.jpg",
    icon: ShoppingBag,
  },
  {
    name: "Bags",
    slug: "bags",
    productCount: 28,
    image: "/images/categories/bags.jpg",
    icon: ShoppingBag,
  },
  {
    name: "Accessories",
    slug: "accessories",
    productCount: 32,
    image: "/images/categories/accessories.jpg",
    icon: Watch,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    productCount: 34,
    image: "/images/categories/home-living.jpg",
    icon: Armchair,
  },
]

export function CategorySection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Shop by Categories
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Browse top categories and find products you'll love.
            </p>
          </div>

          <Button
            variant="ghost"
            className="hidden shrink-0 gap-2 sm:flex"
          >
            <Link href="/categories">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw,
                           (max-width: 1024px) 33vw,
                           16vw"
                  />
                </div>

                {/* Content */}
                <div className="relative p-4">
                  {/* Icon */}
                  <div className="absolute -top-5 left-4 flex size-10 items-center justify-center rounded-full border bg-background shadow-sm">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.productCount} Products
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 sm:hidden">
          <Button variant="outline" className="w-full gap-2" >
            <Link href="/categories">
              View all categories
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}