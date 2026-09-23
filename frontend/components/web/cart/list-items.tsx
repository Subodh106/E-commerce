import { cart } from '@/app/cart/page'
import { Button } from '@/components/ui/button'
import { removeItem } from '@base-ui/react/internals/itemEquality'
import { Badge, Trash2, Minus, Plus, X, ArrowLeft } from 'lucide-react'
import React from 'react'

export type ListItems = {
    cart : cart[];
    totalItemCount : number;
    setShowClearModal:(value :boolean)=>void;
    updateQuantity : (id:string , value:number)=>void;
    removeItem : (id:string )=>void;
    clearCart : ()=>void
}

export default function ListItems(
    {
        cart,
        totalItemCount,
        setShowClearModal,
        updateQuantity,
        removeItem,
        clearCart
    }
    :ListItems
) {

  return (
     <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Your Cart</h1>
                    <Badge>
                      {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}                    className="text-red-500 hover:text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Cart
                  </Button>
                </div>

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950">
                        <th className="py-3.5 px-6">Product</th>
                        <th className="py-3.5 px-4 text-center">Price</th>
                        <th className="py-3.5 px-4 text-center">Quantity</th>
                        <th className="py-3.5 px-4 text-right">Total</th>
                        <th className="py-3.5 px-6 text-right"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                          {/* Product Details */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                              />
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                                  {item.name}
                                </h3>
                                {item.variant && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Variant: <span className="font-medium text-slate-700 dark:text-slate-300">{item.variant}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Unit Price */}
                          <td className="py-4 px-4 text-center font-medium text-slate-700 dark:text-slate-300">
                            ${item.price.toFixed(2)}
                          </td>

                          {/* Quantity Selector */}
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 p-0.5">
                                 <Button
                                  variant="ghost"
                                
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-7 w-7 text-slate-600 dark:text-slate-300"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </Button>
                                <span className="w-8 text-center text-xs font-semibold text-slate-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-7 w-7 text-slate-600 dark:text-slate-300"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </Button> 
                              </div>
                            </div>
                          </td>

                          {/* Total for item */}
                          <td className="py-4 px-4 text-right font-semibold text-slate-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>

                          {/* Remove button */}
                          <td className="py-4 px-6 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARD VIEW */}
                <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                            
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          {item.variant && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {item.variant}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Unit Price: <span className="font-medium text-slate-700 dark:text-slate-300">${item.price.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        {/* Mobile Quantity selector */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 p-0.5">
                          <Button
                            variant="ghost"
                           
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-7 w-7"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </Button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-7 w-7"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {/* Mobile Item Total */}
                        <div>
                          <span className="text-xs text-slate-400">Total: </span>
                          <span className="font-bold text-slate-900 dark:text-white text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer link back to shop */}
                <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </div>

              </div>
            </div>
  )
}
