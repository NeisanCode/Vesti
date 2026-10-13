import { Link, useLocation } from "react-router-dom";
import { money } from "../lib/money";

interface PaymentSuccessState {
  total?: number;
  reference?: string;
  message?: string;
  status?: "success" | "pending";
}

export function PaymentSuccessPage() {
  const { state } = useLocation();
  const { total, reference, message, status } = (state ?? {}) as PaymentSuccessState;
  const isPending = status === "pending";

  return (
    <section className="bg-[#f7f5f2]">
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-serif text-4xl tracking-tighter">
          {isPending ? "Payment request sent" : "Payment successful"}
        </h1>
        <p className="mt-4 text-stone-600">
          {message ?? (isPending ? "Confirm the payment on your phone." : "Your payment has been processed.")}
        </p>

        {total !== undefined && (
          <p className="mt-6 font-serif text-3xl">{money(total)}</p>
        )}

        {reference && (
          <p className="mt-2 text-xs uppercase tracking-[0.13em] text-stone-500">
            Ref: {reference}
          </p>
        )}

        <Link
          to="/shop"
          className="mt-10 inline-block border border-stone-900 px-8 py-3 text-[10px] uppercase tracking-[0.16em] hover:bg-stone-950 hover:text-white"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
