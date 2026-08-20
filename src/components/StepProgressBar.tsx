import React from 'react';
import { Calendar, Cake, Image as ImageIcon, ShoppingBag, Send, Check } from 'lucide-react';

export interface StepItem {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  optional?: boolean;
}

export const ORDER_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Date & Fulfillment',
    shortTitle: 'Date & Time',
    subtitle: 'Select day, slot & pickup/delivery',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Bakery Menu Selection',
    shortTitle: 'Bakery Menu',
    subtitle: 'Choose & customize fresh bakes',
    icon: Cake,
  },
  {
    id: 3,
    title: 'Reference Photos',
    shortTitle: 'Inspiration',
    subtitle: 'Upload cake / decor photos',
    icon: ImageIcon,
    optional: true,
  },
  {
    id: 4,
    title: 'Review Items & Notes',
    shortTitle: 'Review & Notes',
    subtitle: 'Verify items & custom notes',
    icon: ShoppingBag,
  },
  {
    id: 5,
    title: 'Contact & Submit',
    shortTitle: 'Final Submit',
    subtitle: 'Contact info & request notice',
    icon: Send,
  },
];

interface StepProgressBarProps {
  currentStep: number;
  onSelectStep: (stepId: number) => void;
  maxVisitedStep: number;
  cartItemCount: number;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  onSelectStep,
  maxVisitedStep,
  cartItemCount,
}) => {
  const currentStepObj = ORDER_STEPS.find((s) => s.id === currentStep) || ORDER_STEPS[0];
  const progressPercent = Math.round(((currentStep - 1) / (ORDER_STEPS.length - 1)) * 100);

  return (
    <div id="order-wizard-stepper" className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-4 sm:p-6 shadow-xs">
      
      {/* Top Progress Bar and Mobile Indicator */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A04D26] block">
            Step {currentStep} of {ORDER_STEPS.length}
          </span>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#2C1E18]">
            {currentStepObj.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {cartItemCount > 0 && currentStep !== 4 && (
            <button
              type="button"
              id="btn-quick-cart-review"
              onClick={() => onSelectStep(4)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#A04D26]" />
              <span>{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart</span>
            </button>
          )}

          <div className="text-right">
            <span className="text-xs font-semibold text-[#6F5B4E]">
              {progressPercent}% Completed
            </span>
          </div>
        </div>
      </div>

      {/* Progress Track Bar */}
      <div className="w-full bg-[#EFE7DC] h-1.5 rounded-full overflow-hidden mb-5 sm:mb-6">
        <div
          className="bg-linear-to-r from-amber-600 to-[#A04D26] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop / Tablet Stepper Buttons */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {ORDER_STEPS.map((step) => {
          const Icon = step.icon;
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isClickable = step.id <= maxVisitedStep || isCompleted;

          return (
            <button
              key={step.id}
              id={`step-tab-${step.id}`}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSelectStep(step.id)}
              className={`flex flex-col items-center sm:items-start text-left p-2.5 sm:p-3 rounded-xl border transition-all relative ${
                isCurrent
                  ? 'bg-amber-50/80 border-[#A04D26] text-[#2C1E18] ring-2 ring-amber-600/30 shadow-xs'
                  : isCompleted
                  ? 'bg-[#FAF6F0] border-[#DFCFC0] text-[#5A4335] hover:bg-[#F3ECE2] hover:border-amber-400 cursor-pointer'
                  : 'bg-[#FBF9F6]/60 border-[#ECE4DB] text-[#A69588] cursor-not-allowed opacity-75'
              }`}
            >
              {/* Number Badge & Icon */}
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#A04D26] text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#E8DFD5] text-[#8C7667]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                <Icon
                  className={`w-4 h-4 hidden md:block ${
                    isCurrent
                      ? 'text-[#A04D26]'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-[#A69588]'
                  }`}
                />
              </div>

              {/* Title & Badge */}
              <div className="w-full">
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold truncate block ${
                      isCurrent
                        ? 'text-[#2C1E18] font-bold'
                        : isCompleted
                        ? 'text-[#5A4335]'
                        : 'text-[#8C7667]'
                    }`}
                  >
                    {step.shortTitle}
                  </span>
                </div>

                <span
                  className={`text-[10px] hidden lg:block truncate mt-0.5 ${
                    isCurrent ? 'text-[#7A5845]' : 'text-[#9C8A7D]'
                  }`}
                >
                  {step.optional ? 'Optional' : step.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
