import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, ArrowLeft, ArrowRight, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import { BakeryItem, CartItem } from '../types';
import { BAKERY_CATEGORIES } from '../data/bakeryMenu';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  items: BakeryItem[];
  cartItems: CartItem[];
  onOpenCustomizer: (item: BakeryItem) => void;
  onProceedNext?: () => void;
  onBack?: () => void;
  onProceedToReview?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  cartItems,
  onOpenCustomizer,
  onProceedNext,
  onBack,
  onProceedToReview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [showEmptyCartWarning, setShowEmptyCartWarning] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All Items' || item.category === selectedCategory;

      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filter
      let matchesDiet = true;
      if (dietaryFilter === 'vegan') {
        matchesDiet = item.dietaryTags?.includes('Vegan') || false;
      } else if (dietaryFilter === 'gluten-free') {
        matchesDiet =
          item.dietaryTags?.some((t) => t.toLowerCase().includes('gluten')) ||
          false;
      } else if (dietaryFilter === 'nut-free') {
        matchesDiet =
          item.dietaryTags?.some((t) => t.toLowerCase().includes('nut-free')) ||
          false;
      }

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [items, selectedCategory, searchQuery, dietaryFilter]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCartCountForItem = (itemId: string) => {
    return cartItems
      .filter((c) => c.itemId === itemId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleNextClick = () => {
    if (totalCartCount === 0) {
      setShowEmptyCartWarning(true);
      setTimeout(() => setShowEmptyCartWarning(false), 4000);
      return;
    }
    if (onProceedNext) {
      onProceedNext();
    }
  };

  return (
    <div id="step-menu-selection" className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7DC]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-serif font-bold text-lg border border-amber-200">
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18]">
                Select Items from the Bakery Menu
              </h2>
              {totalCartCount > 0 && (
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {totalCartCount} selected
                </span>
              )}
            </div>
            <p className="text-sm text-[#7D6658] mt-0.5">
              Choose your artisan cakes, breads, pastries & treats. You can customize flavors & add item notes for each item.
            </p>
          </div>
        </div>

        {totalCartCount > 0 && onProceedToReview && (
          <button
            type="button"
            onClick={onProceedToReview}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#A04D26]" />
            <span>Review {totalCartCount} items (${cartSubtotal.toFixed(2)})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-menu-search"
              placeholder="Search cakes, sourdough, croissants, macarons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#E4D7C8] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9B8779] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Diets' },
              { id: 'vegan', label: '🌱 Vegan' },
              { id: 'gluten-free', label: '🌾 Gluten-Free' },
              { id: 'nut-free', label: '🥜 Nut-Free' },
            ].map((diet) => (
              <button
                key={diet.id}
                type="button"
                id={`btn-diet-${diet.id}`}
                onClick={() => setDietaryFilter(diet.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  dietaryFilter === diet.id
                    ? 'bg-[#2C1E18] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-[#6A4B3A] border border-[#E5DACD] hover:bg-[#F2ECE1]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EFE7DC] pt-1">
          {BAKERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                id={`btn-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300 shadow-xs'
                    : 'bg-transparent text-[#7D6658] hover:text-[#2C1E18] hover:bg-[#FAF6F0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="mt-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DFCFC0]">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2C1E18]">
              No bakery items found
            </h3>
            <p className="text-xs sm:text-sm text-[#826A5C] max-w-sm mx-auto mt-1">
              Try adjusting your search query or dietary filter to see more delicious bakes.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Items');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#A04D26] text-white text-xs font-semibold rounded-xl hover:bg-[#8A3F1D] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onOpenCustomizer={onOpenCustomizer}
                countInCart={getCartCountForItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Empty cart warning prompt */}
      {showEmptyCartWarning && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="text-xs font-semibold">
            Please add at least 1 delicious bakery item to your order before proceeding to the next step! Click "+ Add & Customize" on any item above.
          </p>
        </div>
      )}

      {/* Step Navigation Controls */}
      <div className="mt-8 pt-6 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {onBack && (
          <button
            type="button"
            id="btn-step2-back"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white text-[#5A4335] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] hover:text-[#2C1E18] transition-all shadow-xs w-full sm:w-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fulfillment Date</span>
          </button>
        )}

        <div className="flex items-center gap-3 text-xs text-[#6F5B4E] justify-center">
          {totalCartCount > 0 ? (
            <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} added (${cartSubtotal.toFixed(2)})</span>
            </span>
          ) : (
            <span className="text-[#8C7667] italic">
              Click "+ Add & Customize" on any bake
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
          {totalCartCount > 0 && onProceedToReview && (
            <button
              type="button"
              onClick={onProceedToReview}
              className="text-xs font-semibold text-[#6A4B3A] hover:text-[#2C1E18] px-3 py-2 underline underline-offset-4 cursor-pointer"
            >
              Skip to Cart Review
            </button>
          )}

          <button
            type="button"
            id="btn-step2-next"
            onClick={handleNextClick}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer ${
              totalCartCount > 0
                ? 'bg-[#A04D26] text-white hover:bg-[#8A3F1D]'
                : 'bg-amber-800/80 text-white hover:bg-amber-800'
            }`}
          >
            <span>Continue to Photo Inspiration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
