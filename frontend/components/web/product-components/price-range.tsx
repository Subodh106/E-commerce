import React from 'react'

const PriceRange = ({price , setPrice}:{
    price:number;
    setPrice : (price:number)=>void;

}) => {

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPrice(event.target.valueAsNumber);
    }

  return (
    <div className='dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-200'>
        <h2 className="mb-5 font-semibold">Price Range</h2>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>$10</span>
        <span>${price}</span>
      </div>

      <input
        type="range"
        min={100}
        max={5000}
        value={price} 
        onChange={handleChange}
        className="mt-3 w-full accent-slate-900"
      />
    </div>
  )
}

export default PriceRange