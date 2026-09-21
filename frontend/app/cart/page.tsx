"use client"
import { useState, useMemo, FormEvent } from 'react';
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
import { Navbar } from '@/components/web/navbar';
import Breadcrumb from '@/components/web/cart/Breadcrumb';
import FreeShippingIndicator from '@/components/web/cart/free-shipping-indicator';
import OrderConfirm from '@/components/web/cart/order-confirm';
import ListItems from '@/components/web/cart/list-items';
import OrderSummaryCard from '@/components/web/cart/order-summary-card';
import { es } from 'zod/locales';

export type cart = {
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

export type appliedPromo = {
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

  const handleApplyPromo = (e: FormEvent<HTMLFormElement>) => {
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
      <Navbar/>

      {/* Floating Toast Notification */}
      {/* {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )} */}

      {/* 1. TOP HEADER / NAV BAR */}
      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Bar */}
          <Breadcrumb/>

        {/* Free Shipping Progress Indicator */}
        <FreeShippingIndicator
          cart={cart}
          postDiscountSubtotal={postDiscountSubtotal}
          freeShippingThreshold={freeShippingThreshold}
        />

        {/* ORDER SUCCESS SCREEN */}
        {orderConfirmed ? (
            <OrderConfirm handleRestoreCart={handleRestoreCart}/>
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
              <ListItems
                cart={cart}
                totalItemCount={totalItemCount}
                setShowClearModal={setShowClearModal}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />

            {/* COLUMN 2: ORDER SUMMARY CARD (4 cols) */}
              <OrderSummaryCard
                appliedPromo={appliedPromo}
                removePromo={removePromo}
                handleApplyPromo={handleApplyPromo}
                promoInput={promoInput}
                setPromoInput={setPromoInput}
                promoError={promoError}
                discountAmount={discountAmount}
                shippingFee={shippingFee}
                estimatedTax={estimatedTax}
                subTotal={subtotal}
                grandTotal={grandTotal}
                isCheckingOut = {isCheckingOut}
                handleCheckOutProcess={handleCheckoutProcess}
            />

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
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-20 transition-colors">
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
      </footer>

    </div>
  );
}