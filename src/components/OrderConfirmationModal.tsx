import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, Copy, Check, X, Calendar, Clock, Store, Truck, Phone, Mail, User, Image as ImageIcon, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { OrderRequest } from '../types';

interface OrderConfirmationModalProps {
  order: OrderRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onViewInBakeryHub: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewInBakeryHub,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && order) {
      // Fire celebratory gentle bakery confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A04D26', '#D97706', '#F59E0B', '#F3ECE2', '#78350F'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `🧁 Bakery Order Request #${order.id}
📅 Requested Date: ${order.fulfillmentDate} (${order.fulfillmentTimeSlot})
📍 Method: ${order.fulfillmentType === 'pickup' ? 'In-Store Pickup' : 'Courier Delivery'}
👤 Customer: ${order.customerName} (${order.customerPhone})

📦 ITEMS:
${order.items
  .map(
    (item, idx) =>
      `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - $${(
        item.price * item.quantity
      ).toFixed(2)}${item.itemNotes ? `\n   Note: "${item.itemNotes}"` : ''}`
  )
  .join('\n')}

💰 Estimated Total: $${order.estimatedTotal.toFixed(2)}
📸 Reference Images: ${order.referenceImages.length} attached
⚠️ Status: Pending Bakery Confirmation`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="modal-confirmation-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-confirmation-content"
        className="relative bg-[#FFFDF9] rounded-3xl border border-[#E8DFD5] w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto print:max-w-none print:max-h-none print:shadow-none print:border-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top celebratory bar */}
        <div className="bg-[#2C1E18] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  {order.id}
                </span>
                <span className="text-xs text-amber-200 uppercase tracking-wider font-semibold">
                  Request Submitted
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold mt-1 text-white">
                Order Request Received!
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors print:hidden"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Status & Review Banner */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-amber-950">
                Status: Pending Bakery Schedule Review
              </h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                Thank you, <strong>{order.customerName}</strong>! Our pastry chef will review your request for <strong>{order.fulfillmentDate}</strong>, check our baking capacity, and contact you via phone (<strong>{order.customerPhone}</strong>) or email (<strong>{order.customerEmail}</strong>) within 24 hours to confirm your booking and send the payment invoice.
              </p>
            </div>
          </div>

          {/* Fulfillment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E5DACD]">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider block">
                Fulfillment Date & Time
              </span>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#2C1E18]">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>{order.fulfillmentDate}</span>
              </div>
              <div className="text-xs text-[#7A6456] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{order.fulfillmentTimeSlot}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider block">
                Delivery Method & Address
              </span>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#2C1E18] capitalize">
                {order.fulfillmentType === 'pickup' ? (
                  <>
                    <Store className="w-4 h-4 text-amber-700" />
                    <span>In-Store Bakery Pickup</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4 text-amber-700" />
                    <span>Local Courier Delivery</span>
                  </>
                )}
              </div>
              {order.deliveryAddress && (
                <div className="text-xs text-[#7A6456] mt-0.5">
                  {order.deliveryAddress}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Order List with Item-Specific Notes */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2C1E18] uppercase tracking-wider">
              Ordered Items & Custom Instructions
            </h4>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E7DED3] p-3.5 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#E0D4C5]"
                      />
                      <div>
                        <span className="font-serif font-bold text-sm text-[#2C1E18]">
                          {item.quantity}x {item.name}
                        </span>
                        {item.selectedOptions && (
                          <div className="text-[11px] text-[#7A6456]">
                            {Object.entries(item.selectedOptions)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(' • ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="font-bold text-xs sm:text-sm text-[#2C1E18]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Highlighted item-specific note */}
                  {item.itemNotes ? (
                    <div className="bg-amber-100/60 border border-amber-200/80 rounded-lg p-2 text-xs flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-800 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-950">Item Note: </span>
                        <span className="text-amber-900 italic">"{item.itemNotes}"</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-[#9E8B7E] italic">
                      Standard bakery preparation (no custom item notes)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reference Images Gallery */}
          {order.referenceImages && order.referenceImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#2C1E18] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                  <span>Attached Reference Photos ({order.referenceImages.length})</span>
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {order.referenceImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className="bg-[#FAF7F2] rounded-xl border border-[#E5DACD] overflow-hidden"
                  >
                    <img
                      src={img.dataUrl}
                      alt={`Reference ${idx + 1}`}
                      className="w-full h-28 object-cover"
                    />
                    {img.caption && (
                      <div className="p-2 text-[11px] text-[#5A4538] font-medium truncate bg-white">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Notes */}
          {order.generalNotes && (
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E7DED3] text-xs">
              <span className="font-semibold text-[#4A3225] block mb-1">Additional General Notes:</span>
              <p className="text-[#6F5B4E]">{order.generalNotes}</p>
            </div>
          )}

          {/* Totals */}
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E0D4C5] space-y-1.5">
            <div className="flex justify-between text-xs text-[#6A4B3A]">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#6A4B3A]">
              <span>Estimated Tax (8%)</span>
              <span>${order.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#D5C6B5] flex justify-between font-serif font-bold text-sm sm:text-base text-[#2C1E18]">
              <span>Estimated Total Request</span>
              <span className="text-amber-900">${order.estimatedTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F6EFE6] border-t border-[#E8DFD5] flex flex-wrap items-center justify-between gap-3 print:hidden">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#D5C6B5] hover:bg-stone-50 text-[#6A4B3A] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#D5C6B5] hover:bg-stone-50 text-[#6A4B3A] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onViewInBakeryHub}
              className="px-4 py-2 bg-[#2C1E18] text-white hover:bg-[#1A120E] text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              View in Bakery Hub
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#A04D26] text-white hover:bg-[#8A3F1D] text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              Done & Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
