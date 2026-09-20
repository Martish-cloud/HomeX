export type City =
  | "Bengaluru"
  | "Mumbai"
  | "Delhi NCR"
  | "Hyderabad"
  | "Pune"
  | "Chennai";

export type PropertyCategoryType =
  | "Apartments"
  | "Villas"
  | "Plots"
  | "Commercial"
  | "Luxury"
  | "Penthouse";

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  propertiesListed: number;
  propertiesSold: number;
  phone: string;
  email: string;
  whatsapp: string;
  reraId: string;
  bio: string;
  languages: string[];
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  tag?: string;
  type: PropertyCategoryType;
  listingType: "Buy" | "Rent" | "Sell";
  price: string;
  priceNumeric: number; // in Rupees
  pricePerSqFt: string;
  location: string;
  locality: string;
  city: City;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  specifications: {
    carpetArea: string;
    superBuiltUp: string;
    facing: string;
    floor: string;
    totalFloors: string;
    balconies: number;
    furnishing: "Fully Furnished" | "Semi-Furnished" | "Unfurnished";
    possessionDate: string;
    possessionStatus: "Ready to Move" | "Under Construction" | "Resale";
    ageOfProperty: string;
  };
  agent: Agent;
  nearbyTransit?: {
    name: string;
    distance: string;
    type: "metro" | "school" | "hospital" | "techpark";
  }[];
}

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  city: City;
  startingPrice: string;
  possessionDate: string;
  reraNumber: string;
  configurations: string[];
  totalUnits: number;
  launchDate: string;
  images: string[];
  status: "New Launch" | "Under Construction" | "Ready to Move";
  description: string;
  highlights: string[];
  amenities: string[];
}

export interface CategoryInfo {
  id: string;
  name: PropertyCategoryType;
  tagline: string;
  description: string;
  image: string;
  count: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Buying" | "Renting" | "Investment" | "Market Insights" | "Home & Lifestyle";
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  content: string[];
}

export interface FilterState {
  search: string;
  city: City | "All";
  propertyType: string;
  tab: "Buy" | "Rent" | "Sell" | "Projects";
  priceRange: [number, number];
  bedrooms: string;
  possession: string;
  furnishing: string;
  amenities: string[];
  sortBy: "popular" | "price-asc" | "price-desc" | "newest" | "rating";
  viewMode: "grid" | "list";
}
