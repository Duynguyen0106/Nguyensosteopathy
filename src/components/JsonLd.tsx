import {
  bookingHoursSpecification,
  faqs,
  getServiceHref,
  schemaOfferId,
  schemaOffers,
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
      `Drug-free osteopathic care in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. ${site.practitioner.regNo}). Back pain, neck pain, focused shockwave, men’s health, sports rehab, and more — inside St James Pharmacy, SE18.`,
    url: site.websiteUrl,
    image: [
      `${site.websiteUrl}/images/logo-lockup.webp`,
      `${site.websiteUrl}/images/clinic-room.webp`,
      `${site.websiteUrl}/images/clinic-treatment.webp`,
      `${site.websiteUrl}/images/clinic-desk.webp`,
      `${site.websiteUrl}/images/austin-nguyen.webp`,
    ],
    logo: `${site.websiteUrl}/images/logo-mark.webp`,
    telephone: site.phoneE164,
    email: site.email,
    sameAs: [
      site.facebookUrl,
      site.linkedinUrl,
      site.googleReviewsUrl,
      googleBusinessProfileUrl,
    ],
    priceRange: clinicPriceRange(),
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
      latitude: site.address.geo.latitude,
      longitude: site.address.geo.longitude,
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
    medicalSpecialty: {
      "@type": "DefinedTerm",
      name: "Osteopathic / musculoskeletal care",
      description:
        "Drug-free osteopathic assessment and treatment for back, neck, joint, and soft-tissue presentations.",
    },
    knowsLanguage: ["en-GB", "vi"],
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${site.websiteUrl}${getServiceHref(service.slug)}`,
    })),
    employee: { "@id": `${site.websiteUrl}/#practitioner` },
    founder: { "@id": `${site.websiteUrl}/#practitioner` },
    makesOffer: schemaOffers.map((item) => ({
      "@type": "Offer",
      "@id": schemaOfferId(item.service),
      name: item.service,
      description: item.duration,
      price: item.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "GBP",
      url: schemaOfferUrl(item.service),
      availability: "https://schema.org/LimitedAvailability",
    })),
    // Full OfferCatalog node lives on /fees — reference by @id only.
    hasOfferCatalog: { "@id": `${site.websiteUrl}/fees#offers` },
  };
}

/** GBP priceRange from standalone schema offers (excludes +£ add-ons). */
function clinicPriceRange() {
  const amounts = schemaOffers
    .map((item) => Number(item.price.replace(/[^0-9.]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (amounts.length === 0) return "£";
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  return min === max ? `£${min}` : `£${min}–£${max}`;
}

/** Home visits are arranged by enquiry — point Offers at the service page. */
function schemaOfferUrl(serviceName: string) {
  if (serviceName.startsWith("Home Visit")) {
    return `${site.websiteUrl}/services/home-visits`;
  }
  return `${site.websiteUrl}/book`;
}

export function buildPractitionerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.websiteUrl}/#practitioner`,
    name: site.practitioner.name,
    legalName: site.practitioner.legalName,
    jobTitle: site.practitioner.title,
    description:
      "GOsC-registered osteopath (Reg. No. 12332), Master of Osteopathy (BCOM), CertHE Medical Sciences with Distinction (University of Westminster), Dip.Acu, shockwave-trained, and NASM Personal Fitness Trainer — practising at Nguyen's Osteopathic Clinic in Woolwich. Builder of MSK Tutor and Treow Clinic.",
    url: `${site.websiteUrl}/about`,
    image: `${site.websiteUrl}/images/austin-nguyen.webp`,
    telephone: site.phoneE164,
    email: site.email,
    sameAs: [
      site.practitioner.goscRegisterUrl,
      site.linkedinUrl,
      site.facebookUrl,
    ],
    owns: [
      {
        "@type": "SoftwareApplication",
        name: site.products.mskTutor.name,
        url: site.products.mskTutor.url,
        description: site.products.mskTutor.description,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
      },
      {
        "@type": "SoftwareApplication",
        name: site.products.treowClinic.name,
        url: site.products.treowClinic.url,
        description: site.products.treowClinic.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
      },
    ],
    identifier: {
      "@type": "PropertyValue",
      name: "GOsC Registration Number",
      value: site.practitioner.regNo,
      propertyID: "GOsC",
      url: site.practitioner.goscRegisterUrl,
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "British College of Osteopathic Medicine",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Westminster",
      },
    ],
    hasCredential: site.practitioner.qualifications.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory:
        item.kind === "licence"
          ? "Professional licence"
          : item.kind === "degree"
            ? "degree"
            : item.kind === "diploma"
              ? "diploma"
              : "certificate",
      name: item.title,
      description: `${item.detail} (${item.dateLabel})`,
      recognizedBy: {
        "@type": "Organization",
        name: item.issuer,
        ...(item.id === "gosc"
          ? { url: "https://www.osteopathy.org.uk/" }
          : {}),
      },
      ...(item.id === "gosc"
        ? {
            identifier: site.practitioner.regNo,
            url: site.practitioner.goscRegisterUrl,
          }
        : item.certificateHref
          ? { url: `${site.websiteUrl}${item.certificateHref}` }
          : item.href
            ? { url: item.href }
            : {}),
    })),
    memberOf: {
      "@type": "Organization",
      name: "General Osteopathic Council",
      url: "https://www.osteopathy.org.uk/",
    },
    knowsLanguage: ["en-GB", "vi"],
    medicalSpecialty: {
      "@type": "DefinedTerm",
      name: "Osteopathic / musculoskeletal care",
      description:
        "GOsC-registered osteopathic care for musculoskeletal pain and related presentations.",
    },
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
    inLanguage: ["en-GB", "vi"],
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book an osteopathy appointment",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.websiteUrl}/book`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Osteopathy appointment",
      },
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

/** FAQPage schema — use only on /faq, not homepage or sitewide. */
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
