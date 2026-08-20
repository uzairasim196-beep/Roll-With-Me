import React from 'react';
import { Cake, ShoppingBag, Calendar, Sparkles, ChefHat, Store } from 'lucide-react';
import { FulfillmentType } from '../types';

interface NavbarProps {
  activeTab: 'order' | 'admin';
  setActiveTab: (tab: 'order' | 'admin') => void;
  cartCount: number;
  onOpenCart: () => void;
  selectedDate: string;
  fulfillmentType: FulfillmentType;
  pendingOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  selectedDate,
  fulfillmentType,
  pendingOrdersCount,
}) => {
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Select Bake Date';
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[#2C1E18] text-[#F4ECE1] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Handcrafted Gourmet Cinnamon Rolls • Mobile Dessert Cart Booking • Mesa, AZ</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-300 text-xs">
            <span>Fresh Batches Daily (24h Pre-Order Notice)</span>
            <span className="text-stone-500">•</span>
            <span>East Valley Delivery & Mesa Studio Pickup</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Bakery Brand Identity */}
          <div 
            onClick={() => setActiveTab('order')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200/80 flex items-center justify-center text-amber-900 group-hover:scale-105 transition-transform shadow-sm">
              <Cake className="w-6 h-6 text-[#A04D26]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18] tracking-tight">
                  ROLL WITH ME
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#F3ECE2] text-[#6A4B3A] rounded-full border border-[#E0D4C5]">
                  Bakery & Cart
                </span>
              </div>
              <p className="text-xs text-[#826A5C] font-normal tracking-wide">
                Gourmet Cinnamon Rolls & Custom Bakes by Lauren
              </p>
            </div>
          </div>

          {/* Center Date & Fulfillment Quick Indicator */}
          <div className="hidden lg:flex items-center bg-[#F7F2EC] border border-[#E4D8CB] rounded-full px-4 py-1.5 gap-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#6A4B3A]">
              <Calendar className="w-3.5 h-3.5 text-[#A04D26]" />
              <span className="font-medium text-[#2C1E18]">
                {formatDateDisplay(selectedDate)}
              </span>
            </div>
            <span className="text-[#C8B8A6]">•</span>
            <div className="flex items-center gap-1 text-xs text-[#6A4B3A] capitalize">
              <Store className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>{fulfillmentType === 'pickup' ? 'Bakery Pickup' : 'Courier Delivery'}</span>
            </div>
          </div>

          {/* Right Action Switcher & Cart */}
          <div className="flex items-center gap-3">
            
            {/* View Switcher: Customer vs Bakery Hub */}
            <div className="flex items-center bg-[#EFE7DC] p-1 rounded-xl border border-[#DFCFC0]">
              <button
                id="btn-nav-order"
                onClick={() => setActiveTab('order')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'order'
                    ? 'bg-white text-[#2C1E18] shadow-xs'
                    : 'text-[#6A4B3A] hover:text-[#2C1E18]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Order Booking</span>
              </button>

              <button
                id="btn-nav-admin"
                onClick={() => setActiveTab('admin')}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-[#2C1E18] text-white shadow-xs'
                    : 'text-[#6A4B3A] hover:text-[#2C1E18]'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Bakery Hub</span>
                {pendingOrdersCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Trigger Button */}
            {activeTab === 'order' && (
              <button
                id="btn-open-cart"
                onClick={onOpenCart}
                className="relative flex items-center justify-center p-2.5 rounded-xl bg-[#A04D26] hover:bg-[#8A3F1D] text-white transition-all shadow-sm active:scale-95"
                title="View Order Request Cart"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
