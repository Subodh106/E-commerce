"use client"
import { useState, useMemo, ChangeEvent } from 'react';
import {
  Trash2,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  Tag,
  ChevronRight,
  AlertCircle,
  ShoppingBasket,
  Lock,
  Percent,
  Check,
  Badge,
} from 'lucide-react';
import { Button  } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

type cart = {
  id : string ;
  name : string ;
  price : number ;
  quantity : number;
  variant : string ;
  image : string ;
  inStock : boolean;
}

const INITIAL_CART = [
  {
    id: 'sh-101',
    name: 'Wireless Headphones',
    price: 99,
    quantity: 1,
    variant: 'Black',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'sh-102',
    name: 'Cotton T-Shirt',
    price: 19.99,
    quantity: 2,
    variant: 'White / L',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'sh-103',
    name: 'Minimal Backpack',
    price: 78.99,
    quantity: 1,
    variant: 'Black',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    inStock: true,
  },
];

type Toast = {
  message: string;
  type: string;
};

type appliedPromo = {
  code : string , 
  type: string ,
  amount : number
}

export default function page() {
  // Cart state
  const [cart, setCart] = useState<cart[]>(INITIAL_CART);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<appliedPromo|null>(null); // { code: 'SAVE10', type: 'fixed'|'percent', amount: 10 }
  const [promoError, setPromoError] = useState('');
  
  // UI States
  const [showClearModal, setShowClearModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Toast Notification Helper
  const triggerToast = (message :string, type = 'default') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateQuantity = (id:string, delta:number) => {
    setCart((prev) =>
      prev.map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : undefined;
          }
          return item;
        })
        .filter((item): item is cart => item !== undefined)
    );
  };

  const removeItem = (id :string, name:string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    triggerToast(`Removed "${name}" from cart`);
  };

  const handleClearCart = () => {
    setCart([]);
    setShowClearModal(false);
    triggerToast('Shopping cart cleared');
  };

  const handleRestoreCart = () => {
    setCart(INITIAL_CART);
    setAppliedPromo(null);
    setPromoInput('');
    setOrderConfirmed(false);
    triggerToast('Restored sample cart items');
  };

  const handleApplyPromo = (e:ChangeEvent) => {
    e.preventDefault();
    setPromoError('');

    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a coupon code.');
      return;
    }

    if (cleanCode === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', type: 'fixed', amount: 10 });
      triggerToast('Coupon SAVE10 applied ($10 OFF)!', 'success');
      setPromoInput('');
    } else if (cleanCode === 'HALFPRICE') {
      setAppliedPromo({ code: 'HALFPRICE', type: 'percent', amount: 0.5 });
      triggerToast('Coupon HALFPRICE applied (50% OFF)!', 'success');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try "SAVE10" or "HALFPRICE"');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    triggerToast('Coupon code removed');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'fixed') {
      return Math.min(subtotal, appliedPromo.amount);
    }
    if (appliedPromo.type === 'percent') {
      return subtotal * appliedPromo.amount;
    }
    return 0;
  }, [subtotal, appliedPromo]);

  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  
  // Free shipping logic ($100 target)
  const freeShippingThreshold = 100;
  const shippingFee = postDiscountSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 9.99;
  const estimatedTax = postDiscountSubtotal * 0.08; // 8% Tax rate
  const grandTotal = postDiscountSubtotal + shippingFee + estimatedTax;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutProcess = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      setCart([]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 antialiased">
      
      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          {/* <span>{toast.message}</span> */}
        </div>
      )}

      {/* 1. TOP HEADER / NAV BAR */}
      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <a href="#" className="hover:text-indigo-600">Home</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="#" className="hover:text-indigo-600">Shop</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Shopping Cart</span>
        </div>

        {/* Free Shipping Progress Indicator */}
        {cart.length > 0 && (
          <div className="mb-8 p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/60 dark:bg-indigo-950/20 backdrop-blur-xs">
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
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, (postDiscountSubtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* ORDER SUCCESS SCREEN */}
        {orderConfirmed ? (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
        ) : cart.length === 0 ? (
          /* EMPTY CART SCREEN */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBasket className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Your cart is empty</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={handleRestoreCart} variant="default" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Load Sample Cart Items
            </Button>
          </div>
        ) : (
          /* 2-COLUMN CART CONTENT LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: ITEMS LIST (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                
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
                    onClick={() => setShowClearModal(true)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Cart
                  </Button>
                </div>

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/50">
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
                                className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0"
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
                              onClick={() => removeItem(item.id, item.name)}
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
                          className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                            
                              onClick={() => removeItem(item.id, item.name)}
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
                <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </div>

              </div>
            </div>

            {/* COLUMN 2: ORDER SUMMARY CARD (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                  Order Summary
                </h2>

                {/* PROMO CODE SECTION */}
                <div className="my-5">
                  <label htmlFor="promo" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Promo Code
                  </label>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
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
                    <span className="font-semibold text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
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
                  onClick={handleCheckoutProcess}
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
              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>256-bit Bank Grade SSL Encryption keeps your payment details secure.</span>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* CLEAR CART RADIX/SHADCN CONFIRMATION MODAL */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">Clear Shopping Cart?</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to remove all products from your cart? This action cannot be reversed.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowClearModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleClearCart} className="flex-1">
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      {/* <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-bold mb-3 text-slate-900 dark:text-white">ShopHub</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Discover top quality products at the best prices. Fast delivery & simple returns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Customer Care</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-xs">
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Track Order</a></li>
                <li><a href="#" className="hover:text-indigo-600">Returns & Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Company</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-xs">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Newsletter</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Get 10% off your first order.</p>
              <div className="flex gap-1.5">
                <Input placeholder="Your email" className="h-8 text-xs" />
                <Button>Join</Button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>© {new Date().getFullYear()} ShopHub Inc. Built with Shadcn UI & Tailwind CSS.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </footer> */}

    </div>
  );
}