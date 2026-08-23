"use client"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/web/FeaturedProducts"
import FeatureSection from "@/components/web/FeatureSection"
import HeroSection from "@/components/web/HeroSection"
import ProductByCategories from "@/components/web/ProductByCategories"
import ProductCard from "@/components/web/ProductCard"
import SpecialSection from "@/components/web/SpecialSection"
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
      <FeatureSection/>
      <ProductByCategories/>
      <FeaturedProducts/>
      <SpecialSection/>
    </div>
  )
}

export default page