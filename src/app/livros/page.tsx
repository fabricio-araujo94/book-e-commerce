import { getAllBooks, getUniqueCategories } from "@/lib/books";
import { CatalogClient } from "./CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Livros",
  description: "Explore nossa coleção completa de livros técnicos de tecnologia e programação.",
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    categoria?: string;
    sortBy?: string;
  }>;
}

export default async function BooksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const books = getAllBooks();
  const categories = getUniqueCategories();

  return (
    <CatalogClient
      initialBooks={books}
      categories={categories}
      initialCategory={params.categoria}
      initialSearch={params.search}
      initialSortBy={params.sortBy}
    />
  );
}
