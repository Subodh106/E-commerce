"use client"
import { CategorySection } from "@/components/web/CategorySection"
import { FeaturedProductsSection } from "@/components/web/FeaturedProductsSection"

import { FeaturesSection } from "@/components/web/FeatureSection"
import { HeroSection } from "@/components/web/HeroSection"
import { NewsletterSection } from "@/components/web/NewsLetterSection"
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