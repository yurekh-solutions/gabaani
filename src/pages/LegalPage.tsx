import { Link, useLocation } from "react-router-dom";
import { PageBanner } from "../components/Sections";

interface LegalSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

interface LegalDoc {
  path: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const LEGAL_DOCS: LegalDoc[] = [
  {
    path: "/privacy-policy",
    eyebrow: "Your data, protected",
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    intro:
      "At GABAANI, your trust matters as much as your shine. This policy explains what information we collect, why we collect it, and how we keep it safe when you shop with us across India.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "When you place an order or create an account, we collect the details needed to serve you:",
        ],
        bullets: [
          "Name, email address and phone number",
          "Shipping and billing address (including PIN code)",
          "Order history and product preferences",
          "Payment confirmation details — we never store your card, UPI or banking credentials",
          "Device and browsing data (pages visited, time on site) to improve your experience",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          "We use your information only to run and improve GABAANI:",
        ],
        bullets: [
          "Processing and delivering your orders, including Cash on Delivery verification",
          "Sending order updates via email, SMS or WhatsApp",
          "Sharing offers and new launches — only if you opt in",
          "Improving our products, website and customer support",
          "Preventing fraud and complying with Indian law",
        ],
      },
      {
        heading: "3. Sharing Your Information",
        body: [
          "We never sell your personal data. We share it only with trusted partners who help us serve you — delivery partners for shipping, payment gateways for secure transactions, and analytics providers to understand how the site is used. Every partner is bound to protect your data.",
        ],
      },
      {
        heading: "4. Data Security",
        body: [
          "Your data is stored on secure servers with encryption in transit (HTTPS) and at rest. Access is limited to team members who need it to fulfil your orders and support requests.",
        ],
      },
      {
        heading: "5. Your Rights",
        body: [
          "You may request access to, correction of, or deletion of your personal data at any time. You can also unsubscribe from marketing messages with one click. Write to us at hello@gabaani.in and we will respond within 30 days.",
        ],
      },
      {
        heading: "6. Contact Us",
        body: [
          "For any privacy question or request, reach us at hello@gabaani.in. GABAANI is based in India and this policy is governed by Indian law, including the Digital Personal Data Protection Act, 2023.",
        ],
      },
    ],
  },
  {
    path: "/terms-of-service",
    eyebrow: "The fine print, made simple",
    title: "Terms of Service",
    updated: "Last updated: July 2026",
    intro:
      "These terms govern your use of gabaani.in and every purchase you make with us. By browsing or ordering, you agree to the terms below.",
    sections: [
      {
        heading: "1. Ordering & Payment",
        body: [
          "All prices are listed in Indian Rupees (Rs) and include GST. We accept VISA, Mastercard, UPI, Paytm and Cash on Delivery. An order is confirmed once you receive our confirmation email or SMS. We reserve the right to cancel orders in case of pricing errors, stock issues or suspected fraud — with a full refund where payment was made.",
        ],
      },
      {
        heading: "2. Shipping & Delivery",
        body: [
          "We ship across India. Orders over Rs 4,999 enjoy free shipping; standard rates apply below that. Delivery typically takes 3–7 working days depending on your PIN code. Delays caused by courier partners, weather or events beyond our control may occur — we will keep you informed.",
        ],
      },
      {
        heading: "3. Returns & Refunds",
        body: [
          "Unopened products in original packaging can be returned within 30 days of delivery for a full refund. For hygiene reasons, opened beauty products cannot be returned unless damaged or defective on arrival. Report damaged items within 48 hours of delivery with photos at hello@gabaani.in and we will replace or refund immediately.",
        ],
      },
      {
        heading: "4. Product Information",
        body: [
          "We take care to display our honey-infused formulas, shades and ingredients accurately. Slight variations in colour may occur due to screen settings. Always patch test new products; discontinue use if irritation occurs. Our products are cosmetic and not intended to diagnose or treat any condition.",
        ],
      },
      {
        heading: "5. Intellectual Property",
        body: [
          "All content on this site — the GABAANI name, logo, photography, copy and design — is owned by GABAANI and protected under Indian and international law. It may not be reproduced without written permission.",
        ],
      },
      {
        heading: "6. Governing Law",
        body: [
          "These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts of India. Questions? Write to hello@gabaani.in.",
        ],
      },
    ],
  },
  {
    path: "/cookies",
    eyebrow: "Sweet, but transparent",
    title: "Cookie Policy",
    updated: "Last updated: July 2026",
    intro:
      "Like honey in our formulas, cookies make your experience smoother. Here is exactly what we use them for on gabaani.in — and how you stay in control.",
    sections: [
      {
        heading: "1. What Are Cookies?",
        body: [
          "Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences — like your cart — so you don't have to re-enter them on every page.",
        ],
      },
      {
        heading: "2. Cookies We Use",
        body: ["We keep it minimal:"],
        bullets: [
          "Essential cookies — keep your cart, checkout and session working; the site cannot function without them",
          "Preference cookies — remember choices like recently viewed products",
          "Analytics cookies — help us understand which pages and products people love, so we can improve",
        ],
      },
      {
        heading: "3. What We Don't Do",
        body: [
          "We do not use cookies to sell your data, and we do not run invasive cross-site tracking. Any analytics data we collect is aggregated and cannot identify you personally.",
        ],
      },
      {
        heading: "4. Managing Cookies",
        body: [
          "You can clear or block cookies anytime in your browser settings (look for 'Privacy' or 'Site data'). Note that blocking essential cookies may break the cart and checkout experience.",
        ],
      },
      {
        heading: "5. Questions",
        body: [
          "Anything unclear? We're happy to help at hello@gabaani.in.",
        ],
      },
    ],
  },
];

export default function LegalPage() {
  const { pathname } = useLocation();
  const doc = LEGAL_DOCS.find((d) => d.path === pathname) ?? LEGAL_DOCS[0];

  return (
    <main>
      <PageBanner
        compact
        image="/images/editorial-honeycomb.png"
        eyebrow={doc.eyebrow}
        title={doc.title}
        subtitle={doc.updated}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-cocoa-soft leading-loose text-base sm:text-lg">{doc.intro}</p>

        <div className="mt-12 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl sm:text-3xl text-cocoa font-medium">
                {section.heading}
              </h2>
              {section.body.map((para) => (
                <p key={para} className="mt-4 text-cocoa-soft leading-loose">
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-cocoa-soft leading-relaxed">
                      <span className="text-honey mt-1 text-xs shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Cross-links to the other legal pages */}
        <div className="mt-16 pt-8 border-t border-sand flex flex-wrap gap-x-8 gap-y-3">
          {LEGAL_DOCS.filter((d) => d.path !== doc.path).map((d) => (
            <Link
              key={d.path}
              to={d.path}
              className="text-[11px] tracking-[0.22em] uppercase font-semibold text-cocoa border-b border-cocoa pb-1 hover:text-honey-deep hover:border-honey-deep transition-colors"
            >
              {d.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
