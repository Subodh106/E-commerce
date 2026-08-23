import ProductCard from './ProductCard'
import Link from 'next/link'

const FeaturedProducts = () => {
  return (
    <div className='flex flex-col gap-2 bg-slate-200 p-4 rounded-xl'>
        <div className='flex justify-between items-center-safe pt-3 px-3'>
            <span className='text-lg font-bold'>
                Featured Products
            </span>
            <Link href="/products">
            <span className='text-xs font-semibold text-slate-400'>
                View all
            </span>
            </Link>
        </div>
        <div className='flex justify-center items-center gap-3 px-2'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
    </div>
  )
}

export default FeaturedProducts