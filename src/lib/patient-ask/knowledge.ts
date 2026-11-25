import {
  faqs,
  pricing,
  services,
  site,
} from "@/lib/site";

/**
 * Compact clinic facts for the patient ask assistant.
 * Built from SSOT only — never free-web browse.
 * Omits master policy numbers / certificate paths (public /insurance page covers detail).
 */
export function buildClinicKnowledgePack(): string {
  const hours = site.booking.hours
    .map((row) => `${row.days}: ${row.time}`)
    .join("; ");

  const address = [
    site.address.venue,
    site.address.line1,
    site.address.line2,
  ].join(", ");

  const feeLines = pricing
    .map((row) => `- ${row.service} (${row.duration}): ${row.price}`)
    .join("\n");

  const serviceLines = services
    .map(
      (svc) =>
        `- ${svc.title}: ${svc.summary}${svc.relatedPricing ? ` Fees: ${svc.relatedPricing}.` : ""} Path: /services/${svc.slug}`,
    )
    .join("\n");

  const faqLines = faqs
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  const ins = site.practitioner.insurance;

  return [
    `Clinic: ${site.name}`,
    `Practitioner: ${site.practitioner.name} (${site.practitioner.title}, GOsC Reg. ${site.practitioner.regNo})`,
    `Website: ${site.websiteUrl}`,
    `Phone: ${site.phone}`,
    `WhatsApp: ${site.whatsappUrl}`,
    `Email: ${site.email}`,
    `Address: ${address}`,
    `Maps: ${site.address.mapsUrl}`,
    `Clinic hours: ${hours}`,
    `Booking note: ${site.booking.note}`,
    `Book online: ${site.websiteUrl}/book (or ${site.bookingUrl})`,
    `Cancellation: ${site.cancellation}`,
    `Discount: ${site.discount}`,
    `Languages: English and Vietnamese`,
    `No GP referral required.`,
    "",
    "Fees:",
    feeLines,
    "",
    "Services (summaries):",
    serviceLines,
    "",
    "Professional indemnity (summary for patients):",
    `- Cover: ${ins.cover}`,
    `- Limit any one event: ${ins.limitAnyOneEvent}`,
    `- Period: ${ins.periodFrom} to ${ins.periodTo}`,
    `- Public certificates and insurer details: ${site.websiteUrl}/insurance`,
    "",
    "Published FAQs:",
    faqLines,
    "",
    "Useful paths: /fees, /faq, /contact, /book, /find-us, /new-patients, /aftercare, /insurance, /services",
  ].join("\n");
}
