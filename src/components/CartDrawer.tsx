import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, MessageSquare, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer-content"
        className="w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl flex flex-col border-l border-[#E8DFD5] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EFE7DC] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#A04D26]" />
            <h3 className="font-serif font-bold text-lg text-[#2C1E18]">
              Your Order Request Cart
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-950">
              {cartItems.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7A6456] hover:bg-[#EAE0D3]"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-[#7A6456]">
              <ShoppingBag className="w-12 h-12 text-[#B8A899] mx-auto mb-3" />
              <p className="font-serif font-bold text-base text-[#2C1E18]">Your cart is empty</p>
              <p className="text-xs text-[#8C7667] mt-1">Select items from our bakery menu to get started!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DACD] flex flex-col gap-2"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#E0D4C5] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#2C1E18] truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-amber-900 block mt-0.5">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.selectedOptions && (
                      <div className="text-[11px] text-[#7A6456] truncate mt-0.5">
                        {Object.values(item.selectedOptions).join(', ')}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="text-stone-400 hover:text-red-600 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Item Note preview in drawer */}
                {item.itemNotes && (
                  <div className="bg-white p-2 rounded-lg text-[11px] text-[#4A3225] border border-[#E0D4C5] flex items-start gap-1.5">
                    <MessageSquare className="w-3 h-3 text-[#A04D26] flex-shrink-0 mt-0.5" />
                    <span className="truncate italic">"{item.itemNotes}"</span>
                  </div>
                )}

                {/* Quantity adjuster */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[#8C7667]">Quantity:</span>
                  <div className="flex items-center bg-white border border-[#D5C6B5] rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#FAF7F2] border-t border-[#EFE7DC] space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-[#2C1E18]">
              <span>Estimated Subtotal</span>
              <span className="font-serif font-bold text-base text-amber-900">${subtotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#A04D26] hover:bg-[#8A3F1D] text-white font-serif font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Review Order & Submit Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
