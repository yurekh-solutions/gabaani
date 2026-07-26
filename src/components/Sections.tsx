import { useState } from "react";
import { Link } from "react-router-dom";
import { TESTIMONIALS, UGC_POSTS } from "../data/products";
import { productById, useCart } from "../store/cart";

/* ------------------------------------------------------------------ */
/*  PAGE BANNER — background cover image header for inner pages        */
/* ------------------------------------------------------------------ */
export function PageBanner({
  image,
  eyebrow,
  title,
  subtitle,
  compact = false,
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-sand bg-cocoa text-cream">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-cocoa/60" />
      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center ${
          compact ? "py-12 sm:py-16" : "py-16 sm:py-28"
        }`}
      >
        <p className="text-[11px] tracking-[0.35em] uppercase text-honey font-semibold">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-medium mt-3">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-cream/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Science() {
  const claims = [
    { stat: "3-day", label: "weightless shine, proven in independent lab studies" },
    { stat: "93%", label: "smoother hair after a single application" },
    { stat: "230°C", label: "heat protection for guilt-free styling" },
    { stat: "66%", label: "less breakage after one use of the Repairing Mask" },
  ];

  return (
    <section className="py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Scientifically proven</p>
          <h2 className="font-display text-3xl sm:text-5xl font-medium leading-tight mt-2">
            Behind every shine
            <br />
            is <em className="text-honey-deep">science</em>
          </h2>
          <p className="mt-5 text-cocoa-soft leading-relaxed max-w-lg">
            Every GABAANI formula is built on Golden Garden Honey — a natural
            humectant packed with amino acids, vitamins and minerals — then
            validated in independent lab studies. Results you can see, backed
            by data you can trust.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            {claims.map((c) => (
              <div key={c.stat} className="border-l-2 border-honey pl-4">
                <dt className="font-display text-3xl sm:text-4xl text-honey-deep">
                  {c.stat}
                </dt>
                <dd className="text-xs sm:text-sm text-cocoa-soft mt-1 leading-snug">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[10px] text-cocoa-soft/70">
            *Based on independent lab studies. Results may vary.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src="/images/models/m-apply-oil.png"
            alt="Hands applying GABAANI Honey Infused Hair Oil to glossy hair ends"
            loading="lazy"
            className="w-full aspect-[3/4] sm:aspect-[4/5] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function UgcFeed() {
  const { addItem } = useCart();

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="eyebrow">#GabaaniGlow</p>
        <h2 className="font-display text-3xl sm:text-5xl font-medium mt-2">
          As seen on you
        </h2>
        <p className="mt-3 text-cocoa-soft text-sm sm:text-base">
          Tag @gabaani to be featured — real routines, real shine.
        </p>
      </div>

      <div className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto snap-x px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {UGC_POSTS.map((post) => {
          const product = productById(post.productId);
          return (
            <figure
              key={post.handle}
              className="group relative snap-start shrink-0 w-[70vw] xs:w-[55vw] sm:w-[300px] overflow-hidden"
            >
              <img
                src={post.image}
                alt={`${post.handle}: ${post.caption}`}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-cocoa/85 via-cocoa/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-4 text-cream">
                <p className="text-xs font-semibold">{post.handle}</p>
                <p className="text-[11px] text-cream/85 mt-0.5 line-clamp-2">
                  {post.caption}
                </p>
                <button
                  onClick={() => addItem(product)}
                  className="mt-3 self-start bg-cream text-cocoa text-[10px] tracking-[0.18em] uppercase font-bold px-4 py-2 hover:bg-honey hover:text-cream transition-colors"
                >
                  Shop {product.name.split(" ").slice(0, 3).join(" ")}
                </button>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow">Over 10,000 five-star reviews across India</p>
          <h2 className="font-display text-3xl sm:text-5xl font-medium mt-2">
            The glow is real
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="bg-cream border border-sand p-6 flex flex-col"
            >
              <span className="text-honey tracking-widest text-sm" aria-label={`${t.rating} stars`}>
                {"★".repeat(t.rating)}
              </span>
              <p className="font-display text-xl mt-3 leading-snug">{t.title}</p>
              <p className="text-sm text-cocoa-soft mt-2 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-4 text-xs">
                <span className="font-semibold">{t.name}</span>
                <span className="text-cocoa-soft"> · Verified buyer · {t.product}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommunityBanner() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/models/community-banner.png"
        alt="Three friends with glossy healthy hair at golden hour"
        loading="lazy"
        className="w-full h-[420px] sm:h-[520px] object-cover"
      />
      <div className="absolute inset-0 bg-cocoa/45" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-xl text-cream">
          <p className="eyebrow text-cream/80">The Gabaani Hive</p>
          <h2 className="font-display text-3xl sm:text-5xl font-medium leading-tight mt-2">
            Join the community
          </h2>
          <p className="mt-4 text-cream/90 text-sm sm:text-base leading-relaxed">
            Become a member of the Gabaani Hive — get 15% off your first
            order, early access to launches and exclusive rewards with every
            purchase.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex bg-cream text-cocoa px-8 py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey hover:text-cream transition-colors"
          >
            Join the Hive
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-medium">
          Get 15% off your first order
        </h2>
        <p className="mt-3 text-cocoa-soft text-sm sm:text-base">
          Sign up for updates, early launches and members-only offers.
        </p>
        {done ? (
          <p className="mt-6 bg-cream-dark border border-honey text-honey-deep px-6 py-4 text-sm font-semibold">
            Welcome to the Hive! Your 15% code is on its way to {email}.
          </p>
        ) : (
          <form
            className="mt-6 flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 border border-cocoa/30 bg-white/70 px-5 py-4 text-sm focus:outline-none focus:border-honey"
            />
            <button
              type="submit"
              className="bg-cocoa text-cream px-8 py-4 text-xs tracking-[0.22em] uppercase font-semibold hover:bg-honey-deep transition-colors"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
