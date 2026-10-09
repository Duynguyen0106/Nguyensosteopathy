import { site } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  updated?: string;
  readingMinutes: number;
  keywords: string[];
  /** Short category label for cards */
  category: string;
  /** Body paragraphs and simple sections for rendering */
  sections: Array<{
    heading?: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  cta?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "osteopath-woolwich-what-to-expect",
    title: "Osteopath in Woolwich: what to expect at your first visit",
    description:
      "Looking for an osteopath in Woolwich? Learn what happens in a first appointment, who osteopathy helps, and how to book at Nguyen's Osteopathic Clinic on Powis Street.",
    date: "2026-10-08",
    readingMinutes: 6,
    category: "Getting started",
    keywords: [
      "osteopath Woolwich",
      "osteopathy Woolwich",
      "osteopath SE18",
      "first osteopathy appointment",
    ],
    sections: [
      {
        paragraphs: [
          `If you have been searching for an osteopath in Woolwich, you are usually looking for two things: clear answers about pain that will not settle, and a practitioner you can trust. At ${site.name}, care is provided by ${site.practitioner.name}, a ${site.practitioner.title} (Reg. No. ${site.practitioner.regNo}), inside ${site.address.venue} on ${site.address.line1}.`,
          "Osteopathy is a hands-on, drug-free approach. We assess how your joints, muscles, and nerves move together, then treat the cause of symptoms — not only the sore spot.",
        ],
      },
      {
        heading: "Who osteopathy can help",
        paragraphs: [
          "People visit us from Woolwich, Greenwich, Thamesmead, Charlton, and across south-east London for everyday and specialist problems.",
        ],
        bullets: [
          "Back and neck pain from desk work or lifting",
          "Shoulder, hip, and knee strain",
          "Headaches linked to neck tension",
          "Sports and overuse injuries",
          "Pregnancy-related aches",
          "Focused shockwave and discreet men’s health protocols where clinically appropriate",
        ],
      },
      {
        heading: "Your first appointment (about 60 minutes)",
        paragraphs: [
          "We start with a case history: when symptoms began, what aggravates them, your work or sport, and what you want to get back to. Next comes a movement and hands-on examination. Findings are explained in plain English before treatment begins, where appropriate.",
          "Wear comfortable clothing that lets you move easily. Bring any recent scan reports or letters if you have them — useful, but not required. You do not need a GP referral to book.",
        ],
      },
      {
        heading: "Where to find us",
        paragraphs: [
          `The clinic is inside ${site.address.venue}, ${site.address.line1}, ${site.address.line2}. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room. Opening hours follow the pharmacy: Monday–Friday 9:00am–6:00pm, Saturday 9:00am–5:30pm.`,
        ],
      },
    ],
    cta: "Book online or call 07882843513 to arrange your first visit.",
  },
  {
    slug: "back-pain-woolwich-osteopathy",
    title: "Back pain in Woolwich: when osteopathy can help",
    description:
      "Practical guide to common back pain causes for Woolwich and SE18 residents, how osteopathy approaches treatment, and when to seek urgent care.",
    date: "2026-10-08",
    readingMinutes: 7,
    category: "Back pain",
    keywords: [
      "back pain Woolwich",
      "osteopath for back pain London",
      "lower back pain SE18",
      "sciatica Woolwich",
    ],
    sections: [
      {
        paragraphs: [
          "Back pain is one of the most common reasons people book an osteopath in Woolwich. Desk work on Powis Street, commuting, lifting, and weekend sport all load the spine differently — and symptoms often start gradually.",
          "Osteopathy looks at the whole movement pattern: lumbar joints, hips, mid-back mobility, and how you sit or lift day to day. Treatment may include soft-tissue work, joint mobilisation, and clear advice you can use between visits.",
        ],
      },
      {
        heading: "Common patterns we see",
        bullets: [
          "Lower back stiffness after long sitting",
          "Pain when bending or getting out of a chair",
          "One-sided buttock or thigh referral that eases with movement",
          "Neck-related upper back tension from screens",
        ],
        paragraphs: [
          "Many of these patterns respond well to hands-on care plus simple load and posture changes. We review progress regularly and only recommend further sessions when they are clinically useful.",
        ],
      },
      {
        heading: "When to seek urgent medical care",
        paragraphs: [
          "Osteopathy is not a substitute for emergency care. Seek urgent help if you have new bladder or bowel changes, numbness in the saddle area, rapidly worsening leg weakness, unexplained weight loss, fever with back pain, or pain after significant trauma.",
        ],
      },
    ],
    cta: "If back pain is limiting work or sleep, book an osteopathy assessment in Woolwich online.",
  },
  {
    slug: "desk-neck-and-shoulder-pain",
    title: "Desk neck and shoulder pain: a Woolwich osteopath’s guide",
    description:
      "Why office and hybrid workers in Woolwich get neck and shoulder pain — and how osteopathy plus desk setup changes can help.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Neck & shoulders",
    keywords: [
      "neck pain Woolwich",
      "shoulder pain osteopath",
      "desk posture Woolwich",
      "tech neck London",
    ],
    sections: [
      {
        paragraphs: [
          "Hybrid and office work around Woolwich often means hours at a laptop. The neck and upper shoulders take the load when the screen sits too low, the chair is too soft, or you hold tension through deadlines.",
          "Patients often describe a heavy, aching neck, tight shoulders, or headaches that build through the afternoon. Osteopathy can release irritable soft tissue, improve joint mobility, and show you a few movement resets that fit a working day.",
        ],
      },
      {
        heading: "Quick desk checks",
        bullets: [
          "Screen top near eye level",
          "Elbows supported close to your sides",
          "Feet flat, hips slightly above knees if possible",
          "Stand or walk for 1–2 minutes each half hour",
        ],
        paragraphs: [
          "Hands-on treatment works best when day-to-day load is also adjusted. We combine both so relief lasts longer than a single session.",
        ],
      },
    ],
    cta: "Book a neck and shoulder assessment at Nguyen's Osteopathic Clinic in Woolwich.",
  },
  {
    slug: "focused-shockwave-therapy-woolwich",
    title: "Focused shockwave therapy in Woolwich: who it is for",
    description:
      "Learn how low-intensity focused shockwave (LI-ESWT) is used at Nguyen's Osteopathic Clinic for stubborn tendon and soft-tissue problems.",
    date: "2026-10-08",
    readingMinutes: 6,
    category: "Shockwave",
    keywords: [
      "shockwave therapy Woolwich",
      "LI-ESWT Woolwich",
      "focused shockwave London",
      "tendon pain osteopath",
    ],
    sections: [
      {
        paragraphs: [
          "Focused shockwave therapy (LI-ESWT) is a non-invasive option for persistent soft-tissue and tendon problems that have not settled with rest or standard hands-on care alone. At our Woolwich clinic it is delivered as a clinical protocol, not a spa add-on.",
          "Sound waves are directed to the target tissue to support healing responses and pain modulation. Sessions are typically around 30 minutes, with a clear plan discussed first.",
        ],
      },
      {
        heading: "Conditions often considered",
        bullets: [
          "Stubborn heel and Achilles-type tendon irritation",
          "Selected shoulder and elbow tendon problems",
          "Chronic local soft-tissue pain after other care has plateaued",
        ],
        paragraphs: [
          "Suitability is assessed case by case. We explain expected course, aftercare, and how shockwave sits alongside osteopathy if both are useful for your goals.",
        ],
      },
    ],
    cta: "Ask about focused shockwave when you book — or choose it as a service online.",
  },
  {
    slug: "do-i-need-gp-referral-osteopath",
    title: "Do I need a GP referral to see an osteopath?",
    description:
      "Short answer for Woolwich patients: no GP referral is required to book osteopathy privately. Here’s what to bring and when to speak to your GP first.",
    date: "2026-10-08",
    readingMinutes: 4,
    category: "FAQs",
    keywords: [
      "osteopath without GP referral",
      "private osteopath Woolwich",
      "book osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          "You do not need a GP referral to book a private osteopathy appointment at Nguyen's Osteopathic Clinic. Most patients self-refer online or by phone.",
          "That said, if you have red-flag symptoms, a complex medical history, or recent unexplained weight loss or night pain, contact your GP or urgent care first. Osteopaths are trained to recognise when referral onwards is the safer path.",
        ],
      },
      {
        heading: "Helpful to bring (optional)",
        bullets: [
          "List of current medications",
          "Recent MRI or X-ray reports",
          "Names of other clinicians involved in your care",
        ],
        paragraphs: [
          "GOsC registration means osteopaths in the UK are statutory regulated. You can check registration details for Austin Duy Nguyen (Reg. No. 12332) via the General Osteopathic Council.",
        ],
      },
    ],
    cta: "Ready to book? Use online booking or call 07882843513.",
  },
  {
    slug: "sports-injury-osteopath-woolwich",
    title: "Sports injury rehab with an osteopath in Woolwich",
    description:
      "How osteopathy supports runners, gym-goers, and weekend athletes in Woolwich with load management and hands-on sports injury care.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Sports",
    keywords: [
      "sports injury Woolwich",
      "osteopath for runners London",
      "muscle strain osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          "From parkrun training to gym programmes, sports injuries around Woolwich often come from doing more, too soon, with too little recovery. Osteopathy helps by calming irritable tissue, restoring movement, and planning a sensible return to activity.",
          "We look beyond the painful site — hip control for knee pain, thoracic mobility for shoulder load, and footwear or training spikes that keep symptoms returning.",
        ],
      },
      {
        heading: "What treatment may include",
        bullets: [
          "Hands-on soft-tissue and joint techniques",
          "Simple strength or mobility homework",
          "Guidance on training load and return-to-play pacing",
          "Adjunct options such as massage or shockwave when indicated",
        ],
        paragraphs: [
          "The aim is durable performance, not a quick fix that fails the next time you train.",
        ],
      },
    ],
    cta: "Book a sports injury assessment in Woolwich online.",
  },
  {
    slug: "mens-health-shockwave-woolwich",
    title: "Men’s health and ED: discreet LI-ESWT care in Woolwich",
    description:
      "Confidential low-intensity focused shockwave protocols for vascular-related erectile difficulties at Nguyen's Osteopathic Clinic — drug-free and private.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Men’s health",
    keywords: [
      "ED shockwave therapy London",
      "LI-ESWT Woolwich",
      "men's health osteopath",
      "erectile dysfunction shockwave UK",
    ],
    sections: [
      {
        paragraphs: [
          "Men’s health concerns deserve a private clinic setting and a clear clinical plan. At Nguyen's Osteopathic Clinic we offer discreet low-intensity focused shockwave (LI-ESWT) protocols for selected vascular-related erectile difficulties, alongside respectful one-to-one consultation.",
          "This pathway is non-invasive and drug-free. It is not suitable for everyone; we screen carefully, explain evidence and expectations, and never pressure you into a package you do not understand.",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Appointments are confidential. After history and suitability checks, protocol-based sessions are scheduled with follow-up guidance. You can ask about duration and fees before booking — Specialist ED Treatment & Pelvic Protocol is listed on our pricing page.",
          "If medical investigation or GP involvement is more appropriate first, we will say so plainly.",
        ],
      },
    ],
    cta: "Enquire confidentially by phone or book the specialist pathway online.",
  },
  {
    slug: "nhs-student-osteopathy-discount-woolwich",
    title: "10% NHS and student osteopathy discount in Woolwich",
    description:
      "How the 10% NHS staff and student discount works at Nguyen's Osteopathic Clinic — eligibility, valid ID, and how to book.",
    date: "2026-10-08",
    readingMinutes: 3,
    category: "Clinic info",
    keywords: [
      "NHS discount osteopath",
      "student osteopath discount Woolwich",
      "cheap osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          "We offer a 10% discount for NHS staff and students at Nguyen's Osteopathic Clinic in Woolwich. Valid ID is required at your appointment.",
          "The discount is our way of supporting local healthcare workers and students who often carry physical load from long shifts or study.",
        ],
      },
      {
        heading: "How to use it",
        bullets: [
          "Book online or by phone as usual",
          "Bring NHS or student ID to your visit",
          "Discount is applied against eligible clinic fees",
        ],
        paragraphs: [
          "Questions about what is covered? Call 07882843513 before you book and we will clarify.",
        ],
      },
    ],
    cta: "Book online and mention NHS or student status when you arrive with ID.",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}
