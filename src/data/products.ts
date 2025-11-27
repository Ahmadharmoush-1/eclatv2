import perfumeBleu from "@/assets/perfume-bleu.png";
import perfumeAventus from "@/assets/perfume-aventus.png";
import perfumeYsl from "@/assets/perfume-ysl.png";
import perfumeSauvage from "@/assets/perfume-sauvage.png";

export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  gender: "men" | "women" | "unisex";
  description: string;
  inspiredBy: string;
  longevity: string;
  sillage: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  sizes: Array<{
    ml: number;
    price: number;
    oldPrice: number;
  }>;
  customerReviews: Array<{
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    brand: "Inspired by Chanel",
    image: perfumeBleu,
    price: 17.99,
    oldPrice: 23.00,
    rating: 5,
    reviews: 326,
    discount: 21,
    gender: "men",
    description: "An aromatic-woody fragrance that embodies freedom and determination. A timeless scent that exudes confidence and sophistication, perfect for the modern gentleman.",
    inspiredBy: "Chanel Bleu de Chanel EDP",
    longevity: "8-10 hours",
    sillage: "Strong",
    notes: {
      top: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
      middle: ["Ginger", "Jasmine", "Melon", "Nutmeg"],
      base: ["Incense", "Sandalwood", "Cedar", "Labdanum"]
    },
    sizes: [
      { ml: 30, price: 12.99, oldPrice: 16.00 },
      { ml: 50, price: 17.99, oldPrice: 23.00 },
      { ml: 100, price: 29.99, oldPrice: 38.00 }
    ],
    customerReviews: [
      {
        id: 1,
        name: "Michael R.",
        rating: 5,
        date: "2024-01-15",
        comment: "Absolutely incredible! Smells exactly like the original Bleu de Chanel. Lasts all day and gets compliments everywhere I go. Best purchase!",
        verified: true
      },
      {
        id: 2,
        name: "James K.",
        rating: 5,
        date: "2024-01-10",
        comment: "Amazing quality for the price. I own the original and honestly can't tell much difference. The longevity is impressive!",
        verified: true
      },
      {
        id: 3,
        name: "David L.",
        rating: 4,
        date: "2024-01-05",
        comment: "Great scent, very close to the original. Only 4 stars because it could last a bit longer, but still excellent value.",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "Creed Aventus",
    brand: "Inspired by Creed",
    image: perfumeAventus,
    price: 17.99,
    oldPrice: 23.00,
    rating: 5,
    reviews: 270,
    discount: 21,
    gender: "men",
    description: "A bold and confident fragrance celebrating strength and vision. Fruity and fresh notes combined with woody undertones create a distinctive and unforgettable scent.",
    inspiredBy: "Creed Aventus EDP",
    longevity: "10-12 hours",
    sillage: "Very Strong",
    notes: {
      top: ["Pineapple", "Blackcurrant", "Apple", "Bergamot"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oakmoss", "Ambergris", "Vanilla"]
    },
    sizes: [
      { ml: 30, price: 12.99, oldPrice: 16.00 },
      { ml: 50, price: 17.99, oldPrice: 23.00 },
      { ml: 100, price: 29.99, oldPrice: 38.00 }
    ],
    customerReviews: [
      {
        id: 1,
        name: "Robert T.",
        rating: 5,
        date: "2024-01-18",
        comment: "This is a beast! Projection and longevity are insane. Gets tons of compliments. Can't believe it's this affordable!",
        verified: true
      },
      {
        id: 2,
        name: "Alex M.",
        rating: 5,
        date: "2024-01-12",
        comment: "Phenomenal! Smells exactly like Aventus. Lasts the entire day and people always ask what I'm wearing.",
        verified: true
      },
      {
        id: 3,
        name: "Chris P.",
        rating: 5,
        date: "2024-01-08",
        comment: "Best fragrance purchase ever. Quality is outstanding and the price is unbeatable.",
        verified: true
      }
    ]
  },
  {
    id: 3,
    name: "YSL L'Homme",
    brand: "Inspired by Yves Saint Laurent",
    image: perfumeYsl,
    price: 17.99,
    oldPrice: 23.00,
    rating: 4.5,
    reviews: 243,
    discount: 21,
    gender: "women",
    description: "A sophisticated oriental woody fragrance. Modern and elegant, it combines fresh citrus with warm spices and woods for a versatile everyday scent.",
    inspiredBy: "YSL L'Homme EDT",
    longevity: "6-8 hours",
    sillage: "Moderate",
    notes: {
      top: ["Bergamot", "Lemon", "Ginger"],
      middle: ["White Pepper", "Basil", "Violet"],
      base: ["Tonka Bean", "Cedar", "Vetiver"]
    },
    sizes: [
      { ml: 30, price: 12.99, oldPrice: 16.00 },
      { ml: 50, price: 17.99, oldPrice: 23.00 },
      { ml: 100, price: 29.99, oldPrice: 38.00 }
    ],
    customerReviews: [
      {
        id: 1,
        name: "Andrew S.",
        rating: 5,
        date: "2024-01-14",
        comment: "Perfect for office wear. Not too strong, but lasts well. Very professional and clean scent.",
        verified: true
      },
      {
        id: 2,
        name: "Tom W.",
        rating: 4,
        date: "2024-01-09",
        comment: "Great everyday fragrance. Smells fantastic and very versatile. Would buy again!",
        verified: true
      },
      {
        id: 3,
        name: "Mark B.",
        rating: 5,
        date: "2024-01-03",
        comment: "Elegant and refined. My wife loves it on me. Excellent quality for the price.",
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: "Sauvage Dior",
    brand: "Inspired by Dior",
    image: perfumeSauvage,
    price: 17.99,
    oldPrice: 23.00,
    rating: 5,
    reviews: 218,
    discount: 21,
    gender: "women",
    description: "A powerful and noble fragrance. Fresh and spicy with a woody base, it's raw and noble like a wide-open sky. Perfect for the modern woman.",
    inspiredBy: "Dior Sauvage EDT",
    longevity: "8-10 hours",
    sillage: "Strong",
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      middle: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver"],
      base: ["Ambroxan", "Cedar", "Labdanum"]
    },
    sizes: [
      { ml: 30, price: 12.99, oldPrice: 16.00 },
      { ml: 50, price: 17.99, oldPrice: 23.00 },
      { ml: 100, price: 29.99, oldPrice: 38.00 }
    ],
    customerReviews: [
      {
        id: 1,
        name: "Brandon J.",
        rating: 5,
        date: "2024-01-16",
        comment: "Absolutely love it! Smells identical to the original Sauvage. Lasts all day and projects well.",
        verified: true
      },
      {
        id: 2,
        name: "Eric N.",
        rating: 5,
        date: "2024-01-11",
        comment: "Best scent ever! Gets me so many compliments. Will definitely order more bottles.",
        verified: true
      },
      {
        id: 3,
        name: "Kevin D.",
        rating: 5,
        date: "2024-01-06",
        comment: "Amazing! Just as good as the real Dior Sauvage. Can't beat this price!",
        verified: true
      }
    ]
  }
];
