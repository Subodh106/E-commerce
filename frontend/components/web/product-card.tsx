import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { Star , ShoppingCart, } from 'lucide-react'
import React from 'react'
import { ProductType } from '@/Types/HomeTypes'




const ProductCard = ({id , name , image ,rating ,price , reviews}:ProductType) => {
  return (
    <article className="group overflow-hidden rounded-xl border bg-card"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Link href={`/products/${id}`}>
                  <Image
                    src={image}
                    alt={name}
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
                    Add {name} to wishlist
                  </span>
                </Button>
              </div>

              {/* Product Information */}
              <div className="space-y-3 p-4">
                <Link href={`/products/${id}`}>
                  <h3 className="line-clamp-1 font-semibold transition-colors hover:text-primary">
                    {name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />

                  <span className="font-medium">
                    {rating}
                  </span>

                  <span className="text-muted-foreground">
                    ({reviews})
                  </span>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold sm:text-base">
                    ${price.toFixed(2)}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8"
                  >
                    <ShoppingCart className="size-4" />
                    <span className="sr-only">
                      Add {name} to cart
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          )
        }

export default ProductCard