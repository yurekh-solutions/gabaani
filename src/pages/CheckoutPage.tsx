import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
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

/* Section card with numbered gold badge */
function Section({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white/80 border border-sand shadow-[0_2px_20px_rgba(43,32,22,0.04)] p-5 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-honey to-honey-deep text-white text-sm font-bold flex items-center justify-center shadow-[0_4px_12px_rgba(197,138,50,0.35)]">
          {step}
        </span>
        <h2 className="text-xs tracking-[0.24em] uppercase font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] tracking-[0.14em] uppercase text-cocoa-soft font-semibold mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");
  const [method, setMethod] = useState<PayMethod>("cod");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 499;
  const total = subtotal + shipping;

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
      window.scrollTo({ top: 0 });
    }, 1600);
  };

  const inputCls =
    "w-full border border-sand bg-white px-4 py-3 text-sm placeholder:text-cocoa-soft/50 focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/20 transition";

  const methods: { id: PayMethod; label: string; note: string; icon: string }[] = [
    { id: "cod", label: "Cash on Delivery", note: "Most popular", icon: "💵" },
    { id: "card", label: "Card", note: "Visa · Mastercard", icon: "💳" },
    { id: "upi", label: "UPI", note: "GPay · PhonePe", icon: "📱" },
  ];

  /* Success state */
  if (step === "success") {
    return (
      <main className="mx-auto max-w-xl px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-honey/25 to-honey/10 ring-1 ring-honey/30 flex items-center justify-center text-4xl">
          🍯
        </div>
        <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-honey-deep font-semibold">
          Order confirmed
        </p>
        <h1 className="font-display text-4xl sm:text-5xl mt-3">Thank you!</h1>
        <p className="mt-4 text-cocoa-soft text-sm leading-relaxed">
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
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-honey to-honey-deep text-white px-10 py-4 text-xs tracking-[0.22em] uppercase font-bold shadow-[0_12px_30px_rgba(197,138,50,0.4)] hover:shadow-[0_16px_40px_rgba(197,138,50,0.55)] hover:-translate-y-0.5 transition-all"
        >
          Continue shopping <span aria-hidden>→</span>
        </Link>
      </main>
    );
  }

  /* Empty bag state */
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-cream-dark ring-1 ring-sand flex items-center justify-center text-4xl">
          🛍️
        </div>
        <h1 className="font-display text-4xl mt-8">Your bag is empty</h1>
        <p className="mt-3 text-cocoa-soft text-sm">
          Add some honey-infused icons before checking out.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-honey to-honey-deep text-white px-10 py-4 text-xs tracking-[0.22em] uppercase font-bold shadow-[0_12px_30px_rgba(197,138,50,0.4)] hover:shadow-[0_16px_40px_rgba(197,138,50,0.55)] hover:-translate-y-0.5 transition-all"
        >
          Shop the Collection <span aria-hidden>→</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-cream-dark/60">
      {/* Page header */}
      <div className="bg-cream border-b border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-honey-deep font-semibold mb-2">
                Almost yours
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-medium">
                Secure Checkout
              </h1>
              {/* Step trail */}
              <nav aria-label="Checkout progress" className="mt-4 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold">
                <span className="text-cocoa-soft/60">Bag</span>
                <span className="text-sand" aria-hidden>─</span>
                <span className="text-honey-deep border-b-2 border-honey pb-0.5">Details &amp; Payment</span>
                <span className="text-sand" aria-hidden>─</span>
                <span className="text-cocoa-soft/60">Confirmation</span>
              </nav>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Link
                to="/shop"
                className="hidden sm:inline-flex text-[11px] tracking-[0.22em] uppercase font-semibold border-b border-cocoa pb-1 hover:text-honey-deep hover:border-honey-deep transition-colors"
              >
                ← Continue Shopping
              </Link>
              <span className="inline-flex items-center gap-2 bg-honey/10 text-honey-deep ring-1 ring-honey/30 rounded-full px-4 py-1.5 text-[11px] font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="10" width="14" height="10" rx="1" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                256-bit SSL encrypted
              </span>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={placeOrder}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid md:grid-cols-5 gap-8 lg:gap-12"
      >
        {/* Left: forms */}
        <div className="md:col-span-3 space-y-6">
          <Section step="1" title="Contact">
            <div className="space-y-4">
              <Field label="Email address">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone number">
                <input
                  type="tel"
                  required
                  placeholder="For delivery updates"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value.replace(/[^\d+\-\s]/g, "").slice(0, 15) }))
                  }
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>

          <Section step="2" title="Shipping address">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name">
                <input required placeholder="Aisha" value={form.firstName} onChange={set("firstName")} className={inputCls} />
              </Field>
              <Field label="Last name">
                <input required placeholder="Sharma" value={form.lastName} onChange={set("lastName")} className={inputCls} />
              </Field>
              <Field label="Street address" className="col-span-2">
                <input required placeholder="House no., street, area" value={form.address} onChange={set("address")} className={inputCls} />
              </Field>
              <Field label="City">
                <input required placeholder="Mumbai" value={form.city} onChange={set("city")} className={inputCls} />
              </Field>
              <Field label="State">
                <select value={form.state} onChange={set("state")} className={inputCls}>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="PIN code">
                <input required placeholder="400001" value={form.zip} onChange={set("zip")} className={inputCls} />
              </Field>
            </div>
          </Section>

          <Section step="3" title="Payment">
            <div className="grid grid-cols-3 gap-3 mb-5" role="radiogroup" aria-label="Payment method">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={method === m.id}
                  onClick={() => setMethod(m.id)}
                  className={`relative flex flex-col items-center justify-center gap-1 border px-2 py-4 min-h-[84px] text-xs font-semibold text-center leading-tight transition-all ${
                    method === m.id
                      ? "border-honey-deep bg-gradient-to-b from-honey/15 to-honey/5 text-cocoa ring-1 ring-honey-deep shadow-[0_6px_18px_rgba(197,138,50,0.18)]"
                      : "border-sand bg-white text-cocoa-soft hover:border-honey hover:text-cocoa"
                  }`}
                >
                  {method === m.id && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-honey-deep text-white text-[10px] flex items-center justify-center shadow">
                      ✓
                    </span>
                  )}
                  <span className="text-xl leading-none">{m.icon}</span>
                  <span>{m.label}</span>
                  <span className="text-[10px] font-normal text-cocoa-soft">{m.note}</span>
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="grid grid-cols-2 gap-4">
                <Field label="Card number" className="col-span-2">
                  <input
                    required
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                    }
                    className={inputCls}
                  />
                </Field>
                <Field label="Expiry">
                  <input
                    required
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cardExpiry: formatExpiry(e.target.value) }))
                    }
                    className={inputCls}
                  />
                </Field>
                <Field label="CVC">
                  <input
                    required
                    inputMode="numeric"
                    placeholder="•••"
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
                </Field>
              </div>
            )}
            {method === "upi" && (
              <p className="text-sm text-cocoa-soft bg-cream-dark border border-sand p-4">
                You'll receive a UPI payment request on your phone after placing the order. Approve it in your UPI app (GPay, PhonePe, Paytm, etc.).
              </p>
            )}
            {method === "cod" && (
              <div className="text-sm text-cocoa-soft bg-cream-dark border-l-2 border-honey-deep border-y border-r border-sand p-4">
                <p className="font-semibold text-cocoa mb-1">
                  Pay {formatPrice(total)} in cash on delivery
                </p>
                <p>Available across India. Please keep exact change ready. An OTP will be shared via SMS for verification.</p>
              </div>
            )}
          </Section>
        </div>

        {/* Right: order summary */}
        <aside className="md:col-span-2">
          <div className="md:sticky md:top-24 bg-white border border-sand shadow-[0_8px_40px_rgba(43,32,22,0.06)]">
            <div className="bg-cocoa text-cream px-5 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-xs tracking-[0.24em] uppercase font-bold">
                Order summary
              </h2>
              <span className="text-[11px] text-cream/70">
                {items.reduce((n, i) => n + i.qty, 0)} item{items.reduce((n, i) => n + i.qty, 0) > 1 ? "s" : ""}
              </span>
            </div>

            <div className="px-5 sm:px-6 py-6">
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => {
                  const p = productById(item.productId);
                  return (
                    <li key={item.productId + (item.sizeLabel ?? "")} className="flex items-center gap-3 text-sm">
                      <div className="relative shrink-0">
                        <img src={p.image} alt="" className="w-14 h-16 object-cover border border-sand" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cocoa text-cream text-[10px] font-bold flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        {item.sizeLabel && (
                          <p className="text-xs text-cocoa-soft">{item.sizeLabel}</p>
                        )}
                      </div>
                      <span className="font-semibold">
                        {formatPrice(item.unitPrice * item.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <dl className="mt-6 space-y-2.5 text-sm border-t border-sand pt-4">
                <div className="flex justify-between">
                  <dt className="text-cocoa-soft">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cocoa-soft">Shipping</dt>
                  <dd>
                    {shipping === 0 ? (
                      <span className="text-honey-deep font-bold tracking-wide">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between items-baseline font-bold border-t border-sand pt-3.5">
                  <dt className="text-base">Total</dt>
                  <dd className="font-display text-2xl text-honey-deep">{formatPrice(total)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={!detailsValid || processing || items.length === 0}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-honey to-honey-deep text-white py-4 text-xs tracking-[0.22em] uppercase font-bold shadow-[0_10px_28px_rgba(197,138,50,0.4)] hover:shadow-[0_14px_36px_rgba(197,138,50,0.55)] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
              >
                {processing
                  ? "Processing…"
                  : method === "cod"
                  ? `Place Order · ${formatPrice(total)}`
                  : `Pay ${formatPrice(total)}`}
              </button>

              {/* Trust badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-cocoa-soft border-t border-sand pt-4">
                <div className="flex flex-col items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="10" width="14" height="10" rx="1" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  Secure payment
                </div>
                <div className="flex flex-col items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                    <circle cx="7" cy="17" r="1.5" />
                    <circle cx="17" cy="17" r="1.5" />
                  </svg>
                  Free ship Rs {FREE_SHIPPING_THRESHOLD.toLocaleString("en-IN")}+
                </div>
                <div className="flex flex-col items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 4v5h5" />
                  </svg>
                  30-day returns
                </div>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}
