import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = { products: Product[]; addToCart: (product: Product) => void };

export function ProductGrid({ products, addToCart }: ProductGridProps) {
  return <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">{products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>;
}
