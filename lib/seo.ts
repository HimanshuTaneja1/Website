import type { Metadata } from "next";
import { site } from "./site";

export function buildMetadata(input?: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const title = input?.title
    ? `${input.title} · ${site.name}`
    : `${site.name} — ${site.role}`;
  const description = input?.description ?? site.description;
  const url = new URL(input?.path ?? "/", site.url).toString();
  const image = input?.image ?? `/api/og?title=${encodeURIComponent(input?.title ?? site.tagline)}`;

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords: [...site.keywords],
    authors: [{ name: site.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    sameAs: site.socials.map((s) => s.href).filter((h) => !h.startsWith("mailto:")),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — AI Consulting`,
    description: site.description,
    url: site.url,
    areaServed: "Worldwide",
    serviceType: ["AI Strategy", "Agentic Systems", "Fractional AI Leadership"],
  };
}
