import { notFound } from "next/navigation";
import { getBookBySlug, getAllBooks } from "@/lib/books";
import { BookDetailClient } from "./BookDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      title: "Livro não encontrado",
    };
  }

  return {
    title: book.title,
    description: book.synopsis.slice(0, 160),
    openGraph: {
      title: `${book.title} | DevBooks`,
      description: book.synopsis.slice(0, 160),
      images: [
        {
          url: book.coverUrl,
          alt: book.title,
        },
      ],
    },
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const allBooks = getAllBooks();
  const relatedBooks = allBooks
    .filter(
      (b) =>
        b.id !== book.id &&
        b.categories.some((cat) => book.categories.includes(cat))
    )
    .slice(0, 4);

  return <BookDetailClient book={book} relatedBooks={relatedBooks} />;
}
