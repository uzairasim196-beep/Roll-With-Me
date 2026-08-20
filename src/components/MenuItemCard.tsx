import React from 'react';
import { Plus, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { BakeryItem } from '../types';

interface MenuItemCardProps {
  item: BakeryItem;
  onOpenCustomizer: (item: BakeryItem) => void;
  countInCart: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onOpenCustomizer,
  countInCart,
}) => {
  return (
    <div
      id={`card-item-${item.id}`}
      className="group bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] overflow-hidden flex flex-col hover:border-amber-600/40 hover:shadow-md transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-60"></div>
        
        {/* Popular Tag */}
        {item.isPopular && (
          <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>Popular Bake</span>
          </div>
        )}

        {/* Lead time */}
        {item.leadTimeHours && item.leadTimeHours >= 48 && (
          <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-amber-200 px-2 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>48h Notice</span>
          </div>
        )}

        {/* Price Pill */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#E0D4C5] shadow-xs text-xs font-serif font-bold text-[#2C1E18]">
          from ${item.price.toFixed(2)}
        </div>

        {/* In Cart Indicator */}
        {countInCart > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#A04D26] text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-xs">
            {countInCart} in request
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider">
              {item.category}
            </span>
            {item.servings && (
              <span className="text-xs text-[#7A6456]">
                {item.servings}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-[#2C1E18] group-hover:text-[#A04D26] transition-colors leading-snug">
            {item.name}
          </h3>

          <p className="text-xs text-[#6F5B4E] line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>

          {/* Dietary tags */}
          {item.dietaryTags && item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F5EFE6] text-[#7A5B47] border border-[#E4D7C8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 mt-3 border-t border-[#EFE7DC] flex items-center justify-between gap-2">
          <div className="text-[11px] text-[#8C7667] flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-amber-700" />
            <span>Custom note supported</span>
          </div>

          <button
            type="button"
            id={`btn-customize-${item.id}`}
            onClick={() => onOpenCustomizer(item)}
            className="py-1.5 px-3 rounded-xl bg-[#FAF6F0] hover:bg-[#A04D26] text-[#6A4B3A] hover:text-white border border-[#DFCFC0] hover:border-[#A04D26] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Customize & Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
