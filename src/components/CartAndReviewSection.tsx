import React, { useState } from 'react';
import { ShoppingBag, Trash2, Edit3, MessageSquare, Plus, Minus, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, BakeryItem } from '../types';

interface CartAndReviewSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onUpdateItemNotes: (cartItemId: string, notes: string) => void;
  onEditItemOptions: (cartItem: CartItem) => void;
  onScrollToMenu: () => void;
  onProceedToContact: () => void;
  onBack?: () => void;
}

export const CartAndReviewSection: React.FC<CartAndReviewSectionProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateItemNotes,
  onEditItemOptions,
  onScrollToMenu,
  onProceedToContact,
  onBack,
}) => {
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.08;
  const estimatedTotal = subtotal + estimatedTax;

  const handleStartEditNote = (item: CartItem) => {
    setEditingNotesId(item.cartItemId);
    setTempNote(item.itemNotes || '');
  };

  const handleSaveNote = (cartItemId: string) => {
    onUpdateItemNotes(cartItemId, tempNote);
    setEditingNotesId(null);
  };

  return (
    <div id="section-order-cart" className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7DC]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-serif font-bold text-lg border border-amber-200">
            4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18]">
                Your Order Items & Item Notes
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-200">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-sm text-[#7D6658] mt-0.5">
              Review your customized bakery selections and make sure your special instructions for each bake are accurate.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToMenu}
          className="text-xs font-semibold text-[#A04D26] hover:text-[#8A3F1D] self-start sm:self-auto flex items-center gap-1 underline underline-offset-4 cursor-pointer"
        >
          + Add more items from menu
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#2C1E18]">
            Your order cart is currently empty
          </h3>
          <p className="text-sm text-[#826A5C] max-w-sm mx-auto mt-1">
            Browse our menu in Step 2, customize flavors and sizes, and add special instructions for each bake!
          </p>
          <button
            type="button"
            onClick={onScrollToMenu}
            className="mt-4 px-5 py-2.5 bg-[#A04D26] text-white text-xs font-semibold rounded-xl hover:bg-[#8A3F1D] shadow-sm transition-all cursor-pointer"
          >
            Browse Bakery Menu (Step 2)
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          
          {/* Cart items list */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] p-4 sm:p-5 flex flex-col gap-4 shadow-2xs hover:border-amber-300/80 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Item Image & Title */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E0D4C5] shadow-xs shrink-0"
                    />
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#2C1E18]">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EFE7DC] text-[#6A4B3A]">
                          {item.category}
                        </span>
                      </div>

                      {/* Selected Custom Options */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#6F5B4E]">
                          {Object.entries(item.selectedOptions).map(([key, val]) => (
                            <span key={key}>
                              <strong>{key}:</strong> {val}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-xs font-bold text-[#A04D26] pt-0.5">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Price Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD5]">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-white border border-[#D5C6B5] rounded-xl p-1 shadow-2xs">
                      <button
                        type="button"
                        id={`btn-cart-decrease-${item.cartItemId}`}
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg text-[#6A4B3A] hover:bg-amber-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#2C1E18]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        id={`btn-cart-increase-${item.cartItemId}`}
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg text-[#6A4B3A] hover:bg-amber-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price for item */}
                    <div className="text-right">
                      <div className="text-base font-serif font-bold text-[#2C1E18]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      id={`btn-cart-remove-${item.cartItemId}`}
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="p-2 text-[#9E8B7E] hover:text-red-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove item from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Item-Specific Notes Section */}
                <div className="bg-white/80 rounded-xl p-3.5 border border-[#E5DACD]">
                  {editingNotesId === item.cartItemId ? (
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#4A3225] flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-[#A04D26]" />
                        <span>Special Instructions & Notes for this item:</span>
                      </label>
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="E.g., Please write 'Happy 30th Maya!' in navy cursive script, extra berries on top, slice into 12..."
                        rows={2}
                        className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg p-2.5 text-xs text-[#2C1E18] placeholder-[#9E8B7E] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveNote(item.cartItemId)}
                          className="px-3 py-1 bg-[#A04D26] text-white text-xs font-semibold rounded-lg hover:bg-[#8A3F1D] flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-start gap-2 flex-1">
                        <MessageSquare className="w-4 h-4 text-[#A04D26] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#4A3225]">Item Notes: </span>
                          {item.itemNotes ? (
                            <span className="text-[#2C1E18] italic bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60 font-serif">
                              "{item.itemNotes}"
                            </span>
                          ) : (
                            <span className="text-[#8C7667] italic">
                              No specific notes added for this item yet.
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStartEditNote(item)}
                        className="text-xs font-semibold text-[#A04D26] hover:text-[#8A3F1D] flex items-center gap-1 self-start sm:self-auto hover:underline cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{item.itemNotes ? 'Edit Item Note' : '+ Add Note for Item'}</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Pricing Estimation Breakdown */}
          <div className="bg-[#FAF6F0] rounded-xl p-5 border border-[#E7DDD0] space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#6A4B3A]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#2C1E18]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#6A4B3A]">
              <span>Estimated Local Tax (8%)</span>
              <span className="font-semibold text-[#2C1E18]">${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#E0D4C5] flex items-center justify-between text-sm sm:text-base font-serif font-bold text-[#2C1E18]">
              <span>Estimated Order Request Total</span>
              <span className="text-lg text-amber-900">${estimatedTotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#8C7667] italic pt-1">
              * Final invoice and payment link will be prepared and confirmed by the bakery before any payment is collected.
            </p>
          </div>

          {/* Step Navigation Controls */}
          <div className="pt-6 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {onBack && (
              <button
                type="button"
                id="btn-step4-back"
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white text-[#5A4335] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] hover:text-[#2C1E18] transition-all shadow-xs w-full sm:w-auto cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Photo Inspiration</span>
              </button>
            )}

            <button
              type="button"
              id="btn-proceed-to-contact"
              onClick={onProceedToContact}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#A04D26] hover:bg-[#8A3F1D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>Continue to Contact & Final Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
