import {  StarIcon} from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Image from 'next/image'

const ProductCard = () => {
  return (
    <Card className='border'>
        <CardContent>
          <Image
          src="https://media.wired.com/photos/69b1e7c08674675f846f02bf/4:3/w_640,c_limit/macbook-pro-gaming.jpg"
          alt='product'
          width={500}
          height={500}
          
          className='object-cover'
          />
        </CardContent>
        <CardFooter className='flex flex-col items-start'>
          <p>Card Name</p>
          <div>
            $400
          </div>
          <div className='flex items-center justify-center'>
            <StarIcon height={10} className=''/> 
            <span className='text-center text-sm'>
              4(300)
            </span>
          </div>
          
        </CardFooter>
    </Card>
  )
}

export default ProductCard