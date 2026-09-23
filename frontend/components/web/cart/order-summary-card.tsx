import { appliedPromo } from '@/app/cart/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tag, Badge, X, AlertCircle, Percent, ChevronRight, ShieldCheck, Lock } from 'lucide-react'
import { FormEvent, ChangeEvent } from 'react'

export type OrderSummaryCard = {
    appliedPromo: appliedPromo | null;
    removePromo :()=>void;
    handleApplyPromo : (e : FormEvent<HTMLFormElement>)=>void;
    promoInput : string;
    setPromoInput:(value : string) => void;
    promoError : string;
    discountAmount : number;
    shippingFee : number;
    estimatedTax : number;
    subTotal : number
    grandTotal : number;
    isCheckingOut : boolean;
    handleCheckOutProcess : ()=>void;

}

export default function OrderSummaryCard({appliedPromo,removePromo,handleApplyPromo, promoInput , setPromoInput , promoError , discountAmount , shippingFee , estimatedTax , subTotal ,grandTotal , isCheckingOut , handleCheckOutProcess}:OrderSummaryCard) {
  return (
       <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                  Order Summary
                </h2>

                {/* PROMO CODE SECTION */}
                <div className="my-5">
                  <label htmlFor="promo" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Promo Code
                  </label>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                        <Tag className="w-4 h-4" />
                        <span className="font-mono font-bold">{appliedPromo.code}</span>
                        <Badge>Applied</Badge>
                      </div>
                      <Button variant="ghost" onClick={removePromo} className="text-emerald-700 hover:text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="promo"
                            placeholder="Try SAVE10 or HALFPRICE"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            className="pl-9 font-mono text-xs uppercase"
                          />
                        </div>
                        <Button type="submit" variant="secondary">
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {promoError}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* CALCULATIONS BREAKDOWN */}
                <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">${subTotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5" /> Coupon Discount
                      </span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* CHECKOUT BUTTON */}
                <Button
                  onClick={handleCheckOutProcess}
                  disabled={isCheckingOut}
                  variant="default"
                  className="w-full mt-6 py-6 text-base font-semibold rounded-xl shadow-md gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                {/* PAYMENT ICONS */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-400 mb-3 font-medium">Guaranteed Safe & Secure Checkout</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-950 text-indigo-700 dark:text-indigo-300 font-black italic text-[10px] tracking-wider">
                      VISA
                    </div>
                    <div className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-950 flex items-center gap-0.5">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full -ml-1"></div>
                    </div>
                    <div className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-bold italic text-[10px]">
                      PayPal
                    </div>
                  </div>
                </div>

              </div>

              {/* Security guarantee note */}
              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>256-bit Bank Grade SSL Encryption keeps your payment details secure.</span>
              </div>
            </div>

  )
}
