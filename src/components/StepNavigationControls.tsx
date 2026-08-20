import React from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

interface StepNavigationControlsProps {
  currentStep: number;
  totalSteps?: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  warningMessage?: string | null;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  cartItemCount?: number;
  cartSubtotal?: number;
}

export const StepNavigationControls: React.FC<StepNavigationControlsProps> = ({
  currentStep,
  totalSteps = 5,
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  warningMessage = null,
  secondaryAction,
  cartItemCount = 0,
  cartSubtotal = 0,
}) => {
  const getDefaultNextLabel = () => {
    switch (currentStep) {
      case 1:
        return 'Continue to Bakery Menu';
      case 2:
        return 'Continue to Photo Inspiration';
      case 3:
        return 'Continue to Order Review';
      case 4:
        return 'Continue to Contact & Details';
      default:
        return 'Next Step';
    }
  };

  const label = nextLabel || getDefaultNextLabel();

  return (
    <div className="mt-8 pt-6 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      
      {/* Back Button */}
      <div>
        {currentStep > 1 ? (
          <button
            type="button"
            id={`btn-step-back-${currentStep}`}
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white text-[#5A4335] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] hover:text-[#2C1E18] transition-all shadow-xs w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous Step</span>
          </button>
        ) : (
          <div className="hidden sm:block text-xs text-[#8C7667]">
            Step 1: Set your preferred fulfillment date
          </div>
        )}
      </div>

      {/* Center Warning or Cart Quick Info */}
      {warningMessage ? (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium text-center sm:text-left">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{warningMessage}</span>
        </div>
      ) : cartItemCount > 0 && currentStep <= 3 ? (
        <div className="hidden md:flex items-center gap-2 text-xs text-[#6F5B4E]">
          <span className="font-semibold text-[#2C1E18]">
            {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in order:
          </span>
          <span className="font-serif font-bold text-[#A04D26]">
            ${cartSubtotal.toFixed(2)}
          </span>
        </div>
      ) : null}

      {/* Next Actions & Optional Secondary Action */}
      <div className="flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="text-xs font-semibold text-[#8C7667] hover:text-[#2C1E18] px-3 py-2 underline underline-offset-4"
          >
            {secondaryAction.label}
          </button>
        )}

        <button
          type="button"
          id={`btn-step-next-${currentStep}`}
          disabled={nextDisabled}
          onClick={onNext}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm w-full sm:w-auto cursor-pointer ${
            nextDisabled
              ? 'bg-[#E5DACE] text-[#9E8E81] cursor-not-allowed shadow-none'
              : 'bg-[#A04D26] text-white hover:bg-[#8A3F1D] active:scale-[0.98]'
          }`}
        >
          <span>{label}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
