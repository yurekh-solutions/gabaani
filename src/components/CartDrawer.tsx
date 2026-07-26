import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "../data/products";
import { productById, useCart } from "../store/cart";

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    drawerOpen,
    closeDrawer,
    subtotal,
    freeShippingRemaining,
    setQty,
    removeItem,
  } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    if (drawerOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        drawerOpen ? "" : "pointer-events-none invisible delay-300 transition-[visibility]"
      }`}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-cocoa/50 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-cream flex flex-col shadow-2xl transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
          <h2 className="font-display text-2xl">Your Bag</h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="p-2 -mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-5 py-4 border-b border-sand bg-cream-dark">
          <p className="text-xs tracking-wide text-cocoa-soft mb-2">
            {freeShippingRemaining > 0 ? (
              <>
                You're <strong className="text-cocoa">{formatPrice(freeShippingRemaining)}</strong>{" "}
                away from <strong className="text-honey-deep">free shipping</strong>
              </>
            ) : (
              <strong className="text-honey-deep">
                You've unlocked free shipping!
              </strong>
            )}
          </p>
          <div className="h-1.5 bg-sand rounded-full overflow-hidden">
            <div
              className="h-full bg-honey rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="font-display text-2xl">Your bag is empty</p>
              <p className="text-sm text-cocoa-soft">
                Add some honey-infused icons to get started.
              </p>
              <button
                onClick={closeDrawer}
                className="mt-2 bg-cocoa text-cream px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-honey-deep transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const product = productById(item.productId);
                return (
                  <li key={item.productId + (item.sizeLabel ?? "")} className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-20 h-24 object-cover border border-sand"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg leading-tight">{product.name}</p>
                      {item.sizeLabel && (
                        <p className="text-xs text-cocoa-soft mt-0.5">{item.sizeLabel}</p>
                      )}
                      <p className="text-sm font-semibold mt-1">
                        {formatPrice(item.unitPrice * item.qty)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-cocoa/30">
                          <button
                            onClick={() => setQty(item.productId, item.sizeLabel, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.productId, item.sizeLabel, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.sizeLabel)}
                          className="text-xs text-cocoa-soft underline hover:text-cocoa"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-cocoa-soft">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-cocoa-soft">
              Shipping & taxes calculated at checkout. COD available.
            </p>
            <button
              onClick={() => {
                closeDrawer();
                navigate("/checkout");
              }}
              className="w-full bg-cocoa text-cream py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey-deep transition-colors"
            >
              Checkout · {formatPrice(subtotal)}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
