import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="border-b">
      <div className="container mx-auto grid min-h-150 items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 lg:py-16">
        {/* Content */}
        <div className="flex max-w-xl flex-col items-start">
          <span className="mb-6 rounded-full border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            New Collection
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover the best products for your{" "}
            <span className="text-primary">lifestyle</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Explore quality products carefully selected to make everyday
            shopping simple, reliable, and enjoyable.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              <Link href="/products">
                Shop Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" >
              <Link href="/categories">
                Explore Categories
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-2xl">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db14255/media-gallery/touch/fpr/laptop-db14255t-bl-fpr-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=975&qlt=100,1&resMode=sharp2&size=975,804&chrss=full"
              alt="Featured products"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Small floating card */}
          <div className="absolute -bottom-4 left-4 hidden rounded-xl border bg-background p-4 shadow-lg sm:block">
            <p className="text-xs text-muted-foreground">
              Featured Collection
            </p>

            <p className="mt-1 text-sm font-semibold">
              Fresh styles. Better choices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}