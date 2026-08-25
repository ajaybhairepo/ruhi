export type Category =
  | "All"
  | "Detergent"
  | "Soap"
  | "Disinfectant"
  | "Dishwasher"
  | "Cleaner";

export type Variant = {
  label: string;
  price: number;
  offer: number;
};

export type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  offer: number;
  image: string;
  description: string;
  variants?: Variant[];
  isLiquid?: boolean;
};

export type Banner = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  color: string;
};

export type CustomerOrder = { id: string; date: string; total: number };

export type Customer = {
  name: string;
  email: string;
  address: string;
  orders: CustomerOrder[];
};

export const categories: Category[] = [
  "All",
  "Detergent",
  "Soap",
  "Disinfectant",
  "Dishwasher",
  "Cleaner",
];

// Helper function to generate variants
const generateVariants = (
  basePrice: number,
  baseOffer: number,
  isLiquid: boolean,
): Variant[] => {
  if (isLiquid) {
    return [
      {
        label: "250ml",
        price: Math.round(basePrice * 0.6),
        offer: Math.round(baseOffer * 0.6),
      },
      {
        label: "500ml",
        price: Math.round(basePrice),
        offer: Math.round(baseOffer),
      },
      {
        label: "750ml",
        price: Math.round(basePrice * 1.4),
        offer: Math.round(baseOffer * 1.4),
      },
      {
        label: "1000ml",
        price: Math.round(basePrice * 1.8),
        offer: Math.round(baseOffer * 1.8),
      },
    ];
  } else {
    return [
      {
        label: "1kg",
        price: Math.round(basePrice),
        offer: Math.round(baseOffer),
      },
      {
        label: "2kg",
        price: Math.round(basePrice * 1.8),
        offer: Math.round(baseOffer * 1.8),
      },
      {
        label: "5kg",
        price: Math.round(basePrice * 4.2),
        offer: Math.round(baseOffer * 4.2),
      },
    ];
  }
};

export const products: Product[] = [
  // Detergents
  {
    id: 1,
    name: "Lemon Burst Detergent",
    category: "Detergent",
    price: 560,
    offer: 449,
    image:
      "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=800&q=85",
    description:
      "A bright, concentrated liquid detergent for everyday family laundry.",
    isLiquid: true,
    variants: generateVariants(560, 449, true),
  },
  {
    id: 2,
    name: "Mogra Soft Wash",
    category: "Detergent",
    price: 620,
    offer: 499,
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=85",
    description:
      "Gentle fragrance and deep cleaning power for colours and whites.",
    isLiquid: true,
    variants: generateVariants(620, 499, true),
  },
  {
    id: 5,
    name: "White Fresh Powder",
    category: "Detergent",
    price: 450,
    offer: 369,
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=85",
    description:
      "A hardworking powder formula that lifts daily stains without drama.",
    isLiquid: false,
    variants: generateVariants(450, 369, false),
  },
  {
    id: 7,
    name: "Active Oxy Powder",
    category: "Detergent",
    price: 520,
    offer: 429,
    image:
      "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=800&q=85",
    description:
      "Powerful oxygen-based powder for tough stains and bright whites.",
    isLiquid: false,
    variants: generateVariants(520, 429, false),
  },

  // Soaps
  {
    id: 3,
    name: "Neem Care Bar",
    category: "Soap",
    price: 180,
    offer: 149,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=85",
    description:
      "A fresh herbal cleansing bar made for a clean, comfortable daily routine.",
    isLiquid: false,
    variants: generateVariants(180, 149, false),
  },
  {
    id: 6,
    name: "Aloe Hand Wash",
    category: "Soap",
    price: 260,
    offer: 219,
    image:
      "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=800&q=85",
    description: "A soft, clean lather for hands that do a lot.",
    isLiquid: true,
    variants: generateVariants(260, 219, true),
  },
  {
    id: 8,
    name: "Rose Petal Soap",
    category: "Soap",
    price: 200,
    offer: 165,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=85",
    description: "Luxurious rose-scented soap for a refreshing daily cleanse.",
    isLiquid: false,
    variants: generateVariants(200, 165, false),
  },

  // Disinfectants
  {
    id: 4,
    name: "Surface Shield",
    category: "Disinfectant",
    price: 390,
    offer: 329,
    image:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=85",
    description: "Reliable surface disinfection with a crisp, clean finish.",
    isLiquid: true,
    variants: generateVariants(390, 329, true),
  },
  {
    id: 9,
    name: "Hospital Grade Disinfectant",
    category: "Disinfectant",
    price: 450,
    offer: 379,
    image:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=85",
    description: "Professional strength disinfectant for complete protection.",
    isLiquid: true,
    variants: generateVariants(450, 379, true),
  },

  // Dishwashers
  {
    id: 10,
    name: "Dishwasher Gel",
    category: "Dishwasher",
    price: 320,
    offer: 269,
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=85",
    description: "Powerful grease-cutting formula for sparkling clean dishes.",
    isLiquid: true,
    variants: generateVariants(320, 269, true),
  },
  {
    id: 11,
    name: "Dishwasher Powder",
    category: "Dishwasher",
    price: 280,
    offer: 229,
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=85",
    description: "Effective powder detergent for tough food stains and grease.",
    isLiquid: false,
    variants: generateVariants(280, 229, false),
  },

  // Cleaners
  {
    id: 12,
    name: "All-Purpose Cleaner",
    category: "Cleaner",
    price: 350,
    offer: 289,
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=85",
    description:
      "Versatile cleaner for all surfaces - kitchen, bathroom, and more.",
    isLiquid: true,
    variants: generateVariants(350, 289, true),
  },
  {
    id: 13,
    name: "Glass & Window Cleaner",
    category: "Cleaner",
    price: 220,
    offer: 179,
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=85",
    description: "Streak-free formula for crystal clear windows and mirrors.",
    isLiquid: true,
    variants: generateVariants(220, 179, true),
  },
  {
    id: 14,
    name: "Floor Cleaner",
    category: "Cleaner",
    price: 380,
    offer: 319,
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=85",
    description: "Deep cleaning floor solution for tiles, marble, and more.",
    isLiquid: true,
    variants: generateVariants(380, 319, true),
  },
];

export const banners: Banner[] = [
  {
    eyebrow: "The everyday clean",
    title: "Small rituals. Noticeably fresher days.",
    copy: "Ruhi products are made for the rooms, clothes and people that make your home feel like home.",
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1600&q=90",
    color: "saffron",
  },
  {
    eyebrow: "Made in Nepal, made with care",
    title: "A little more care in every wash.",
    copy: "Thoughtful formulas, clear prices and doorstep delivery across Nepal.",
    image:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1600&q=90",
    color: "blue",
  },
  {
    eyebrow: "Bundle & save",
    title: "Your clean cupboard starts here.",
    copy: "Stock up on essentials and save more with our family-size bundles.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=90",
    color: "green",
  },
];
