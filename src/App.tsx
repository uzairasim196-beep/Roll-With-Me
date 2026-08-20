import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { StepProgressBar } from './components/StepProgressBar';
import { DatePickerStep } from './components/DatePickerStep';
import { MenuSection } from './components/MenuSection';
import { ReferenceImageUploader } from './components/ReferenceImageUploader';
import { CartAndReviewSection } from './components/CartAndReviewSection';
import { ContactForm } from './components/ContactForm';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CartDrawer } from './components/CartDrawer';
import { BakeryAdminDashboard } from './components/BakeryAdminDashboard';

import { BakeryItem, CartItem, ReferenceImage, OrderRequest, OrderStatus, FulfillmentType } from './types';
import { INITIAL_BAKERY_MENU, TIME_SLOTS, SAMPLE_INITIAL_ORDERS } from './data/bakeryMenu';
import { Sparkles, Heart, Clock, ShieldCheck, MapPin, Phone, Instagram, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation tab: 'order' (Customer View) or 'admin' (Bakery Staff Dashboard)
  const [activeTab, setActiveTab] = useState<'order' | 'admin'>('order');

  // Step-by-step wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);

  // Step 1: Date & Time Slot
  const getTomorrowDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default to in 2 days for guaranteed baking lead time
    if (d.getDay() === 1) d.setDate(d.getDate() + 1); // Skip Monday
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');

  // Step 2 & Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bakery_cart_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Step 3: Reference Images (Optional)
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);

  // Step 4: Contact & Disclaimer
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Orders store
  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    const saved = localStorage.getItem('bakery_orders_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SAMPLE_INITIAL_ORDERS;
      }
    }
    return SAMPLE_INITIAL_ORDERS;
  });

  // Modals & Drawers state
  const [customizerItem, setCustomizerItem] = useState<BakeryItem | null>(null);
  const [customizerCartItem, setCustomizerCartItem] = useState<CartItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('bakery_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem('bakery_orders_list', JSON.stringify(orders));
  }, [orders]);

  // Step transition helper
  const goToStep = (stepNumber: number) => {
    const newDir = stepNumber > currentStep ? 1 : -1;
    setDirection(newDir);
    setCurrentStep(stepNumber);
    setMaxVisitedStep((prev) => Math.max(prev, stepNumber));

    // Smooth scroll up to step container
    setTimeout(() => {
      const stepper = document.getElementById('order-wizard-stepper');
      if (stepper) {
        stepper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Customizer Actions
  const handleOpenCustomizer = (item: BakeryItem) => {
    setCustomizerItem(item);
    setCustomizerCartItem(null);
    setIsCustomizerOpen(true);
  };

  const handleOpenEditCartItem = (cartItem: CartItem) => {
    const originalMenuItem = INITIAL_BAKERY_MENU.find((i) => i.id === cartItem.itemId) || {
      id: cartItem.itemId,
      name: cartItem.name,
      category: cartItem.category as any,
      price: cartItem.price,
      description: '',
      image: cartItem.image,
    };
    setCustomizerItem(originalMenuItem);
    setCustomizerCartItem(cartItem);
    setIsCustomizerOpen(true);
  };

  const handleSaveCartItem = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.cartItemId === newItem.cartItemId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newItem;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleUpdateItemNotes = (cartItemId: string, notes: string) => {
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, itemNotes: notes } : i))
    );
  };

  // Reference Images Actions
  const handleAddReferenceImages = (newImages: ReferenceImage[]) => {
    setReferenceImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveReferenceImage = (id: string) => {
    setReferenceImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleUpdateImageCaption = (id: string, caption: string) => {
    setReferenceImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption } : img))
    );
  };

  // Submit Order Request
  const handleSubmitOrderRequest = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const estimatedTax = subtotal * 0.08;
      const estimatedTotal = subtotal + estimatedTax;

      const newOrder: OrderRequest = {
        id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'Pending Review',
        fulfillmentDate: selectedDate,
        fulfillmentTimeSlot: selectedTimeSlot,
        fulfillmentType,
        deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
        items: [...cartItems],
        subtotal,
        estimatedTax,
        estimatedTotal,
        referenceImages: [...referenceImages],
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        generalNotes: generalNotes.trim() || undefined,
        disclaimerAccepted: true,
        staffNotes: 'New order request awaiting kitchen review.',
      };

      // Add to store
      setOrders((prev) => [newOrder, ...prev]);
      setSubmittedOrder(newOrder);
      setIsConfirmationOpen(true);
      setIsSubmitting(false);

      // Reset form state and return to step 1 for future orders
      setCartItems([]);
      setReferenceImages([]);
      setGeneralNotes('');
      setDisclaimerAccepted(false);
      setCurrentStep(1);
      setMaxVisitedStep(1);
    }, 600);
  };

  // Admin Dashboard Actions
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleUpdateStaffNotes = (orderId: string, staffNotes: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, staffNotes } : o))
    );
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending Review').length;

  // Animation variants for smooth step slides
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2C1E18] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        selectedDate={selectedDate}
        fulfillmentType={fulfillmentType}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {activeTab === 'admin' ? (
          /* Bakery Manager & Production View */
          <BakeryAdminDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateStaffNotes={handleUpdateStaffNotes}
            onSwitchToOrderForm={() => setActiveTab('order')}
          />
        ) : (
          /* Step-by-Step Customer Booking Workflow */
          <div className="space-y-8">
            
            {/* Bakery Hero Intro */}
            <div className="text-center max-w-3xl mx-auto space-y-3 py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7DC] border border-[#DFCFC0] text-[#6A4B3A] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#A04D26]" />
                <span>Gourmet Brioche Cinnamon Rolls • Mesa, AZ • Mobile Dessert Cart</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2C1E18] tracking-tight">
                Roll With Me Bakery Booking
              </h1>
              <p className="text-sm sm:text-base text-[#6F5B4E] leading-relaxed">
                Welcome to Lauren’s online bakery booking system! Select your fulfillment day, customize your gourmet cinnamon rolls & variety boxes, add custom bake instructions, and submit your order request.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <StepProgressBar
              currentStep={currentStep}
              onSelectStep={goToStep}
              maxVisitedStep={maxVisitedStep}
              cartItemCount={totalCartCount}
            />

            {/* Animated Step Slide Views */}
            <div className="relative overflow-hidden min-h-[500px]">
              <AnimatePresence mode="wait" custom={direction}>
                
                {/* STEP 1: Date & Time Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <DatePickerStep
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                      selectedTimeSlot={selectedTimeSlot}
                      onSelectTimeSlot={setSelectedTimeSlot}
                      fulfillmentType={fulfillmentType}
                      onSelectFulfillmentType={setFulfillmentType}
                      onProceedNext={() => goToStep(2)}
                    />
                  </motion.div>
                )}

                {/* STEP 2: Bakery Menu Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <MenuSection
                      items={INITIAL_BAKERY_MENU}
                      cartItems={cartItems}
                      onOpenCustomizer={handleOpenCustomizer}
                      onProceedNext={() => goToStep(3)}
                      onBack={() => goToStep(1)}
                      onProceedToReview={() => goToStep(4)}
                    />
                  </motion.div>
                )}

                {/* STEP 3: Reference Photos & Inspiration (Optional) */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <ReferenceImageUploader
                      referenceImages={referenceImages}
                      onAddImages={handleAddReferenceImages}
                      onRemoveImage={handleRemoveReferenceImage}
                      onUpdateCaption={handleUpdateImageCaption}
                      onProceedNext={() => goToStep(4)}
                      onBack={() => goToStep(2)}
                      onSkip={() => goToStep(4)}
                    />
                  </motion.div>
                )}

                {/* STEP 4: Review Items, Notes & Pricing */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <CartAndReviewSection
                      cartItems={cartItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveCartItem}
                      onUpdateItemNotes={handleUpdateItemNotes}
                      onEditItemOptions={handleOpenEditCartItem}
                      onScrollToMenu={() => goToStep(2)}
                      onProceedToContact={() => goToStep(5)}
                      onBack={() => goToStep(3)}
                    />
                  </motion.div>
                )}

                {/* STEP 5: Contact Info & Final Disclaimer Submission */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <ContactForm
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerPhone={customerPhone}
                      setCustomerPhone={setCustomerPhone}
                      customerEmail={customerEmail}
                      setCustomerEmail={setCustomerEmail}
                      deliveryAddress={deliveryAddress}
                      setDeliveryAddress={setDeliveryAddress}
                      generalNotes={generalNotes}
                      setGeneralNotes={setGeneralNotes}
                      disclaimerAccepted={disclaimerAccepted}
                      setDisclaimerAccepted={setDisclaimerAccepted}
                      fulfillmentType={fulfillmentType}
                      selectedDate={selectedDate}
                      selectedTimeSlot={selectedTimeSlot}
                      cartItemCount={cartItems.length}
                      onSubmitOrder={handleSubmitOrderRequest}
                      isSubmitting={isSubmitting}
                      onBack={() => goToStep(4)}
                    />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Quick Jump Bar if items are in cart and currently on Step 2 or 3 */}
            {(currentStep === 2 || currentStep === 3) && totalCartCount > 0 && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-xl bg-[#2C1E18] text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-amber-900/40 flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <span>{totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in order</span>
                      <span className="text-amber-400">• ${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-stone-300 hidden sm:block">
                      Fulfillment: {selectedDate} ({selectedTimeSlot})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        isOpen={isCustomizerOpen}
        item={customizerItem}
        initialCartItem={customizerCartItem}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleSaveCartItem}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          goToStep(4);
        }}
      />

      {/* Order Request Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        order={submittedOrder}
        onClose={() => setIsConfirmationOpen(false)}
        onViewInBakeryHub={() => {
          setIsConfirmationOpen(false);
          setActiveTab('admin');
        }}
      />

      {/* Footer */}
      <footer className="mt-16 bg-[#2C1E18] text-[#E5D7CC] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 md:col-span-2">
              <div className="font-serif font-bold text-2xl text-white tracking-tight flex items-center gap-2">
                <span>ROLL WITH ME BAKERY</span>
                <span className="text-xs font-sans px-2 py-0.5 rounded bg-amber-600/30 text-amber-300 font-normal">Mesa, AZ</span>
              </div>
              <p className="text-xs text-[#B8A799] max-w-md leading-relaxed">
                Scratch-made gourmet brioche cinnamon rolls, celebration pans, and live dessert cart catering by Lauren. Every batch is slow-proved and baked fresh with premium Saigon cinnamon and real vanilla bean cream cheese.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 pt-1">
                <span>📍 Mesa, Arizona (Studio Porch & Market Popups)</span>
                <span>•</span>
                <span>🚚 East Valley Local Delivery</span>
                <span>•</span>
                <span>🔗 Bakesy Shop Migration: roll-with-me-bakery</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-serif font-bold text-white text-sm block">Baking & Pickup Schedule</span>
              <p className="text-[#B8A799]">Tuesday – Saturday: 8:30 AM – 6:30 PM</p>
              <p className="text-[#B8A799]">Sunday: 9:00 AM – 3:00 PM</p>
              <p className="text-amber-400 font-semibold">Pre-Order: 24h Advance Notice</p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-serif font-bold text-white text-sm block">Order Request Policy</span>
              <p className="text-[#B8A799]">
                Submitting an order request reserves your bake slot in Lauren's schedule. Lauren reviews the order and contacts you with the confirmation & invoice.
              </p>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C7667]">
            <p>© {new Date().getFullYear()} Roll With Me Bakery (Lauren). All rights reserved.</p>
            <p>Direct bakery booking system • Bakesy Shop Integration</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
