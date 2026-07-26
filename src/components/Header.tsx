import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../store/cart";

const ANNOUNCEMENTS = [
  "FREE SHIPPING ACROSS INDIA ON ORDERS OVER Rs 4,999",
  "CASH ON DELIVERY AVAILABLE NATIONWIDE",
  "NEW ARRIVALS — SHOP THE COLLECTION",
];

const MEGA_MENUS: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "Shop All", href: "/shop" },
    { label: "Bestsellers", href: "/shop?filter=bestsellers" },
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Gift Sets", href: "/shop?cat=SETS" },
    { label: "Hair Oil", href: "/shop?cat=HAIR+OIL" },
    { label: "Lip Oil", href: "/shop?cat=LIP+OIL" },
    { label: "Tools", href: "/shop?cat=TOOLS" },
    { label: "Body Care", href: "/shop?cat=BODY" },
  ],
  "Hair Care": [
    { label: "Hair Oil", href: "/shop?cat=HAIR+OIL" },
    { label: "Hair Mask", href: "/shop?cat=HAIR+MASK" },
    { label: "Hair Perfume", href: "/shop?cat=HAIR+PERFUME" },
    { label: "Dry Shampoo", href: "/shop?cat=STYLING" },
    { label: "Heat Protect", href: "/shop?cat=STYLING" },
    { label: "Scalp Serum", href: "/shop?cat=HAIR+OIL" },
  ],
};

const NAV_LINKS = [
  { label: "Shop", href: "/shop", mega: "Shop" },
  { label: "Hair Care", href: "/shop?cat=HAIR+OIL", mega: "Hair Care" },
  { label: "Body", href: "/shop?cat=BODY" },
  { label: "Gifts", href: "/shop?cat=SETS" },
  { label: "Our Story", href: "/about" },
];

export default function Header() {
  const { count, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [annIndex, setAnnIndex] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-cocoa text-cream text-[11px] sm:text-xs tracking-[0.18em] text-center py-2 px-4 font-medium">
        <span key={annIndex} className="inline-block animate-fade-up">
          {ANNOUNCEMENTS[annIndex]}
        </span>
      </div>

      {/* Navbar */}
      <div
        className={`bg-cream/95 backdrop-blur border-b border-sand transition-shadow ${
          scrolled ? "shadow-[0_2px_20px_rgba(43,32,22,0.08)]" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-2xl sm:text-3xl tracking-[0.28em] font-semibold select-none"
              aria-label="GABAANI home"
            >
              GABAANI
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => l.mega && setActiveDropdown(l.mega)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={l.href}
                    className="text-sm tracking-[0.12em] uppercase text-cocoa-soft hover:text-cocoa transition-colors flex items-center gap-1"
                  >
                    {l.label}
                    {l.mega && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 5l3 3 3-3" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega-menu dropdown */}
                  {l.mega && activeDropdown === l.mega && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="bg-cream border border-sand shadow-[0_8px_30px_rgba(43,32,22,0.12)] p-5 min-w-[220px]">
                        <ul className="space-y-2.5">
                          {MEGA_MENUS[l.mega].map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                to={item.href}
                                className="text-sm text-cocoa-soft hover:text-cocoa transition-colors block py-0.5"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Cart */}
            <button
              onClick={openDrawer}
              className="relative p-2 -mr-2"
              aria-label={`Open cart, ${count} items`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-honey text-cream text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(2rem+4rem)] z-30 bg-cream animate-fade-up overflow-y-auto">
          <nav className="px-6 py-8 flex flex-col gap-5" aria-label="Mobile">
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-display text-3xl tracking-wide border-b border-sand pb-4">
              Home
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="font-display text-3xl tracking-wide border-b border-sand pb-4">
              Shop All
            </Link>
            <Link to="/shop?cat=HAIR+OIL" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-wide text-cocoa-soft pl-4 pb-3">
              Hair Oil
            </Link>
            <Link to="/shop?cat=HAIR+MASK" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-wide text-cocoa-soft pl-4 pb-3">
              Hair Mask
            </Link>
            <Link to="/shop?cat=HAIR+PERFUME" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-wide text-cocoa-soft pl-4 pb-3">
              Hair Perfume
            </Link>
            <Link to="/shop?cat=LIP+OIL" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-wide text-cocoa-soft pl-4 pb-3">
              Lip Oil
            </Link>
            <Link to="/shop?cat=BODY" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-wide text-cocoa-soft pl-4 pb-3">
              Body Care
            </Link>
            <Link to="/shop?cat=SETS" onClick={() => setMenuOpen(false)} className="font-display text-3xl tracking-wide border-b border-sand pb-4 mt-2">
              Gift Sets
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="font-display text-3xl tracking-wide border-b border-sand pb-4">
              Our Story
            </Link>
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-cocoa-soft">
              Honey infused haircare from the Golden Garden
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
