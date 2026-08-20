import { BakeryItem, OrderRequest, BakeryCategory } from '../types';

export const BAKERY_CATEGORIES: ('All Items' | BakeryCategory)[] = [
  'All Items',
  'Signature Cinnamon Rolls',
  'Fruit & Specialty Rolls',
  'Dessert & Decadent Rolls',
  'Party Boxes & Share Pans',
  'Celebration Roll Cakes',
  'Savory Bakes',
  'Mobile Cart & Catering',
  'Frostings & Sauces',
];

export const INITIAL_BAKERY_MENU: BakeryItem[] = [
  // 1. Signature Cinnamon Rolls
  {
    id: 'roll-classic-cream-cheese',
    name: 'Classic Vanilla Bean Cream Cheese Cinnamon Roll',
    category: 'Signature Cinnamon Rolls',
    price: 5.0,
    description: 'Our signature fluffy brioche roll rolled with rich Saigon cinnamon and dark brown sugar, drenched in Lauren’s housemade Madagascar vanilla cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-smothered', name: 'Smothered Fresh on Top (Ready to Eat)' },
          { id: 'frost-on-side', name: 'Packed on the Side (Warm & Pour at Home)' },
          { id: 'frost-extra', name: 'Extra Heavy Frosting Coating (+ $1.50)', priceModifier: 1.5 },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($5.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($12.00)', priceModifier: 7.0 },
          { id: 'pack-6', name: '6-Pack Box ($18.00)', priceModifier: 13.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-bourbon-caramel-pecan',
    name: 'Salted Caramel Pecan Sticky Roll',
    category: 'Signature Cinnamon Rolls',
    price: 6.0,
    description: 'Fresh brioche cinnamon roll smothered in warm buttery salted caramel drizzle, topped with toasted Georgia pecans and cream cheese dollops.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting & Topping',
        choices: [
          { id: 'frost-pecan-loaded', name: 'Loaded with Extra Toasted Pecans' },
          { id: 'frost-side-caramel', name: 'Extra Salted Caramel Pot on Side (+ $1.50)', priceModifier: 1.5 },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-biscoff-cookie-butter',
    name: 'Biscoff Speculoos Cookie Butter Roll',
    category: 'Signature Cinnamon Rolls',
    price: 6.0,
    description: 'Swirled with melted Lotus Biscoff spread, topped with crunchy spiced cookie crumbles and a velvety cookie butter cream cheese glaze.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-biscoff-drizzle', name: 'Smothered with Cookie Butter Glaze & Crumbs' },
          { id: 'frost-biscoff-side', name: 'Glaze Packed on the Side (DIY Heat & Pour)' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-dulce-de-leche',
    name: 'Dulce de Leche Golden Caramel Roll',
    category: 'Signature Cinnamon Rolls',
    price: 6.0,
    description: 'Slow-cooked golden dulce de leche caramelized milk swirl, finished with Maldon sea salt flakes and rich sweet cream glaze.',
    image: 'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-dulce-hot', name: 'Warm Glazed with Sea Salt' },
          { id: 'frost-dulce-side', name: 'Frosting Packed on the Side' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },

  // 2. Fruit & Specialty Rolls
  {
    id: 'roll-strawberry-cheesecake',
    name: 'Strawberry Cheesecake Cinnamon Roll',
    category: 'Fruit & Specialty Rolls',
    price: 6.0,
    description: 'Customer favorite! Stuffed with scratch strawberry compote, topped with Graham cracker crumble and whipped strawberry cheesecake icing.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-strawberry-cheesecake', name: 'Whipped Strawberry Cheesecake Icing & Crumble' },
          { id: 'frost-strawberry-side', name: 'Strawberry Icing Packed on Side' },
          { id: 'frost-extra-compote', name: 'Extra Fresh Strawberry Compote (+ $1.50)', priceModifier: 1.5 },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-blueberry-lemon',
    name: 'Wild Blueberry Meyer Lemon Sweet Roll',
    category: 'Fruit & Specialty Rolls',
    price: 6.0,
    description: 'Loaded with wild mountain blueberries and rolled in fresh Meyer lemon zest sugar, crowned with tangy citrus cream cheese icing.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-lemon-glaze', name: 'Meyer Lemon Cream Cheese Glaze' },
          { id: 'frost-lemon-side', name: 'Glaze Packed on the Side' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-banana-pudding',
    name: 'Southern Banana Pudding & Churro Roll',
    category: 'Fruit & Specialty Rolls',
    price: 6.0,
    description: 'Layered with velvety banana cream, crispy Nilla vanilla wafer crumbles, and rolled in cinnamon churro demerara sugar.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-banana-nilla', name: 'Banana Cream & Nilla Wafer Crunch' },
          { id: 'frost-banana-side', name: 'Cream Packed on the Side' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-orange-blossom',
    name: 'Citrus Orange Blossom Sweet Brioche Roll',
    category: 'Fruit & Specialty Rolls',
    price: 5.5,
    description: 'Bright and refreshing sweet roll flavored with Arizona orange zest, fresh-squeezed juice, and a delicate orange blossom honey glaze.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-orange-zest', name: 'Orange Blossom Glaze' },
          { id: 'frost-orange-side', name: 'Glaze Packed on the Side' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($5.50)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($14.00)', priceModifier: 8.5 },
          { id: 'pack-6', name: '6-Pack Box ($20.00)', priceModifier: 14.5 },
        ],
      },
    ],
  },

  // 3. Dessert & Decadent Rolls
  {
    id: 'roll-cookies-and-cream',
    name: 'Cookies & Cream Oreo Stuffed Cinnamon Roll',
    category: 'Dessert & Decadent Rolls',
    price: 6.0,
    description: 'Crushed Oreo cookies rolled right into the dough spirals, smothered in sweet cream cheese and topped with crunchy chocolate sandwich cookie chunks.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Frosting Style',
        choices: [
          { id: 'frost-oreo-smother', name: 'Full Oreo Icing & Cookie Crumb Crown' },
          { id: 'frost-oreo-side', name: 'Oreo Icing Packed on the Side' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-creme-brulee',
    name: 'Crème Brûlée Torched Sugar Roll',
    category: 'Dessert & Decadent Rolls',
    price: 6.5,
    description: 'Filled with rich Bavarian vanilla custard and finished with a freshly hand-torched caramelized sugar glass crust for the ultimate crunch.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Torch Style',
        choices: [
          { id: 'torch-standard', name: 'Freshly Torched Caramelized Crust' },
          { id: 'torch-double-custard', name: 'Extra Vanilla Custard Core (+ $1.00)', priceModifier: 1.0 },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.50)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($16.00)', priceModifier: 9.5 },
          { id: 'pack-6', name: '6-Pack Box ($24.00)', priceModifier: 17.5 },
        ],
      },
    ],
  },
  {
    id: 'roll-almond-joy',
    name: 'Almond Joy Toasted Coconut & Chocolate Roll',
    category: 'Dessert & Decadent Rolls',
    price: 6.0,
    description: 'Toasted organic coconut flakes, crunchy roasted almonds, and rich Valrhona dark chocolate fudge drizzle atop a warm cinnamon roll.',
    image: 'https://images.unsplash.com/photo-1569864321390-dc8738379469?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-hot-cocoa',
    name: 'Hot Cocoa & Toasted Marshmallow Roll',
    category: 'Dessert & Decadent Rolls',
    price: 6.0,
    description: 'Rich dark Dutch cocoa cinnamon swirl, topped with gooey melted marshmallow fluff, mini marshmallows, and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
    servings: '1 Jumbo Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Jumbo Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Box ($15.00)', priceModifier: 9.0 },
          { id: 'pack-6', name: '6-Pack Box ($22.00)', priceModifier: 16.0 },
        ],
      },
    ],
  },

  // 4. Party Boxes & Share Pans
  {
    id: 'box-4pack-sampler',
    name: 'Gourmet 4-Pack Variety Sampler Box',
    category: 'Party Boxes & Share Pans',
    price: 12.0,
    description: 'The iconic Roll With Me 4-pack box. Mix and match 4 flavors of your choice or receive our best-selling signature assortment in a windowed bakery box.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    servings: '4 Jumbo Rolls (Serves 4-6)',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Flavor Selection Mix',
        choices: [
          { id: 'mix-bestsellers', name: 'Bakery Best Sellers (Classic, Strawberry Cheesecake, Biscoff, Caramel Pecan)' },
          { id: 'mix-all-classic', name: 'All 4 Classic Vanilla Cream Cheese' },
          { id: 'mix-fruit-citrus', name: 'Fruity & Citrus Mix (2 Strawberry, 2 Lemon Blueberry)' },
          { id: 'mix-chocolate', name: 'Decadent Chocolate Lovers (2 Oreo, 2 Almond Joy)' },
        ],
      },
      {
        title: 'Frosting Packaging',
        choices: [
          { id: 'frost-box-frosted', name: 'Pre-Frosted & Decorated in Box' },
          { id: 'frost-box-side', name: 'All Frostings Packed on Side with Warming Guide' },
        ],
      },
    ],
  },
  {
    id: 'box-6pack-gourmet',
    name: 'Party 6-Pack Gourmet Box with Ribbon',
    category: 'Party Boxes & Share Pans',
    price: 18.0,
    description: 'Half-dozen gourmet jumbo cinnamon rolls tied with bakery twine and satin ribbon. Ideal for brunch host gifts, office treats, and family weekends.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    servings: '6 Jumbo Rolls (Serves 6-8)',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Flavor Assortment',
        choices: [
          { id: 'mix-6-variety', name: 'The Roll With Me Variety (1 of each top flavor)' },
          { id: 'mix-6-classic', name: '6x Classic Vanilla Cream Cheese' },
          { id: 'mix-6-custom', name: 'Custom Mix (Specify in Item Notes below)' },
        ],
      },
    ],
  },
  {
    id: 'pan-9x13-family-dozen',
    name: '9x13 Family Share Pan (12 Jumbo Rolls Baker’s Dozen)',
    category: 'Party Boxes & Share Pans',
    price: 35.0,
    description: 'Full oven pan containing 12 connected jumbo rolls baked together in brown sugar cinnamon syrup for ultra-gooey center rolls. Comes with a large 8oz icing tub on the side.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    servings: '12-14 Servings (Full 9x13 Pan)',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    isPopular: true,
    options: [
      {
        title: 'Pan Style',
        choices: [
          { id: 'pan-classic', name: 'Classic Vanilla Cream Cheese Pan ($35.00)' },
          { id: 'pan-pecan', name: 'Loaded Caramel Pecan Sticky Pan (+$5.00)', priceModifier: 5.0 },
          { id: 'pan-half-half', name: 'Half Classic / Half Caramel Pecan (+$3.00)', priceModifier: 3.0 },
        ],
      },
      {
        title: 'Bake State',
        choices: [
          { id: 'bake-warm', name: 'Fully Baked & Warm-Ready' },
          { id: 'bake-take-n-bake', name: 'Take & Bake (Par-Baked with Easy Oven Finish Guide)' },
        ],
      },
    ],
  },
  {
    id: 'box-gluten-friendly-4pack',
    name: 'Gluten-Friendly 4-Pack Gourmet Cinnamon Rolls',
    category: 'Party Boxes & Share Pans',
    price: 15.0,
    description: 'Crafted with our proprietary gluten-friendly flour blend so everyone can enjoy that soft, pillowy cinnamon roll bite. Baked in a dedicated sanitized workstation.',
    image: 'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?auto=format&fit=crop&w=800&q=80',
    servings: '4 Rolls (Gluten-Friendly)',
    dietaryTags: ['Gluten-Friendly Option', 'Vegetarian'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Flavor Selection',
        choices: [
          { id: 'gf-classic', name: '4x Gluten-Friendly Classic Vanilla Cream Cheese' },
          { id: 'gf-strawberry', name: '4x Gluten-Friendly Strawberry Cheesecake' },
          { id: 'gf-mix', name: '2 Classic / 2 Strawberry Cheesecake' },
        ],
      },
    ],
  },

  // 5. Celebration Roll Cakes
  {
    id: 'cake-cinnamon-roll-giant',
    name: '8-inch Giant Cinnamon Roll Celebration Cake',
    category: 'Celebration Roll Cakes',
    price: 38.0,
    description: 'A massive 8-inch spiral cinnamon roll cake layered with extra brown sugar syrup, smothered in tiered cream cheese icing rosettes, pearl sprinkles, and custom message topper.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    servings: '8-10 Generous Slices (8-inch round)',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 48,
    isPopular: true,
    options: [
      {
        title: 'Cake Size',
        choices: [
          { id: 'cake-8-inch', name: '8-inch Giant Roll (8-10 Servings)', priceModifier: 0 },
          { id: 'cake-10-inch', name: '10-inch Giant Roll (14-16 Servings)', priceModifier: 14.0 },
        ],
      },
      {
        title: 'Decoration Style',
        choices: [
          { id: 'decor-celebration', name: 'Celebration Style with Pearls, Sprinkles & Candles' },
          { id: 'decor-strawberry', name: 'Fresh Glazed Strawberry & Berry Crown (+ $4.00)', priceModifier: 4.0 },
          { id: 'decor-caramel-drip', name: 'Salted Caramel Pecan Drip (+ $4.00)', priceModifier: 4.0 },
        ],
      },
    ],
  },

  // 6. Savory Bakes
  {
    id: 'roll-garlic-herb-pesto',
    name: 'Garlic Herb & Basil Pesto Brioche Roll',
    category: 'Savory Bakes',
    price: 6.0,
    description: 'Slow-proved buttery dough layered with fresh basil garlic pesto, melted aged mozzarella, and shredded parmesan with flaky sea salt.',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    servings: '1 Savory Roll',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Savory Roll ($6.00)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Savory Box ($15.00)', priceModifier: 9.0 },
        ],
      },
    ],
  },
  {
    id: 'roll-jalapeno-bacon-cheddar',
    name: 'Jalapeño Cheddar & Applewood Bacon Roll',
    category: 'Savory Bakes',
    price: 6.5,
    description: 'Sharp Wisconsin cheddar cheese, thick-cut applewood smoked bacon, and diced jalapeños rolled into warm golden brioche.',
    image: 'https://images.unsplash.com/photo-1554998171-7e599bc95ccd?auto=format&fit=crop&w=800&q=80',
    servings: '1 Savory Roll',
    dietaryTags: ['Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Spice Level',
        choices: [
          { id: 'spice-mild', name: 'Mild Jalapeño' },
          { id: 'spice-loaded', name: 'Extra Jalapeño Heat' },
        ],
      },
      {
        title: 'Pack Size Option',
        choices: [
          { id: 'pack-single', name: 'Single Savory Roll ($6.50)', priceModifier: 0 },
          { id: 'pack-4', name: '4-Pack Savory Box ($16.00)', priceModifier: 9.5 },
        ],
      },
    ],
  },

  // 7. Mobile Cart & Catering
  {
    id: 'cart-mobile-dessert-booking',
    name: 'Mobile Dessert Cart & Live Frosting Bar (Event Booking)',
    category: 'Mobile Cart & Catering',
    price: 350.0,
    description: 'Book the official Roll With Me Bakery mobile dessert cart for your 2026 wedding, shower, birthday, or corporate gathering! Includes 2 hours of service, live warm roll warmer, interactive custom topping bar, custom letterboard signage, and cart barista setup.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    servings: '50-75 Guest Starter Package',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 48,
    isPopular: true,
    options: [
      {
        title: 'Guest Count Tier',
        choices: [
          { id: 'tier-50', name: 'Up to 50 Guests (50 Jumbo Rolls or 100 Minis)', priceModifier: 0 },
          { id: 'tier-100', name: 'Up to 100 Guests (+ $180.00)', priceModifier: 180.0 },
          { id: 'tier-150', name: 'Up to 150 Guests (+ $320.00)', priceModifier: 320.0 },
        ],
      },
      {
        title: 'Cart Theme & Decor Style',
        choices: [
          { id: 'theme-wedding-white', name: 'Rustic Floral & White Bridal Aesthetic' },
          { id: 'theme-birthday-festive', name: 'Celebratory Colorful Birthday Party' },
          { id: 'theme-corporate-sleek', name: 'Clean Modern Corporate Setup' },
        ],
      },
    ],
  },
  {
    id: 'catering-mini-platter-24',
    name: 'Mini Cinnamon Roll Catering Platter (24 Minis)',
    category: 'Mobile Cart & Catering',
    price: 48.0,
    description: 'Two dozen bite-sized gourmet cinnamon rolls arranged on an artisan presentation platter with pipette drizzles and side dipping pots.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    servings: '24 Mini Rolls (Serves 12-18)',
    dietaryTags: ['Vegetarian'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Flavor Selection',
        choices: [
          { id: 'mini-trio', name: 'Trio Platter (8 Classic, 8 Strawberry Cheesecake, 8 Biscoff)' },
          { id: 'mini-all-classic', name: '24x All Classic Cream Cheese' },
        ],
      },
    ],
  },

  // 8. Frostings & Sauces
  {
    id: 'extra-frosting-tub-8oz',
    name: 'Signature Cream Cheese Frosting Tub (8 oz)',
    category: 'Frostings & Sauces',
    price: 5.0,
    description: 'An extra 8-ounce tub of Lauren’s secret cream cheese icing recipe for true icing lovers. Keep chilled; microwave for 8-10 seconds for warm pourable drizzle.',
    image: 'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?auto=format&fit=crop&w=800&q=80',
    servings: '8 oz Tub (Generously frosts 6-8 rolls)',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
    options: [
      {
        title: 'Icing Flavor',
        choices: [
          { id: 'icing-classic', name: 'Classic Madagascar Vanilla Bean' },
          { id: 'icing-strawberry', name: 'Whipped Strawberry Cheesecake (+ $0.50)', priceModifier: 0.5 },
          { id: 'icing-biscoff', name: 'Speculoos Cookie Butter Icing (+ $0.50)', priceModifier: 0.5 },
        ],
      },
    ],
  },
  {
    id: 'extra-caramel-sauce-4oz',
    name: 'Warm Bourbon Salted Caramel Dipping Pot (4 oz)',
    category: 'Frostings & Sauces',
    price: 3.5,
    description: 'Small batch golden caramel sauce infused with a touch of bourbon vanilla and flaky sea salt. Perfect for dipping and drizzling.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    servings: '4 oz Dipping Jar',
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    leadTimeHours: 24,
  },
];

export const TIME_SLOTS = [
  '08:30 AM - 10:00 AM (Early Morning Fresh Bake)',
  '10:00 AM - 12:00 PM (Morning Pickup Window)',
  '12:00 PM - 02:00 PM (Midday Warm Batch)',
  '02:00 PM - 04:30 PM (Afternoon Pickup)',
  '04:30 PM - 06:30 PM (Evening Collection Window)',
];

export const SAMPLE_INITIAL_ORDERS: OrderRequest[] = [
  {
    id: 'REQ-8314',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Pending Review',
    fulfillmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    fulfillmentTimeSlot: '10:00 AM - 12:00 PM (Morning Pickup Window)',
    fulfillmentType: 'pickup',
    items: [
      {
        cartItemId: 'sample-cart-1',
        itemId: 'box-4pack-sampler',
        name: 'Gourmet 4-Pack Variety Sampler Box',
        price: 12.0,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        category: 'Party Boxes & Share Pans',
        selectedOptions: {
          'Flavor Selection Mix': 'Bakery Best Sellers (Classic, Strawberry Cheesecake, Biscoff, Caramel Pecan)',
          'Frosting Packaging': 'All Frostings Packed on Side with Warming Guide',
        },
        itemNotes: 'Please include extra warming instructions card as these are gifts for teachers!',
      },
      {
        cartItemId: 'sample-cart-2',
        itemId: 'extra-frosting-tub-8oz',
        name: 'Signature Cream Cheese Frosting Tub (8 oz)',
        price: 5.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?auto=format&fit=crop&w=800&q=80',
        category: 'Frostings & Sauces',
        selectedOptions: {
          'Icing Flavor': 'Classic Madagascar Vanilla Bean',
        },
        itemNotes: '',
      },
    ],
    subtotal: 29.0,
    estimatedTax: 2.32,
    estimatedTotal: 31.32,
    referenceImages: [
      {
        id: 'ref-sample-1',
        dataUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        fileName: 'teacher_gift_ribbon.jpg',
        fileSize: 380000,
        caption: 'Pink and gold ribbons if possible on the 4-pack boxes!',
      },
    ],
    customerName: 'Brianna Campbell',
    customerPhone: '(480) 555-0192',
    customerEmail: 'brianna.campbell@gmail.com',
    generalNotes: 'Picking up at the Mesa studio porch counter around 10:30 AM.',
    disclaimerAccepted: true,
    staffNotes: 'Prep 2x best sellers 4-packs on Friday early bake.',
  },
  {
    id: 'REQ-8309',
    createdAt: new Date(Date.now() - 86400000 * 1.2).toISOString(),
    status: 'Confirmed',
    fulfillmentDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    fulfillmentTimeSlot: '08:30 AM - 10:00 AM (Early Morning Fresh Bake)',
    fulfillmentType: 'delivery',
    deliveryAddress: '2450 E Baseline Rd, Suite 102, Mesa, AZ 85204',
    items: [
      {
        cartItemId: 'sample-cart-3',
        itemId: 'pan-9x13-family-dozen',
        name: '9x13 Family Share Pan (12 Jumbo Rolls Baker’s Dozen)',
        price: 40.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
        category: 'Party Boxes & Share Pans',
        selectedOptions: {
          'Pan Style': 'Loaded Caramel Pecan Sticky Pan (+$5.00)',
          'Bake State': 'Fully Baked & Warm-Ready',
        },
        itemNotes: 'For office morning staff breakfast meeting. Warm delivery if possible!',
      },
      {
        cartItemId: 'sample-cart-4',
        itemId: 'box-gluten-friendly-4pack',
        name: 'Gluten-Friendly 4-Pack Gourmet Cinnamon Rolls',
        price: 15.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?auto=format&fit=crop&w=800&q=80',
        category: 'Party Boxes & Share Pans',
        selectedOptions: {
          'Flavor Selection': '2 Classic / 2 Strawberry Cheesecake',
        },
        itemNotes: 'Separate box for gluten sensitive teammate.',
      },
    ],
    subtotal: 55.0,
    estimatedTax: 4.4,
    estimatedTotal: 59.4,
    referenceImages: [],
    customerName: 'David Martinez',
    customerPhone: '(480) 555-4821',
    customerEmail: 'dmartinez@eastvalleydental.com',
    generalNotes: 'Deliver to front desk reception. Please ring doorbell.',
    disclaimerAccepted: true,
    staffNotes: 'Confirmed via Bakesy/phone. Sent invoice #B-2041.',
  },
];
