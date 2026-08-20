import { Input } from '@base-ui/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {Search} from "lucide-react"
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-3 py-1 border'>
        <div>
            <div className='text-2xl'>
                E-Commerce
            </div>
        </div>
        <div className='border border-black rounded-sm p-1 flex items-center justify-between' >
            <Input placeholder='Search' className="outline-none"/>
            <Search/>
        </div>
        <div className='flex justify-center items-center gap-3'>
            <ModeToggle/>
            <Link href="/auth/log-in">
                <Button className="text-center cursor-pointer text-xl p-3" variant="outline">lOG IN</Button>
            </Link>
            <Link href="/auth/sign-up">
                <Button className="text-center cursor-pointer text-xl p-3">
                    SIGN UP 
                </Button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar