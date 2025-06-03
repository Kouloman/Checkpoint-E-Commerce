export interface ProductType {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  categoryId: string;
  brand?: string;
  model?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  sale?: boolean;
  new?: boolean;
  color?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  warranty?: string;
  features?: string[];
}

export interface CategoryType {
  id: string;
  name: string;
  description: string;
  image: string;
}