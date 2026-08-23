import { Input } from '@base-ui/react'
import Link from 'next/link'
import { Heart, Search, ShoppingCart, User} from "lucide-react"
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between  w-full px-2 m-2'>       
        <div>
            <div className='text-sm md:text-xl lg:text-2xl'>
                <Link href="/home" className='font-bold'>
                    <span className='text-sm md:text-xl lg:text-2xl text-blue-500'>R</span>
                    <span className='text-xs md:text-sm lg:text-sm'>AY SHOP</span>
                </Link>
            </div>
        </div>
        <div className=' flex justify-between items-center lg:gap-10 sm:gap-2 text-sm md:text-lg lg:text-xl' >
            <Link href="/home" >
                Home
            </Link>
            <Link href="/shop">
                Shop
            </Link>
            <Link href="/categories">
                Categories
            </Link>
            <Link href="/about">
                About
            </Link>
            <Link href="/contact">
                Contact
            </Link>
        </div>
        <div className='flex justify-center items-center gap-3'>
            <div className='flex justify-between items-center gap-3 border border-gray-300 rounded-sm shadow-2xl p-1 bg-gray-100'>
                <Search className='cursor-pointer'/>
                <Input 
                    placeholder='Search products'
                    className="outline-none"
                />
            </div>
            <ModeToggle />
            <User className='cursor-pointer'/>
            <Heart className='cursor-pointer'/>
            <ShoppingCart className='cursor-pointer'/>
        </div>
    </nav>
  )
}

export default Navbar