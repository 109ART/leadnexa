import type { Metadata } from "next";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import HowItWorks from "@/components/marketing/HowItWorks";
import Pricing from "@/components/marketing/Pricing";
import Cta from "@/components/marketing/Cta";
import { APP_NAME, APP_TAGLINE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP_NAME,
  description: APP_TAGLINE,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Cta />
    </main>
  );
}