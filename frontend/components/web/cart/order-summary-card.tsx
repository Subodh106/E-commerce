import { appliedPromo } from '@/app/cart/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tag, Badge, X, AlertCircle, Percent, ChevronRight, ShieldCheck, Lock } from 'lucide-react'
import { FormEvent, ChangeEvent } from 'react'

export type OrderSummaryCard = {
    subTotal : number;
    isCheckingOut : boolean;
    handleCheckOutProcess : ()=>void;

}

export default function OrderSummaryCard({subTotal , isCheckingOut , handleCheckOutProcess}:OrderSummaryCard) {
  return (
       <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                  Order Summary
                </h2>

                {/* CALCULATIONS BREAKDOWN */}
                <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">${subTotal.toFixed(2)}</span>
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
