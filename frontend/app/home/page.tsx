"use client"
import { CategorySection } from "@/components/web/category-section"
import { FeaturedProductsSection } from "@/components/web/featured-products-section"

import { FeaturesSection } from "@/components/web/feature-section"
import { HeroSection } from "@/components/web/hero-section"
import { NewsletterSection } from "@/components/web/news-letter-section"
import { Separator } from "@base-ui/react"
import axios from "axios"

const page = () => {

  const fetchProduct =async()=>{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/products`)
  }

  return (
    <div className="flex gap-3 flex-col ">
      <HeroSection/>
      <Separator/>
      <FeaturesSection/>
      <CategorySection/>
      <FeaturedProductsSection/>
      <NewsletterSection/>
    </div>
  )
}

export default page