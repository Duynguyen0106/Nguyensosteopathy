import { withRelatedConditionLinks } from "@/lib/blog-condition-links";
import { batch3BlogPosts } from "@/lib/blog-posts-batch3";
import { serviceBlogPosts } from "@/lib/blog-posts-services";
import { blogExpandedBodies } from "@/lib/blog-expanded-bodies";
import { blogExpandedPriority } from "@/lib/blog-expanded-priority";
import blogImageManifest from "@/lib/blog-image-manifest.json";
import { site } from "@/lib/site";

type BlogImageManifest = Record<string, { src: string; alt: string }>;
const imageManifest = blogImageManifest as BlogImageManifest;

/** Canonical blog taxonomy aligned with clinic services. */
export const BLOG_CATEGORIES = [
  "Getting started",
  "Back & neck",
  "Headaches & joints",
  "Focused shockwave",
  "Men's health",
  "Acupuncture & cupping",
  "Deep tissue",
  "Sports rehab",
  "Pregnancy",
  "Cranial",
  "Paediatric",
  "Clinic info",
  "Local guides",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPostSection = {
  /** Section title — rendered as H2 by default, or H3 when level is 3 */
  heading?: string;
  level?: 2 | 3;
  /** Plain text; use markdown-style [label](/path) for internal links */
  paragraphs: string[];
  bullets?: string[];
  /** Optional mid-article image with descriptive alt text */
  image?: {
    src: string;
    alt: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  updated?: string;
  readingMinutes: number;
  keywords: string[];
  /** Short category label for cards */
  category: BlogCategory;
  /** Topic-matched hero / card image */
  image: {
    src: string;
    alt: string;
  };
  /** Body paragraphs and simple sections for rendering */
  sections: BlogPostSection[];
  /** Closing call-to-action copy */
  cta?: string;
  /** Where the CTA button goes — defaults to /book */
  ctaHref?: string;
  /** CTA button label — defaults to "Book online" */
  ctaLabel?: string;
};

type BlogPostInput = Omit<BlogPost, "image" | "readingMinutes"> & {
  image?: BlogPost["image"];
  readingMinutes?: number;
};

function withExpansion(post: BlogPostInput): BlogPostInput {
  const expansion =
    blogExpandedPriority[post.slug] ?? blogExpandedBodies[post.slug];
  if (!expansion) return post;
  return {
    ...post,
    ...expansion,
  };
}

function withImage(post: BlogPostInput): BlogPost {
  const image = post.image ?? imageManifest[post.slug];
  if (!image) {
    throw new Error(`Missing blog image for slug: ${post.slug}`);
  }
  return {
    ...post,
    readingMinutes: post.readingMinutes ?? 5,
    image,
  };
}

const blogPostInputs: BlogPostInput[] = [
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
          `The clinic is inside ${site.address.venue}, ${site.address.line1}, ${site.address.line2}. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room. Pharmacy hours are Monday–Friday 9:00am–6:00pm and Saturday 9:00am–5:30pm. Online booking is available from 5 November 2026 (closed Wednesday and Sunday).`,
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
    updated: "2026-10-15",
    readingMinutes: 9,
    category: "Back & neck",
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
        heading: "Why back pain is so common in SE18",
        paragraphs: [
          "Woolwich and the wider Greenwich borough mix standing retail shifts, warehouse and trades work, long Elizabeth line or DLR sits, and hybrid desk days. That variety is good for a town — and hard on a lumbar spine that never gets the same load twice in one week.",
          "Most back pain is [non-specific mechanical pain](/conditions/non-specific-low-back-pain): sensitive joints, discs, and soft tissue reacting to sudden load, deconditioning, poor sleep, or stress. A scan is not required for every flare. What you do need is a clear plan so fear of movement does not become the second injury.",
        ],
      },
      {
        heading: "Common patterns we see",
        paragraphs: [
          "In clinic, the same stories return with different postcodes. Naming the pattern helps you recognise when self-care is enough — and when hands-on assessment will save weeks of guessing.",
        ],
        bullets: [
          "Lower back stiffness after long sitting that eases once you walk",
          "Pain when bending or getting out of a chair, especially first thing",
          "One-sided buttock or thigh referral that eases with movement",
          "Neck-related upper back tension from screens and phone posture",
          "Weekend DIY or gym spikes after a sedentary week",
        ],
      },
      {
        heading: "Desk, commute, and lifting triggers",
        level: 3,
        paragraphs: [
          "Laptop height, soft sofas, and wallets in back pockets quietly round the lumbar spine for hours. Add a crowded commute without room to change position and tissues stay irritable overnight. Lifting a toddler, a delivery crate, or a leftover DIY bag with a twist on top of that sitting load is a classic Monday-morning presentation.",
          "We do not expect perfect posture all day. We do expect small resets: standing meetings, a short walk after the train, and hip hinge technique for floor picks. Those details sit alongside treatment so relief lasts longer than the appointment.",
        ],
      },
      {
        heading: "How osteopathy approaches back pain",
        image: {
          src: "/images/blog/morning-back-stiffness-osteopath.jpg",
          alt: "Person standing and stretching their lower back after morning stiffness",
        },
        paragraphs: [
          "Your first visit is usually about 60 minutes. We take a focused history, screen for neurological and medical red flags, and examine how your lumbar spine, pelvis, hips, and mid-back share load. Findings are explained in plain English before any hands-on care starts.",
          "Treatment is matched to irritability. An acute flare may need gentle mobilisation and soft-tissue work with short-term activity tweaks. A recurrent desk pattern often needs more emphasis on thoracic mobility, hip strength, and graded return to lifting or running. Related guides such as [sciatica in Woolwich](/blog/sciatica-woolwich-osteopath) and our [back and neck service page](/back-neck) sit beside this article if leg symptoms or neck drivers are part of your picture.",
          "We review progress honestly. Further sessions are recommended when they are clinically useful — not as a default package.",
        ],
      },
      {
        heading: "What recovery usually looks like",
        level: 3,
        paragraphs: [
          "Many mechanical flares settle over two to six weeks with sensible load and targeted care. Sleep often improves before perfect bending feels natural again. Stubborn or recurrent pain may need six to twelve weeks of rehab-focused work, especially if you are rebuilding after months of guarding.",
          "Disc-related or nerve-leaning patterns can take longer for the leg symptoms to quieten even when the back feels better. We measure walking tolerance, sitting minutes, and work capacity — not fear based on an old MRI report.",
        ],
      },
      {
        heading: "Self-care that actually helps between visits",
        paragraphs: [
          "Complete bed rest rarely speeds recovery. Short relative rest, then graded walking, usually outperforms days on the sofa. Heat can ease muscle guarding; ice is optional if it feels soothing after a spike.",
          "Avoid heroic end-range stretches that recreate sharp pain. Prefer comfortable movement: easy walking, supported sit-to-stands, and gentle pelvic tilts if they calm rather than provoke. If a movement repeatedly produces leg weakness, saddle numbness, or bladder change, stop and seek urgent care instead of “pushing through.”",
        ],
      },
      {
        heading: "When to seek urgent medical care",
        paragraphs: [
          "Osteopathy is not a substitute for emergency care. Seek urgent help if you have new bladder or bowel changes, numbness in the saddle area, rapidly worsening leg weakness, unexplained weight loss, fever with back pain, or pain after significant trauma.",
          "For persistent but non-emergency pain — sleep disruption, work limitation, or recurring flares — an osteopathic assessment is a sensible next step. You do not need a GP referral to book at Nguyen's Osteopathic Clinic inside St James Pharmacy.",
        ],
      },
      {
        heading: "Related conditions worth knowing",
        paragraphs: [
          "If pain travels below the knee with pins and needles, read our notes on [sciatica](/conditions/sciatica) and [lumbar disc / radiculopathy](/conditions/lumbar-disc-radiculopathy). Extension-biased local pain may fit a [facet pattern](/conditions/facet-syndrome). One-sided buttock pain after pregnancy or asymmetric sport often overlaps with [sacroiliac joint irritation](/conditions/si-joint-dysfunction).",
          "Matching the label is less important than matching the plan — but the right page can help you prepare better questions for your assessment.",
        ],
      },
      {
        heading: "What to bring to your first back-pain visit",
        paragraphs: [
          "Wear clothes you can move in. Bring a short timeline of when pain started, what eases it, and what you need to get back to — work shifts, childcare, gym, or sleep. Scan reports help when you have them, but they are not required. If you take blood thinners or have had recent surgery, mention that early so techniques stay appropriate.",
          "Fees for an [initial consultation](/fees) are listed transparently, and a 10% NHS and student discount applies with valid ID. Online booking is available; you can also call if you are unsure whether osteopathy or a GP review should come first.",
        ],
      },
    ],
    cta: "If back pain is limiting work or sleep, start with a clear assessment — or explore our condition guides if you want to understand the pattern first.",
    ctaHref: "/conditions/non-specific-low-back-pain",
    ctaLabel: "View back pain condition guide",
  },
  {
    slug: "desk-neck-and-shoulder-pain",
    title: "Desk neck and shoulder pain: a Woolwich osteopath’s guide",
    description:
      "Why office and hybrid workers in Woolwich get neck and shoulder pain — and how osteopathy plus desk setup changes can help.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Back & neck",
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
    category: "Focused shockwave",
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
    category: "Getting started",
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
    category: "Sports rehab",
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
    category: "Men's health",
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
  {
    slug: "sciatica-woolwich-osteopath",
    title: "Sciatica in Woolwich: causes, symptoms, and when osteopathy helps",
    description:
      "Sharp or shooting leg pain from Woolwich commuting and desk work? Learn common sciatica triggers, red flags, and how osteopathy at St James Pharmacy can help.",
    date: "2026-10-09",
    readingMinutes: 7,
    category: "Back & neck",
    keywords: [
      "sciatica Woolwich",
      "sciatica osteopath",
      "leg pain SE18",
      "piriformis syndrome Woolwich",
      "osteopath for sciatica London",
    ],
    sections: [
      {
        paragraphs: [
          "Sciatica is not a single diagnosis — it is a pattern of nerve-related pain that travels from the lower back or buttock into the leg. People in Woolwich often notice it after long sits on the Elizabeth line, lifting at work, or weekends of DIY and sport.",
          `At ${site.name} we assess whether irritation is coming from the lumbar spine, the disc, the sacroiliac joint, or soft tissue around the nerve pathway — then treat the driver, not only the tingling calf.`,
        ],
      },
      {
        heading: "Common sciatica triggers locally",
        paragraphs: [
          "South-east London lifestyles stack load on the lower back: standing shifts in retail and healthcare, driving to the M25, and desk days with a wallet or phone in a back pocket.",
        ],
        bullets: [
          "Prolonged sitting with a rounded lower back",
          "Sudden bending or twisting while lifting",
          "Tight hips and glutes after running or gym work",
          "Recurring “disc flare” after a previous episode",
        ],
      },
      {
        heading: "How osteopathy approaches sciatica",
        paragraphs: [
          "Your first visit includes a case history, neurological screening where appropriate, and hands-on assessment of the spine, pelvis, and hips. Treatment may combine gentle mobilisation, soft-tissue work, and clear advice on positions that calm or aggravate symptoms.",
          "Many people improve with conservative care. If findings suggest imaging, GP review, or urgent pathways (for example progressive weakness, saddle numbness, or bladder change), we will say so plainly and help you act quickly.",
        ],
      },
      {
        heading: "When to book sooner",
        paragraphs: [
          "Do not wait months if pain is stopping sleep, work, or walking. Early assessment often shortens recovery and reduces fear around movement.",
        ],
      },
    ],
    cta: "Book an initial osteopathy assessment in Woolwich online, or call 07882843513.",
  },
  {
    slug: "tension-headaches-neck-osteopath-woolwich",
    title: "Tension headaches and neck pain: help from a Woolwich osteopath",
    description:
      "Desk-related tension headaches, tight upper neck, and jaw strain are common in SE18. See how osteopathy can ease cervicogenic and tension-type headaches.",
    date: "2026-10-09",
    readingMinutes: 6,
    category: "Headaches & joints",
    keywords: [
      "tension headache osteopath",
      "neck pain Woolwich",
      "cervicogenic headache",
      "osteopath for headaches SE18",
      "jaw tension osteopath London",
    ],
    sections: [
      {
        paragraphs: [
          "Not every headache is a migraine. Many Woolwich patients describe a band-like pressure, sore temples, or pain that starts at the base of the skull after screen time — classic tension-type or cervicogenic patterns linked to the neck and shoulders.",
          "Osteopathy looks at how the upper cervical joints, jaw, and shoulder girdle share load. When those structures stiffen, the nervous system stays “on”, and headaches return each afternoon.",
        ],
      },
      {
        heading: "What we check in clinic",
        bullets: [
          "Neck range and joint irritability",
          "Upper trapezius, levator, and suboccipital tone",
          "Jaw (TMJ) contribution if you clench or grind",
          "Desk and sleep positions that keep symptoms going",
        ],
        paragraphs: [
          "Treatment is hands-on and paced to your comfort. You leave with simple mobility and load advice so progress continues between visits — not a one-off “crack and hope”.",
        ],
      },
      {
        heading: "Medical red flags",
        paragraphs: [
          "Sudden “worst ever” headache, neurological change, fever with neck stiffness, or headache after a head injury needs urgent medical care first. Osteopathy is for musculoskeletal drivers once serious causes are ruled out or unlikely.",
        ],
      },
    ],
    cta: "Book online for headache and neck assessment at St James Pharmacy, Woolwich.",
  },
  {
    slug: "pregnancy-osteopathy-woolwich",
    title: "Pregnancy osteopathy in Woolwich: pelvic pain, back ache, and posture",
    description:
      "Gentle osteopathic care in Woolwich for pregnancy-related pelvic girdle pain, rib strain, and back discomfort — adapted to your trimester.",
    date: "2026-10-09",
    readingMinutes: 6,
    category: "Pregnancy",
    keywords: [
      "pregnancy osteopath Woolwich",
      "pelvic girdle pain osteopath",
      "osteopathy pregnancy SE18",
      "SPD osteopath London",
      "pregnancy back pain Woolwich",
    ],
    sections: [
      {
        paragraphs: [
          "Pregnancy changes how your pelvis, ribs, and spine carry load. Hormonal laxity, a shifting centre of gravity, and broken sleep can leave the lower back, sacroiliac joints, and pubic symphysis irritable — especially in the second and third trimesters.",
          `${site.practitioner.name} provides gentle, pregnancy-adapted osteopathy inside ${site.address.venue}. Techniques are soft, explained clearly, and always adjusted to your trimester and comfort.`,
        ],
      },
      {
        heading: "Problems we commonly help",
        bullets: [
          "Pelvic girdle pain and pubic symphysis discomfort",
          "Lower back and buttock ache with walking or turning in bed",
          "Rib and mid-back strain as the bump grows",
          "Postural fatigue from standing or caring for other children",
        ],
        paragraphs: [
          "We do not replace midwifery or obstetric care. If symptoms suggest something that needs medical review, we will signpost you promptly.",
        ],
      },
      {
        heading: "What a visit looks like",
        paragraphs: [
          "Expect a thorough history (including pregnancy stage and any guidance from your midwife or consultant), a comfortable assessment, and hands-on care with positions that work for you. Many patients leave with pacing tips for shopping, stairs, and sleep.",
          "No GP referral is required to book privately. Bring any relevant letters if you have them.",
        ],
      },
    ],
    cta: "Book pregnancy-adapted osteopathy in Woolwich online or call 07882843513.",
  },
  {
    slug: "osteopath-vs-physiotherapist-woolwich",
    title: "Osteopath vs physiotherapist: which should I book in Woolwich?",
    description:
      "Confused between osteopathy and physiotherapy in SE18? A clear comparison of approach, when each helps, and how to choose for back, neck, or sports pain.",
    date: "2026-10-09",
    readingMinutes: 5,
    category: "Getting started",
    keywords: [
      "osteopath vs physiotherapist",
      "osteopathy or physio Woolwich",
      "difference osteopath physio",
      "manual therapy SE18",
      "who to see for back pain Woolwich",
    ],
    sections: [
      {
        paragraphs: [
          "People searching for help in Woolwich often type both “osteopath near me” and “physio near me”. Both professions are regulated, both treat musculoskeletal problems, and both can be excellent — the difference is usually emphasis and style of care.",
          "Osteopaths (GOsC-registered) typically spend more of the session on hands-on assessment and treatment of joints and soft tissues across related regions. Physiotherapists often emphasise graded exercise and rehab protocols, with manual therapy as one tool among many. In practice, good clinicians overlap.",
        ],
      },
      {
        heading: "When osteopathy is a strong fit",
        bullets: [
          "You want a thorough hands-on session with clear explanation of findings",
          "Pain seems linked to posture, stiffness, or several areas at once",
          "You prefer drug-free, private one-to-one care without a long gym circuit on day one",
          "You also want access to adjunct options such as focused shockwave where suitable",
        ],
        paragraphs: [
          `At ${site.name}, ${site.practitioner.name} combines osteopathic care with practical rehab advice so you leave with a plan — not just temporary relief.`,
        ],
      },
      {
        heading: "You do not need to choose perfectly",
        paragraphs: [
          "If you have already started physio and plateaued, or vice versa, a second opinion can still help. Book an assessment, ask questions, and decide based on how clearly the clinician explains your problem and next steps.",
        ],
      },
    ],
    cta: "Prefer to start with osteopathy? Book online at nguyensosteopathy.com/book.",
  },
  {
    slug: "hip-knee-pain-osteopath-woolwich",
    title: "Hip and knee pain in Woolwich: osteopathy for walkers, runners, and desk workers",
    description:
      "Hip stiffness, runner’s knee, and stair pain are common around Woolwich and Greenwich Park. Learn how osteopathy assesses the chain from foot to spine.",
    date: "2026-10-09",
    readingMinutes: 6,
    category: "Headaches & joints",
    keywords: [
      "hip pain osteopath Woolwich",
      "knee pain osteopath SE18",
      "runners knee Woolwich",
      "osteoarthritis osteopath London",
      "hip stiffness Greenwich",
    ],
    sections: [
      {
        paragraphs: [
          "Hip and knee symptoms rarely live in isolation. A stiff hip can overload the knee on the Elizabeth line stairs; a flat desk day can leave the glutes quiet and the IT band complaining on a weekend run around Greenwich Park.",
          "Osteopathy maps the whole lower limb and pelvis so treatment targets the structure that is driving pain — joint, tendon, or movement habit.",
        ],
      },
      {
        heading: "Problems we see often",
        bullets: [
          "Anterior knee pain after running or hill walking",
          "Lateral hip ache when lying on one side",
          "Morning stiffness that eases then returns with stairs",
          "Post-injury irritability that never fully settled",
        ],
        paragraphs: [
          "For some tendon problems that stay stubborn, focused shockwave (LI-ESWT) can be discussed as an adjunct after assessment — not as a first click for everyone.",
        ],
      },
      {
        heading: "What good care looks like",
        paragraphs: [
          "Expect movement testing, hands-on treatment where appropriate, and realistic loading advice. We will not promise to “cure arthritis”, but we can often improve comfort, confidence, and daily function while you stay active.",
        ],
      },
    ],
    cta: "Book a hip or knee assessment with our Woolwich osteopath online.",
  },
  {
    slug: "osteopath-greenwich-charlton-thamesmead",
    title: "Osteopath near Greenwich, Charlton, and Thamesmead",
    description:
      "Looking for an osteopath near Greenwich, Charlton, or Thamesmead? Nguyen's Osteopathic Clinic on Powis Street, Woolwich SE18 is easy to reach and open for online booking.",
    date: "2026-10-09",
    readingMinutes: 4,
    category: "Local guides",
    keywords: [
      "osteopath Greenwich",
      "osteopath Charlton",
      "osteopath Thamesmead",
      "osteopath SE18",
      "osteopath near Greenwich Park",
      "manual therapy Woolwich Arsenal",
    ],
    sections: [
      {
        paragraphs: [
          "You do not have to travel into central London for registered osteopathic care. Nguyen's Osteopathic Clinic sits inside St James Pharmacy on Powis Street, Woolwich SE18 6LQ — practical for patients from Greenwich, Charlton, Thamesmead, Plumstead, and Abbey Wood.",
          "The clinic is a short walk from Woolwich Arsenal station and local bus routes along Powis Street. Ask at the pharmacy counter on arrival and they will direct you to the consultation room.",
        ],
      },
      {
        heading: "Why nearby patients choose us",
        bullets: [
          "GOsC-registered osteopath with clear, private appointments",
          "Drug-free care for back, neck, sports, and specialist pathways",
          "Online booking with no GP referral required",
          "Pharmacy hours Mon–Fri 9–6 and Sat 9–5:30; bookable osteopathy days from 5 November 2026",
        ],
        paragraphs: [
          "Whether you are dealing with desk neck from a Canary Wharf commute or weekend football niggles, local assessment beats hoping it will settle on its own.",
        ],
      },
    ],
    cta: "Book from Greenwich, Charlton, or Thamesmead at www.nguyensosteopathy.com/book.",
  },
  {
    slug: "how-many-osteopathy-sessions",
    title: "How many osteopathy sessions will I need?",
    description:
      "Honest guidance on osteopathy treatment frequency: what affects recovery time, typical plans for back and neck pain, and when to review progress.",
    date: "2026-10-09",
    readingMinutes: 5,
    category: "Getting started",
    keywords: [
      "how many osteopathy sessions",
      "osteopath treatment plan",
      "how often see osteopath",
      "osteopathy course of treatment",
      "osteopath Woolwich fees",
    ],
    sections: [
      {
        paragraphs: [
          "There is no honest one-size answer. Session count depends on how long symptoms have been present, your work and sport load, sleep, and whether the problem is a simple flare or a layered pattern built over years.",
          "At your first visit we explain findings in plain English and outline a provisional plan. Many people with recent back or neck flares notice meaningful change within a few sessions; longer-standing issues usually need a longer runway.",
        ],
      },
      {
        heading: "What we avoid",
        bullets: [
          "Open-ended weekly visits with no review of goals",
          "Pressure to pre-pay large packages you do not understand",
          "Treatment without a clear reason to continue",
        ],
        paragraphs: [
          "We review progress regularly. If you are not moving toward your goals, we change the plan or discuss referral — not more of the same by default.",
        ],
      },
      {
        heading: "Fees and booking",
        paragraphs: [
          "Initial consultation and treatment is 60 minutes (£75). Follow-up osteopathic treatment is 30 minutes (£60). NHS staff and students receive 10% off with valid ID. Book online or call 07882843513.",
        ],
      },
    ],
    cta: "Ready to start with a clear plan? Book your first visit online.",
  },
  {
    slug: "shoulder-pain-frozen-shoulder-woolwich",
    title: "Shoulder pain and frozen shoulder: osteopathy in Woolwich",
    description:
      "Reach overhead without wincing. Learn how osteopathy helps shoulder stiffness, rotator cuff irritation, and frozen shoulder patterns in SE18.",
    date: "2026-10-09",
    readingMinutes: 6,
    category: "Headaches & joints",
    keywords: [
      "shoulder pain osteopath Woolwich",
      "frozen shoulder osteopath",
      "rotator cuff Woolwich",
      "shoulder stiffness SE18",
      "osteopath for shoulder pain London",
    ],
    sections: [
      {
        paragraphs: [
          "Shoulder pain stops simple things: reaching a cupboard, fastening a seatbelt, or sleeping on your side. Causes range from irritable rotator cuff tendons to adhesive capsulitis (frozen shoulder), where the capsule stiffens and range shrinks in stages.",
          "Osteopathy assesses the shoulder blade, neck, and thoracic spine as well as the joint itself — because stiff ribs and a forward desk posture often keep the shoulder working at a disadvantage.",
        ],
      },
      {
        heading: "What treatment may include",
        paragraphs: [
          "Hands-on work to improve joint glide and soft-tissue mobility, plus graded movement so you rebuild range without constant flare-ups. For some persistent tendon problems, focused shockwave can be considered after clinical screening.",
        ],
        bullets: [
          "Painful arc when lifting the arm",
          "Night pain that wakes you on one side",
          "Stiffness after immobilisation or injury",
          "Gradual freezing pattern over months",
        ],
      },
      {
        heading: "When imaging or medical review helps",
        paragraphs: [
          "Trauma with sudden loss of power, suspected dislocation, or red-flag neurological signs need medical assessment. Otherwise, a skilled clinical exam is often the right first step — and we will tell you if scans would change care.",
        ],
      },
    ],
    cta: "Book shoulder assessment at Nguyen's Osteopathic Clinic, Woolwich.",
  },
  ...serviceBlogPosts,
  ...batch3BlogPosts,
];

export const blogPosts: BlogPost[] = blogPostInputs
  .map(withExpansion)
  .map(withImage)
  .map(withRelatedConditionLinks);

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export { categoryToId, toBlogCard } from "@/lib/blog-card";
export type { BlogCard } from "@/lib/blog-card";

import { categoryToId, toBlogCard } from "@/lib/blog-card";

export function getPostsGroupedByCategory() {
  const cards = getAllPosts().map(toBlogCard);
  return BLOG_CATEGORIES.map((category) => ({
    category,
    id: categoryToId(category),
    posts: cards.filter((post) => post.category === category),
  })).filter((group) => group.posts.length > 0);
}

/** Homepage / listings — cards only, no section bodies. */
export function getLatestPostCards(limit = 3) {
  return getAllPosts().slice(0, limit).map(toBlogCard);
}

export function getAllPostCards() {
  return getAllPosts().map(toBlogCard);
}

/** Guard against accidental slug collisions across batches. */
const seen = new Set<string>();
for (const post of blogPosts) {
  if (seen.has(post.slug)) {
    throw new Error(`Duplicate blog slug: ${post.slug}`);
  }
  seen.add(post.slug);
  if (!BLOG_CATEGORIES.includes(post.category)) {
    throw new Error(`Unknown blog category: ${post.category} (${post.slug})`);
  }
}
