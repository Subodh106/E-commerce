
import { Button } from '@/components/ui/button'
import { CheckCircle2, RotateCcw } from 'lucide-react'

export default function OrderConfirm({handleRestoreCart}:{handleRestoreCart:()=>void}) {
  return (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Order Confirmed!</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Thank you for your order. We've sent a detailed confirmation email with tracking information.
            </p>
            <Button onClick={handleRestoreCart} variant="default" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset Demo & Return to Cart
            </Button>
          </div>
  )
}
