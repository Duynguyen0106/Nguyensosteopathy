import {
  bookingHoursSpecification,
  faqs,
  getServiceHref,
  pricing,
  services,
  site,
} from "@/lib/site";

export function JsonLd() {
  const medicalBusiness = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${site.websiteUrl}/#clinic`,
    name: site.name,
    alternateName: [
      "Nguyen's Osteopathy",
      "Nguyens Osteopathic Clinic",
      "Nguyen's Osteopath Woolwich",
    ],
    description:
      "Drug-free osteopathic care in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath. Back pain, neck pain, focused shockwave, men’s health, sports rehab, and more — inside St James Pharmacy, SE18.",
    url: site.websiteUrl,
    image: [
      `${site.websiteUrl}/images/logo-lockup.webp`,
      `${site.websiteUrl}/images/clinic-promo.webp`,
      `${site.websiteUrl}/images/austin-nguyen.webp`,
    ],
    logo: `${site.websiteUrl}/images/logo-mark.webp`,
    telephone: site.phoneE164,
    email: site.email,
    sameAs: [site.facebookUrl, site.googleReviewsUrl],
    priceRange: "£15–£110",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.venue}, ${site.address.line1}`,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4912,
      longitude: 0.0672,
    },
    hasMap: site.address.mapsUrl,
    openingHoursSpecification: bookingHoursSpecification,
    areaServed: [
      { "@type": "City", name: "Woolwich" },
      { "@type": "City", name: "Greenwich" },
      { "@type": "City", name: "Charlton" },
      { "@type": "City", name: "Plumstead" },
      { "@type": "City", name: "Thamesmead" },
      { "@type": "City", name: "Abbey Wood" },
      { "@type": "AdministrativeArea", name: "South East London" },
    ],
    medicalSpecialty: "Osteopathic",
    knowsLanguage: ["en-GB", "vi"],
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${site.websiteUrl}${getServiceHref(service.slug)}`,
    })),
    employee: { "@id": `${site.websiteUrl}/#practitioner` },
    founder: { "@id": `${site.websiteUrl}/#practitioner` },
    makesOffer: pricing.map((item) => ({
      "@type": "Offer",
      name: item.service,
      description: item.duration,
      price: item.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "GBP",
      url: `${site.websiteUrl}/book`,
      availability: "https://schema.org/InStock",
    })),
  };

  const practitioner = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.websiteUrl}/#practitioner`,
    name: site.practitioner.name,
    jobTitle: site.practitioner.title,
    description:
      "GOsC-registered osteopath and Master of Osteopathy graduate of the British College of Osteopathic Medicine, practising at Nguyen's Osteopathic Clinic in Woolwich.",
    url: `${site.websiteUrl}/about`,
    image: `${site.websiteUrl}/images/austin-nguyen.webp`,
    telephone: site.phoneE164,
    email: site.email,
    identifier: {
      "@type": "PropertyValue",
      name: "GOsC Registration Number",
      value: site.practitioner.regNo,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "British College of Osteopathic Medicine",
    },
    hasCredential: site.practitioner.credentials,
    knowsLanguage: ["en-GB", "vi"],
    medicalSpecialty: "https://schema.org/Musculoskeletal",
    worksFor: { "@id": `${site.websiteUrl}/#clinic` },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.venue}, ${site.address.line1}`,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.websiteUrl}/#website`,
    url: site.websiteUrl,
    name: site.name,
    description: site.tagline,
    publisher: { "@id": `${site.websiteUrl}/#clinic` },
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "ReserveAction",
      target: `${site.websiteUrl}/book`,
      name: "Book an osteopathy appointment",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(practitioner) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

/** FAQPage schema — use only on /faq (and optionally home), not sitewide. */
export function FaqJsonLd() {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  );
}
