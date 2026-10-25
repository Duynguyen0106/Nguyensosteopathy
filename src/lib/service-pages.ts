import { services, type Service } from "@/lib/site";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  slug: string;
  /** H1 — service + location */
  h1: string;
  seoTitle: string;
  metaDescription: string;
  heroLine: string;
  eyebrow: string;
  /** Body sections; combined copy targets ~600–800 words */
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  keywords: string[];
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "back-neck-pain",
    h1: "Back & Neck Pain Treatment in Woolwich",
    seoTitle: "Back & neck pain Woolwich",
    metaDescription: "Osteopathy for back and neck pain in Woolwich SE18 — sciatica, desk strain, disc-related stiffness and morning ache. Book with Austin Duy Nguyen at Nguyen's…",
    heroLine: "Assessment-led osteopathy for sciatica, postural strain, disc-related stiffness and everyday spinal ache — inside St James Pharmacy on Powis Street.",
    eyebrow: "Spine care · Woolwich SE18",
    sections: [
      {
        heading: "Why back and neck pain linger",
        paragraphs: [
          "Back and neck pain are among the most common reasons people seek an osteopath in Woolwich and the wider SE18 area. Symptoms often start after a busy week at a desk, a sudden lift, a long commute, or simply a period when movement has become stiff and guarded. What keeps pain going is rarely one dramatic moment alone — it is usually how joints, muscles and daily habits share load once irritation has begun.",
          "At Nguyen's Osteopathic Clinic we look beyond the sore spot. Protective muscle spasm, reduced spinal mobility, pelvic asymmetry and desk posture can all feed into the same pattern of ache, referral into the buttock or leg, or a neck that does not want to turn freely. Understanding that pattern is the first step toward lasting relief rather than temporary easing.",
          "People who work at screens for long hours often notice symptoms creep in gradually: a heavy neck by late afternoon, a stiff lower back after commuting, or a sharp catch when standing from a chair. Others arrive after a clear incident — a lift that went wrong, a weekend of decorating, or a flare that followed unusual inactivity. Both patterns respond best when we identify the mechanical drivers rather than chasing symptoms alone.",
        ],
      },
      {
        heading: "How osteopathy helps spinal pain",
        paragraphs: [
          "Osteopathy is a regulated, hands-on approach to musculoskeletal care. Your initial visit includes a detailed history, posture and movement testing, and a clear explanation of what we find. Treatment may include gentle joint mobilisation, soft-tissue techniques and advice tailored to your work and sleep setup. The aim is to calm irritated tissues, restore freer movement and give you practical ways to protect progress between appointments.",
          "People visit us for sciatica and referred leg pain, desk-related neck and shoulder strain, disc-related stiffness or flare-ups, and morning ache that improves only slowly as the day goes on. You do not need a GP referral. Care is private and one-to-one with Austin Duy Nguyen, a GOsC-registered osteopath.",
          "Techniques are selected for your presentation and comfort. Some sessions emphasise soft-tissue release through the lumbar or cervical musculature; others prioritise joint mobility where segments have become restricted. Home advice might cover desk height, break patterns, sleep positions, or graded return to walking and lifting. The goal is freer movement that lasts beyond the treatment couch.",
        ],
      },
      {
        heading: "What to expect at your appointment",
        paragraphs: [
          "Your first appointment lasts about 60 minutes. Wear comfortable clothing that allows easy movement. We discuss when symptoms started, what aggravates or eases them, and any relevant medical history. Hands-on assessment then guides a treatment plan that matches your goals — whether that is sitting more comfortably at work, returning to the gym, or simply sleeping without waking stiff.",
          "Follow-up visits are typically shorter and focused on reviewing change, refining techniques and progressing home advice. Many patients notice improvement within a few sessions; we only recommend further care when it is clinically useful. Mild soreness for a day or two after treatment can be normal as tissues adapt.",
          "If your pain includes numbness, progressive weakness, unexplained weight loss, fever, or bladder or bowel changes, seek medical care urgently before or instead of routine musculoskeletal treatment. Osteopathy is appropriate for many mechanical back and neck problems once serious causes have been considered and excluded where needed.",
        ],
      },
      {
        heading: "Local care in Woolwich SE18",
        paragraphs: [
          `The clinic sits inside St James Pharmacy & Travel Clinic at 52 Powis Street, Woolwich, London SE18 6LQ — convenient for Plumstead, Charlton, Abbey Wood, Thamesmead and Greenwich. Ask at the pharmacy counter on arrival and you will be directed to the osteopathy room. Bookable osteopathy days are Monday, Tuesday, Thursday, Friday and Saturday (closed Wednesday and Sunday).`,
          "If spinal pain is affecting your work or daily life, booking an assessment is a practical next step. You can also explore our condition guides on sciatica, neck pain and disc-related symptoms, or read about desk and office pain if screen work is the main driver.",
          "NHS staff and students receive 10% off with valid ID. Live booking slots are shown on our booking page. Prefer Vietnamese? Austin can consult in Vietnamese or English so you can describe symptoms without a language barrier.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a scan before seeing an osteopath for back pain?",
        answer: "Usually not. Most back and neck pain can be assessed clinically first. If your history or examination suggests imaging or medical review is needed, we will explain why and help you take the appropriate next step.",
      },
      {
        question: "Can osteopathy help sciatica?",
        answer: "Osteopathy can help many people with sciatica-type symptoms by addressing spinal mobility, soft-tissue tone and aggravating habits. We screen for signs that need urgent medical care and refer when appropriate.",
      },
      {
        question: "How soon can I book in Woolwich?",
        answer:
          "Online booking shows live availability. Regular bookable days are Mon, Tue, Thu, Fri and Sat. Call or WhatsApp if you need help choosing a slot.",
      },
      {
        question: "What should I wear?",
        answer: "Comfortable clothing that allows you to move and for us to assess your spine and related areas. You can change on site if needed.",
      },
      {
        question: "Where is the osteopath for back pain on Powis Street?",
        answer:
          "Nguyen's Osteopathic Clinic is inside St James Pharmacy & Travel Clinic at 52 Powis Street, Woolwich SE18 6LQ. Ask at the pharmacy counter and staff will direct you to the treatment room.",
      },
      {
        question: "Can I speak Vietnamese about my back or neck pain?",
        answer:
          "Yes. Austin Duy Nguyen can consult in Vietnamese or English so you can describe symptoms without a language barrier.",
      },
    ],
    relatedSlugs: [
      "headaches-joints", "deep-tissue-massage", "sports-injury-rehab", "focused-shockwave",
    ],
    keywords: [
      "back pain osteopath Woolwich", "neck pain treatment SE18", "sciatica osteopath Woolwich", "desk neck pain London",
    ],
  },
  {
    slug: "headaches-joints",
    h1: "Headache & Joint Treatment in Woolwich",
    seoTitle: "Headache & Joint Treatment in Woolwich",
    metaDescription: "Osteopathy for tension headaches, cervicogenic headache and joint stiffness in Woolwich SE18. Shoulder, hip, knee and ankle support at Nguyen's Osteopathic…",
    heroLine: "Calm irritable neck-driven headaches and rebuild comfortable movement in stiff or post-injury joints — drug-free care in Woolwich.",
    eyebrow: "Headaches & joints · Woolwich SE18",
    sections: [
      {
        heading: "When headaches and joints share a story",
        paragraphs: [
          "Tension-type and cervicogenic headaches often travel with stiff upper necks, overloaded shoulders and jaws that never quite switch off. Joint irritability in the shoulder, hip, knee or ankle can likewise linger when glide is lost and surrounding muscles stay protective long after the original strain. At our Woolwich clinic we treat these patterns as connected, not as isolated complaints.",
          "Many patients arriving from SE18 and nearby neighbourhoods describe headaches that build through the working day, clicking or catching joints after sport, or a sense that one area always feels tight no matter how much they stretch. Hands-on assessment helps separate musculoskeletal drivers from symptoms that need medical input.",
          "Screen-heavy work and long commutes leave many people with a familiar pattern: tight muscles at the base of the skull, elevated shoulders, and a headache that sits behind the eyes or wraps the temples. Joint complaints tell their own story — a shoulder that will not reach comfortably into a jacket, a hip that aches after sitting, or a knee that objects to stairs after sport. Naming the pattern clearly makes treatment more precise.",
        ],
      },
      {
        heading: "Our approach to headache and joint care",
        paragraphs: [
          "Treatment focuses on restoring comfortable motion where it has become restricted, easing soft-tissue tone that feeds referral into the head, and giving you simple exercises or habit changes that reduce recurrence. Osteopathy here is gentle and explained step by step — suitable whether your main goal is fewer desk-day headaches or freer movement in a previously injured joint.",
          "Austin Duy Nguyen combines case history with movement testing across the neck, thoracic spine and relevant peripheral joints. Where jaw tension, breathing pattern or workstation setup plays a role, that becomes part of the plan. You leave with a clear sense of what we treated and what to do before the next visit.",
          "We explain findings in plain English before treating. That might mean showing you how upper-neck rotation relates to your headache diary, or how limited ankle motion changes knee load. Education is part of care because recurrence drops when you understand the levers you can control between visits, not only while you are on the treatment couch.",
        ],
      },
      {
        heading: "What happens in clinic",
        paragraphs: [
          "Initial consultations last around 60 minutes inside St James Pharmacy on Powis Street. We discuss headache frequency, triggers, joint history and your goals, then examine the regions most likely to be involved. Hands-on techniques may include mobilisation, soft-tissue work and gentle stretching, always paced to your comfort.",
          "Follow-ups refine the plan as symptoms change. Some people improve quickly once upper-neck mechanics settle; longer-standing joint irritability may need a short course of care plus graded loading. NHS staff and students receive 10% off with valid ID at the appointment.",
          "Red-flag headaches — sudden thunderclap onset, headache with fever or rash, neurological change, or headache after significant trauma — need urgent medical assessment first. Musculoskeletal osteopathy is for patterns consistent with tension and cervicogenic drivers after serious causes are addressed.",
        ],
      },
      {
        heading: "Book headache or joint care in Woolwich",
        paragraphs: [
          "Nguyen's Osteopathic Clinic serves Woolwich, Plumstead, Charlton, Abbey Wood, Thamesmead and Greenwich. No GP referral is required for typical musculoskeletal presentations. If you are unsure whether your headache is suitable for osteopathy, call or message and we will help you decide the safest first step.",
          "Ready to book? Use online booking or call the clinic. Related services include back and neck care if spinal stiffness is the main driver, cranial osteopathy for those who prefer a very gentle style, and deep tissue massage when muscular load is dominant.",
          "Fees follow standard osteopathy pricing for initial and follow-up visits. You can combine this pathway with acupuncture or massage when soft-tissue load is high. Live availability is always shown in the booking calendar so you can choose a time that fits work and family life in SE London.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can an osteopath help with tension headaches?",
        answer: "Yes, when headaches are linked to neck and shoulder mechanics, soft-tissue tone and posture. We assess suitability and refer if your symptoms suggest a different medical pathway.",
      },
      {
        question: "Do you treat knees, hips and shoulders?",
        answer: "Yes. Joint stiffness and post-injury irritability in peripheral joints are a core part of this service, alongside headache-related neck care.",
      },
      {
        question: "Will treatment make my headache worse?",
        answer: "Techniques are adapted to sensitivity. Mild temporary ache can occur; we adjust pressure and check in throughout. Contact us if symptoms clearly worsen after a visit.",
      },
      {
        question: "How is this different from massage alone?",
        answer: "Osteopathy includes joint assessment and mobilisation as well as soft-tissue care, with a plan for work and daily habits — not only muscle release.",
      },
    ],
    relatedSlugs: [
      "back-neck-pain", "cranial-therapy", "deep-tissue-massage", "acupuncture-electro",
    ],
    keywords: [
      "headache osteopath Woolwich", "tension headache SE18", "joint pain osteopath Woolwich", "cervicogenic headache London",
    ],
  },
  {
    slug: "focused-shockwave",
    h1: "Shockwave Therapy in Woolwich",
    seoTitle: "Shockwave Therapy Woolwich | Focused LI-ESWT",
    metaDescription:
      "Shockwave therapy in Woolwich SE18 for plantar fasciitis, tennis elbow, Achilles and stubborn tendinopathy. Focused LI-ESWT £90 after screening at Nguyen's on Powis Street.",
    heroLine:
      "Focused LI-ESWT for stubborn heel, elbow, Achilles and tendon pain at 52 Powis Street, Woolwich SE18 — clinically screened, then delivered with a clear loading plan.",
    eyebrow: "Shockwave Woolwich · SE18",
    sections: [
      {
        heading: "When tendons stop settling with rest",
        paragraphs: [
          "Focused extracorporeal shockwave therapy (LI-ESWT) is used for persistent tendon and fascia problems that have plateaued with rest, stretching or general soft-tissue care alone. Common reasons people book in Woolwich include plantar fasciitis and morning heel pain, Achilles irritability, tennis or golfer's elbow, patellar tendon pain and stubborn shoulder tendon symptoms.",
          "Unlike a massage gun or wellness gadget, focused shockwave delivers controlled acoustic energy to a specific tissue depth after clinical screening. Sessions are short and targeted. Suitability is always confirmed first — not every sore tendon is a shockwave candidate, and some presentations need imaging or medical review instead.",
          "Tendons adapt to load slowly. When training volume jumps, footwear changes, or desk-to-gym transitions overload a tissue that was already irritable, symptoms can persist for months. Shockwave is considered when that persistence matches a tendinopathy pattern and conservative loading alone has stalled — not as a shortcut past diagnosis or a replacement for sensible rehab.",
        ],
      },
      {
        heading: "How we use shockwave at the clinic",
        paragraphs: [
          "Your pathway starts with diagnosis and screening: we confirm the pattern fits a shockwave-responsive problem and rule out reasons to delay or refer. Treatment then delivers focused energy to the irritable tendon or fascia while we address the loading and joint mechanics that keep symptoms going. Osteopathic care often sits alongside shockwave so the wider kinetic chain supports recovery.",
          "Fees are listed clearly — focused shockwave is £90 per session. Men's health vascular LI-ESWT is a separate confidential protocol with its own fee and pathway. We explain expected course length, aftercare and activity modification before you commit to a series of visits.",
          "Austin screens every candidate carefully. Contraindications, differential diagnoses and realistic expectations are discussed before the first pulse of treatment. You will know the fee, the likely review point, and how to modify running, gripping or gym work in the days after each visit so progress is not undone by accidental overload.",
        ],
      },
      {
        heading: "What a session feels like",
        paragraphs: [
          "You may feel strong pulsing or local tenderness during treatment. Intensity is adjusted for tolerance. Residual ache for a day or two can occur as tissues respond. Most people continue day-to-day activity with sensible load management rather than complete rest — we give specific guidance for your sport or work.",
          "Progress is reviewed regularly. Many tendon pathways use a short course rather than a single visit; we only continue when it remains clinically useful. Combining shockwave with graded loading is usually more effective than either approach in isolation.",
          "Between sessions we want tendons to see the right amount of load — enough to adapt, not so much that irritability snowballs. That balance is individual. Desk workers with plantar fasciitis need different advice from five-a-side players with patellar tendon pain, even when the device protocol looks similar on paper.",
        ],
      },
      {
        heading: "Book shockwave screening in Woolwich",
        paragraphs: [
          "Nguyen's Osteopathic Clinic is based inside St James Pharmacy at 52 Powis Street, SE18 6LQ. Book online or call to arrange an assessment. If you are unsure whether shockwave or osteopathy alone is the better first step, say so when you book — we will guide you honestly.",
          "Patients often combine this service with sports injury rehab or back and neck care when mechanics elsewhere overload the tendon. Explore related condition guides for plantar fasciitis, Achilles tendinopathy and tennis elbow for more detail before your visit.",
          "Parking and public transport options for Powis Street are covered on our find-us page. If you are travelling from Greenwich, Charlton or Thamesmead, allow a few extra minutes on busy retail days. Book online to lock a screening slot, then decide on a course together once suitability is confirmed.",
          "If morning heel pain, tennis elbow or Achilles stiffness has lasted beyond a few weeks of sensible rest, a screening visit is a practical way to decide whether focused shockwave, osteopathy alone, or medical review is the better next step for you in Woolwich.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is focused shockwave the same as a massage gun?",
        answer: "No. Focused LI-ESWT is a medical device pathway delivering controlled acoustic energy after clinical screening — not a wellness gadget.",
      },
      {
        question: "How much is shockwave therapy in Woolwich?",
        answer:
          "Focused shockwave is £90 per session after clinical screening. Fees are confirmed before you commit to a course. See our fees page for the full list.",
      },
      {
        question: "How many sessions will I need?",
        answer: "It depends on the condition and how long symptoms have been present. Many tendon pathways use a short course; we review progress and only continue when useful.",
      },
      {
        question: "Does shockwave hurt?",
        answer: "You may feel strong pulsing or local tenderness. Intensity is adjusted for tolerance, and mild residual ache for a day or two can occur.",
      },
      {
        question: "Is men's health ED shockwave included?",
        answer: "Vascular LI-ESWT for men's health is a separate confidential pathway with its own protocol and fee. See our Men's Health & ED service page.",
      },
      {
        question: "Do I need a GP referral for shockwave in SE18?",
        answer:
          "No. You can book screening directly at Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street. We refer on if medical review is the safer next step.",
      },
    ],
    relatedSlugs: [
      "mens-health-ed", "sports-injury-rehab", "back-neck-pain", "deep-tissue-massage",
    ],
    keywords: [
      "shockwave woolwich",
      "shockwave therapy Woolwich",
      "LI-ESWT SE18",
      "shockwave plantar fasciitis Woolwich",
      "focused shockwave London",
    ],
  },
  {
    slug: "mens-health-ed",
    h1: "Men's Health & ED Shockwave in Woolwich",
    seoTitle: "Men's shockwave Woolwich",
    metaDescription:
      "Confidential men's health and ED shockwave in Woolwich SE18 using low-intensity focused LI-ESWT. Private, drug-free protocol at Nguyen's on Powis Street — £110 / 30 min.",
    heroLine:
      "Discreet, non-invasive LI-ESWT for vascular-related erectile difficulties — private one-to-one care inside St James Pharmacy, Woolwich SE18.",
    eyebrow: "Men's health Woolwich · confidential",
    sections: [
      {
        heading: "A private pathway for men's health",
        paragraphs: [
          "Talking about erectile difficulties or pelvic recovery can feel uncomfortable. Our men's health service is designed to be confidential, respectful and clear from the first conversation. Low-intensity focused shockwave (LI-ESWT) is offered as a drug-free, non-invasive option for suitable vascular-related presentations, with time built in for questions so you understand the plan before treatment begins.",
          "Appointments take place in a private consultation room inside St James Pharmacy, Woolwich. There is no open gym-floor setting and no rushed explanation. Austin Duy Nguyen explains screening, expected course structure and how this pathway differs from general musculoskeletal shockwave used for tendons.",
          "Shame and silence keep many men from seeking help early. Our clinic culture is straightforward and non-judgemental: you will not be rushed, joked about, or sold a miracle. The focus is clinical screening, clear consent and a protocol you understand, with privacy respected from enquiry through to follow-up.",
        ],
      },
      {
        heading: "What LI-ESWT involves for men's health",
        paragraphs: [
          "Protocol-based sessions deliver low-intensity focused acoustic energy according to a clinical pathway tailored for this indication. Suitability is confirmed in consultation — not every cause of erectile difficulty is vascular, and medical review may be more appropriate in some cases. We are honest about when osteopathy-led LI-ESWT is a reasonable option and when you should speak with your GP or a specialist first.",
          "The specialist protocol is listed at £110 for 30 minutes. Fees, cancellation policy and aftercare are explained up front. Treatment is paced; you remain clothed appropriately for the protocol and can stop at any time to ask questions.",
          "We discuss lifestyle and medical factors that influence vascular and pelvic health at a level appropriate to an osteopathy-led adjunct service. Where medications, cardiac history or other red flags appear, medical collaboration comes first. LI-ESWT here is an option within a responsible pathway — not a replacement for your GP or urology advice.",
        ],
      },
      {
        heading: "What to expect from your visits",
        paragraphs: [
          "Your first visit centres on history, screening and consent. Subsequent sessions follow the agreed protocol with brief check-ins on response and comfort. We do not pressure you into a large prepaid package; progress and clinical usefulness guide whether to continue.",
          "Many men combine this pathway with general health measures advised by their GP. We encourage coordinated care rather than replacing medical advice. If symptoms suggest urgent medical attention, we will say so clearly.",
          "Aftercare is usually simple: follow the activity guidance given, attend review points, and contact us if anything unexpected occurs. Privacy extends to how you prefer to communicate — phone, WhatsApp or email — when arranging appointments around work.",
        ],
      },
      {
        heading: "Book confidentially in Woolwich SE18",
        paragraphs: [
          "Online booking and phone enquiries are handled discreetly. The clinic serves Woolwich and surrounding SE London neighbourhoods with Saturday availability within our bookable pattern. Vietnamese or English consultation is available if you prefer to discuss symptoms without a language barrier.",
          "For tendon-focused shockwave rather than men's health protocol, see our Focused Shockwave page. For general musculoskeletal pain, start with osteopathy for back, neck or sports injury instead.",
          "The clinic is inside a working pharmacy on Powis Street; arrival is discreet via the pharmacy entrance. Ask at the counter for the osteopathy room. Message WhatsApp for scheduling questions if you prefer not to call, and we will help you choose an appropriate appointment type.",
          "Men travelling from Greenwich, Charlton, Plumstead or Thamesmead often choose this clinic because appointments stay private, explanations stay plain, and there is no pressure to decide everything in the first five minutes of walking through the door.",
          "Questions are encouraged at every stage, including how LI-ESWT sits alongside any medications or investigations you already have. Bringing a short list of concerns to the first visit helps us cover what matters most without rushing the clinical screening conversation.",
          `Our bookable pattern includes Saturday availability, which helps if weekday confidential appointments are hard to arrange around work in central London or local SE18 roles.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Is this service confidential?",
        answer: "Yes. Consultations are private and one-to-one. We discuss findings and options only with you unless you ask us to involve another clinician.",
      },
      {
        question: "Do I need a GP referral?",
        answer: "No GP referral is required to book. We may still recommend medical review if screening suggests it is the safer pathway.",
      },
      {
        question: "How much is men's health shockwave in Woolwich?",
        answer:
          "The specialist ED / pelvic protocol is £110 for 30 minutes. Fees are explained before treatment starts — see our fees page for the full list.",
      },
      {
        question: "How is this different from tendon shockwave?",
        answer: "Men's health uses a specific vascular LI-ESWT protocol and fee. Tendon shockwave for heel, elbow or Achilles is a separate service.",
      },
      {
        question: "Will you pressure me into a long package?",
        answer: "No. We explain the typical course, review progress, and only continue when it remains clinically appropriate.",
      },
      {
        question: "Can I discuss this in Vietnamese?",
        answer:
          "Yes. Austin can consult in Vietnamese or English so you can describe symptoms without a language barrier. Arrival via the pharmacy counter stays discreet either way.",
      },
    ],
    relatedSlugs: [
      "focused-shockwave", "sports-injury-rehab", "acupuncture-electro", "back-neck-pain",
    ],
    keywords: [
      "mens health shockwave woolwich",
      "men's health shockwave Woolwich",
      "ED treatment Woolwich",
      "LI-ESWT ED SE18",
      "discreet shockwave London",
    ],
  },
  {
    slug: "acupuncture-electro",
    h1: "Medical Acupuncture in Woolwich",
    seoTitle: "Medical acupuncture Woolwich",
    metaDescription: "Western medical acupuncture and electroacupuncture in Woolwich SE18 for muscle trigger points and localised pain. Available standalone or as a +£20 add-on…",
    heroLine: "Targeted needling and gentle microcurrent to calm irritable muscles and support pain relief — integrated with osteopathic care when useful.",
    eyebrow: "Acupuncture · Woolwich SE18",
    sections: [
      {
        heading: "Western medical acupuncture in clinic",
        paragraphs: [
          "Medical acupuncture at Nguyen's Osteopathic Clinic follows a Western clinical model: needles are placed with clear musculoskeletal intent, often into irritable muscle trigger points or regions contributing to localised pain. Electroacupuncture adds gentle microcurrent through selected needles when that extra stimulus may help modulate symptoms.",
          "It is not offered as a mystical cure-all. We discuss suitability, needle comfort and whether acupuncture should stand alone or sit as an add-on within a broader osteopathic session. Many Woolwich patients use it for stubborn muscle irritability that soft-tissue hands-on care alone has not fully settled.",
          "People sometimes confuse medical acupuncture with traditional Chinese acupuncture or with exaggerated dry-needling marketing claims. Our framing stays clinical: we use needles as one tool among others when the tissue presentation and your preferences align. You can always decline needling and continue with hands-on osteopathy alone.",
        ],
      },
      {
        heading: "When acupuncture may help",
        paragraphs: [
          "People book for trigger-point irritability, persistent localised pain, and as adjunct support during rehab when muscles remain protective. Some prefer needling to deeper manual pressure; others use both in a combined plan. We screen for contraindications and adapt technique for first-time needle users.",
          "Pricing is straightforward: acupuncture can be a focused standalone session or an add-on at +£20 within eligible treatments. Exact recommendations depend on your presentation after assessment — we will not add needling without consent and a clear rationale.",
          "Electroacupuncture is introduced only when it adds something useful — for example when a muscle remains highly irritable after manual release. Settings stay comfortable; stronger is not automatically better. First-time patients often start with fewer needles to learn how their body responds before building a fuller plan.",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "After discussing goals and comfort preferences, fine needles are placed precisely. With electroacupuncture, a mild pulsing sensation may be felt. Sessions are monitored closely; needles can be adjusted or removed if anything feels wrong. Afterwards we advise on activity, hydration and what short-lived post-treatment ache can feel like.",
          "Acupuncture often pairs well with osteopathy for back and neck pain, sports rehab loading plans, or deep tissue massage on alternate visits when soft-tissue load is high. Your plan stays coherent rather than collecting unrelated add-ons.",
          "Hygiene and single-use needles are non-negotiable. Skin is prepared appropriately, and needle sites are monitored. If you feel faint, dizzy, or unusually anxious, tell us immediately — we will remove needles and help you settle before deciding whether to continue another day.",
        ],
      },
      {
        heading: "Book acupuncture in Woolwich SE18",
        paragraphs: [
          "Find us inside St James Pharmacy, 52 Powis Street. Book online, call, or ask when scheduling osteopathy whether an acupuncture add-on is likely to be useful for your case. Vietnamese-speaking consultation is available if that helps you describe symptoms more comfortably.",
          "If needles are not for you, osteopathy and massage remain fully available without them. We respect preference and will never insist on needling as a condition of care or recovery.",
          "Add-on acupuncture can be requested when you book osteopathy, or we may suggest it during assessment. Standalone sessions are available when needling is the main focus. Check the fees page for current pricing and NHS or student discount rules before you visit.",
          "Woolwich patients who sit for long hours or train hard sometimes use acupuncture strategically during flare weeks, then return to osteopathy or massage as the mainstay once irritability settles — a flexible plan rather than a rigid package.",
          "After needling, most people return to desk work or light daily activity the same day. We will tell you if a particular session warrants easing training for twenty-four hours, especially when electroacupuncture has been used on a highly irritable muscle group.",
          "Internal links from this page to back and neck care, sports rehab and massage help you see how acupuncture fits a wider plan rather than existing as an isolated add-on bought on impulse.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does medical acupuncture hurt?",
        answer: "Most people feel a brief prick or dull ache at the needle site. Intensity is kept tolerable; tell us immediately if anything feels sharp or wrong.",
      },
      {
        question: "Is this traditional Chinese acupuncture?",
        answer: "We practise Western medical acupuncture with a musculoskeletal focus, which differs from traditional Chinese medicine frameworks.",
      },
      {
        question: "Can it be added to osteopathy?",
        answer: "Yes, when clinically appropriate. The add-on fee is +£20; we confirm suitability and consent first.",
      },
      {
        question: "Who should avoid acupuncture?",
        answer: "Certain medical conditions, needle phobia, or specific medications may mean needling is unsuitable. Screening at assessment covers this.",
      },
    ],
    relatedSlugs: [
      "back-neck-pain", "deep-tissue-massage", "sports-injury-rehab", "headaches-joints",
    ],
    keywords: [
      "medical acupuncture Woolwich", "electroacupuncture SE18", "dry needling osteopath Woolwich", "acupuncture for muscle pain London",
    ],
  },
  {
    slug: "deep-tissue-massage",
    h1: "Deep Tissue Massage in Woolwich",
    seoTitle: "Deep Tissue Massage in Woolwich",
    metaDescription: "Deep tissue massage in Woolwich SE18 for chronic muscle tension, desk strain and training load. 45-minute sessions at Nguyen's Osteopathic Clinic inside St…",
    heroLine: "Progressive, feedback-led soft-tissue work for knotted, heavy or restricted muscles after desk days, training or stress.",
    eyebrow: "Soft-tissue care · Woolwich SE18",
    sections: [
      {
        heading: "Massage with clinical intent",
        paragraphs: [
          "Deep tissue massage at our Woolwich clinic is not a generic spa ritual. It targets the layers that hold chronic tension — useful when shoulders feel bolted, the mid-back never loosens, or training leaves muscles dense and sore beyond normal recovery. Pressure builds progressively and is always guided by your feedback so treatment stays effective without becoming overwhelming.",
          "Many patients combine massage with osteopathic joint care across a course of visits: massage addresses soft-tissue load while osteopathy restores joint mobility and movement patterns. Others book massage when muscular tightness is the main complaint and joint findings are secondary.",
          "Chronic tightness often layers over joint restriction or loading habits. That is why a clinic-based massage session includes a short clinical conversation rather than music and silence alone. Understanding why your upper traps never switch off changes how we work and what you do afterwards at a desk or in the gym.",
        ],
      },
      {
        heading: "Who it suits",
        paragraphs: [
          "Deep tissue work helps chronic muscular tightness, training-related muscle load, desk-related shoulder and back tension, and anyone who needs focused release in priority regions. Sessions last 45 minutes and are priced clearly on our fees page. Cupping can be added when appropriate for an additional fee.",
          "We take a brief history even for massage-focused visits so we do not work aggressively into tissues that need a different approach. If assessment suggests osteopathy or shockwave would serve you better, we say so and help you switch pathway rather than selling the wrong session.",
          "Athletes sometimes book the day after heavy sessions; office workers often book mid-week when desk posture has peaked. We help you time sessions so soft tissue is receptive rather than so inflamed that deeper work is counterproductive. Communication during treatment keeps pressure in the productive zone.",
        ],
      },
      {
        heading: "During and after your session",
        paragraphs: [
          "Expect focused work on agreed regions, attention to breathing and positioning for comfort, and aftercare tips to keep tissues moving well. Mild tenderness afterwards is common; gentle movement and usual hydration usually settle it within a day or two.",
          "Regular desk workers in Woolwich and SE London often schedule massage around busy project cycles, while athletes time sessions around heavier training blocks. We can suggest spacing that matches your diary rather than a fixed weekly template that ignores recovery.",
          "Hydration, gentle walking and avoiding back-to-back maximal training on the same day usually help recovery. If cupping is used, temporary marks can appear — we discuss that before starting. Contact us if pain after massage feels clearly excessive rather than typical post-treatment ache.",
        ],
      },
      {
        heading: "Book deep tissue massage in SE18",
        paragraphs: [
          `Nguyen's Osteopathic Clinic operates inside St James Pharmacy on Powis Street with bookable days Monday, Tuesday, Thursday, Friday and Saturday. NHS and student discounts apply with valid ID shown at the appointment.`,
          "Explore related services for back and neck osteopathy, sports rehab, or acupuncture if needling may complement soft-tissue release. Online booking is the fastest way to secure a 45-minute slot that fits your week.",
          "First-time visitors are welcome; say if it is your first clinical massage so we can pace accordingly. Combine with osteopathy across a month if joint stiffness and muscle load are both loud, or keep massage as maintenance when you are otherwise managing well between heavier training or desk blocks.",
          "If you are unsure whether to book massage or osteopathy first, start with an osteopathy assessment when joints feel stuck or pain refers, and choose massage when muscular heaviness and local tightness are the loudest complaints in day-to-day life.",
          "Pressure should feel strong but productive — a sensation you can breathe through, not something you brace against. Say if you want more or less at any moment; feedback is part of skilled soft-tissue work, not a disruption to the session.",
          "Nguyen's Osteopathic Clinic lists massage clearly on the fees page so there are no surprises at reception. Ask about NHS or student discounts when you book if they apply to you.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is deep tissue different from a relaxation massage?",
        answer: "Pressure and intent target deeper soft-tissue restriction with clinical focus on priority regions, rather than a light full-body wellness massage.",
      },
      {
        question: "Will I be bruised?",
        answer: "Some people bruise more easily than others. We adapt pressure to tolerance; tell us about medications or conditions that increase bruising risk.",
      },
      {
        question: "Can I book massage without osteopathy?",
        answer: "Yes. Massage can be booked as its own 45-minute session. We still screen briefly to keep treatment appropriate.",
      },
      {
        question: "Do you offer cupping?",
        answer: "Cupping is available as an add-on when suitable. Ask when booking or during your visit; fees are listed on the fees page.",
      },
    ],
    relatedSlugs: [
      "back-neck-pain", "sports-injury-rehab", "acupuncture-electro", "headaches-joints",
    ],
    keywords: [
      "deep tissue massage Woolwich", "sports massage SE18", "desk tension massage Woolwich", "massage osteopath clinic London",
    ],
  },
  {
    slug: "sports-injury-rehab",
    h1: "Sports Injury & Rehab in Woolwich",
    seoTitle: "Sports Injury & Rehab in Woolwich",
    metaDescription: "Sports injury assessment and rehab in Woolwich SE18 for strains, sprains and overuse. Return-to-sport planning with osteopathy at Nguyen's Osteopathic Clinic.",
    heroLine: "Assessment, hands-on care and progressive loading so you return to training with better mechanics — not guesswork.",
    eyebrow: "Sport & rehab · Woolwich SE18",
    sections: [
      {
        heading: "Injuries that interrupt training",
        paragraphs: [
          "Whether you run the Thames Path, lift in a local gym, or play weekend sport across Greenwich borough, soft-tissue and joint injuries can stall progress quickly. Sprains, strains and overuse niggles improve fastest when assessment, hands-on care and progressive loading sit together rather than as disconnected appointments.",
          "At Nguyen's Osteopathic Clinic in Woolwich we build rehab plans that respect tissue healing timelines while keeping you as active as safely possible. Guessing your way back often leads to flare-ups; clear milestones reduce that risk and keep motivation realistic.",
          "Woolwich and Greenwich have a growing community of recreational runners, hybrid athletes and pitch-sport players. Injuries here are often mixed: a sprain that never fully restored control, a tendon irritated by a mileage spike, or a back that complains when deadlifts climb too quickly. Rehab has to match the sport, not a generic template.",
        ],
      },
      {
        heading: "How rehab works here",
        paragraphs: [
          "Your initial consultation explores mechanism of injury, sport demands and previous history. Hands-on osteopathy eases protective spasm and restores joint and soft-tissue mobility where needed. You then receive graded advice for return to running, lifting or field sport — not a generic printout that ignores your diary.",
          "Recurring athletic niggles often hide load-management or technique issues. We look at how the wider chain shares stress: hips and ankles for knee pain, thoracic mobility for shoulder irritation, and spine mechanics when trunk control is lacking. Shockwave can be considered for stubborn tendinopathy after screening.",
          "We set short-term and medium-term goals with you — pain reduction, range, strength benchmarks, and sport-specific tests. Manual therapy opens the door; loading walks you through it. Skipping the loading phase is why many athletes feel better for a week and then return to square one.",
        ],
      },
      {
        heading: "What to expect session to session",
        paragraphs: [
          "Early sessions prioritise calming irritability and restoring motion. Later visits emphasise capacity: strength, control and sport-specific tolerance. You should leave each appointment knowing what to do before the next one and which warning signs mean ease off.",
          "Pricing follows standard osteopathy fees unless a specialist adjunct is added. Bring training shoes or note recent programme changes — small details often explain why symptoms arrived when they did and how quickly we can progress.",
          "Bring clarity on competition dates if you have them, but be prepared for honest timelines. Returning for one match at all costs can cost a whole season. We would rather help you make that trade-off consciously than pretend risk does not exist.",
        ],
      },
      {
        heading: "Train again with a local osteopath",
        paragraphs: [
          "Based inside St James Pharmacy, SE18, we are easy to reach from Woolwich Arsenal, Plumstead and Charlton. Book online for an initial 60-minute assessment. No GP referral is required for most sports soft-tissue presentations; we refer promptly if examination suggests otherwise.",
          "Related reading includes our focused shockwave and deep tissue massage pages. For spinal pain limiting lifting or running, see back and neck treatment as well.",
          "Initial osteopathy assessment is the usual entry point; shockwave or acupuncture may be added later if indicated. Book early in a flare when possible — early guidance often shortens time on the sidelines compared with waiting until compensation patterns are entrenched.",
          "Local athletes who train around shift work or family schedules appreciate clear, minimal home programmes that fit real life. We would rather give you three useful drills than a sheet you will never follow between sessions in Woolwich or elsewhere in SE18. Between visits you can also browse our public home exercise library for illustrated building blocks, then we tailor dosage to your sport in clinic.",
          "If imaging has already been done, bring reports to the first visit so we can interpret findings alongside how you move today. Scans matter, but function and load tolerance often decide the rehab timetable more than a single radiology sentence.",
          "Weekend athletes across Woolwich and Charlton often share the same trap: resting completely until pain fades, then returning overnight to full training. Graded exposure beats that boom-bust cycle for most soft-tissue injuries we see.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I keep training while injured?",
        answer: "Often yes, with modifications. We help you decide what to reduce, what to keep, and how to progress without repeatedly aggravating tissue.",
      },
      {
        question: "Do you treat runners and gym-goers?",
        answer: "Yes. Overuse injuries from running and gym training are common presentations, alongside acute sprains and strains.",
      },
      {
        question: "When is shockwave useful in sport?",
        answer: "For selected stubborn tendinopathies after screening. It is not a first step for every sports injury.",
      },
      {
        question: "How soon can I return to matches?",
        answer: "Timelines depend on tissue healing and sport demands. We set milestones rather than arbitrary dates so return is earned by capacity, not the calendar alone.",
      },
    ],
    relatedSlugs: [
      "focused-shockwave", "deep-tissue-massage", "back-neck-pain", "acupuncture-electro",
    ],
    keywords: [
      "sports injury osteopath Woolwich", "rehab SE18", "running injury Woolwich", "sprain strain osteopath London",
    ],
  },
  {
    slug: "pregnancy-support",
    h1: "Pregnancy Osteopathy in Woolwich",
    seoTitle: "Pregnancy Osteopathy in Woolwich",
    metaDescription: "Gentle pregnancy osteopathy in Woolwich SE18 for pelvic girdle discomfort, lower-back and rib strain. Trimester-aware care at Nguyen's Osteopathic Clinic.",
    heroLine: "Trimester-aware, gentle osteopathic care for pelvic pressure, postural change and pregnancy-related backache.",
    eyebrow: "Pregnancy care · Woolwich SE18",
    sections: [
      {
        heading: "Supporting your body as it changes",
        paragraphs: [
          "Pregnancy alters how the pelvis, spine and soft tissues carry load. Pelvic girdle discomfort, lower-back ache, rib strain and postural fatigue are common — and they deserve care that respects your trimester, comfort and medical guidance. Osteopathy at our Woolwich clinic uses gentle techniques and positioning adapted for pregnancy rather than a one-size treatment style.",
          "We take time to understand your stage of pregnancy, any midwife or consultant advice you have been given, and which daily tasks aggravate symptoms. Treatment never replaces obstetric care; it complements it by addressing musculoskeletal strain that makes weeks feel harder than they need to.",
          "Each trimester brings different mechanical demands. Early pregnancy may unsettle a previously manageable back; mid-pregnancy often loads the pelvis and ribs differently; later stages challenge balance, sleep and endurance for simple tasks. Care that ignores those differences feels generic — ours is paced to how you present on the day.",
        ],
      },
      {
        heading: "What gentle pregnancy care looks like",
        paragraphs: [
          "Expect careful positioning, soft mobilisation and soft-tissue approaches chosen for comfort. We avoid techniques or positions that feel unsafe for you. Practical advice covers sleep setup, standing work, lifting older children and pacing activity through the week.",
          "Ideal reasons to book include pelvic girdle discomfort, lower-back and rib strain in pregnancy, and postural change as your baby grows. Later-trimester visits focus on comfort and function; earlier visits may address desk or pre-existing spinal patterns that pregnancy has unsettled.",
          "We collaborate with your existing maternity advice. If you have been told to avoid certain positions or activities, tell us before treatment begins. Supportive strategies are discussed without pushing products you do not need, and partners are welcome to hear simple ways to help at home.",
        ],
      },
      {
        heading: "Your appointment experience",
        paragraphs: [
          "Initial visits last about 60 minutes in a private room inside St James Pharmacy. Bring any relevant maternity notes you are happy to share. Ask when booking if you need specific access support so we can plan arrival smoothly through the pharmacy.",
          "Follow-ups adjust as your body and symptoms change week by week. Mild treatment-related ache can occur; we prefer conservative dosing and clear aftercare. Contact us or your maternity team if you develop red-flag symptoms such as severe headache, calf pain with swelling, vaginal bleeding, or reduced fetal movements.",
          "Feeling heard matters. Pregnancy musculoskeletal pain is often dismissed as something to endure. We take symptoms seriously while staying clear about the limits of osteopathy and when medical review should come first.",
        ],
      },
      {
        heading: "Book pregnancy support in Woolwich",
        paragraphs: [
          "Nguyen's Osteopathic Clinic serves expectant parents across SE18 and nearby areas. Online booking shows live times on our bookable days. If you are unsure whether osteopathy is appropriate alongside your maternity pathway, message or call first — we will help you decide.",
          "Related services include general back and neck care for postnatal musculoskeletal recovery, and cranial osteopathy for those who prefer an especially light touch. Paediatric care is available separately for infants and children after birth.",
          "Postnatal musculoskeletal recovery can be booked once you and your medical team are happy for you to attend. Mention how recently you gave birth when booking so we pace appropriately. Pelvic health concerns beyond musculoskeletal osteopathy may need specialist physiotherapy — we will signpost when that is the better fit.",
          "From Powis Street it is straightforward to combine a maternity-friendly appointment with other errands in Woolwich town centre. Tell us if you need a quieter arrival time or a little extra room for positioning so we can prepare the treatment space before you arrive.",
          "Side-lying and supported positions are used freely so you are never expected to stay in an uncomfortable posture for the sake of a technique. If something does not feel right, say so immediately and we will change approach without fuss.",
          "Looking ahead to postnatal months, many parents return when feeding postures, lifting car seats or returning to walking routines stir old spinal or pelvic patterns. Mention postnatal goals early if that is already on your mind.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is osteopathy safe in pregnancy?",
        answer: "When adapted to trimester and screened appropriately, gentle osteopathic care is commonly used for musculoskeletal pregnancy discomfort. We modify techniques and positioning for your stage and comfort.",
      },
      {
        question: "Do I need my midwife's approval?",
        answer: "Tell your maternity team about adjunct care you are seeking. Bring any advice they have given; we work with that guidance, not against it.",
      },
      {
        question: "Can I come in the third trimester?",
        answer: "Yes. Later-trimester visits focus on comfort, positioning and practical advice, always adapted to how you feel on the day.",
      },
      {
        question: "Do you treat pelvic girdle pain?",
        answer: "Pelvic girdle discomfort is a common reason for pregnancy osteopathy bookings. Assessment guides how hands-on and advice are tailored.",
      },
    ],
    relatedSlugs: [
      "back-neck-pain", "cranial-therapy", "paediatric-care", "deep-tissue-massage",
    ],
    keywords: [
      "pregnancy osteopath Woolwich", "pelvic girdle pain SE18", "pregnancy back pain Woolwich", "antenatal osteopathy London",
    ],
  },
  {
    slug: "cranial-therapy",
    h1: "Cranial Osteopathy in Woolwich",
    seoTitle: "Cranial Osteopathy in Woolwich",
    metaDescription: "Gentle cranial osteopathy in Woolwich SE18 for head, jaw and upper-neck tension patterns. Calm, precise care at Nguyen's Osteopathic Clinic inside St James…",
    heroLine: "Subtle, precise hands-on care for people who prefer a quieter therapeutic approach — including sensitive nervous systems and upper-neck tension patterns.",
    eyebrow: "Gentle care · Woolwich SE18",
    sections: [
      {
        heading: "A calmer style of osteopathy",
        paragraphs: [
          "Cranial osteopathy uses very light, precise contact to ease patterns of tension through the head, neck and wider body. It suits people who find firmer techniques too intense, those holding stress in the upper neck and jaw, and anyone seeking a quieter treatment environment without sacrificing clinical structure.",
          "Despite the name, cranial work is not only about the head. Osteopaths trained in this approach still assess how the whole body shares strain; the difference is dosage and pace. At our Woolwich clinic, sessions remain unhurried with regular check-ins so you never feel rushed or over-treated.",
          "Sensitivity to treatment is not a weakness — it is information. People with hypermobile patterns, high stress loads, or previous difficult manual therapy experiences often do better when dosage starts low and trust builds. Cranial osteopathy gives us that dosage dial without abandoning assessment.",
        ],
      },
      {
        heading: "Who chooses cranial osteopathy",
        paragraphs: [
          "Patients often book when they are sensitive to stronger manual techniques, when head, jaw and upper-neck tension patterns dominate, or when stress-held structural tightness flares under pressure at work. Parents exploring gentle options sometimes start here before or alongside paediatric visits for their children — paediatric care itself is a separate service tailored to age.",
          "Cranial osteopathy can sit within a wider plan that also includes conventional osteopathic mobilisation on other days if your presentation needs both. We explain the rationale rather than switching styles without discussion or consent.",
          "Jaw clenching, grinding and desk-forward head posture frequently appear together. Light techniques around the head and neck can complement advice on breaks, sleep and screen height. We still examine shoulders and thoracic spine because cranial symptoms rarely live in isolation from the rest of the upper body.",
        ],
      },
      {
        heading: "Inside a cranial-focused session",
        paragraphs: [
          "After history and gentle assessment, treatment uses subtle contact with attention to your breathing and comfort. Many people notice a deep sense of settling during or after the session; others simply feel freer in the neck and shoulders over subsequent days. Advice on rest and hydration afterwards is usually simple and practical.",
          "Initial appointments follow our standard osteopathy timing and fees unless otherwise stated. Wear comfortable clothing. If you are unsure whether cranial or firmer osteopathy suits you better, say so when you book — assessment will guide the choice collaboratively.",
          "Sessions are quieter by design. You can keep eyes closed, request less talking, or ask for more explanation — preference varies. Afterwards, plan a slightly easier evening when possible; some people feel deeply tired in a pleasant way as systems downshift.",
        ],
      },
      {
        heading: "Book gentle care in Woolwich SE18",
        paragraphs: [
          `Find Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street. Bookable osteopathy days run Monday, Tuesday, Thursday, Friday and Saturday. Vietnamese or English consultation is available.`,
          "Related pages include headache and joint treatment, pregnancy support, and paediatric care. For a fuller explanation of osteopathy in general, see our what-is-osteopathy guide.",
          "If you tried osteopathy elsewhere and found it too forceful, mention that when you book. We can prioritise a cranial-led first session and only introduce other techniques if and when you want them. Your consent stays central throughout every visit.",
          "Commuters and local residents alike use cranial-focused sessions as a reset when stress settles into the neck and jaw. It is still clinical osteopathy — just delivered at a dosage that respects a sensitive system and a busy Woolwich week.",
          "You remain clothed for cranial-focused sessions, and draping or positioning is adjusted for warmth and modesty. The atmosphere is intentionally calm, yet you can ask clinical questions at any point — gentle does not mean unexplained.",
          "For headache-dominant presentations we may still recommend a blended plan over several visits, mixing cranial dosage with conventional neck care as tolerance allows. The sequence is agreed with you rather than imposed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is cranial osteopathy only light touch on the head?",
        answer: "Contact is typically very light and often includes the head and neck, but assessment still considers how the wider body shares tension.",
      },
      {
        question: "Can I feel anything happening?",
        answer: "Some people notice warmth, settling or emotional release; others feel very little during treatment and notice change afterwards. Both responses can be normal.",
      },
      {
        question: "Is it suitable if I dislike strong clicking techniques?",
        answer: "Yes. Cranial-focused care is often chosen specifically by people who prefer to avoid firmer or thrust techniques.",
      },
      {
        question: "Do you treat babies with cranial osteopathy here?",
        answer: "Infant and child care is offered through our paediatric service with age-appropriate consent and pacing. Discuss your child's needs when booking.",
      },
    ],
    relatedSlugs: [
      "headaches-joints", "paediatric-care", "pregnancy-support", "back-neck-pain",
    ],
    keywords: [
      "cranial osteopathy Woolwich", "gentle osteopath SE18", "cranial osteopath London", "jaw neck tension Woolwich",
    ],
  },
  {
    slug: "paediatric-care",
    h1: "Paediatric Osteopathy in Woolwich",
    seoTitle: "Paediatric Osteopathy in Woolwich",
    metaDescription: "Gentle paediatric osteopathy in Woolwich SE18 for infants and children. Calm, parent-led appointments at Nguyen's Osteopathic Clinic inside St James Pharmacy.",
    heroLine: "Soft, measured osteopathic care tailored to your child's age and comfort — with clear explanations for parents throughout.",
    eyebrow: "Paediatric care · Woolwich SE18",
    sections: [
      {
        heading: "Care paced for children and parents",
        paragraphs: [
          "Paediatric osteopathy at Nguyen's Osteopathic Clinic is soft, measured and always adapted to your child's age. We take time with parents, explain what we are doing in plain language, and never rush a child who needs a moment to settle. The clinic room inside St James Pharmacy offers a private setting away from a busy open treatment floor.",
          "Families from Woolwich, Plumstead, Abbey Wood and nearby areas book when they want gentle musculoskeletal support and a calm clinical manner. We are honest about what osteopathy can and cannot address, and we encourage you to keep your GP, health visitor or paediatrician involved in your child's wider care.",
          "Children are not small adults. Communication, consent, session length and technique all change with age. Babies need a different pace from school-age children who can describe where they feel sore. We adjust language and handling so the appointment feels safe rather than clinical in a frightening way.",
        ],
      },
      {
        heading: "How appointments work",
        paragraphs: [
          "Visits begin with a parent-led discussion of concerns and history. Assessment and treatment use very gentle techniques suitable for infants through to older children. You stay present and involved; we check comfort continuously and adapt if your child becomes unsettled.",
          "Practical guidance you can use at home is part of every plan — simple handling, play positioning or activity ideas rather than complicated programmes that are hard to keep up. Follow-ups are scheduled only when useful, not by default package pressure.",
          "Parents sometimes arrive after unsettled periods, positional preferences, or musculoskeletal concerns flagged by another professional. We listen carefully, examine gently, and avoid overclaiming. Where evidence or scope is limited, we say so and help you find the right next professional.",
        ],
      },
      {
        heading: "What parents often ask before booking",
        paragraphs: [
          "You do not need a GP referral to book, though sharing relevant letters helps. Wear easy-movement clothes for your child and bring a familiar toy if that helps them relax. Feeding and nappy needs are accommodated with patience — say what timing works best when you book.",
          "Fees follow standard initial and follow-up osteopathy pricing unless otherwise stated. NHS staff and student discounts apply with valid ID. If examination suggests medical review is the priority, we will explain that clearly and support you to seek it.",
          "Older children with sports niggles may overlap with our sports rehab approach; teens lifting in the gym often need load advice as much as hands-on care. We involve them in decisions age-appropriately so they understand why rest or modified training matters.",
        ],
      },
      {
        heading: "Book paediatric care in SE18",
        paragraphs: [
          "Online booking and phone enquiries are welcome. If you are booking for a young infant, mention age when you reserve so we can allocate appropriate time and expectations. Vietnamese-speaking parents can request a Vietnamese consultation.",
          "Related services include cranial osteopathy for adults who prefer a gentle style, and pregnancy support for antenatal musculoskeletal care. For older teens with sports injuries, our sports rehab pathway may be more appropriate — ask when booking.",
          "Sibling bookings and school-run timing can be discussed when you call. The pharmacy setting means arrival is familiar for many local families already using St James for prescriptions or travel clinic services. Ask at the counter for the osteopathy room if you are unsure on the day.",
          "Many local families already know St James Pharmacy for prescriptions and travel vaccines, which makes bringing a child for osteopathy feel less unfamiliar. Mention any access or settling needs when you book so we can make the visit as calm as possible from the start.",
          "We never ask a child to be braver than they feel. Settling time, breaks, and parent-led soothing are part of good paediatric practice. An unfinished technique is better than a frightened child, and we can continue another day if needed.",
          "If another healthcare professional has suggested osteopathy, bring their note if you have one. Collaboration works best when everyone understands what has already been tried and what concerns remain unanswered.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will treatment hurt my child?",
        answer: "Paediatric techniques are very gentle. We stop or adapt if your child is uncomfortable and keep you involved throughout.",
      },
      {
        question: "Do parents stay in the room?",
        answer: "Yes. Parents stay present for paediatric appointments unless there is a specific agreed reason otherwise.",
      },
      {
        question: "What ages do you see?",
        answer: "We see infants through to older children, always adapting techniques and session pacing to age and comfort.",
      },
      {
        question: "Can osteopathy replace my paediatrician?",
        answer: "No. Osteopathy is musculoskeletal support alongside your child's medical care, not a replacement for GP or paediatric advice.",
      },
    ],
    relatedSlugs: [
      "cranial-therapy", "pregnancy-support", "sports-injury-rehab", "back-neck-pain",
    ],
    keywords: [
      "paediatric osteopath Woolwich", "baby osteopath SE18", "child osteopath Woolwich", "gentle osteopathy children London",
    ],
  },
  {
    slug: "home-visits",
    h1: "Home Visit Osteopath in Woolwich & SE London",
    seoTitle: "Home Visit Osteopath Woolwich | £120 Initial",
    metaDescription:
      "Home visit osteopath near Woolwich SE18. Initial visit £120 for 60 minutes; follow-up £100 for 30 minutes. Austin Duy Nguyen — when clinic travel is difficult.",
    heroLine:
      "Osteopathy at your address near Woolwich and nearby SE London when getting to Powis Street is hard — same GOsC standards, clear £120 / £100 home-visit fees.",
    eyebrow: "Home visit osteopath · Woolwich SE18",
    sections: [
      {
        heading: "When home-visit osteopathy helps",
        paragraphs: [
          "Home-visit osteopathy is for people who need musculoskeletal care but find travel to the clinic difficult — after injury, with limited mobility, during recovery, or when remaining at home simply works better for you or the person you care for. Treatment still follows the same GOsC-registered clinical standards as appointments inside St James Pharmacy on Powis Street.",
          "Austin Duy Nguyen brings assessment and hands-on treatment to suitable addresses local to Woolwich and nearby SE London. Coverage is confirmed before you book so travel time, access, and parking or entry notes are clear. If your address sits outside the practical visiting area, we will say so honestly and help you plan a clinic visit instead.",
          "Carers, older adults, and people recovering from flare-ups often choose home care because a clinic trip would cancel out the benefit of attending. Others prefer a familiar space when anxiety, fatigue, or childcare make leaving home impractical. The goal is the same either way: a thorough assessment and a treatment plan you can continue safely between visits.",
        ],
      },
      {
        heading: "Fees and what each visit includes",
        paragraphs: [
          "Initial home consultation and treatment is £120 for 60 minutes. That first visit includes history, examination, hands-on treatment where appropriate, and a clear explanation of findings and next steps. Follow-up home treatment is £100 for 30 minutes, focused on reviewing change, continuing care, and refining home advice.",
          "These fees reflect travel and the time required to set up a safe treatment space in your home. Optional clinic add-ons such as acupuncture or cupping are arranged only when clinically useful and agreed with you; availability may differ from in-clinic sessions. NHS staff and student discounts are discussed when you enquire so expectations stay clear before booking.",
          "Payment and cancellation follow the same clinic policy as other appointments. If you need to change a home visit, give as much notice as you can so the travel slot can be reused. We confirm the fee for your appointment type before treatment starts — no surprise extras.",
        ],
      },
      {
        heading: "How a home visit works",
        paragraphs: [
          "Before the day, we confirm your address, access notes, and any stairs, parking, or entry details that help arrival run smoothly. Please clear a flat space large enough for comfortable movement assessment and treatment — a firm bed, sturdy table arrangement we discuss in advance, or suitable floor space with padding as agreed. Wear comfortable clothing that allows easy movement.",
          "The clinical process mirrors a clinic appointment: detailed history, posture and movement testing, treatment selected for your presentation, and practical guidance you can use between sessions. Some people continue with further home visits; others return to the Woolwich clinic once travel becomes easier. We only recommend follow-up when it is clinically useful.",
          "If symptoms include red-flag features such as progressive weakness, unexplained weight loss, fever, or bladder or bowel changes, seek urgent medical care before or instead of routine musculoskeletal treatment. Home visits are for appropriate mechanical problems after serious causes have been considered.",
        ],
      },
      {
        heading: "Book a home visit near Woolwich SE18",
        paragraphs: [
          "Contact the clinic to confirm your address and arrange a home-visit slot. Online booking is geared toward clinic appointments inside St James Pharmacy; home visits are coordinated by phone, WhatsApp, or enquiry so travel logistics can be checked first. Vietnamese or English consultation is available.",
          "Related clinic services include back and neck pain care, sports injury rehab, and paediatric osteopathy if a family member needs gentle in-clinic support instead. Explore the fees page for the full price list, or book a standard clinic appointment if you can travel to Powis Street.",
          "Home care does not replace your GP or emergency services. It extends osteopathic access when the barrier is getting through the door — so assessment and treatment can still start without waiting until travel is easy again.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much is a home visit osteopath in Woolwich?",
        answer:
          "Initial home consultation and treatment is £120 for 60 minutes. Follow-up home treatment is £100 for 30 minutes. We confirm suitability and address coverage before booking.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "Home visits are local to Woolwich and nearby SE London — including Plumstead, Abbey Wood, Charlton and Greenwich where travel is practical. Contact us with your address first.",
      },
      {
        question: "Can I book a home visit online?",
        answer:
          "Home visits are arranged by phone, WhatsApp, or enquiry so we can check address, access, and travel time. Clinic appointments at St James Pharmacy can still be booked online.",
      },
      {
        question: "What should I prepare at home?",
        answer:
          "Clear a flat, comfortable space for assessment and treatment, wear easy-movement clothing, and share parking or entry notes in advance. We will confirm any setup needs when we schedule the visit.",
      },
      {
        question: "Can home visits be in Vietnamese?",
        answer:
          "Yes. Austin can consult in Vietnamese or English at your home so you can describe symptoms without a language barrier.",
      },
    ],
    relatedSlugs: [
      "back-neck-pain",
      "sports-injury-rehab",
      "paediatric-care",
      "cranial-therapy",
    ],
    keywords: [
      "osteopath home visit woolwich",
      "home visit osteopath Woolwich",
      "osteopath home visit SE18",
      "domiciliary osteopathy London",
      "mobile osteopath Woolwich",
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function getServiceWithPage(slug: string): {
  service: Service;
  page: ServicePageContent;
} | null {
  const service = services.find((item) => item.slug === slug);
  const page = getServicePage(slug);
  if (!service || !page) return null;
  return { service, page };
}

export function relatedServices(slugs: string[]) {
  return slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service))
    .map((service) => ({
      ...service,
      href: `/services/${service.slug}`,
    }));
}

/** Rough word count for body copy (sections only). */
export function servicePageWordCount(page: ServicePageContent) {
  const text = page.sections
    .flatMap((section) => [section.heading, ...section.paragraphs])
    .join(" ");
  return text.trim().split(/\s+/).length;
}
