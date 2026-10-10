/** Human-readable site map groups for /site-map and internal linking. */
export const siteMapGroups = [
  {
    title: "Book & visit",
    links: [
      { href: "/book", label: "Book online" },
      { href: "/fees", label: "Fees & prices" },
      { href: "/opening", label: "Opening offer" },
      { href: "/nhs-discount", label: "NHS & student discount" },
      { href: "/new-patients", label: "New patient guide" },
      { href: "/find-us", label: "Find us & parking" },
      { href: "/contact", label: "Contact" },
      { href: "/reviews", label: "Reviews" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Treatments",
    links: [
      { href: "/services", label: "All services" },
      { href: "/back-neck", label: "Back & neck pain" },
      { href: "/headaches", label: "Headaches & joints" },
      { href: "/shockwave", label: "Focused shockwave" },
      { href: "/mens-health", label: "Men's health & ED" },
      { href: "/sports", label: "Sports injury & rehab" },
      { href: "/pregnancy", label: "Pregnancy osteopathy" },
      { href: "/paediatric", label: "Paediatric care" },
      { href: "/cranial", label: "Cranial osteopathy" },
      { href: "/acupuncture", label: "Medical acupuncture" },
      { href: "/massage", label: "Deep tissue massage" },
      { href: "/cupping", label: "Cupping add-on" },
      { href: "/leaflet", label: "Clinic leaflet PDF" },
    ],
  },
  {
    title: "Conditions & areas",
    links: [
      { href: "/conditions", label: "Conditions index" },
      { href: "/areas", label: "Areas we serve" },
      { href: "/areas/woolwich", label: "Woolwich" },
      { href: "/areas/plumstead", label: "Plumstead" },
      { href: "/areas/abbey-wood", label: "Abbey Wood" },
      { href: "/areas/greenwich", label: "Greenwich" },
      { href: "/areas/charlton", label: "Charlton" },
      { href: "/areas/thamesmead", label: "Thamesmead" },
    ],
  },
  {
    title: "About & reading",
    links: [
      { href: "/about", label: "About Austin" },
      { href: "/vi", label: "Tiếng Việt" },
      { href: "/blog", label: "Blog" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & cancellation" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
] as const;
