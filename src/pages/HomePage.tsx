import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, formatPrice } from "../data/products";
import { useCart } from "../store/cart";
import { useRef } from "react";
import {
  Science,
  UgcFeed,
  Testimonials,
  CommunityBanner,
  Newsletter,
} from "../components/Sections";

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                            */
/* ------------------------------------------------------------------ */
const MARQUEE_ITEMS = [
  "UP TO 3-DAY WEIGHTLESS SHINE",
  "POWERED BY GOLDEN GARDEN HONEY",
  "FREE SHIPPING ON ORDERS OVER Rs 4,999",
  "93% SMOOTHER HAIR",
  "SUSTAINABLY SOURCED",
  "CASH ON DELIVERY AVAILABLE",
];

/* ------------------------------------------------------------------ */
/*  HERO CAROUSEL                                                      */
/* ------------------------------------------------------------------ */
interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-slide-1.png",
    title: "REFRESH & GLOW",
    subtitle: "Your go-to Honey Hair Mist to spritz, scent and shine — anywhere.",
    cta: { label: "Shop Now", href: "/product/honey-hair-mist" },
  },
  {
    image: "/images/hero-slide-2.png",
    title: "N°1 HONEY & OUD",
    subtitle: "Pure elegance in every spritz — the signature GABAANI scent.",
    cta: { label: "Discover Now", href: "/product/honey-infused-hair-perfume-duo" },
  },
  {
    image: "/images/hero-slide-3.png",
    title: "THE HAIR PERFUME COLLECTION",
    subtitle:
      "Long-lasting fragrance infused with Golden Garden Honey — hydrates, adds shine and leaves a honey glow.",
    cta: { label: "Shop Hair Perfume", href: "/shop?cat=HAIR+PERFUME" },
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback(
    (idx: number) => setCurrent((idx + HERO_SLIDES.length) % HERO_SLIDES.length),
    [],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  return (
    <section
      aria-label="Hero carousel"
      className="relative overflow-hidden bg-cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gisou-style hero — full-bleed image, bold white text centered on the photo */}
      <div className="relative w-full h-[82vh] min-h-[520px] max-h-[900px]">
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={idx}
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
          />
        ))}

        {/* Even, subtle darkening so white text pops — no gradient patches */}
        <div className="absolute inset-0 z-[5] bg-cocoa/25" />

        {/* Centered text — bold uppercase white, Gisou style */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative w-full max-w-4xl px-6 text-center">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className="transition-all duration-1000 ease-in-out"
                style={{
                  opacity: idx === current ? 1 : 0,
                  transform: idx === current ? "translateY(0)" : "translateY(12px)",
                  position: idx === current ? "relative" : "absolute",
                  inset: idx === current ? undefined : 0,
                  pointerEvents: idx === current ? "auto" : "none",
                  visibility: idx === current ? "visible" : "hidden",
                }}
              >
                <h1
                  className="font-display font-bold uppercase italic text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wide"
                  style={{
                    backgroundImage: "linear-gradient(180deg,#FFFDF6 0%,#F9EBC8 55%,#EFCE8A 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 3px 22px rgba(43,32,22,0.55))",
                  }}
                >
                  {slide.title}
                </h1>
                <p className="mt-5 text-cream/95 text-base sm:text-lg font-medium max-w-2xl mx-auto [text-shadow:0_1px_16px_rgba(43,32,22,0.6)]">
                  {slide.subtitle}
                </p>
                <div className="mt-9">
                  <Link
                    to={slide.cta.href}
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-honey to-honey-deep text-white px-11 py-4 text-[11px] tracking-[0.25em] uppercase font-bold shadow-[0_12px_35px_rgba(197,138,50,0.5)] ring-1 ring-white/40 hover:shadow-[0_16px_45px_rgba(197,138,50,0.65)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {slide.cta.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Benefits marquee */}
      <div className="bg-honey text-cream overflow-hidden py-3" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-[11px] sm:text-xs tracking-[0.25em] font-semibold flex items-center gap-6"
            >
              {item}
              <span className="text-cream/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STARS                                                              */
/* ------------------------------------------------------------------ */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-honey text-xs tracking-widest" aria-label={`Rated ${rating}`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-sand">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  BESTSELLERS                                                        */
/* ------------------------------------------------------------------ */
function Bestsellers() {
  const { addItem } = useCart();
  const bestsellers = PRODUCTS.filter(
    (p) => p.badge === "BESTSELLER" || p.reviews > 800
  ).slice(0, 8);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-honey-deep font-semibold mb-2">
              Customer favourites
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium">
              Our Bestsellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex text-[11px] tracking-[0.22em] uppercase font-semibold border-b border-cocoa pb-1 hover:text-honey-deep hover:border-honey-deep transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestsellers.map((p) => (
            <article key={p.id} className="group flex flex-col bg-white/60 border border-sand hover:shadow-[0_8px_30px_rgba(43,32,22,0.1)] transition-shadow h-full">
              <Link to={`/product/${p.id}`} className="relative block overflow-hidden text-left hover-swap-img">
                <img src={p.image} alt={p.alt} loading="lazy" className="img-main aspect-[3/4] w-full object-cover" />
                <img src={p.hoverImage} alt="" loading="lazy" className="img-hover aspect-[3/4] w-full object-cover" />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-cocoa text-cream text-[10px] tracking-[0.18em] font-semibold px-2.5 py-1">{p.badge}</span>
                )}
              </Link>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-2 text-xs text-cocoa-soft">
                  <Stars rating={p.rating} />
                  <span>{p.rating} ({p.reviews.toLocaleString()})</span>
                </div>
                <Link to={`/product/${p.id}`} className="font-display text-lg sm:text-xl mt-1.5 leading-snug hover:text-honey-deep transition-colors">{p.name}</Link>
                <p className="text-xs text-cocoa-soft mt-0.5 line-clamp-1">{p.tagline}</p>
                {/* Price + button pinned to bottom so all cards in a row align */}
                <div className="mt-auto pt-3 flex items-baseline gap-2">
                  <span className="font-semibold">{formatPrice(p.price)}</span>
                  {p.compareAtPrice && (
                    <span className="text-cocoa-soft line-through text-sm">{formatPrice(p.compareAtPrice)}</span>
                  )}
                </div>
                <button onClick={() => addItem(p)} className="mt-3 w-full bg-cocoa text-cream text-[11px] tracking-[0.2em] uppercase font-semibold py-3 hover:bg-honey-deep transition-colors">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex text-[11px] tracking-[0.22em] uppercase font-semibold border-b border-cocoa pb-1"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EDITORIAL BANNER                                                   */
/* ------------------------------------------------------------------ */
function EditorialBanner() {
  return (
    <section className="relative overflow-hidden bg-cocoa text-cream">
      <img
        src="/images/editorial-banner-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-cocoa/60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-honey font-semibold mb-3">
          The GABAANI Ritual
        </p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-2xl mx-auto">
          Honey-infused haircare, reimagined for the modern ritual
        </h2>
        <p className="mt-5 text-cream/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Every formula is built on Golden Garden Honey — a natural humectant packed with amino acids, vitamins and minerals — validated in independent lab studies.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex bg-cream text-cocoa px-10 py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey hover:text-cream transition-colors"
        >
          Explore the Collection
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE EXPORT                                                        */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <Bestsellers />
      <Science />
      <EditorialBanner />
      <UgcFeed />
      <Testimonials />
      <CommunityBanner />
      <Newsletter />
    </main>
  );
}
