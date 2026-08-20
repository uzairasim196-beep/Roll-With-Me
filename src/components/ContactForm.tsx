import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, MessageSquare, ShieldCheck, AlertCircle, CheckCircle2, Send, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { FulfillmentType } from '../types';

interface ContactFormProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  generalNotes: string;
  setGeneralNotes: (notes: string) => void;
  disclaimerAccepted: boolean;
  setDisclaimerAccepted: (accepted: boolean) => void;
  fulfillmentType: FulfillmentType;
  selectedDate: string;
  selectedTimeSlot: string;
  cartItemCount: number;
  onSubmitOrder: () => void;
  isSubmitting: boolean;
  onBack?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  deliveryAddress,
  setDeliveryAddress,
  generalNotes,
  setGeneralNotes,
  disclaimerAccepted,
  setDisclaimerAccepted,
  fulfillmentType,
  selectedDate,
  selectedTimeSlot,
  cartItemCount,
  onSubmitOrder,
  isSubmitting,
  onBack,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedDate) {
      setErrorMessage('Please select a fulfillment date in Step 1.');
      return;
    }

    if (cartItemCount === 0) {
      setErrorMessage('Please add at least one bakery item to your order request in Step 2.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please provide your Full Name.');
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage('Please provide your Phone Number so our bakery can reach you.');
      return;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please provide a valid Email Address for your order confirmation receipt.');
      return;
    }

    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please enter your Delivery Address for courier dispatch.');
      return;
    }

    if (!disclaimerAccepted) {
      setErrorMessage("You must accept the order request notice ('I understand that placing an order request does not confirm my order') before submitting.");
      return;
    }

    onSubmitOrder();
  };

  return (
    <form
      id="step-contact-submission"
      onSubmit={handleSubmit}
      className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs"
    >
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7DC]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-serif font-bold text-lg border border-amber-200">
            5
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18]">
              Contact Details & Request Submission
            </h2>
            <p className="text-sm text-[#7D6658] mt-0.5">
              Enter your contact information so our head baker can coordinate confirmation and dispatch.
            </p>
          </div>
        </div>

        {/* Fulfillment Summary Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#DFCFC0] text-xs font-semibold text-[#6A4B3A] self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-[#A04D26]" />
          <span>{selectedDate || 'No date'} • {selectedTimeSlot}</span>
        </div>
      </div>

      <div className="mt-6 space-y-6">

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Customer Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3225] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>Full Name <strong className="text-rose-600">*</strong></span>
            </label>
            <input
              type="text"
              id="input-customer-name"
              required
              placeholder="E.g., Charlotte Moreau"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9E8B7E] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3225] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>Phone / WhatsApp <strong className="text-rose-600">*</strong></span>
            </label>
            <input
              type="tel"
              id="input-customer-phone"
              required
              placeholder="E.g., (555) 342-9811"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9E8B7E] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Email Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#4A3225] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>Email Address <strong className="text-rose-600">*</strong></span>
            </label>
            <input
              type="email"
              id="input-customer-email"
              required
              placeholder="E.g., charlotte.moreau@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9E8B7E] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <p className="text-[11px] text-[#8C7667] mt-1">
              We will send your order receipt and booking quote to this email address.
            </p>
          </div>

          {/* Delivery Address (Conditional if delivery chosen) */}
          {fulfillmentType === 'delivery' && (
            <div className="sm:col-span-2 bg-[#FAF6F0] p-4 rounded-xl border border-amber-300">
              <label className="block text-xs font-semibold text-[#4A3225] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#A04D26]" />
                <span>Delivery Address (Local Courier) <strong className="text-rose-600">*</strong></span>
              </label>
              <textarea
                id="input-delivery-address"
                rows={2}
                required
                placeholder="Street address, apartment/suite, buzzer code, city & postal code..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-white border border-[#D5C6B5] rounded-xl p-3 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9E8B7E] focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>
          )}

          {/* General Order Notes / Special Event Instructions */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#4A3225] mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>General Order Notes / Occasion (Optional)</span>
            </label>
            <textarea
              id="input-general-notes"
              rows={3}
              placeholder="Tell us about your event, delivery timing preferences, allergy alerts, candle requests, or questions..."
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl p-3 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9E8B7E] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="bg-[#FFF6ED] border-2 border-[#E7C7AC] rounded-2xl p-4 sm:p-5">
          <label
            htmlFor="checkbox-order-disclaimer"
            className="flex items-start gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                id="checkbox-order-disclaimer"
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="w-5 h-5 rounded-md text-[#A04D26] border-2 border-amber-600 focus:ring-amber-500 focus:ring-offset-1 transition-all cursor-pointer accent-[#A04D26]"
              />
            </div>

            <div className="flex-1">
              <span className="font-serif font-bold text-sm sm:text-base text-[#2C1E18] group-hover:text-[#A04D26] transition-colors leading-snug">
                I understand that placing an 'order request' does not confirm my order.
              </span>
              
              <div className="text-xs text-[#7A6456] mt-1.5 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200/80">
                <p className="font-medium text-[#4A3225] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>How our bakery review process works:</span>
                </p>
                <p>
                  1. Our master bakers review your desired date ({selectedDate || 'selected date'}), custom item notes, and any uploaded reference images against our oven schedule.
                </p>
                <p className="mt-1">
                  2. We will contact you via phone/WhatsApp/email within <strong>24 business hours</strong> to confirm availability, finalize design choices, and issue your official booking deposit invoice.
                </p>
              </div>
            </div>
          </label>

        </div>

        {/* Back and Submit Order Request Buttons */}
        <div className="pt-4 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          {onBack && (
            <button
              type="button"
              id="btn-step5-back"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white text-[#5A4335] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] hover:text-[#2C1E18] transition-all shadow-xs w-full sm:w-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Order Review</span>
            </button>
          )}

          <div className="w-full sm:w-auto flex-1 sm:max-w-md ml-auto">
            <button
              type="submit"
              id="btn-submit-order-request"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl text-white font-serif font-bold text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-stone-500 cursor-not-allowed'
                  : 'bg-[#A04D26] hover:bg-[#8A3F1D] active:scale-[0.99] shadow-amber-900/10'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Transmitting Order Request to Bakery...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Bakery Order Request</span>
                </>
              )}
            </button>
            
            <p className="text-center text-[11px] text-[#8C7667] mt-2">
              🔒 No immediate payment required. You will receive an email confirmation receipt.
            </p>
          </div>
        </div>

      </div>
    </form>
  );
};
