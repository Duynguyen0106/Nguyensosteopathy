import { site, services, pricing } from "@/lib/site";

export function JsonLd() {
  const medicalBusiness = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${site.websiteUrl}/#clinic`,
    name: site.name,
    alternateName: "Nguyen's Osteopathy",
    description:
      "Drug-free osteopathic care in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath. Back pain, neck pain, focused shockwave, men’s health, sports rehab, and more.",
    url: site.websiteUrl,
    image: [
      `${site.websiteUrl}/images/logo-lockup.png`,
      `${site.websiteUrl}/images/clinic-promo.jpg`,
      `${site.websiteUrl}/images/austin-nguyen.jpg`,
    ],
    logo: `${site.websiteUrl}/images/logo-mark.png`,
    telephone: site.phone,
    email: site.email,
    sameAs: [site.facebookUrl],
    priceRange: "£15–£110",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Woolwich" },
      { "@type": "City", name: "Greenwich" },
      { "@type": "AdministrativeArea", name: "South East London" },
    ],
    medicalSpecialty: "Osteopathic",
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${site.websiteUrl}/services/${service.slug}`,
    })),
    employee: {
      "@type": "Person",
      name: site.practitioner.name,
      jobTitle: site.practitioner.title,
      identifier: `GOsC ${site.practitioner.regNo}`,
      worksFor: { "@id": `${site.websiteUrl}/#clinic` },
    },
    makesOffer: pricing.map((item) => ({
      "@type": "Offer",
      name: item.service,
      description: item.duration,
      price: item.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "GBP",
      url: `${site.websiteUrl}/book`,
    })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
