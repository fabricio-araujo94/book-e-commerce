export type BookFormat = "capa dura" | "brochura" | "e-book";

export interface Book {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  categories: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  ratingsCount: number;
  year: number;
  publisher: string;
  language: string;
  format: BookFormat;
  pages: number;
  isbn: string;
  coverUrl: string;
  synopsis: string;
  inStock: boolean;
  featured: boolean;
}

export interface BookFilters {
  search?: string;
  categories?: string[];
  authors?: string[];
  minPrice?: number;
  maxPrice?: number;
  format?: BookFormat;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest" | "oldest";
  page?: number;
  pageSize?: number;
}

export interface PaginatedBooks {
  books: Book[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PriceBounds {
  min: number;
  max: number;
}