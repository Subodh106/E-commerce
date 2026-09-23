"use client"
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, RefreshCw, ShieldCheck } from 'lucide-react'

type rightSectionProps ={
    colors:colors[];
    selectedColor:string,
    setSelectedColor:(selectedColor:string)=>void;
    quantity:number;
    setQuantity:(quantity:number)=>void;
    addToCart : ()=>void;
}

type colors = {
    name:string,
    class:string
}

export default function Rightsection({colors,selectedColor , setSelectedColor , quantity , setQuantity , addToCart}:rightSectionProps) {
  return (
     <div className="lg:col-span-4 flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Wireless Headphones</h1>
            <div className="mt-2 text-2xl font-semibold">$99.99</div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.6</span>
              <span className="text-sm text-gray-500">(128 reviews)</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            High-quality wireless headphones with noise cancellation and long battery life.
          </p>

          {/* Color Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-2">
              Color: <span className="font-semibold text-zinc-900 dark:text-white">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full ${color.class} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black transition-all ${
                    selectedColor === color.name ? 'ring-zinc-900 dark:ring-white' : 'ring-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-2">Quantity</label>
            <div className="flex items-center border border-gray-300 dark:border-zinc-800 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-gray-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-gray-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button onClick={addToCart} className="cursor-pointer w-full bg-zinc-900 dark:bg-slate-950 text-white dark:text-white py-3.5 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button  className="cursor-pointer w-full bg-gray-100 dark:bg-slate-950 text-zinc-900 dark:text-white py-3.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"> 
              Buy Now
            </button>
          </div>

          {/* Wishlist Toggle */}
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Heart className="w-4 h-4" /> Add to Wishlist
          </button>

          {/* Perks & Features */}
          <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 space-y-4 text-xs text-gray-600 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" />
              <div><span className="font-semibold text-zinc-900 dark:text-white">Free Shipping</span> on orders over $50</div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" />
              <div><span className="font-semibold text-zinc-900 dark:text-white">Easy Returns</span> 30-day return policy</div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" />
              <div><span className="font-semibold text-zinc-900 dark:text-white">Secure Payment</span> 100% secure checkout</div>
            </div>
          </div>

          {/* Recommended Sidebar Item */}
          <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
            <h3 className="text-sm font-semibold mb-4">You may also like</h3>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=60" alt="Smart Watch" className="w-12 h-12 object-cover rounded-md" />
              <div>
                <h4 className="text-xs font-medium">Smart Watch</h4>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white mt-0.5">$149.99</p>
              </div>
            </div>
          </div>

        </div>
  )
}
