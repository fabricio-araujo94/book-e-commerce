import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./useCartStore";
import { Book } from "@/types";

const mockBook: Book = {
  id: "1",
  title: "Clean Code",
  slug: "clean-code",
  authors: ["Robert C. Martin"],
  price: 79.9,
  coverUrl: "/images/clean-code.jpg",
  categories: ["Programação"],
  rating: 4.8,
  ratingsCount: 120,
  synopsis: "A Handbook of Agile Software Craftsmanship",
  featured: true,
};

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("should add an item to the cart", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockBook, 1);

    const { items, getTotalItems } = useCartStore.getState();
    expect(items.length).toBe(1);
    expect(items[0].book.id).toBe("1");
    expect(items[0].quantity).toBe(1);
    expect(getTotalItems()).toBe(1);
  });

  it("should increment quantity when adding the same item", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockBook, 1);
    addItem(mockBook, 2);

    const { items, getTotalItems } = useCartStore.getState();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(3);
    expect(getTotalItems()).toBe(3);
  });

  it("should remove an item from the cart", () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(mockBook, 1);
    removeItem("1");

    const { items, getTotalItems } = useCartStore.getState();
    expect(items.length).toBe(0);
    expect(getTotalItems()).toBe(0);
  });

  it("should clear the cart", () => {
    const { addItem, clearCart } = useCartStore.getState();
    addItem(mockBook, 2);
    clearCart();

    const { items, getTotalItems } = useCartStore.getState();
    expect(items.length).toBe(0);
    expect(getTotalItems()).toBe(0);
  });
});
