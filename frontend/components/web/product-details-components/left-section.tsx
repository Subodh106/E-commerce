import React from 'react'

type leftSectionProp = {
    images : string[];
    selectedImage:number;
    setSelectedImage:(selectedImage:number)=> void;
    activeTab :string ,
    setActiveTab:(activeTab:string)=>void;
}

export default function LeftSection({images , selectedImage , setSelectedImage , activeTab , setActiveTab}:leftSectionProp) {
  return (
 <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Thumbnails */}
          <div className="md:col-span-2 flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-16 md:w-full md:h-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === idx ? 'border-zinc-900 dark:border-white' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
         

          {/* Main Display Image */}
          <div className="md:col-span-10 order-1 md:order-2 bg-gray-100 dark:bg-zinc-900 rounded-2xl overflow-hidden relative aspect-square flex items-center justify-center">
            <img
              src={images[selectedImage]}
              alt="Wireless Headphones"
              className="object-cover w-full h-full transition-all duration-300"
            />

          </div>

          {/* Product Tabs Section */}
          <div className="md:col-span-12 order-3 mt-8">
            <div className="border-b border-gray-200 dark:border-zinc-800 flex gap-6 md:gap-8 text-sm font-medium overflow-x-auto">
              {['Description', 'Specifications', 'Reviews (128)', 'Related Products'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-6 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              {activeTab === 'Description' && (
                <p>
                  Experience premium sound quality with our wireless headphones. Featuring advanced noise cancellation, comfortable design, and up to 30 hours of battery life. Engineered for immersive audio performance wherever you go.
                </p>
              )}
              {activeTab === 'Specifications' && (
                <ul className="space-y-2">
                  <li><strong>Driver Unit:</strong> 40mm dynamic</li>
                  <li><strong>Battery Life:</strong> Up to 30 hours</li>
                  <li><strong>Connectivity:</strong> Bluetooth 5.0</li>
                  <li><strong>Weight:</strong> 250g</li>
                </ul>
              )}
              {activeTab === 'Reviews (128)' && (
                <p>Verified buyer reviews with a combined 4.6-star rating breakdown.</p>
              )}
              {activeTab === 'Related Products' && (
                <p>Explore matching accessories and audio items curated for this collection.</p>
              )}
            </div>
          </div>
        </div>

  )
}
