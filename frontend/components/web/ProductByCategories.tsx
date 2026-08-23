import React from 'react'
import CategoryCard from './CategoryCard'
import Link from 'next/link'

const ProductByCategories = () => {
  return (
    <div className='flex flex-col gap-2 bg-slate-200 p-4 rounded-xl'>
        <div className='flex justify-between items-center-safe pt-3 px-3'>
            <span className='text-lg font-bold'>
                Shop by Categories
            </span>
            <Link href="/category">
                <span className='text-xs font-semibold text-slate-400'>
                View all
            </span>
            </Link>
        </div>
        <div className='flex justify-center items-center gap-3 px-2'>
        <CategoryCard />
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
    </div>
    </div>
  )
}

export default ProductByCategories