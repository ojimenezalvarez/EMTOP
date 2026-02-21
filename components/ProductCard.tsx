
import React from 'react';
import { Product, PriceType } from '../types';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const badgeColors = {
    [PriceType.NORMAL]: 'hidden',
    [PriceType.DISCOUNT]: 'bg-blue-600 text-white',
    [PriceType.OFFER]: 'bg-red-600 text-white',
    [PriceType.SUPER_OFFER]: 'bg-yellow-400 text-black',
  };

  return (
    <div 
      onClick={() => onView(product)}
      className="group bg-white border-2 border-gray-100 p-6 flex flex-col hover:border-red-600 transition-all hover:shadow-2xl cursor-pointer relative overflow-hidden"
    >
      <div className="h-56 bg-gray-50 mb-6 flex items-center justify-center p-6 relative overflow-hidden">
        <div className={`absolute top-4 left-4 px-4 py-1 text-[9px] font-black uppercase tracking-widest z-10 shadow-lg -skew-x-12 ${badgeColors[product.priceType]}`}>
          <span className="inline-block skew-x-12">{product.priceType}</span>
        </div>
        <img 
          src={product.imageUrl} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
          alt={product.name} 
        />
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest block mb-2">{product.category}</span>
        <h3 className="font-black text-sm uppercase leading-tight h-10 line-clamp-2 mb-4 group-hover:text-red-600 transition-colors">{product.name}</h3>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-black text-red-600 tracking-tighter italic leading-none">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-300 line-through font-bold italic mb-1">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Calidad Industrial</span>
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
