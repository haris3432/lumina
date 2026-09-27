import React, { useState } from 'react';
import { Plus, Check, Eye, Star, Heart } from 'lucide-react';
import { Product } from '../types/jewelry';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
  const formattedOriginalPrice = product.originalPrice
    ? `Rs. ${product.originalPrice.toLocaleString()}`
    : null;

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white border border-[#EAE3D9] hover:border-[#C8B28E] transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-[#F3EDE3] overflow-hidden border-b border-[#EFE9E0]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase font-medium tracking-widest bg-[#1E1B18] text-[#FAF8F5] px-2.5 py-1">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="text-[10px] uppercase font-medium tracking-widest bg-[#D8C39E] text-[#1E1B18] px-2.5 py-1">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer border border-[#EAE3D9] ${
            isWishlisted
              ? 'bg-white text-[#1E1B18]'
              : 'bg-white/85 hover:bg-white text-[#6E6459] hover:text-[#1E1B18]'
          }`}
          title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 stroke-[1.5] ${isWishlisted ? 'fill-[#D8C39E] text-[#1E1B18]' : ''}`} />
        </button>

        {/* Quick View Hover Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-[#1E1B18] text-xs font-medium tracking-wider uppercase px-4 py-2 border border-[#DED5C8] shadow-sm flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#8C7355]" /> Quick View
          </span>
        </div>

        {/* Quick Add (+) Button */}
        <button
          onClick={handleQuickAdd}
          aria-label={`Quick add ${product.name} to bag`}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 z-10 cursor-pointer border ${
            isAddedRecently
              ? 'bg-[#1E1B18] text-[#FAF8F5] border-[#1E1B18] scale-105'
              : 'bg-[#FAF8F5] hover:bg-[#D8C39E] text-[#1E1B18] border-[#DED5C8]'
          }`}
          title="Quick Add to Bag"
        >
          {isAddedRecently ? (
            <Check className="w-4 h-4 animate-in zoom-in duration-200" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#787066] mb-1.5">
            <span className="uppercase tracking-widest">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#C8B28E] text-[#C8B28E]" />
              <span className="text-[#4A433B] tabular-nums">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-normal text-[#1E1B18] group-hover:text-[#8C7355] transition-colors leading-snug mb-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Material Snippet */}
          <p className="text-xs text-[#6E6459] line-clamp-1 mb-3">
            {product.material}
          </p>
        </div>

        {/* Pricing Zone in Rs. */}
        <div className="pt-3 border-t border-[#F2ECE1] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-medium text-[#1E1B18] tabular-nums">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-[#9C9286] line-through tabular-nums">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#6E6459] uppercase tracking-wider">
            In Stock
          </span>
        </div>
      </div>
    </article>
  );
};
