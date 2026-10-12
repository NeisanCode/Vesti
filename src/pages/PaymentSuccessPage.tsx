import { Check, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { money } from "../lib/money";

type PaymentSuccessState = { total?: number };

export function PaymentSuccessPage() {
  const { state } = useLocation();
  const total = (state as PaymentSuccessState | null)?.total;

  return (
    <section className="bg-[#f7f5f2] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl bg-white px-6 py-14 text-center shadow-sm sm:px-14">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e7e1db] text-stone-950">
          <Check size={30} strokeWidth={1.8} />
        </div>
        <p className="eyebrow mt-7">Payment successful</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tighter sm:text-5xl">
          Thank you for your order.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-stone-600">
          Your mobile-money payment was confirmed. We’ll prepare your pieces and
          send your order details shortly.
        </p>
        {total !== undefined && (
          <p className="mt-7 font-serif text-2xl tracking-tighter">
            Paid {money(total)}
          </p>
        )}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 bg-stone-950 px-6 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#ae4d32]"
            to="/shop"
          >
            <ShoppingBag size={15} /> Continue shopping
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center border border-stone-900 px-6 text-[10px] font-bold uppercase tracking-[0.14em]"
            to="/"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
