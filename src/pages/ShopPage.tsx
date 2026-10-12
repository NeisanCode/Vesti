import { useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { products } from "../data/products";
import type { Product } from "../types/product";

type ShopPageProps = { addToCart: (product: Product) => void };

export function ShopPage({ addToCart }: ShopPageProps) {
  const [filter, setFilter] = useState("All pieces");
  const filters = [
    "All pieces",
    "Outerwear",
    "Knitwear",
    "Dresses",
    "Tailoring",
    "Essentials",
  ];
  const displayed =
    filter === "All pieces"
      ? products
      : products.filter((product) => product.category === filter);
  return (
    <>
      <section className="bg-[#e7e1db] px-5 py-16 text-center lg:py-20">
        <p className="eyebrow">Autumn / winter 2025</p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.055em] sm:text-6xl">
          The collection
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-stone-600">
          A carefully edited selection of pieces to wear, rewear and make your
          own.
        </p>
      </section>
      <section className="mx-auto max-w-360 px-5 py-10 lg:px-10 lg:py-14">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-stone-200 pb-5 sm:flex-row sm:items-center">
          <div className="flex gap-5 overflow-x-auto text-[12px] font-bold uppercase tracking-[0.14em] text-stone-500">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`shrink-0 transition ${filter === item ? "text-stone-950" : "hover:text-stone-950"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="shrink-0 text-xs text-stone-500">
            {displayed.length} pieces
          </span>
        </div>
        <ProductGrid products={displayed} addToCart={addToCart} />
      </section>
    </>
  );
}
