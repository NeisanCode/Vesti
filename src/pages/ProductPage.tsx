import { useState } from "react";
import {
  Check,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { products } from "../data/products";
import { money } from "../lib/money";
import type { Product } from "../types/product";

type ProductPageProps = { addToCart: (product: Product) => void };

export function ProductPage({ addToCart }: ProductPageProps) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Oat");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItems = () => {
    for (let index = 0; index < qty; index += 1) addToCart(product);
    setAdded(true);
  };
  const colours = [
    ["Oat", "bg-[#d5c4aa]"],
    ["Black", "bg-stone-900"],
    ["Chestnut", "bg-[#875b37]"],
  ];
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-6 lg:px-10 lg:py-9">
      <div className="mb-6 flex gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="text-stone-900">{product.name}</span>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.55fr_.8fr] lg:gap-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="aspect-[.76] overflow-hidden bg-stone-100">
            <img
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.alt}
            />
          </div>
          <div className="relative aspect-[.76] overflow-hidden bg-stone-100">
            <img
              className="h-full w-full object-cover grayscale-[18%]"
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85"
              alt="Product style detail"
            />
            <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em]">
              Details
            </span>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.05em] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg">{money(product.price)}</p>
          <div className="mt-6 flex items-center gap-1.5">
            <div className="flex text-[#ae4d32]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="ml-2 text-xs text-stone-500">
              4.9 · 28 reviews
            </span>
          </div>
          <p className="mt-7 max-w-md text-sm leading-6 text-stone-600">
            A beautifully cut staple in a soft wool blend. Designed with a
            relaxed silhouette and made for the long way around.
          </p>
          <div className="mt-8">
            <div className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.13em]">
              <span>Colour</span>
              <span className="font-medium normal-case tracking-normal text-stone-500">
                {color}
              </span>
            </div>
            <div className="flex gap-2">
              {colours.map(([name, className]) => (
                <button
                  key={name}
                  onClick={() => setColor(name)}
                  className={`h-9 w-9 rounded-full ${className} ${color === name ? "ring-1 ring-stone-950 ring-offset-3" : ""}`}
                  aria-label={name}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.13em]">
              Size
            </p>
            <div className="grid max-w-md grid-cols-4 gap-2">
              {["XS", "S", "M", "L"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSize(option)}
                  className={`h-11 border text-xs transition ${size === option ? "border-stone-950 bg-stone-950 text-white" : "border-stone-300 hover:border-stone-700"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mt-3 text-xs text-stone-500 underline underline-offset-4">
              Size guide
            </button>
          </div>
          <div className="mt-8 flex gap-3">
            <div className="flex h-13 items-center border border-stone-300">
              <button
                className="grid h-full w-11 place-items-center"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="grid w-9 place-items-center text-sm">{qty}</span>
              <button
                className="grid h-full w-11 place-items-center"
                onClick={() => setQty(qty + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
            <Button
              className="h-13 flex-1 rounded-none bg-stone-950 text-[11px] uppercase tracking-[0.14em] hover:bg-[#ae4d32]"
              onClick={addItems}
            >
              {added ? (
                <>
                  <Check size={15} /> Added to bag
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> Add to bag
                </>
              )}
            </Button>
          </div>
          <div className="mt-7 space-y-3 border-t border-stone-200 pt-5 text-xs text-stone-600">
            <p className="flex items-center gap-3">
              <Truck size={16} /> Complimentary shipping on orders over $150
            </p>
            <p className="flex items-center gap-3">
              <PackageCheck size={16} /> Easy 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
