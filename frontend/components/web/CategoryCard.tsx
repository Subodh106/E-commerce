import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '../ui/card'

const CategoryCard = () => {
  return (
    <Card>
        <CardContent>
            <Image 
                src="https://media.wired.com/photos/69b1e7c08674675f846f02bf/4:3/w_640,c_limit/macbook-pro-gaming.jpg"
                height={500}
                width={500}
                alt='Productimg'
            />
        </CardContent>
        <CardFooter className='flex justify-center items-center flex-col'>
            <div>
                Electronics
            </div>
            <div>
                24 Products
            </div>
        </CardFooter>
    </Card>
  )
}

export default CategoryCard