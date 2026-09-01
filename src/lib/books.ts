import { Book, BookFilters, PaginatedBooks, PriceBounds } from "@/types";
import booksData from "@/data/books.json";

const books: Book[] = booksData as Book[];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getUniqueCategories(): string[] {
  const categoriesSet = new Set<string>();
  books.forEach((book) => {
    book.categories.forEach((category) => categoriesSet.add(category));
  });
  return Array.from(categoriesSet).sort();
}

export function getUniqueAuthors(): string[] {
  const authorsSet = new Set<string>();
  books.forEach((book) => {
    book.authors.forEach((author) => authorsSet.add(author));
  });
  return Array.from(authorsSet).sort();
}

export function getPriceBounds(): PriceBounds {
  const prices = books.map((book) => book.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function filterAndSortBooks(filters: BookFilters): PaginatedBooks {
  const {
    search,
    categories,
    authors,
    minPrice,
    maxPrice,
    format,
    inStock,
    featured,
    sortBy = "relevance",
    page = 1,
    pageSize = 12,
  } = filters;

  let filtered = [...books];

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.authors.some((author) => author.toLowerCase().includes(searchLower)) ||
        book.categories.some((cat) => cat.toLowerCase().includes(searchLower)) ||
        book.synopsis.toLowerCase().includes(searchLower)
    );
  }

  if (categories && categories.length > 0) {
    filtered = filtered.filter((book) =>
      book.categories.some((cat) => categories.includes(cat))
    );
  }

  if (authors && authors.length > 0) {
    filtered = filtered.filter((book) =>
      book.authors.some((author) => authors.includes(author))
    );
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((book) => book.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((book) => book.price <= maxPrice);
  }

  if (format) {
    filtered = filtered.filter((book) => book.format === format);
  }

  if (inStock !== undefined) {
    filtered = filtered.filter((book) => book.inStock === inStock);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((book) => book.featured === featured);
  }

  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => b.year - a.year);
      break;
    case "oldest":
      filtered.sort((a, b) => a.year - b.year);
      break;
    case "relevance":
    default:
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
      break;
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedBooks = filtered.slice(start, start + pageSize);

  return {
    books: paginatedBooks,
    total,
    page,
    pageSize,
    totalPages,
  };
}
