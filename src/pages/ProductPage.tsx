import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, FREE_SHIPPING_THRESHOLD, formatPrice } from "../data/products";
import { useCart } from "../store/cart";
import ImageZoom from "../components/ImageZoom";
import { PageBanner } from "../components/Sections";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-honey text-xs tracking-widest" aria-label={`Rated ${rating}`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-sand">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addItem } = useCart();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSizeIndex(0);
  }, [id]);

  // Per-product SEO JSON-LD
  useEffect(() => {
    if (!product) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: `https://gabaani.com${product.image}`,
      description: product.description,
      brand: { "@type": "Brand", name: "GABAANI" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews,
      },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    });
    document.head.appendChild(script);
    // Update page title
    document.title = `${product.name} | GABAANI`;
    return () => {
      document.head.removeChild(script);
      document.title = "GABAANI | Honey Infused Haircare from the Golden Garden";
    };
  }, [product]);

  if (!product) {
    return (
      <main className="py-20 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-honey-deep underline">
          Back to Shop
        </Link>
      </main>
    );
  }

  const size = product.sizes?.[sizeIndex];
  const price = size?.price ?? product.price;

  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [product]
  );
  // If fewer than 4 same-category, fill with others
  const relatedProducts = useMemo(() => {
    if (related.length >= 4) return related;
    const others = PRODUCTS.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length);
    return [...related, ...others];
  }, [related, product]);

  return (
    <main className="pb-14 sm:pb-20">
      {/* Page Banner — background cover image */}
      <PageBanner
        compact
        image="/images/editorial-honeycomb.png"
        eyebrow={product.category}
        title={product.name}
        subtitle={product.tagline}
      />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-cocoa-soft" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-cocoa">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-cocoa">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-cocoa font-medium">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image with zoom */}
          <div>
            <ImageZoom
              src={product.image}
              hoverSrc={product.hoverImage}
              alt={product.alt}
              className="aspect-[3/4] w-full object-cover"
            />
            <p className="mt-2 text-[10px] text-cocoa-soft text-center">
              Hover to zoom & see texture detail
            </p>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            {product.badge && (
              <span className="inline-block bg-cocoa text-cream text-[10px] tracking-[0.18em] font-semibold px-2.5 py-1 mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-3xl sm:text-5xl leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-honey-deep font-semibold mt-1">
              {product.tagline}
            </p>

            <div className="flex items-center gap-2 mt-3 text-xs text-cocoa-soft">
              <Stars rating={product.rating} />
              <span>{product.rating} · {product.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatPrice(price)}</span>
              {product.compareAtPrice && !size && (
                <span className="text-cocoa-soft line-through text-lg">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-cocoa-soft mt-1">Inclusive of all taxes</p>

            <p className="mt-6 text-sm text-cocoa-soft leading-relaxed">
              {product.description}
            </p>

            {/* Size selector */}
            {product.sizes && (
              <fieldset className="mt-6">
                <legend className="text-xs tracking-[0.2em] uppercase font-semibold mb-2">
                  Size
                </legend>
                <div className="flex gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSizeIndex(i)}
                      aria-pressed={sizeIndex === i}
                      className={`px-5 py-2.5 text-sm border transition-colors ${
                        sizeIndex === i
                          ? "bg-cocoa text-cream border-cocoa"
                          : "border-cocoa/30 hover:border-cocoa"
                      }`}
                    >
                      {s.label} · {formatPrice(s.price)}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Benefits */}
            <ul className="mt-6 space-y-2.5">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm">
                  <span className="text-honey">✦</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Add to cart */}
            <button
              onClick={() => addItem(product, size?.label, price)}
              className="mt-8 w-full bg-cocoa text-cream py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey-deep transition-colors"
            >
              Add to Cart · {formatPrice(price)}
            </button>

            {/* Trust signals */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-cocoa-soft">
              <p>🚚 Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
              <p>💵 Cash on Delivery available</p>
              <p>↩️ 30-day easy returns</p>
              <p>🌿 100% authentic & cruelty-free</p>
            </div>

            {/* Ingredients (like gisou.com) */}
            {product.ingredients && (
              <div className="mt-6 border-t border-sand pt-5">
                <button
                  onClick={() => setShowIngredients((v) => !v)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-xs tracking-[0.2em] uppercase font-bold">
                    See all ingredients
                  </span>
                  <span className="text-cocoa-soft text-lg leading-none">
                    {showIngredients ? "−" : "+"}
                  </span>
                </button>
                {showIngredients && (
                  <p className="mt-3 text-xs text-cocoa-soft leading-relaxed">
                    {product.ingredients}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-medium mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-white/60 border border-sand hover:shadow-[0_8px_30px_rgba(43,32,22,0.1)] transition-shadow"
                >
                  <div className="overflow-hidden hover-swap-img">
                    <img src={p.image} alt={p.alt} loading="lazy" className="img-main aspect-[3/4] w-full object-cover" />
                    <img src={p.hoverImage} alt="" loading="lazy" className="img-hover aspect-[3/4] w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-display text-base sm:text-lg leading-snug group-hover:text-honey-deep transition-colors">{p.name}</p>
                    <p className="text-sm font-semibold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
