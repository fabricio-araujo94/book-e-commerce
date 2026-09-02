import { describe, it, expect } from "vitest";
import {
  getAllBooks,
  getBookBySlug,
  getUniqueCategories,
  getUniqueAuthors,
  getPriceBounds,
  filterAndSortBooks,
} from "./books";

describe("books library utils", () => {
  it("should return all books", () => {
    const books = getAllBooks();
    expect(books).toBeDefined();
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  it("should get a book by slug", () => {
    const books = getAllBooks();
    const firstBook = books[0];
    const found = getBookBySlug(firstBook.slug);
    expect(found).toBeDefined();
    expect(found?.id).toBe(firstBook.id);

    const notFound = getBookBySlug("non-existent-slug-xyz");
    expect(notFound).toBeUndefined();
  });

  it("should return unique categories and authors", () => {
    const categories = getUniqueCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);

    const authors = getUniqueAuthors();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors.length).toBeGreaterThan(0);
  });

  it("should return valid price bounds", () => {
    const bounds = getPriceBounds();
    expect(bounds).toHaveProperty("min");
    expect(bounds).toHaveProperty("max");
    expect(bounds.min).toBeLessThanOrEqual(bounds.max);
  });

  it("should filter and sort books correctly", () => {
    const result = filterAndSortBooks({
      search: "",
      sortBy: "price-asc",
      page: 1,
      pageSize: 5,
    });

    expect(result).toHaveProperty("books");
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("totalPages");
    expect(result.books.length).toBeLessThanOrEqual(5);

    // Verify sorting by price ascending
    if (result.books.length > 1) {
      expect(result.books[0].price).toBeLessThanOrEqual(result.books[1].price);
    }
  });
});
