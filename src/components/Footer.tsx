import { Link } from "react-router-dom";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Hair Oil", href: "/shop?cat=HAIR+OIL" },
      { label: "Hair Perfume", href: "/shop?cat=HAIR+PERFUME" },
      { label: "Lip Oil", href: "/shop?cat=LIP+OIL" },
      { label: "Gift Sets", href: "/shop?cat=SETS" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Golden Garden", href: "/about" },
      { label: "Sustainability", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "mailto:hello@gabaani.in" },
      { label: "Shipping & Returns", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Track Your Order", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="font-display text-3xl tracking-[0.28em] font-semibold block">
              GABAANI
            </Link>
            <p className="mt-4 text-sm text-cream/70 leading-relaxed max-w-xs">
              Honey infused haircare from the Golden Garden. Crafted in India,
              loved worldwide. Shine that lasts, from root to tip.
            </p>
            <div className="mt-6 flex gap-4" aria-label="Social media">
              {[
                { name: "Instagram", href: "https://www.instagram.com/gabaani" },
                { name: "YouTube", href: "https://www.youtube.com/@gabaani" },
                { name: "Facebook", href: "https://www.facebook.com/gabaani" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-cream/70 hover:text-honey transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs tracking-[0.22em] uppercase font-bold text-honey mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        to={l.href}
                        className="text-sm text-cream/70 hover:text-cream transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : l.href.startsWith("mailto:") ? (
                      <a
                        href={l.href}
                        className="text-sm text-cream/70 hover:text-cream transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-cream/70 hover:text-cream transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">
            &copy; {new Date().getFullYear()} GABAANI. All rights reserved. Based in India.
          </p>
          <div className="flex gap-5 text-xs text-cream/50">
            <Link to="/privacy-policy" className="hover:text-cream">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-cream">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-cream">Cookies</Link>
          </div>
          <p className="text-xs text-cream/50" aria-label="Payment methods">
            VISA · Mastercard · UPI · COD · Paytm
          </p>
        </div>
      </div>
    </footer>
  );
}
