import { Input } from '@base-ui/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {Search} from "lucide-react"
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-3 py-1'>
        <div>
            <div>
                E-Commerce
            </div>
        </div>
        <div className='border border-black rounded-sm p-1 flex items-center justify-between' >
            <Input placeholder='Search'className="focus:none"/>
            <Search/>
            <ModeToggle/>
        </div>
        <div className='flex justify-center items-center gap-3'>
            <Link href="/auth/log-in">
                <Button className="text-center cursor-pointer" variant="outline">lOG IN</Button>
            </Link>
            <Link href="/auth/sign-up">
                <Button className="text-center cursor-pointer">
                    SIGN UP 
                </Button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar