/**
 * Handcrafted long-form bodies for the 9 remaining priority posts.
 * Merged over the generated expansions in blog.ts.
 */
import fs from "node:fs";

const priority = {
  "sciatica-woolwich-osteopath": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "Sciatica is not a single diagnosis — it is a pattern of nerve-related pain that travels from the lower back or buttock into the leg. People in Woolwich often notice it after long sits on the Elizabeth line, lifting at work, or weekends of DIY and sport.",
          "At Nguyen's Osteopathic Clinic we assess whether irritation is coming from the lumbar spine, the disc, the sacroiliac joint, or soft tissue around the nerve pathway — then treat the driver, not only the tingling calf.",
        ],
      },
      {
        heading: "What sciatica usually feels like",
        paragraphs: [
          "Patients describe sharp, burning, or electric pain into the buttock, hamstring, calf, or foot — sometimes with pins and needles or numbness. Coughing, sitting, or bending can spike symptoms. Others feel more of a deep ache that limits walking distance.",
          "Not every leg pain is true nerve-root sciatica. [Hip osteoarthritis](/conditions/hip-oa), [piriformis-related buttock pain](/conditions/piriformis-syndrome), and [sacroiliac joint irritation](/conditions/si-joint-dysfunction) can mimic parts of the pattern. That is why guessing from a Google image is a poor substitute for assessment.",
        ],
      },
      {
        heading: "Common sciatica triggers locally",
        paragraphs: [
          "South-east London lifestyles stack load on the lower back: standing shifts in retail and healthcare, driving toward the M25, and desk days with a wallet or phone in a back pocket.",
        ],
        bullets: [
          "Prolonged sitting with a rounded lower back",
          "Sudden bending or twisting while lifting",
          "Tight hips and glutes after running or gym work",
          "Recurring disc flare after a previous episode",
          "Weekend DIY after a sedentary desk week",
        ],
      },
      {
        heading: "How osteopathy approaches sciatica",
        image: {
          src: "/images/blog/lumbar-disc-pain-osteopath-woolwich.jpg",
          alt: "Person holding the lower back with disc-related lumbar pain",
        },
        paragraphs: [
          "Your first visit includes a case history, neurological screening where appropriate, and hands-on assessment of the spine, pelvis, and hips. Treatment may combine gentle mobilisation, soft-tissue work, and clear advice on positions that calm or aggravate symptoms.",
          "Many people improve with conservative care. Read our fuller clinical notes on [sciatica treatment in Woolwich](/conditions/sciatica) and [lumbar disc / radiculopathy](/conditions/lumbar-disc-radiculopathy) if you want condition-level detail before you book.",
          "If findings suggest imaging, GP review, or urgent pathways — progressive weakness, saddle numbness, or bladder change — we say so plainly and help you act quickly.",
        ],
      },
      {
        heading: "What to do this week while you wait",
        level: 3,
        paragraphs: [
          "Avoid marathon bed rest. Short walks, frequent position changes, and heat for muscle guarding help many flares. Skip aggressive toe-touch stretches that recreate sharp leg pain.",
          "Sleep with a pillow between the knees if side-lying, or under the knees if on your back, when that reduces tension. Keep commuting loads lighter where you can — backpacks beat twisting with a heavy tote.",
        ],
      },
      {
        heading: "Recovery timelines",
        paragraphs: [
          "Many acute sciatic flares ease over two to six weeks with sensible load and targeted care. Stubborn or recurrent patterns may need six to twelve weeks. Leg symptoms often lag behind back comfort — that is common, not a failure of treatment.",
          "We measure walking tolerance, sitting minutes, and work capacity. An old MRI that still shows a bulge does not automatically mean you cannot improve.",
        ],
      },
      {
        heading: "When to book sooner",
        paragraphs: [
          "Do not wait months if pain is stopping sleep, work, or walking. Early assessment often shortens recovery and reduces fear around movement. You do not need a GP referral to see Austin Duy Nguyen at St James Pharmacy, Powis Street.",
        ],
      },
    ],
    cta: "If leg pain is limiting walking or sleep, start with our sciatica condition guide — or book an assessment when you want hands-on care.",
    ctaHref: "/conditions/sciatica",
    ctaLabel: "Read sciatica condition guide",
  },

  "desk-neck-and-shoulder-pain": {
    updated: "2026-10-15",
    readingMinutes: 9,
    sections: [
      {
        paragraphs: [
          "Hybrid and office work around Woolwich often means hours at a laptop. The neck and upper shoulders take the load when the screen sits too low, the chair is too soft, or you hold tension through deadlines.",
          "Patients often describe a heavy, aching neck, tight shoulders, or headaches that build through the afternoon. Osteopathy can release irritable soft tissue, improve joint mobility, and show you a few movement resets that fit a working day.",
        ],
      },
      {
        heading: "Why desk setups create neck pain",
        paragraphs: [
          "Looking down at a laptop closes the upper cervical joints and asks the upper trapezius and levator scapulae to hold a static load for hours. Add phone shoulder-clenching on calls and the mid-back stiffens behind the shoulder blades.",
          "Nail technicians, drivers, and hybrid workers in SE18 share versions of the same pattern. Our [neck pain condition page](/conditions/neck-pain) explains the clinical picture; this article focuses on what you can change at the desk and what hands-on care adds.",
        ],
      },
      {
        heading: "Quick desk checks",
        paragraphs: [
          "Small setup changes reduce how often tissues are re-irritated between sessions.",
        ],
        bullets: [
          "Screen top near eye level (laptop on a stand plus separate keyboard when possible)",
          "Elbows supported close to your sides",
          "Feet flat, hips slightly above knees if possible",
          "Stand or walk for 1–2 minutes each half hour",
          "Keep the phone off your shoulder — headset or speaker helps",
        ],
      },
      {
        heading: "How osteopathy helps desk-related pain",
        image: {
          src: "/images/blog/tension-headaches-neck-osteopath-woolwich.jpg",
          alt: "Person experiencing neck tension related to desk work and headaches",
        },
        paragraphs: [
          "Assessment covers cervical and thoracic mobility, shoulder contribution, and nerve irritability when arm symptoms are present. Treatment may include gentle mobilisation and soft-tissue work, never forced into sharp pain.",
          "If headaches are part of your picture, see also [tension headaches and neck pain](/blog/tension-headaches-neck-osteopath-woolwich) and [cervicogenic headache](/conditions/cervicogenic-headache). Arm pins and needles may overlap with [cervical radiculopathy](/conditions/cervical-radiculopathy) — we screen rather than assume it is only tight muscles.",
        ],
      },
      {
        heading: "Micro-breaks that fit a real workday",
        level: 3,
        paragraphs: [
          "You do not need a gym session every hour. Chin tucks done gently, shoulder blade slides, and a short corridor walk between meetings often matter more than a heroic evening stretch you skip when tired.",
          "If pain spikes with overhead reaching or night pain lying on the shoulder, mention that — it can shift the plan toward shoulder tendon care rather than posture coaching alone.",
        ],
      },
      {
        heading: "When to seek further help",
        paragraphs: [
          "Progressive arm weakness, unremitting night pain, trauma, or systemic symptoms need medical review. For the common desk-driven ache that keeps returning every Sunday evening, an osteopathic assessment is a practical next step without a GP referral.",
        ],
      },
    ],
    cta: "Book a neck and shoulder assessment, or read the neck pain guide first if you want the clinical overview.",
    ctaHref: "/conditions/neck-pain",
    ctaLabel: "View neck pain guide",
  },

  "focused-shockwave-therapy-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "Focused shockwave therapy (LI-ESWT) is a non-invasive option for persistent soft-tissue and tendon problems that have not settled with rest or standard hands-on care alone. At our Woolwich clinic it is delivered as a clinical protocol, not a spa add-on.",
          "Sound waves are directed to the target tissue to support healing responses and pain modulation. Sessions are typically around 30 minutes, with a clear plan discussed first.",
        ],
      },
      {
        heading: "Who focused shockwave is for",
        paragraphs: [
          "It is commonly considered for stubborn plantar heel pain, Achilles tendinopathy, patellar tendon pain, tennis elbow, and selected calcific or chronic tendon presentations after clinical screening.",
          "Explore related guides on [plantar fasciitis](/conditions/plantar-fasciitis), [tennis elbow](/conditions/tennis-elbow), and [Achilles tendinopathy](/conditions/achilles-tendinopathy) if those match your symptoms. Men's health protocols using LI-ESWT are discussed separately and discreetly on our [men's health page](/services/mens-health-ed).",
        ],
      },
      {
        heading: "What a session involves",
        image: {
          src: "/images/blog/plantar-fasciitis-shockwave-woolwich.jpg",
          alt: "Clinical focused shockwave therapy context for heel and tendon pain",
        },
        paragraphs: [
          "After assessment confirms suitability, gel is applied and the focused handpiece delivers energy to the target zone. Most people feel a deep tapping or pressure; intensity is adjusted for tolerance. You can usually walk out and continue daily activities with simple aftercare advice.",
          "Shockwave works best as part of a plan that still includes load management and progressive strengthening. It is not a substitute for ignoring training errors or footwear problems.",
        ],
      },
      {
        heading: "How many sessions are typical?",
        level: 3,
        paragraphs: [
          "Plans are individual. Many tendon protocols involve a short course rather than a single visit, reviewed against symptom and function change. Fees are listed on our [fees page](/fees) so you can budget before starting.",
          "If shockwave is not suitable — certain medical conditions, pregnancy, or local contraindications — we say so and offer alternatives rather than selling a course you do not need.",
        ],
      },
      {
        heading: "How it pairs with osteopathy",
        paragraphs: [
          "Hands-on osteopathy addresses joint and soft-tissue drivers around the tendon. Shockwave targets local tendon irritability. Together they often cover both the painful spot and the movement pattern that keeps reloading it — which is why combined plans are common for stubborn heel and elbow presentations in Woolwich.",
        ],
      },
      {
        heading: "Next steps",
        paragraphs: [
          "If rest, gels, and generic stretches have stalled, book an assessment to see whether focused shockwave belongs in your plan. Bring a short history of what you have already tried so we do not repeat dead ends.",
        ],
      },
    ],
    cta: "Read the shockwave service guide, or book if you already know you want a clinical assessment.",
    ctaHref: "/services/focused-shockwave",
    ctaLabel: "View shockwave therapy guide",
  },

  "osteopath-woolwich-what-to-expect": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "If you have been searching for an osteopath in Woolwich, you are usually looking for two things: clear answers about pain that will not settle, and a practitioner you can trust. At Nguyen's Osteopathic Clinic, care is provided by Austin Duy Nguyen, a GOsC-registered osteopath (Reg. No. 12332), inside St James Pharmacy on Powis Street.",
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
          "Focused shockwave and discreet men's health protocols where clinically appropriate",
        ],
      },
      {
        heading: "Your first appointment (about 60 minutes)",
        image: {
          src: "/images/blog/first-osteopathy-visit-checklist-woolwich.jpg",
          alt: "Checklist-style preparation for a first osteopathy appointment",
        },
        paragraphs: [
          "We start with a case history: when symptoms began, what aggravates them, your work or sport, and what you want to get back to. Next comes a movement and hands-on examination. Findings are explained in plain English before treatment begins, where appropriate.",
          "Wear comfortable clothing that lets you move easily. Bring any recent scan reports or letters if you have them — useful, but not required. You do not need a GP referral to book. For a printable-style list, see our [first visit checklist](/blog/first-osteopathy-visit-checklist-woolwich).",
        ],
      },
      {
        heading: "What treatment may include",
        level: 3,
        paragraphs: [
          "Depending on your presentation, care may involve soft-tissue techniques, joint mobilisation, and graded movement advice. Some patients also discuss acupuncture, cupping, or focused shockwave when clinically suitable — always with rationale and fees explained first on our [fees page](/fees).",
          "You should feel involved in decisions. If something is uncomfortable, say so; techniques are adapted to your comfort and medical history.",
        ],
      },
      {
        heading: "Where to find us",
        paragraphs: [
          "The clinic is inside St James Pharmacy, Powis Street, Woolwich SE18 6LQ. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room. Pharmacy hours are Monday–Friday 9:00am–6:00pm and Saturday 9:00am–5:30pm. Online booking details and clinic hours for osteopathy are on our [find us](/find-us) and [book](/book) pages.",
          "Parking, bus links, and nearby DLR/rail options are covered in local guides across the blog if you are travelling from Greenwich, Charlton, or Thamesmead.",
        ],
      },
      {
        heading: "After your visit",
        paragraphs: [
          "Mild ache after hands-on treatment can occur as tissues settle — similar to starting a new exercise. Clear aftercare is given before you leave. If anything unexpected appears, call the clinic rather than worrying overnight.",
        ],
      },
    ],
    cta: "Book your first visit online, or read the new-patient guide if you want more preparation detail.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  },

  "first-osteopathy-visit-checklist-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "A simple checklist for your first osteopathy appointment in Woolwich — clothing, questions, medical letters, and how long it takes.",
          "First visits at Nguyen's Osteopathic Clinic usually last about 60 minutes: history, assessment, explanation, and treatment where appropriate. No GP referral is required.",
        ],
      },
      {
        heading: "Bring if you have them",
        paragraphs: [
          "You do not need a perfect folder of paperwork. A few items save time and sharpen clinical decisions.",
        ],
        bullets: [
          "List of medications and key medical history",
          "Recent scan or clinic letters (optional but useful)",
          "Comfortable clothing you can move in",
          "NHS or student ID if claiming the 10% discount",
          "A short note of goals — sleep, lifting, running, childcare, work shifts",
        ],
      },
      {
        heading: "Questions worth asking",
        level: 3,
        paragraphs: [
          "Good questions unlock clearer plans: What is the likely driver? What should I modify this week? How will we know I am improving? When would imaging or a GP review be useful?",
          "Read [what to expect at your first visit](/blog/osteopath-woolwich-what-to-expect) for the fuller narrative, and skim [fees](/fees) so cost is not a surprise mid-conversation.",
        ],
      },
      {
        heading: "What happens in the room",
        image: {
          src: "/images/blog/osteopath-woolwich-what-to-expect.jpg",
          alt: "Osteopathy consultation setting for a first visit in Woolwich",
        },
        paragraphs: [
          "After history and examination, Austin explains findings before hands-on care. Treatment is matched to irritability. You can decline any technique you are uncomfortable with — consent is ongoing, not a one-time signature.",
          "If your pain picture overlaps a specific condition, we may point you to guides such as [back pain in Woolwich](/blog/back-pain-woolwich-osteopathy) or relevant [condition pages](/conditions) for later reading — never as homework that replaces care.",
        ],
      },
      {
        heading: "Practical arrival tips",
        paragraphs: [
          "Arrive a few minutes early and check in at St James Pharmacy on Powis Street. Bring water if you like. Avoid arriving straight from a maximal gym session if you can — it can temporarily change how tissues feel on examination.",
          "Booking is online via [/book](/book), or call if you need help choosing an appointment type.",
        ],
      },
    ],
    cta: "Use this checklist, then book your first assessment when ready.",
    ctaHref: "/book",
    ctaLabel: "Book your first visit",
  },

  "plantar-fasciitis-shockwave-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "First-step heel pain that makes morning kitchen trips miserable is often plantar fasciitis — overload of the plantar fascia under soft-tissue and calf tension. Standing shifts, hard floors, and sudden walking volume are common Woolwich triggers.",
          "At Nguyen's Osteopathic Clinic we combine load advice, hands-on care, and focused shockwave when clinically suitable for stubborn cases.",
        ],
      },
      {
        heading: "Typical symptoms",
        paragraphs: [
          "Sharp heel pain with the first steps of the day, tenderness under the inner heel, and stiffness after sitting that eases then returns on long stands are classic. See our [plantar fasciitis condition page](/conditions/plantar-fasciitis) for the fuller clinical outline.",
        ],
        bullets: [
          "First-step morning heel pain",
          "Ache after retail or hospitality standing shifts",
          "Pain that eases mid-walk then returns later",
          "Tight calves accompanying the heel",
        ],
      },
      {
        heading: "Why rest alone often fails",
        level: 3,
        paragraphs: [
          "The plantar fascia needs progressive capacity, not endless unloading. Complete rest followed by a sudden return to 10,000 steps usually restarts the cycle. Footwear that folds like paper under the forefoot also keeps reloading the fascia.",
        ],
      },
      {
        heading: "How osteopathy and shockwave help",
        image: {
          src: "/images/blog/achilles-tendinopathy-shockwave-woolwich.jpg",
          alt: "Lower leg and foot region relevant to heel and Achilles load issues",
        },
        paragraphs: [
          "Assessment covers foot, calf, and kinetic-chain loading from hip to toes. Hands-on treatment addresses soft tissue and joint contributors. Progressive loading rebuilds tolerance.",
          "For persistent cases, [focused shockwave](/services/focused-shockwave) may be appropriate after screening. It is not automatic for every heel — suitability and fees are discussed first. Related reading: [Achilles tendinopathy](/conditions/achilles-tendinopathy) when morning stiffness sits higher in the tendon.",
        ],
      },
      {
        heading: "What you can change this week",
        paragraphs: [
          "Swap unsupportive flats for a firmer-soled option at home if barefoot first steps are brutal. Reduce hill volume temporarily. Calf loading exercises — dosed properly — beat aggressive fascia rolling for most people.",
          "If night pain and whole-foot swelling dominate, seek medical review to exclude other causes before assuming plantar fasciitis.",
        ],
      },
    ],
    cta: "Explore the heel pain condition guide, or book if first-step pain has lasted weeks.",
    ctaHref: "/conditions/plantar-fasciitis",
    ctaLabel: "View plantar fasciitis guide",
  },

  "tennis-elbow-shockwave-osteopath-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 9,
    sections: [
      {
        paragraphs: [
          "Tennis elbow is lateral elbow tendon pain from gripping, lifting, mouse use, and tools — not only racket sports. Trades, desk workers, and DIY spikes are frequent Woolwich presentations.",
          "Osteopathy addresses forearm and shoulder drivers; focused shockwave can help stubborn tendon pain after screening.",
        ],
      },
      {
        heading: "Symptoms and lookalikes",
        paragraphs: [
          "Pain on the outer elbow with gripping, tenderness over the lateral epicondyle, and ache lifting a kettle are typical. Neck referral and [radial tunnel](/conditions/tennis-elbow) overlap can confuse the picture — we assess rather than chase the label alone. Full notes live on our [tennis elbow condition page](/conditions/tennis-elbow).",
        ],
      },
      {
        heading: "Why braces and rest are not enough",
        level: 3,
        paragraphs: [
          "Counterforce braces can help during tasks short term. Complete rest without progressive tendon loading often leaves the tendon under-prepared for the next toolkit weekend. Shoulder and scapular sharing of load matters more than people expect.",
        ],
      },
      {
        heading: "Treatment options we discuss",
        image: {
          src: "/images/blog/golfers-elbow-osteopath-woolwich.jpg",
          alt: "Elbow and forearm strain relevant to gripping and tendon overload",
        },
        paragraphs: [
          "Hands-on care calms irritable soft tissue and related joints. Progressive loading rebuilds capacity. [Focused shockwave](/services/focused-shockwave) is considered for persistent tendinopathy when appropriate — see also [medial elbow / golfer's elbow](/conditions/medial-epicondylalgia) if your pain is on the inner side.",
          "Fees for shockwave and osteopathy are listed on [/fees](/fees). We will not start a course without explaining expected session numbers and review points.",
        ],
      },
      {
        heading: "Practical task tweaks",
        paragraphs: [
          "Two-hand lifts, thicker grips, and paced DIY reduce peak tendon load. Mouse-heavy workers benefit from forearm support and micro-breaks more than from buying five gadgets.",
        ],
      },
    ],
    cta: "Read the tennis elbow guide, or book an assessment if gripping pain is limiting work.",
    ctaHref: "/conditions/tennis-elbow",
    ctaLabel: "View tennis elbow guide",
  },

  "shoulder-pain-frozen-shoulder-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "Shoulder pain in Woolwich ranges from desk-related aches to true frozen shoulder (adhesive capsulitis) with progressive loss of reach and rotation. Night pain when lying on the side is a common reason people finally book.",
          "Osteopathy helps by matching care to the stage — calming irritability early, then restoring motion and strength as tissue allows.",
        ],
      },
      {
        heading: "Is it frozen shoulder or something else?",
        paragraphs: [
          "Frozen shoulder typically brings global stiffness through elevation and rotation over weeks to months, sometimes after minor trauma or immobilisation, and more often in people with diabetes. [Subacromial pain](/conditions/subacromial-pain) and [rotator cuff](/conditions/rotator-cuff-tear) problems can look similar at first — assessment separates them.",
          "See our [frozen shoulder condition page](/conditions/frozen-shoulder) for stage-based expectations measured in months, not days.",
        ],
      },
      {
        heading: "What we do in clinic",
        image: {
          src: "/images/blog/gym-shoulder-injury-osteopath-woolwich.jpg",
          alt: "Shoulder mobility and gym-related shoulder strain context",
        },
        paragraphs: [
          "We examine range, strength, neck contribution, and irritability. Hands-on care stays within comfortable ranges — forcing a frozen shoulder aggressively often backfires. Home mobility is dosed to stage.",
          "Neck-driven shoulder blade pain may need cervical care too; see [desk neck and shoulder pain](/blog/desk-neck-and-shoulder-pain) if screens are a big part of your week.",
        ],
      },
      {
        heading: "Recovery expectations",
        level: 3,
        paragraphs: [
          "Simple mechanical shoulder pain may improve over weeks. Frozen shoulder often spans many months naturally; good care reduces disability along the way. We discuss medical options when appropriate rather than promising overnight thaw.",
        ],
      },
      {
        heading: "When to seek urgent review",
        paragraphs: [
          "Trauma with sudden loss of power, suspected dislocation, or red-flag neurological signs need medical assessment. Otherwise a skilled clinical exam is often the right first step — and we will tell you if scans would change care.",
        ],
      },
    ],
    cta: "Compare your symptoms with the frozen shoulder guide, or book if night pain and stiffness are rising.",
    ctaHref: "/conditions/frozen-shoulder",
    ctaLabel: "View frozen shoulder guide",
  },

  "lumbar-disc-pain-osteopath-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 10,
    sections: [
      {
        paragraphs: [
          "A “slipped disc” is usually a bulging or irritated disc that sensitises nearby nerves. Pain may stay in the back or travel into the buttock and leg. Desk work, lifting, and long Elizabeth line sits are common local triggers.",
          "At Nguyen's Osteopathic Clinic inside St James Pharmacy, we assess movement, nerve irritability, and pelvic mechanics before treating. Hands-on care aims to ease protective muscle spasm and restore confident motion — not to “push a disc back in”.",
        ],
      },
      {
        heading: "How disc-related pain behaves",
        paragraphs: [
          "Flexion-heavy sitting and lifting often aggravate irritable discs. Some people get more leg symptoms than back pain. Morning stiffness and sit-to-stand catches are common. Pair this article with [sciatica in Woolwich](/blog/sciatica-woolwich-osteopath) and the [lumbar disc condition page](/conditions/lumbar-disc-radiculopathy) if nerve symptoms dominate.",
        ],
      },
      {
        heading: "When to seek urgent care first",
        paragraphs: [
          "Cauda equina warning signs are not wait-and-see problems.",
        ],
        bullets: [
          "Saddle numbness or bladder/bowel change",
          "Progressive leg weakness",
          "Fever with severe back pain after infection risk",
        ],
      },
      {
        heading: "What conservative care looks like",
        image: {
          src: "/images/blog/sciatica-woolwich-osteopath.jpg",
          alt: "Sciatic-type leg pain related to lumbar nerve irritation",
        },
        paragraphs: [
          "If red flags are absent, osteopathy plus graded activity is often appropriate. We explain findings plainly, guide sitting and lifting modifications, and progress walking before heroic gym returns.",
          "Most disc-related patterns improve over six to twelve weeks with conservative care. Surgery is for selected severe or progressive cases — not the default after one bad weekend.",
        ],
      },
      {
        heading: "Myths that slow recovery",
        level: 3,
        paragraphs: [
          "You do not need to avoid bending forever. Temporary modification then graded return is the goal. An MRI findings list without a clinical story can increase fear more than it improves outcomes — we interpret imaging in context when you already have it.",
        ],
      },
      {
        heading: "Next step in Woolwich",
        paragraphs: [
          "If disc-type pain is limiting work or sleep, book an assessment. Bring any existing scan reports; they help conversation even when they are not required to start care. Related reading: [non-specific low back pain](/conditions/non-specific-low-back-pain) when nerve signs are absent.",
        ],
      },
    ],
    cta: "Read the lumbar disc condition guide, or book online for a hands-on assessment.",
    ctaHref: "/conditions/lumbar-disc-radiculopathy",
    ctaLabel: "View lumbar disc guide",
  },
};

fs.writeFileSync(
  "src/lib/blog-expanded-priority.ts",
  `import type { ExpandedBlogBody } from "@/lib/blog-expanded-bodies";\n\nexport const blogExpandedPriority: Record<string, ExpandedBlogBody> = ${JSON.stringify(priority, null, 2)};\n`,
);

// word counts
for (const [slug, body] of Object.entries(priority)) {
  const w = JSON.stringify(body.sections).split(/\s+/).length;
  console.log(slug, w);
}