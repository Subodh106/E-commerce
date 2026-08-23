import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <>
    <Image src="/img.png" height={500} width={500} alt="hero-img" className='max-w-full'>
    </Image>
    </>
  )
}

export default HeroSection