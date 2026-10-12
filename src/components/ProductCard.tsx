import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { money } from "../lib/money";
import type { Product } from "../types/product";

type ProductCardProps = { product: Product; addToCart: (product: Product) => void };

export function ProductCard({ product, addToCart }: ProductCardProps) {
  const [saved, setSaved] = useState(false);
  return <article className="group"><div className="relative aspect-[.76] overflow-hidden bg-stone-100"><Link to={`/product/${product.id}`}><img className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={product.image} alt={product.alt} /></Link>{product.badge && <span className="absolute left-3 top-3 bg-[#faf9f7] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]">{product.badge}</span>}<button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 opacity-100 backdrop-blur transition hover:bg-white md:opacity-0 md:group-hover:opacity-100" onClick={() => setSaved(!saved)} aria-label="Save item"><Heart size={15} className={saved ? "fill-[#ae4d32] text-[#ae4d32]" : ""} /></button><button className="absolute bottom-3 left-3 right-3 hidden h-11 items-center justify-center gap-2 bg-stone-950 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#ae4d32] md:flex md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100" onClick={() => addToCart(product)}><ShoppingBag size={14} /> Add to bag</button></div><div className="pt-3"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{product.category}</p><Link className="mt-1 block font-serif text-lg tracking-[-0.025em] hover:underline" to={`/product/${product.id}`}>{product.name}</Link></div><span className="pt-4 text-sm text-stone-700">{money(product.price)}</span></div><button onClick={() => addToCart(product)} className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-700 underline underline-offset-4 md:hidden">Add to bag</button></div></article>;
}
