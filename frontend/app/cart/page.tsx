"use client"
import { useState, useMemo, FormEvent, useEffect } from 'react';
import {
  RotateCcw,
  AlertCircle,
  ShoppingBasket,
  MoveLeftIcon,
} from 'lucide-react';
import { Button  } from '@/components/ui/button';

import Breadcrumb from '@/components/web/cart/Breadcrumb';
import FreeShippingIndicator from '@/components/web/cart/free-shipping-indicator';
import OrderConfirm from '@/components/web/cart/order-confirm';
import ListItems from '@/components/web/cart/list-items';
import OrderSummaryCard from '@/components/web/cart/order-summary-card';
import { toast } from 'sonner';
import axios from 'axios';
import { clearAllItemFromCart, fetchCart, removeItemFromCart } from '@/services/cartService';
import LoadingSpinner from '@/components/web/loading-spinner';
import Link from 'next/link';

export type cart = {
  added_at:string;
  cart_id: number;
  category:categroyType;
  id : number ;
  imageUrl:string;
  price:number;
  productId:number;
  productName:string;
  quantity:number;
  subtotal:number;
}

type categroyType={
  id:number;
  name:string;
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
  const [cart, setCart] = useState<cart[]>([]);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<appliedPromo|null>(null); // { code: 'SAVE10', type: 'fixed'|'percent', amount: 10 }
  const [promoError, setPromoError] = useState('');
  const[subTotal , setSubtotal] = useState<number>(100);
  const[discountAmount,setDiscountAmount]=useState<number>(10);
  const[loading , setLoading]=useState<boolean>(false);  


  // UI States
  // const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const [serverErrors , setServerErrors] = useState();


  const updateQuantity = (id:number, delta:number) => {
  };



  // const handleClearCart = () => {
  //   setCart([]);
  //   setShowClearModal(false);
  // };

  const handleRestoreCart = () => {
  };

  const handleApplyPromo = (e: FormEvent<HTMLFormElement>) => {
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

 
  const postDiscountSubtotal = 100;
  
  // Free shipping logic ($100 target)
  const freeShippingThreshold = 100;
  const shippingFee = 100;
  const estimatedTax = 0.4
  const grandTotal = postDiscountSubtotal + shippingFee + estimatedTax;

  const totalItemCount = 10;

  const handleCheckoutProcess = () => {
  };

  const getCart =  async()=>{
      setLoading(true);
      try {
        const res = await fetchCart();
        setCart(res?.data?.data?.cartItems)
        console.log(res.data?.data?.cartItems)
        console.log(res?.data?.data);
        console.log("adsadfds");
      } catch (error:any) {
        setServerErrors(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      }finally{
        setLoading(false);
      }
  }

  const removeProductFromCart = async(id:number)=>{
    try {
      const res = await removeItemFromCart(id);
      console.log(res.status);
    } catch (error:any) {
      setServerErrors(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  }

  const clearCart = async()=>{
    try {
      const res = await clearAllItemFromCart();
      console.log(res.status)
    } catch (error:any) {
      setServerErrors(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    getCart();
  },[])

  console.log(cart)

    if(loading) return <LoadingSpinner/>

  return (
   
      <div>
      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Bar */}
          <Breadcrumb/> {/*

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
              <Link href="/products">
              <Button  variant="default" className="gap-2">
              <MoveLeftIcon className='w-4 h-4'/>
                  Continue Shopping 
            </Button>
              </Link>
          </div>
        ) : (
          /* 2-COLUMN CART CONTENT LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: ITEMS LIST (8 cols) */}
              <ListItems
                cart={cart}
                totalItemCount={totalItemCount}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
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
                subTotal={subTotal}
                grandTotal={grandTotal}
                isCheckingOut = {isCheckingOut}
                handleCheckOutProcess={handleCheckoutProcess}
            />

          </div>
        )}
      </main>

      </div>
  );
}