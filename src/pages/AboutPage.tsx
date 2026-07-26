import { Link } from "react-router-dom";
import { PageBanner } from "../components/Sections";

const VALUES = [
  {
    icon: "🌿",
    title: "Cruelty-Free",
    desc: "Never tested on animals. Every formula is certified cruelty-free and vegan-friendly where possible.",
  },
  {
    icon: "🐝",
    title: "Sustainably Sourced",
    desc: "Our Golden Garden Honey is harvested from our own hives using bee-friendly methods passed down six generations.",
  },
  {
    icon: "🇮🇳",
    title: "Proudly Indian",
    desc: "Formulated and crafted in India with globally sourced, locally loved ingredients.",
  },
  {
    icon: "♻️",
    title: "Eco-Conscious Packaging",
    desc: "Recyclable glass, minimal plastic, and FSC-certified paper — beauty that gives back to the earth.",
  },
];

const TIMELINE = [
  { year: "1920s", text: "Our family begins beekeeping in the foothills of the Western Ghats." },
  { year: "2018", text: "GABAANI is founded to bring Golden Garden Honey to modern beauty." },
  { year: "2021", text: "Launch of our first haircare collection — sold out in 48 hours." },
  { year: "2024", text: "Over 50,000 customers across India. Shipping worldwide." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page Banner — background cover image */}
      <PageBanner
        image="/images/models/story-garden.png"
        eyebrow="The GABAANI Story"
        title="Our Story"
        subtitle="Six generations of beekeeping, one golden promise — honey-infused beauty crafted in India with love from the Golden Garden."
      />

      {/* Story */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">Six generations of beekeeping</p>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] mt-3">
              Where it all
              <br />
              <em className="text-honey-deep font-medium">began</em>
            </h2>
            <p className="mt-7 text-cocoa-soft leading-loose max-w-md">
              Born in our family's Golden Garden in the Western Ghats, every
              GABAANI formula begins with sustainably harvested honey — one
              bee, one flower, one promise:
              <strong className="text-cocoa"> shine that lasts.</strong>
            </p>
            <Link
              to="/shop?cat=HAIR+PERFUME"
              className="mt-10 inline-flex items-center bg-cocoa text-cream px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-honey-deep transition-colors"
            >
              Shop Hair Perfume
            </Link>
          </div>
          <div>
            <img
              src="/images/h-perfume.jpg"
              alt="GABAANI Hair Perfume flacon with Golden Garden Honey botanicals"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20 bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-center mb-10">
            Our Journey
          </h2>
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="flex gap-6 items-start">
                <span className="shrink-0 font-display text-2xl sm:text-3xl text-honey-deep w-20 text-right">
                  {t.year}
                </span>
                <div className={`flex-1 border-l-2 border-honey pl-6 pb-2 ${i === TIMELINE.length - 1 ? "border-transparent" : ""}`}>
                  <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow">What we stand for</p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium mt-2">
              Our Promise
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center p-6 bg-cream-dark border border-sand">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-cocoa-soft leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cocoa text-cream py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-medium">
            Ready to experience the ritual?
          </h2>
          <p className="mt-4 text-cream/80 text-sm sm:text-base">
            Explore the full GABAANI collection — honey-infused haircare and beauty, delivered across India.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-cream text-cocoa px-8 py-4 text-xs tracking-[0.22em] uppercase font-bold hover:bg-honey hover:text-cream transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
