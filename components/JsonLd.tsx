const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tetrangles.com.ng";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Tetrangles Projects Limited",
    alternateName: "Tetrangles",
    url: BASE_URL,
    logo: `${BASE_URL}/logos.png`,
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Nigeria's premier construction and real estate company. 15+ years delivering luxury residential, commercial, and infrastructure projects across Lagos and West Africa.",
    foundingDate: "2010",
    slogan: "Citadel Of Contemporary",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8A, Road 26, Ikota Villa Estate",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+2348058358897",
        contactType: "customer service",
        availableLanguage: "English",
      },
    ],
    email: "tetrangleprojects@gmail.com",
    sameAs: [
      "https://www.instagram.com/tetranglesprojectlimited",
      "https://www.facebook.com/Tetranglez",
    ],
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Real Estate Services",
      itemListElement: [
        "Building Construction",
        "Project Management",
        "Architecture & Design",
        "Real Estate Consultancy",
        "Facility Management",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tetrangles Projects Limited",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProjectJsonLdProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  location?: string | null;
  year?: string | null;
}

export function ProjectJsonLd({ title, description, image, url, location, year }: ProjectJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url,
    ...(image && { image }),
    ...(location && { locationCreated: { "@type": "Place", name: location } }),
    ...(year && { dateCreated: year }),
    creator: {
      "@type": "Organization",
      name: "Tetrangles Projects Limited",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
