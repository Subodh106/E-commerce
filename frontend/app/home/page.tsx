import { CategorySection } from "@/components/web/category-section"
import { FeaturedProductsSection } from "@/components/web/featured-products-section"
import { FeaturesSection } from "@/components/web/feature-section"
import { HeroSection } from "@/components/web/hero-section"
import { NewsletterSection } from "@/components/web/news-letter-section"
import { Separator } from "@base-ui/react"

const  page = async() => {
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