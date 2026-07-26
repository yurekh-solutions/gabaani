import { useEffect, useMemo, useState } from "react";
import { FREE_SHIPPING_THRESHOLD, INDIAN_STATES, formatPrice } from "../data/products";
import { productById, useCart } from "../store/cart";

type PayMethod = "card" | "upi" | "cod";

interface FormState {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const EMPTY_FORM: FormState = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "Maharashtra",
  zip: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function formatCardNumber(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export default function CheckoutModal() {
  const { checkoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");
  const [method, setMethod] = useState<PayMethod>("cod");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 499;
  const total = subtotal + shipping;

  useEffect(() => {
    if (checkoutOpen) {
      setStep("details");
      setProcessing(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const detailsValid = useMemo(() => {
    const base =
      form.email.includes("@") &&
      form.phone.replace(/\D/g, "").length >= 10 &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.state &&
      form.zip.trim();
    if (!base) return false;
    if (method === "card") {
      return (
        form.cardNumber.replace(/\s/g, "").length === 16 &&
        /^\d{2}\/\d{2}$/.test(form.cardExpiry) &&
        form.cardCvc.length >= 3
      );
    }
    return true;
  }, [form, method]);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailsValid || processing) return;
    setProcessing(true);
    // Simulated payment processing — swap with Razorpay/Stripe SDK in production
    setTimeout(() => {
      setOrderId(`GB-${Date.now().toString(36).toUpperCase()}`);
      setProcessing(false);
      setStep("success");
      clearCart();
    }, 1600);
  };

  if (!checkoutOpen) return null;

  const inputCls =
    "w-full border border-cocoa/30 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:border-honey";

  const methods: { id: PayMethod; label: string; icon: string; highlight?: boolean }[] = [
    { id: "cod", label: "Cash on Delivery", icon: "💵", highlight: true },
    { id: "card", label: "Card", icon: "💳" },
    { id: "upi", label: "UPI / Paytm", icon: "📱" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-cocoa/60" onClick={closeCheckout} />
      <div
        role="dialog"
        aria-label="Checkout"
        className="relative w-full sm:max-w-3xl max-h-[94vh] overflow-y-auto bg-cream sm:m-4 animate-fade-up"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 bg-cream border-b border-sand">
          <h2 className="font-display text-2xl">
            {step === "success" ? "Order confirmed" : "Secure Checkout"}
          </h2>
          <button onClick={closeCheckout} aria-label="Close checkout" className="p-2 -mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {step === "success" ? (
          <div className="px-5 sm:px-8 py-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-honey/15 flex items-center justify-center text-3xl">
              🍯
            </div>
            <h3 className="font-display text-3xl mt-5">Thank you!</h3>
            <p className="mt-2 text-cocoa-soft text-sm">
              Your order <strong className="text-cocoa">{orderId}</strong> has been
              placed. A confirmation email is on its way to{" "}
              <strong className="text-cocoa">{form.email}</strong>.
            </p>
            {method === "cod" && (
              <p className="mt-2 text-xs text-cocoa-soft">
                Pay {formatPrice(total)} in cash when your order arrives.
              </p>
            )}
            <p className="mt-1 text-xs text-cocoa-soft">
              Wildflowers will be planted in the Golden Garden for this order.
            </p>
            <button
              onClick={closeCheckout}
              className="mt-8 bg-cocoa text-cream px-10 py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey-deep transition-colors"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="grid md:grid-cols-5 gap-0">
            {/* Left: forms */}
            <div className="md:col-span-3 px-5 sm:px-8 py-6 space-y-6">
              <section>
                <h3 className="text-xs tracking-[0.22em] uppercase font-bold mb-3">
                  1 · Contact
                </h3>
                <div className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    aria-label="Email address"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone number (for delivery)"
                    aria-label="Phone number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value.replace(/[^\d+\-\s]/g, "").slice(0, 15) }))
                    }
                    className={inputCls}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-xs tracking-[0.22em] uppercase font-bold mb-3">
                  2 · Shipping address
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="First name" aria-label="First name" value={form.firstName} onChange={set("firstName")} className={inputCls} />
                  <input required placeholder="Last name" aria-label="Last name" value={form.lastName} onChange={set("lastName")} className={inputCls} />
                  <input required placeholder="Street address" aria-label="Street address" value={form.address} onChange={set("address")} className={`${inputCls} col-span-2`} />
                  <input required placeholder="City" aria-label="City" value={form.city} onChange={set("city")} className={inputCls} />
                  <select aria-label="State" value={form.state} onChange={set("state")} className={inputCls}>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input required placeholder="PIN code" aria-label="PIN code" value={form.zip} onChange={set("zip")} className={inputCls} />
                </div>
              </section>

              <section>
                <h3 className="text-xs tracking-[0.22em] uppercase font-bold mb-3">
                  3 · Payment
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4" role="radiogroup" aria-label="Payment method">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={method === m.id}
                      onClick={() => setMethod(m.id)}
                      className={`border px-2 py-3 text-xs font-semibold transition-colors ${
                        method === m.id
                          ? "border-cocoa bg-cocoa text-cream"
                          : m.highlight
                          ? "border-honey text-honey-deep hover:bg-honey/10"
                          : "border-cocoa/30 hover:border-cocoa"
                      }`}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>

                {method === "card" && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      inputMode="numeric"
                      placeholder="Card number"
                      aria-label="Card number"
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                      }
                      className={`${inputCls} col-span-2`}
                    />
                    <input
                      required
                      inputMode="numeric"
                      placeholder="MM/YY"
                      aria-label="Card expiry"
                      value={form.cardExpiry}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cardExpiry: formatExpiry(e.target.value) }))
                      }
                      className={inputCls}
                    />
                    <input
                      required
                      inputMode="numeric"
                      placeholder="CVC"
                      aria-label="Card security code"
                      maxLength={4}
                      value={form.cardCvc}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          cardCvc: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                )}
                {method === "upi" && (
                  <p className="text-sm text-cocoa-soft bg-cream-dark border border-sand p-4">
                    You'll receive a UPI payment request on your phone after placing the order. Approve it in your UPI app (GPay, PhonePe, Paytm, etc.).
                  </p>
                )}
                {method === "cod" && (
                  <div className="text-sm text-cocoa-soft bg-cream-dark border border-sand p-4">
                    <p className="font-semibold text-cocoa mb-1">Pay {formatPrice(total)} in cash on delivery</p>
                    <p>Available across India. Please keep exact change ready. An OTP will be shared via SMS for verification.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Right: order summary */}
            <aside className="md:col-span-2 bg-cream-dark border-t md:border-t-0 md:border-l border-sand px-5 sm:px-6 py-6">
              <h3 className="text-xs tracking-[0.22em] uppercase font-bold mb-4">
                Order summary
              </h3>
              <ul className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => {
                  const p = productById(item.productId);
                  return (
                    <li key={item.productId + (item.sizeLabel ?? "")} className="flex items-center gap-3 text-sm">
                      <img src={p.image} alt="" className="w-12 h-14 object-cover border border-sand" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{p.name}</p>
                        <p className="text-xs text-cocoa-soft">
                          {item.sizeLabel ? `${item.sizeLabel} · ` : ""}Qty {item.qty}
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatPrice(item.unitPrice * item.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-5 space-y-2 text-sm border-t border-sand pt-4">
                <div className="flex justify-between">
                  <dt className="text-cocoa-soft">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cocoa-soft">Shipping</dt>
                  <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-sand pt-3">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <button
                type="submit"
                disabled={!detailsValid || processing || items.length === 0}
                className="mt-5 w-full bg-cocoa text-cream py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {processing
                  ? "Processing…"
                  : method === "cod"
                  ? `Place Order · ${formatPrice(total)}`
                  : `Pay ${formatPrice(total)}`}
              </button>
              <p className="mt-3 text-[11px] text-cocoa-soft flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="10" width="14" height="10" rx="1" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                SSL-encrypted checkout · 30-day easy returns
              </p>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
