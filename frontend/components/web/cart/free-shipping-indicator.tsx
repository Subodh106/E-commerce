import { cart } from '@/app/cart/page'
import { Truck, Check } from 'lucide-react'
import React from 'react'

type freeShippingIndicator = {
    cart : cart[];
    postDiscountSubtotal:number;
    freeShippingThreshold:number;
}


export default function FreeShippingIndicator({cart,postDiscountSubtotal,freeShippingThreshold}:freeShippingIndicator) {
  return (
  cart.length > 0 && (
          <div className="mb-8 p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/60 dark:bg-slate-950 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2">
              <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200">
                <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {postDiscountSubtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> You've unlocked Free Standard Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-indigo-600 dark:text-indigo-400">${(freeShippingThreshold - postDiscountSubtotal).toFixed(2)}</strong> more to unlock <strong>FREE Shipping</strong>
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {Math.min(100, Math.round((postDiscountSubtotal / freeShippingThreshold) * 100))}%
              </span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 dark:bg-slate-950 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, (postDiscountSubtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )
  )
}
