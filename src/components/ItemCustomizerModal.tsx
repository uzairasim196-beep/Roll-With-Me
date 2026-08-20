import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, MessageSquare, AlertTriangle, Sparkles } from 'lucide-react';
import { BakeryItem, CartItem } from '../types';

interface ItemCustomizerModalProps {
  item: BakeryItem | null;
  initialCartItem?: CartItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  initialCartItem,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [itemNotes, setItemNotes] = useState('');

  // Prepopulate or reset when item opens
  useEffect(() => {
    if (initialCartItem) {
      setQuantity(initialCartItem.quantity);
      setSelectedOptions(initialCartItem.selectedOptions || {});
      setItemNotes(initialCartItem.itemNotes || '');
    } else if (item) {
      setQuantity(1);
      setItemNotes('');
      // Set default options if available
      const defaults: Record<string, string> = {};
      item.options?.forEach((optGroup) => {
        if (optGroup.choices.length > 0) {
          defaults[optGroup.title] = optGroup.choices[0].name;
        }
      });
      setSelectedOptions(defaults);
    }
  }, [item, initialCartItem, isOpen]);

  if (!isOpen || !item) return null;

  // Calculate dynamic unit price based on selected options
  let unitPrice = item.price;
  if (item.options) {
    item.options.forEach((group) => {
      const selectedChoiceName = selectedOptions[group.title];
      const match = group.choices.find((c) => c.name === selectedChoiceName);
      if (match?.priceModifier) {
        unitPrice += match.priceModifier;
      }
    });
  }

  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (groupTitle: string, choiceName: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupTitle]: choiceName,
    }));
  };

  const handleSave = () => {
    const cartItemData: CartItem = {
      cartItemId: initialCartItem?.cartItemId || `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      itemId: item.id,
      name: item.name,
      price: unitPrice,
      quantity,
      image: item.image,
      category: item.category,
      selectedOptions: { ...selectedOptions },
      itemNotes: itemNotes.trim(),
    };

    onAddToCart(cartItemData);
    onClose();
  };

  return (
    <div 
      id="modal-customizer-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-customizer-content"
        className="relative bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Image */}
        <div className="relative h-48 sm:h-56 bg-stone-100 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
          
          <button
            id="btn-close-customizer"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors backdrop-blur-xs"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-stone-950 text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
              {item.servings && (
                <span className="text-xs text-stone-200 font-medium">
                  • {item.servings}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          <p className="text-sm text-[#6F5B4E] leading-relaxed">
            {item.description}
          </p>

          {/* Dietary tags */}
          {item.dietaryTags && item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3ECE2] text-[#6A4B3A] border border-[#E0D4C5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Customizable Option Groups (Size, Flavor, Slicing, etc.) */}
          {item.options && item.options.map((optGroup) => (
            <div key={optGroup.title} className="space-y-2.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A4B3A]">
                {optGroup.title}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {optGroup.choices.map((choice) => {
                  const isSelected = selectedOptions[optGroup.title] === choice.name;
                  return (
                    <button
                      type="button"
                      key={choice.id}
                      onClick={() => handleOptionSelect(optGroup.title, choice.name)}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-600'
                          : 'bg-[#FAF6F0] border-[#E5DACD] text-[#554033] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-600 bg-amber-600 text-white'
                              : 'border-[#B8A796] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span>{choice.name}</span>
                      </div>
                      {choice.priceModifier ? (
                        <span className="text-xs text-amber-800 font-bold">
                          +${choice.priceModifier.toFixed(2)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ITEM-SPECIFIC CUSTOM NOTES BOX (Crucial requirement) */}
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E4D7C8] space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="input-item-notes"
                className="text-xs font-bold uppercase tracking-wider text-[#4A3225] flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#A04D26]" />
                <span>Item-Specific Custom Notes & Instructions</span>
              </label>
              <span className="text-[11px] text-[#8C7667]">Optional</span>
            </div>
            <p className="text-xs text-[#7A6456]">
              Add flavor mix requests, heating preference, allergy alerts (e.g. nut-free packaging), gift box ribbons, or celebration message toppers for this item.
            </p>
            <textarea
              id="input-item-notes"
              rows={3}
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              placeholder="e.g. For the 4-pack: 2 Classic, 1 Strawberry Cheesecake, 1 Biscoff. Please pack frosting on the side!"
              className="w-full bg-white border border-[#D5C6B5] rounded-xl p-3 text-sm text-[#2C1E18] placeholder-[#A49285] focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all resize-none"
            />
          </div>

          {/* Lead time notice */}
          {item.leadTimeHours && item.leadTimeHours >= 48 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                This custom bake requires at least {item.leadTimeHours} hours advance preparation time.
              </span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F6EFE6] border-t border-[#E8DFD5] flex items-center justify-between gap-4">
          
          {/* Quantity stepper */}
          <div className="flex items-center bg-white border border-[#D5C6B5] rounded-xl p-1 shadow-xs">
            <button
              type="button"
              id="btn-decrease-qty"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6A4B3A] hover:bg-stone-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-[#2C1E18]">
              {quantity}
            </span>
            <button
              type="button"
              id="btn-increase-qty"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6A4B3A] hover:bg-stone-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button with Price */}
          <button
            type="button"
            id="btn-add-item-to-order"
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-[#A04D26] hover:bg-[#8A3F1D] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-between active:scale-[0.99]"
          >
            <span>{initialCartItem ? 'Update Item Notes & Details' : 'Add to Order Request'}</span>
            <span className="font-bold text-amber-200">
              ${totalPrice.toFixed(2)}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
