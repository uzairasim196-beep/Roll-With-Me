import React from 'react';
import { Calendar as CalendarIcon, Clock, Store, Truck, AlertCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FulfillmentType } from '../types';
import { TIME_SLOTS } from '../data/bakeryMenu';

interface DatePickerStepProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
  fulfillmentType: FulfillmentType;
  onSelectFulfillmentType: (type: FulfillmentType) => void;
  onProceedNext?: () => void;
}

export const DatePickerStep: React.FC<DatePickerStepProps> = ({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  fulfillmentType,
  onSelectFulfillmentType,
  onProceedNext,
}) => {
  // Generate upcoming selectable dates starting from tomorrow (24h minimum notice) for 14 days
  const today = new Date();
  
  const generateAvailableDates = () => {
    const dates = [];
    // Start from tomorrow (day + 1)
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isMonday = date.getDay() === 1; // Bakery closed on Mondays
      const dateStr = date.toISOString().split('T')[0];
      
      dates.push({
        dateObj: date,
        dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
        isClosed: isMonday,
        isTomorrow: i === 1,
        inTwoDays: i === 2,
      });
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const minDateStr = availableDates[0]?.dateStr || '';
  const maxDateStr = availableDates[availableDates.length - 1]?.dateStr || '';

  const getFormattedSelectedDate = (dateStr: string) => {
    if (!dateStr) return 'No date selected yet';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div id="step-date-picker" className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7DC]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-serif font-bold text-lg border border-amber-200">
            1
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18]">
              Choose Your Fulfillment Day & Slot
            </h2>
            <p className="text-sm text-[#7D6658] mt-0.5">
              Select the exact day you want our bakers to prepare your fresh order.
            </p>
          </div>
        </div>

        {/* Selected Badge */}
        {selectedDate && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Date Selected: {selectedDate}</span>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-6">

        {/* Fulfillment Method Switcher */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A4B3A] mb-3">
            Fulfillment Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <button
              type="button"
              id="btn-fulfillment-pickup"
              onClick={() => onSelectFulfillmentType('pickup')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                fulfillmentType === 'pickup'
                  ? 'bg-amber-50/60 border-amber-600/60 ring-2 ring-amber-600/20'
                  : 'bg-[#FAF6F0] border-[#E5DACD] hover:bg-[#F3EDE3]'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${fulfillmentType === 'pickup' ? 'bg-amber-600 text-white' : 'bg-[#EADECE] text-[#6A4B3A]'}`}>
                <Store className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#2C1E18]">Mesa Bakery Studio / Porch Pickup</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-xs text-[#7A6456] mt-1">
                  Freshly boxed pickup at our Mesa, AZ kitchen porch studio or market cart booth.
                </p>
              </div>
            </button>

            <button
              type="button"
              id="btn-fulfillment-delivery"
              onClick={() => onSelectFulfillmentType('delivery')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                fulfillmentType === 'delivery'
                  ? 'bg-amber-50/60 border-amber-600/60 ring-2 ring-amber-600/20'
                  : 'bg-[#FAF6F0] border-[#E5DACD] hover:bg-[#F3EDE3]'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${fulfillmentType === 'delivery' ? 'bg-amber-600 text-white' : 'bg-[#EADECE] text-[#6A4B3A]'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#2C1E18]">East Valley Courier Delivery</span>
                  <span className="text-xs font-medium text-[#7A6456]">+$7.00 local</span>
                </div>
                <p className="text-xs text-[#7A6456] mt-1">
                  Direct delivery in Mesa, Gilbert, Chandler, Tempe & surrounding East Valley.
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Date Selection Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6A4B3A] flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#A04D26]" />
              <span>Select Fulfillment Date</span>
            </label>
            <div className="text-xs text-[#8A7365] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Closed on Mondays</span>
            </div>
          </div>

          {/* Quick Date Carousel/Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {availableDates.map((item) => {
              const isSelected = selectedDate === item.dateStr;
              
              if (item.isClosed) {
                return (
                  <div
                    key={item.dateStr}
                    className="p-3 rounded-xl border border-dashed border-stone-300 bg-stone-100/60 text-center opacity-50 cursor-not-allowed select-none"
                    title="Bakery Closed for Baking Rest on Mondays"
                  >
                    <span className="block text-[10px] font-medium text-stone-500 uppercase">{item.dayName}</span>
                    <span className="block text-base font-bold text-stone-400 my-0.5">{item.dayNumber}</span>
                    <span className="block text-[9px] text-stone-400 uppercase font-semibold">Closed</span>
                  </div>
                );
              }

              return (
                <button
                  type="button"
                  key={item.dateStr}
                  id={`btn-date-${item.dateStr}`}
                  onClick={() => onSelectDate(item.dateStr)}
                  className={`relative p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-[#2C1E18] border-[#2C1E18] text-white shadow-sm ring-2 ring-[#2C1E18]/20'
                      : 'bg-[#FAF7F2] border-[#E3D7C9] text-[#2C1E18] hover:border-amber-600/50 hover:bg-[#F4EFE6]'
                  }`}
                >
                  {item.isTomorrow && (
                    <span className={`absolute -top-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                      isSelected ? 'bg-amber-400 text-stone-950' : 'bg-amber-200 text-amber-950'
                    }`}>
                      Tomorrow
                    </span>
                  )}
                  <span className={`text-[11px] font-medium uppercase ${isSelected ? 'text-amber-200' : 'text-[#826A5C]'}`}>
                    {item.dayName}
                  </span>
                  <span className="text-lg font-serif font-bold my-0.5">
                    {item.dayNumber}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-[#826A5C]'}`}>
                    {item.monthName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fallback Custom Date Selector for further dates */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#7A6456] bg-[#FAF6F0] p-3 rounded-xl border border-[#E7DDD0]">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Need a date further in the future for an upcoming event or party?</span>
            </span>
            <input
              type="date"
              id="input-custom-date"
              min={minDateStr}
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="bg-white border border-[#D5C6B5] rounded-lg px-2.5 py-1 text-xs font-medium text-[#2C1E18] focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A4B3A] mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#A04D26]" />
            <span>Select Preferred Time Slot</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTimeSlot === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  id={`btn-slot-${slot.substring(0, 5).replace(/\s/g, '')}`}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-100/90 border-amber-700 text-amber-950 font-bold ring-1 ring-amber-700 shadow-xs'
                      : 'bg-[#FAF6F0] border-[#E5DACD] text-[#554033] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{slot}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 ml-1.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Summary Banner */}
        <div className="bg-[#F6EFE6] border border-[#E2D5C4] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-semibold text-[#6A4B3A] uppercase tracking-wider text-[11px] block">
              Scheduled Fulfillment Window:
            </span>
            <p className="font-serif font-bold text-[#2C1E18] text-sm mt-0.5">
              {getFormattedSelectedDate(selectedDate)} • {selectedTimeSlot}
            </p>
          </div>
          <div className="text-[#7A6456] italic">
            {fulfillmentType === 'pickup' ? 'Ready for in-store collection' : 'Chilled delivery to your destination'}
          </div>
        </div>

        {/* Step Navigation Footer */}
        {onProceedNext && (
          <div className="pt-4 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#8C7667]">
              Step 1 of 5: Fulfillment slot confirmed
            </div>
            <button
              type="button"
              id="btn-step1-next"
              onClick={onProceedNext}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#A04D26] text-white hover:bg-[#8A3F1D] text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer"
            >
              <span>Continue to Bakery Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
