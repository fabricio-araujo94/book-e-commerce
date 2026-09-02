import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookCard } from "./BookCard";
import { useCartStore } from "@/store/useCartStore";
import { Book } from "@/types";

const mockBook: Book = {
  id: "test-1",
  slug: "test-book",
  title: "Test Driven Development in TypeScript",
  authors: ["Kent Beck", "Martin Fowler"],
  price: 79.90,
  originalPrice: 99.90,
  coverUrl: "https://example.com/cover.jpg",
  synopsis: "A great book about testing.",
  categories: ["Programming", "Testing"],
  rating: 4.8,
  ratingsCount: 120,
  inStock: true,
  featured: true,
  year: 2024,
  publisher: "Addison-Wesley",
  language: "Português",
  format: "brochura",
  pages: 350,
  isbn: "978-3-16-148410-0",
};

describe("BookCard Component", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("should render book information correctly", () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText("Test Driven Development in TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Kent Beck, Martin Fowler")).toBeInTheDocument();
    expect(screen.getByText("brochura")).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("should add book to cart when clicking add to cart button", () => {
    render(<BookCard book={mockBook} />);

    const addButton = screen.getByRole("button", { name: /Comprar livro Test Driven Development in TypeScript/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    // Verify cart store updated
    const cartItems = useCartStore.getState().items;
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].book.id).toBe("test-1");
    expect(cartItems[0].quantity).toBe(1);

    // Button should display added state
    expect(screen.getByText("Adicionado!")).toBeInTheDocument();
  });
});
