import { ChevronLeft, Smartphone, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FormSection } from "../components/FormSection";
import { products } from "../data/products";
import { money } from "../lib/money";
import type { Product } from "../types/product";

type CheckoutPageProps = { cart: Product[] };

export function CheckoutPage({ cart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const items = cart.length ? cart : [products[0], products[3]];
  const subtotal = items.reduce((total, product) => total + product.price, 0);
  const shipping = subtotal >= 150 ? 0 : 12;

  return (
    <section className="bg-[#f7f5f2]">
      <div className="mx-auto grid max-w-310 gap-12 px-5 py-12 lg:grid-cols-[1.1fr_.8fr] lg:gap-24 lg:px-10 lg:py-18">
        <div>
          <Link
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-stone-600"
            to="/shop"
          >
            <ChevronLeft size={15} /> Continue shopping
          </Link>
          <p className="eyebrow">Secure checkout</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tighter">
            Almost yours.
          </h1>
          <form
            className="mt-10"
            onSubmit={(event) => {
              event.preventDefault();
              navigate("/payment-success", {
                state: { total: subtotal + shipping },
              });
            }}
          >
            <FormSection title="Mobile Money payment">
              <div className="rounded-sm border border-stone-900 bg-white">
                <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-4">
                  <div className="grid size-9 place-items-center rounded-full bg-[#e7e1db]">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">OpenPay Mobile Money</p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Pay securely with MTN or Airtel.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 bg-stone-50 p-4">
                  <label className="field-label">
                    Mobile money number
                    <input
                      required
                      name="payment_phone_number"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="242[0-9]{9}"
                      placeholder="242066203420"
                      title="Enter a Congo phone number in the format 242XXXXXXXXX"
                    />
                  </label>
                  <label className="field-label">
                    Mobile operator
                    <select required name="provider" defaultValue="">
                      <option value="" disabled>
                        Select your operator
                      </option>
                      <option value="MTN">MTN</option>
                      <option value="AIRTEL">Airtel</option>
                    </select>
                  </label>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-stone-500">
                Enter your number with the Congo country code, for example
                242066203420.
              </p>
            </FormSection>
            <Button
              type="submit"
              className="mt-8 h-14 w-full rounded-none bg-stone-950 text-[10px] uppercase tracking-[0.16em] hover:bg-[#ae4d32]"
            >
              Pay with Mobile Money
            </Button>
          </form>
        </div>
        <aside className="h-fit bg-white p-6 lg:sticky lg:top-28 lg:p-8">
          <h2 className="font-serif text-2xl tracking-[-0.04em]">
            Order summary
          </h2>
          <div className="mt-6 divide-y divide-stone-100">
            {items.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex gap-4 py-4 first:pt-0"
              >
                <div className="relative">
                  <img
                    className="h-20 w-16 object-cover"
                    src={product.image}
                    alt={product.alt}
                  />
                  <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-stone-700 text-[9px] text-white">
                    1
                  </span>
                </div>
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg leading-tight">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {product.color} · S
                    </p>
                  </div>
                  <span className="text-sm">{money(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span>{shipping ? money(shipping) : "Free"}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-4 font-serif text-xl text-stone-950">
              <span>Total</span>
              <span>{money(subtotal + shipping)}</span>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 border-t border-stone-100 pt-5 text-xs text-stone-500">
            <Truck size={17} /> Free shipping on orders over $150
          </div>
        </aside>
      </div>
    </section>
  );
}
