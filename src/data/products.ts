export type Category =
  | "ALL"
  | "HAIR OIL"
  | "HAIR MASK"
  | "HAIR PERFUME"
  | "LIP OIL"
  | "STYLING"
  | "TOOLS"
  | "BODY"
  | "SETS";

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "ALL">;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  badge?: "BESTSELLER" | "NEW" | "LIMITED";
  image: string;
  hoverImage: string;
  alt: string;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients?: string;
  sizes?: ProductSize[];
}

export const CATEGORIES: Category[] = [
  "ALL",
  "HAIR OIL",
  "HAIR MASK",
  "HAIR PERFUME",
  "LIP OIL",
  "STYLING",
  "TOOLS",
  "BODY",
  "SETS",
];

export const FREE_SHIPPING_THRESHOLD = 4999;

/** Format a number as Indian Rupees with Indian comma style: Rs 3,495 */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount);
  // Indian numbering: last 3 digits, then groups of 2
  const str = rounded.toString();
  let result = "";
  if (str.length <= 3) return `Rs ${str}`;
  result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 2) {
    result = remaining.slice(-2) + "," + result;
    remaining = remaining.slice(0, -2);
  }
  if (remaining) result = remaining + "," + result;
  return `Rs ${result}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "honey-infused-hair-oil",
    name: "Honey Infused Hair Oil",
    category: "HAIR OIL",
    price: 3495,
    rating: 4.9,
    reviews: 2841,
    badge: "BESTSELLER",
    image: "/images/honey-infused-hair-oil.png",
    hoverImage: "/images/honey-infused-hair-oil-hover.png",
    alt: "GABAANI Honey Infused Hair Oil in an amber glass dropper bottle on a cream background",
    tagline: "The ultimate beauty icon",
    description:
      "Powered by sustainably sourced Golden Garden Honey, our iconic hair oil delivers intense hydration, instant glossy shine, heat protection and long-lasting frizz control.",
    benefits: [
      "Up to 3-day weightless shine",
      "Up to 93% smoother hair",
      "Up to 230°C heat protection",
      "Long-lasting frizz control",
    ],
    sizes: [
      { label: "50ml", price: 3495 },
      { label: "20ml", price: 1995 },
    ],
  },
  {
    id: "honey-infused-hair-perfume-duo",
    name: "Honey Infused Hair Perfume Duo",
    category: "HAIR PERFUME",
    price: 7295,
    compareAtPrice: 8095,
    rating: 4.9,
    reviews: 1420,
    image: "/images/honey-infused-hair-perfume-duo.png",
    hoverImage: "/images/honey-infused-hair-perfume-duo-hover.png",
    alt: "GABAANI Honey Infused Hair Perfume Duo, two glass bottles with blush pink caps",
    tagline: "Spritz, scent & shine",
    description:
      "Two long-lasting hair perfumes crafted in India that hydrate, add glossy shine and leave hair scented with irresistible warm honey and floral notes. Alcohol-free and non-drying.",
    benefits: [
      "Long-lasting scent",
      "Hydrates & refreshes",
      "Alcohol-free & non-sticky",
      "Glossy honey glow",
    ],
  },
  {
    id: "repairing-hair-mask",
    name: "Repairing Hair Mask",
    category: "HAIR MASK",
    price: 3995,
    rating: 4.5,
    reviews: 963,
    image: "/images/repairing-hair-mask.png",
    hoverImage: "/images/repairing-hair-mask-hover.png",
    alt: "GABAANI Repairing Hair Mask 200ml white jar with brushed gold lid",
    tagline: "Deep repair in 10 minutes",
    description:
      "An intensive weekly treatment powered by Golden Garden Honey and ceramides to rebuild damaged strands, reduce breakage and restore deep hydration from root to tip.",
    benefits: [
      "Reduces breakage by 66% after 1 use",
      "Up to 3-day hydration",
      "Repairs heat & color damage",
      "Silicone-free formula",
    ],
    sizes: [
      { label: "200ml", price: 3995 },
      { label: "75ml", price: 2195 },
    ],
  },
  {
    id: "honey-lip-oil",
    name: "Honey Lip Oil",
    category: "LIP OIL",
    price: 2195,
    rating: 4.9,
    reviews: 3105,
    badge: "NEW",
    image: "/images/honey-lip-oil.png",
    hoverImage: "/images/honey-lip-oil-hover.png",
    alt: "GABAANI Honey Lip Oil in a blush pink tube with doe-foot applicator",
    tagline: "8h hydration & glossy shine",
    description:
      "Drench your lips with intense, long-lasting hydration and a glossy honey shine. No stickiness — just soft, plump, glazed lips all day.",
    benefits: [
      "8-hour hydration",
      "Non-sticky glossy shine",
      "Visibly plumper lips",
      "Infused with Golden Garden Honey",
    ],
  },
  {
    id: "shampoo-conditioner-set",
    name: "Shampoo & Conditioner Set",
    category: "SETS",
    price: 5295,
    compareAtPrice: 5995,
    rating: 4.5,
    reviews: 587,
    image: "/images/shampoo-conditioner-set.png",
    hoverImage: "/images/shampoo-conditioner-set-hover.png",
    alt: "GABAANI Shampoo and Conditioner Set, two cream bottles with gold caps",
    tagline: "The honey gloss routine",
    description:
      "A ceramide-therapy hydrating duo that gently cleanses and deeply conditions, leaving hair glossy, bouncy and frizz-free wash after wash.",
    benefits: [
      "Up to 3-day frizz control",
      "Strengthens & smooths",
      "Color-safe & sulfate-free",
      "Glossy salon finish",
    ],
  },
  {
    id: "5-in-1-styling-cream",
    name: "5-in-1 Styling Cream",
    category: "STYLING",
    price: 2995,
    rating: 4.5,
    reviews: 412,
    image: "/images/5-in-1-styling-cream.png",
    hoverImage: "/images/5-in-1-styling-cream-hover.png",
    alt: "GABAANI 5-in-1 Styling Cream white pump bottle with gold pump",
    tagline: "Your bouncy blowout, bottled",
    description:
      "One cream, five benefits: hydrates, smooths, protects from heat, tames frizz and adds body for the ultimate bouncy blowout finish.",
    benefits: [
      "5 benefits in 1 step",
      "Heat protection up to 230°C",
      "Weightless body & bounce",
      "No crunch, no residue",
    ],
  },
  {
    id: "honey-infused-dry-shampoo",
    name: "Honey Infused Dry Shampoo",
    category: "STYLING",
    price: 2695,
    rating: 4.9,
    reviews: 726,
    badge: "NEW",
    image: "/images/honey-infused-dry-shampoo.png",
    hoverImage: "/images/honey-infused-dry-shampoo-hover.png",
    alt: "GABAANI Honey Infused Dry Shampoo amber spray bottle beside golden honeycomb",
    tagline: "Instant refresh, zero residue",
    description:
      "Absorbs oil instantly and refreshes roots with a soft honey scent — no white cast, no build-up, just clean bouncy hair in seconds.",
    benefits: [
      "Absorbs oil instantly",
      "No white residue",
      "Adds volume at the roots",
      "Soft honey scent",
    ],
  },
  {
    id: "honey-infused-scalp-serum",
    name: "Rosemary & Herbal Scalp Serum",
    category: "HAIR OIL",
    price: 5995,
    rating: 4.9,
    reviews: 1184,
    badge: "BESTSELLER",
    image: "/images/honey-infused-scalp-serum.png",
    hoverImage: "/images/honey-infused-scalp-serum-hover.png",
    alt: "GABAANI Rosemary & Herbal Scalp Serum frosted glass dropper bottle surrounded by fresh rosemary sprigs and rice grains",
    tagline: "Clinically researched herbal scalp therapy",
    description:
      "A potent leave-in scalp serum powered by Rosemary Extract, Rice Water Protein, Biotin and Golden Garden Honey. Clinically researched to soothe, balance and nourish the scalp — supporting stronger, thicker-looking hair growth from the root.",
    benefits: [
      "Rosemary extract stimulates scalp micro-circulation",
      "Rice water protein strengthens hair follicles",
      "Biotin + Niacinamide for thicker-looking hair",
      "Microbiome-friendly, silicone-free formula",
    ],
    ingredients:
      "Aqua, Rosmarinus Officinalis (Rosemary) Leaf Extract*, Oryza Sativa (Rice) Water Extract, Mel (Golden Garden Honey)*, Niacinamide, Biotin, Panthenol (Pro-Vitamin B5), Arginine, Zinc PCA, Caffeine, Tocopherol, Glycerin, Sodium Hyaluronate, Phenoxyethanol, Ethylhexylglycerin.",
    sizes: [
      { label: "60ml", price: 5995 },
      { label: "30ml", price: 3495 },
    ],
  },
  {
    id: "heat-protect-mist",
    name: "Heat Protect Mist",
    category: "STYLING",
    price: 2795,
    rating: 4.9,
    reviews: 645,
    image: "/images/heat-protect-mist.png",
    hoverImage: "/images/heat-protect-mist-hover.png",
    alt: "GABAANI Heat Protect Mist cream spray bottle standing on a travertine stone block",
    tagline: "Style hot, stay protected",
    description:
      "A weightless priming mist that shields strands from heat up to 230°C while locking in hydration and adding a glossy finish.",
    benefits: [
      "Up to 230°C heat protection",
      "Weightless & fast-drying",
      "Anti-frizz shield",
      "Adds glossy shine",
    ],
  },
  {
    id: "honey-hair-mist",
    name: "Honey Hair Mist",
    category: "HAIR PERFUME",
    price: 4495,
    rating: 4.9,
    reviews: 892,
    badge: "NEW",
    image: "/images/honey-hair-mist.png",
    hoverImage: "/images/honey-hair-mist-hover.png",
    alt: "GABAANI Honey Hair Mist golden fine-mist bottle styled with dried flowers",
    tagline: "More than a mist",
    description:
      "Enriched with Golden Garden Honey Water, hyaluronic acid and peptides, this alcohol-free, microbiome-friendly mist is crafted in India to hydrate, refresh and add a honey glow to hair and body.",
    benefits: [
      "Refreshes & hydrates",
      "Glowing hair & skin",
      "Alcohol-free & non-sticky",
      "Kind to the skin biome",
    ],
  },
  {
    id: "wooden-brush-comb-set",
    name: "Wooden Brush & Comb Set",
    category: "TOOLS",
    price: 3195,
    rating: 4.5,
    reviews: 274,
    image: "/images/wooden-brush-comb-set.png",
    hoverImage: "/images/wooden-brush-comb-set-hover.png",
    alt: "GABAANI Wooden Brush and Comb Set on cream linen with dried botanicals",
    tagline: "The gentle detangling ritual",
    description:
      "Sustainably crafted beechwood brush and wide-tooth comb that glide through hair, distribute natural oils and reduce breakage and static.",
    benefits: [
      "Reduces breakage & static",
      "Distributes natural oils",
      "Gentle on the scalp",
      "Sustainably crafted beechwood",
    ],
  },
  {
    id: "pearl-glow-body-oil",
    name: "Pearl Glow Body Oil",
    category: "BODY",
    price: 3695,
    rating: 5.0,
    reviews: 508,
    image: "/images/pearl-glow-body-oil.png",
    hoverImage: "/images/pearl-glow-body-oil-hover.png",
    alt: "GABAANI Pearl Glow Body Oil shimmering glass bottle with gold cap and floral shadows",
    tagline: "Your golden-hour glow",
    description:
      "A fast-absorbing, pearlescent body oil that drenches skin in hydration and leaves a soft honey-gold shimmer — like golden hour, bottled.",
    benefits: [
      "24h skin hydration",
      "Soft pearl-gold shimmer",
      "Fast-absorbing, never greasy",
      "Warm honey scent",
    ],
  },
  {
    id: "golden-ritual-gift-set",
    name: "Golden Ritual Gift Set",
    category: "SETS",
    price: 9995,
    compareAtPrice: 11595,
    rating: 4.9,
    reviews: 356,
    badge: "LIMITED",
    image: "/images/golden-ritual-gift-set.png",
    hoverImage: "/images/golden-ritual-gift-set-hover.png",
    alt: "GABAANI Golden Ritual Gift Set, honey-infused essentials arranged in a gift box",
    tagline: "The complete honey ritual",
    description:
      "Our honey-infused icons in one giftable box: Hair Oil, Repairing Mask, Honey Lip Oil and Hair Perfume — everything for shine from root to tip.",
    benefits: [
      "4 full-size icons",
      "Save Rs 1,600 vs. buying separately",
      "Signature gift box",
      "Limited edition",
    ],
  },
  {
    id: "honey-propolis-gift-collection",
    name: "Honey Propolis Gift Collection",
    category: "SETS",
    price: 12495,
    compareAtPrice: 14995,
    rating: 5.0,
    reviews: 128,
    badge: "LIMITED",
    image: "/images/honey-propolis-gift-collection.png",
    hoverImage: "/images/honey-propolis-gift-collection-hover.png",
    alt: "GABAANI Honey Propolis Gift Collection, premium honey-infused set in a luxury gift box",
    tagline: "The ultimate honey indulgence",
    description:
      "Our most luxurious collection: Hair Oil 50ml, Scalp Serum, Repairing Mask, Pearl Glow Body Oil and Honey Hair Mist — the complete GABAANI ritual for hair and body, wrapped in a signature gold-foil gift box.",
    benefits: [
      "5 full-size luxury products",
      "Save Rs 2,500 vs. buying separately",
      "Gold-foil signature gift box",
      "Limited festive edition",
    ],
  },
];

export interface UgcPost {
  image: string;
  handle: string;
  caption: string;
  productId: string;
}

export const UGC_POSTS: UgcPost[] = [
  {
    image: "/images/models/ugc-beach.png",
    handle: "@goldenwaves.ana",
    caption: "Beach bag essentials — never without my GABAANI mist",
    productId: "honey-hair-mist",
  },
  {
    image: "/images/models/m-apply-oil.png",
    handle: "@sofia.shine",
    caption: "3 drops. That's the whole secret.",
    productId: "honey-infused-hair-oil",
  },
  {
    image: "/images/models/ugc-vanity.png",
    handle: "@mira.glow",
    caption: "Morning ritual: honey lips before anything else",
    productId: "honey-lip-oil",
  },
  {
    image: "/images/models/m-braid-mist.png",
    handle: "@leila.braids",
    caption: "Spritz, scent & shine — all day long",
    productId: "honey-infused-hair-perfume-duo",
  },
  {
    image: "/images/models/ugc-brush.png",
    handle: "@nightritual.co",
    caption: "100 strokes with the GABAANI wooden brush",
    productId: "wooden-brush-comb-set",
  },
  {
    image: "/images/models/m-body-glow.png",
    handle: "@dana.golden",
    caption: "Golden hour glow, bottled",
    productId: "pearl-glow-body-oil",
  },
];

export interface Testimonial {
  name: string;
  rating: number;
  title: string;
  text: string;
  product: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aanya R.",
    rating: 5,
    title: "My hair has never been shinier",
    text: "I've used the Honey Infused Hair Oil for three weeks and the shine is unreal. Frizz is gone even in Mumbai humidity.",
    product: "Honey Infused Hair Oil",
  },
  {
    name: "Noor K.",
    rating: 5,
    title: "The lip oil is addictive",
    text: "Not sticky at all, smells like warm honey and my lips stay hydrated the whole day. Already ordered a second one.",
    product: "Honey Lip Oil",
  },
  {
    name: "Ishita M.",
    rating: 5,
    title: "Saved my bleached hair",
    text: "The Repairing Mask brought my over-bleached hair back to life. Softer after one use, visibly healthier after four.",
    product: "Repairing Hair Mask",
  },
  {
    name: "Priya S.",
    rating: 5,
    title: "Beautiful scent, lasts all day",
    text: "The hair perfume duo is worth every rupee. People keep asking me what fragrance I'm wearing — it's my hair!",
    product: "Hair Perfume Duo",
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
