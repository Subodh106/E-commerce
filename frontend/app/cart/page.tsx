"use client"
import { useState, useMemo, FormEvent, useEffect } from 'react';
import {
  RotateCcw,
  AlertCircle,
  ShoppingBasket,
} from 'lucide-react';
import { Button  } from '@/components/ui/button';

import Breadcrumb from '@/components/web/cart/Breadcrumb';
import FreeShippingIndicator from '@/components/web/cart/free-shipping-indicator';
import OrderConfirm from '@/components/web/cart/order-confirm';
import ListItems from '@/components/web/cart/list-items';
import OrderSummaryCard from '@/components/web/cart/order-summary-card';
import { toast } from 'sonner';
import axios from 'axios';

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
    id: '101',
    name: 'Wireless Headphones',
    price: 99,
    quantity: 1,
    variant: 'Black',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: '102',
    name: 'Cotton T-Shirt',
    price: 19.99,
    quantity: 2,
    variant: 'White / L',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: '103',
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
  const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const [serverErrors , setServerErrors] = useState();


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



  const handleClearCart = () => {
    setCart([]);
    setShowClearModal(false);
  };

  const handleRestoreCart = () => {
    setCart(INITIAL_CART);
    setAppliedPromo(null);
    setPromoInput('');
    setOrderConfirmed(false);
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
      setPromoInput('');
    } else if (cleanCode === 'HALFPRICE') {
      setAppliedPromo({ code: 'HALFPRICE', type: 'percent', amount: 0.5 });
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try "SAVE10" or "HALFPRICE"');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
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

  const getCart =  async()=>{
      
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/cart` , {withCredentials:true});
      console.log(res);
      } catch (error:any) {
        setServerErrors(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } 
  }

  const removeProductFromCart = async(id:string)=>{
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/cart/${id}`,{withCredentials:true});
      console.log(res);
    } catch (error:any) {
      setServerErrors(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    getCart();
  },[])

  return (
   
      <div>
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
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-950 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
                removeItem={removeProductFromCart}
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

    
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-red-100 dark:bg-slate-950 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
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

      </div>
  );
}