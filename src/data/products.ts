import perfumeBleu from "@/assets/perfume-bleu.png";
import perfumeAventus from "@/assets/perfume-aventus.png";
import perfumeYsl from "@/assets/perfume-ysl.png";
import perfumeSauvage from "@/assets/perfume-sauvage.png";

export interface Product {
  id: string;
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
  tags: string[];
  isPrivateCollection: boolean;
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
 
}

export const products: Product[] = [
  {
    id: "1",
    name: "Bleu de Chanel",
    brand: "Inspired by Chanel",
    image: perfumeBleu,
    price: 17.99,
    oldPrice: 23.0,
    rating: 5,
    reviews: 326,
    discount: 21,
    gender: "men",
    description:
      "An aromatic-woody fragrance that embodies freedom and determination. A timeless scent that exudes confidence and sophistication, perfect for the modern gentleman.",
    inspiredBy: "Chanel Bleu de Chanel EDP",
    longevity: "8-10 hours",
    sillage: "Strong",
    tags: ["men", "fresh", "bestseller"],
    isPrivateCollection: false,
    notes: {
      top: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
      middle: ["Ginger", "Jasmine", "Melon", "Nutmeg"],
      base: ["Incense", "Sandalwood", "Cedar", "Labdanum"],
    },
    sizes: [
      
      { ml: 50, price: 17.99, oldPrice: 23.0 },
      { ml: 100, price: 29.99, oldPrice: 38.0 },
    ],
 
  },

  {
    id: "2",
    name: "Creed Aventus",
    brand: "Inspired by Creed",
    image: perfumeAventus,
    price: 17.99,
    oldPrice: 23.0,
    rating: 5,
    reviews: 270,
    discount: 21,
    gender: "men",
    description:
      "A bold and confident fragrance celebrating strength and vision. Fruity and fresh notes combined with woody undertones create a distinctive and unforgettable scent.",
    inspiredBy: "Creed Aventus EDP",
    longevity: "10-12 hours",
    sillage: "Very Strong",
    tags: ["men", "fruity", "luxury"],
    isPrivateCollection: false,
    notes: {
      top: ["Pineapple", "Blackcurrant", "Apple", "Bergamot"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oakmoss", "Ambergris", "Vanilla"],
    },
    sizes: [
      
      { ml: 50, price: 17.99, oldPrice: 23.0 },
      { ml: 100, price: 29.99, oldPrice: 38.0 },
    ],
   
  },

  {
    id: "3",
    name: "YSL L'Homme",
    brand: "Inspired by Yves Saint Laurent",
    image: perfumeYsl,
    price: 17.99,
    oldPrice: 23.0,
    rating: 4.5,
    reviews: 243,
    discount: 21,
    gender: "men",
    description:
      "A sophisticated oriental woody fragrance. Modern and elegant, it combines fresh citrus with warm spices and woods for a versatile everyday scent.",
    inspiredBy: "YSL L'Homme EDT",
    longevity: "6-8 hours",
    sillage: "Moderate",
    tags: ["men", "office", "daily"],
    isPrivateCollection: false,
    notes: {
      top: ["Bergamot", "Lemon", "Ginger"],
      middle: ["White Pepper", "Basil", "Violet"],
      base: ["Tonka Bean", "Cedar", "Vetiver"],
    },
    sizes: [
      
      { ml: 50, price: 17.99, oldPrice: 23.0 },
      { ml: 100, price: 29.99, oldPrice: 38.0 },
    ],
   
  },
];

  export default products;
 

