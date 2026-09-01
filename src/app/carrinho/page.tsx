import { CartClient } from "./CartClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho de Compras",
  description: "Revise seus livros selecionados e finalize seu pedido com segurança.",
};

export default function CartPage() {
  return <CartClient />;
}
