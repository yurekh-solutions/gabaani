import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS, type Category, type Product, formatPrice } from "../data/products";
import { useCart } from "../store/cart";
import { PageBanner } from "../components/Sections";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-honey text-xs tracking-widest" aria-label={`Rated ${rating}`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-sand">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

type SortOption = "bestselling" | "price-asc" | "price-desc" | "newest";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col bg-white/60 border border-sand hover:shadow-[0_8px_30px_rgba(43,32,22,0.1)] transition-shadow">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden text-left hover-swap-img"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="img-main aspect-[3/4] w-full object-cover"
        />
        <img
          src={product.hoverImage}
          alt=""
          loading="lazy"
          className="img-hover aspect-[3/4] w-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-cocoa text-cream text-[10px] tracking-[0.18em] font-semibold px-2.5 py-1 z-10">
            {product.badge}
          </span>
        )}
        {product.compareAtPrice && (
          <span className="absolute top-3 right-3 bg-honey text-cream text-[10px] tracking-[0.15em] font-semibold px-2.5 py-1 z-10">
            SAVE {formatPrice(product.compareAtPrice - product.price)}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 text-xs text-cocoa-soft">
          <Stars rating={product.rating} />
          <span>
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="font-display text-lg sm:text-xl mt-1.5 leading-snug hover:text-honey-deep transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-xs text-cocoa-soft mt-0.5 line-clamp-1">{product.tagline}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-cocoa-soft line-through text-sm">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full bg-cocoa text-cream text-[11px] tracking-[0.2em] uppercase font-semibold py-3 hover:bg-honey-deep transition-colors"
        >
          Quick Add
        </button>
      </div>
    </article>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState<Category>("ALL");
  const [sort, setSort] = useState<SortOption>("bestselling");

  const filtered = useMemo(() => {
    let list = category === "ALL" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
        break;
      case "bestselling":
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [category, sort]);

  return (
    <main className="pb-14 sm:pb-20">
      {/* Page header */}
      <PageBanner
        image="/images/editorial-banner-bg.png"
        eyebrow="The GABAANI Collection"
        title="Shop All"
        subtitle={`Honey-infused haircare and beauty, crafted in India with Golden Garden Honey. ${PRODUCTS.length} products to discover.`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category filter */}
          <div
            className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0"
            role="tablist"
            aria-label="Filter products by category"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.18em] font-semibold border transition-colors ${
                  category === c
                    ? "bg-cocoa text-cream border-cocoa"
                    : "border-cocoa/30 text-cocoa-soft hover:border-cocoa hover:text-cocoa"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort-select" className="text-xs text-cocoa-soft tracking-wide uppercase">Sort:</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-cocoa/30 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:border-honey"
            >
              <option value="bestselling">Bestselling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-cocoa-soft mb-4">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
