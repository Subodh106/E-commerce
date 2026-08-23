import { Section } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SpecialSection = () => {
  return (
    <section className='flex justify-between items-center-safe bg-blue-100 p-2 '>
        <div className='flex flex-col justify-center items-center-safe px-2'>
            <span className='font-semibold text-lg'>
                Get 10% off oon your first order
            </span>
            <span className='text-sm text-slate-600'>
                Join our newsletter and receive updates
            </span>
        </div>
        <div className='flex justify-center items-center gap-3'>
            <Input
                placeholder='Enter your email'
                className='bg-white rounded-sm'
                />
            <Button className="rounded-sm">Subscribe</Button>
        </div>
    </section>
  )
}

export default SpecialSection