import {
  bookingHoursSpecification,
  faqs,
  getServiceHref,
  pricing,
  services,
  site,
} from "@/lib/site";

/** Google Business Profile / Maps profile URL for sameAs. */
const googleBusinessProfileUrl = `https://www.google.com/maps?cid=${site.googleMapsCid}`;

/**
 * Sitewide MedicalClinic + LocalBusiness JSON-LD for the document head.
 * Keep clinic identity, address, phone, hours, services, geo, and sameAs here.
 */
export function buildClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness", "MedicalBusiness"],
    "@id": `${site.websiteUrl}/#clinic`,
    name: site.name,
    alternateName: [
      "Nguyen's Osteopathy",
      "Nguyens Osteopathic Clinic",
      "Nguyen's Osteopath Woolwich",
    ],
    description:
      "Drug-free osteopathic care in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332). Back pain, neck pain, focused shockwave, men’s health, sports rehab, and more — inside St James Pharmacy, SE18.",
    url: site.websiteUrl,
    image: [
      `${site.websiteUrl}/images/logo-lockup.png`,
      `${site.websiteUrl}/images/clinic-promo.jpg`,
      `${site.websiteUrl}/images/austin-nguyen.jpg`,
    ],
    logo: `${site.websiteUrl}/images/logo-mark.png`,
    telephone: site.phoneE164,
    email: site.email,
    sameAs: [
      site.facebookUrl,
      site.googleReviewsUrl,
      googleBusinessProfileUrl,
    ],
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
}

export function buildPractitionerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.websiteUrl}/#practitioner`,
    name: site.practitioner.name,
    jobTitle: site.practitioner.title,
    description:
      "GOsC-registered osteopath and Master of Osteopathy graduate of the British College of Osteopathic Medicine, practising at Nguyen's Osteopathic Clinic in Woolwich.",
    url: `${site.websiteUrl}/about`,
    image: `${site.websiteUrl}/images/austin-nguyen.jpg`,
    telephone: site.phoneE164,
    email: site.email,
    identifier: {
      "@type": "PropertyValue",
      name: "GOsC Registration Number",
      value: site.practitioner.regNo,
      propertyID: "GOsC",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "British College of Osteopathic Medicine",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional licence",
        name: "General Osteopathic Council (GOsC) registration",
        recognizedBy: {
          "@type": "Organization",
          name: "General Osteopathic Council",
          url: "https://www.osteopathy.org.uk/",
        },
        identifier: site.practitioner.regNo,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: site.practitioner.credentials,
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: "General Osteopathic Council",
      url: "https://www.osteopathy.org.uk/",
    },
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
}

export function buildWebsiteJsonLd() {
  return {
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
}

/** Injected in root layout <head> on every page. */
export function JsonLd() {
  const clinic = buildClinicJsonLd();
  const practitioner = buildPractitionerJsonLd();
  const website = buildWebsiteJsonLd();

  return (
    <>
      <script
        id="jsonld-medical-clinic"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic) }}
      />
      <script
        id="jsonld-practitioner"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(practitioner) }}
      />
      <script
        id="jsonld-website"
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
      id="jsonld-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  );
}
