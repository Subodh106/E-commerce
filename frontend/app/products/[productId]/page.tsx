'use client';

import { act, useState } from 'react';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import LeftSection from '@/components/web/product-details-components/left-section';
import Rightsection from '@/components/web/product-details-components/right-section';

const images = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60',
];

const colors = [
  { name: 'Black', class: 'bg-black' },
  { name: 'White', class: 'bg-white border border-gray-300' },
  { name: 'Blue', class: 'bg-blue-600' },
];

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('Description');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Image Gallery & Tabs */}
      <LeftSection images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        />

        {/* Right Section: Product Information & Purchase Controls */}
       
       
        <Rightsection  
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        quantity={quantity}
        setQuantity={setQuantity}
        />
       
      </div>
    </div>
  );
}