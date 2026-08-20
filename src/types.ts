export type BakeryCategory = 
  | 'Signature Cinnamon Rolls'
  | 'Fruit & Specialty Rolls'
  | 'Dessert & Decadent Rolls'
  | 'Party Boxes & Share Pans'
  | 'Celebration Roll Cakes'
  | 'Savory Bakes'
  | 'Mobile Cart & Catering'
  | 'Frostings & Sauces';

export interface BakeryOption {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface BakeryItem {
  id: string;
  name: string;
  category: BakeryCategory;
  price: number;
  description: string;
  image: string;
  servings?: string;
  dietaryTags?: string[]; // e.g. 'Gluten-Friendly Option', 'Nut-Free', 'Vegetarian'
  leadTimeHours?: number; // e.g. 24 or 48 hours notice
  options?: {
    title: string;
    choices: BakeryOption[];
  }[];
  isPopular?: boolean;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  selectedOptions?: Record<string, string>; // e.g. { Size: '8-inch (12-16 servings)', Flavor: 'Belgian Chocolate Fudge' }
  itemNotes?: string; // Custom notes specifically for this item
}

export interface ReferenceImage {
  id: string;
  dataUrl: string;
  fileName: string;
  fileSize: number;
  caption?: string; // e.g., "Reference for frosting texture", "Gift packaging ribbon color"
}

export type OrderStatus = 'Pending Review' | 'Confirmed' | 'In Preparation' | 'Ready for Pickup' | 'Completed' | 'Declined';

export type FulfillmentType = 'pickup' | 'delivery';

export interface OrderRequest {
  id: string;
  createdAt: string;
  status: OrderStatus;
  
  // Date & Time
  fulfillmentDate: string; // YYYY-MM-DD
  fulfillmentTimeSlot: string; // e.g. "10:00 AM - 12:00 PM"
  fulfillmentType: FulfillmentType;
  deliveryAddress?: string;
  
  // Items & Customizations
  items: CartItem[];
  subtotal: number;
  estimatedTax: number;
  estimatedTotal: number;
  
  // Reference Images (Optional)
  referenceImages: ReferenceImage[];
  
  // Contact & Additional info
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  generalNotes?: string;
  disclaimerAccepted: boolean;
  
  // Internal staff notes
  staffNotes?: string;
}
