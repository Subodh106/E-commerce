import { CategorySection } from "@/components/web/home-components/category-section"
import { FeaturedProductsSection } from "@/components/web/home-components/featured-products-section"
import { FeaturesSection } from "@/components/web/home-components/feature-section"
import { HeroSection } from "@/components/web/home-components/hero-section"
import { NewsletterSection } from "@/components/web/home-components/news-letter-section"
import { Separator } from "@base-ui/react"

const  page = () => {
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