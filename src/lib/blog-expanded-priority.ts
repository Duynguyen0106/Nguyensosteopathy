import type { ExpandedBlogBody } from "@/lib/blog-expanded-bodies";

/**
 * Handcrafted long-form bodies for the highest-priority posts.
 * These override blog-expanded-bodies.ts via withExpansion().
 */
export const blogExpandedPriority: Record<string, ExpandedBlogBody> = {
  "nail-technician-neck-wrist-pain-osteopath": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Nail technicians often work with eyes down, shoulders rolled forward, and wrists locked in fine movements for hours. Over months, the neck, upper back, thumbs, and forearms pay the price — especially on busy Woolwich and SE London salon days with back-to-back clients and little recovery between appointments.",
          "At Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street, we assess posture, soft tissue, and joint mobility, then treat what is irritable while giving practical salon setup and break advice you can actually use between clients. You do not need a GP referral to book.",
        ],
      },
      {
        heading: "Why salon work loads the neck and wrists",
        paragraphs: [
          "Filing, buffing, and detailed nail art keep the wrists in sustained extension or ulnar deviation while the thumb and finger flexors fire continuously. Looking down at a hand for 45–60 minutes per client lengthens the upper traps and shortens the deep neck flexors — a classic desk-like posture, but without a desk you can raise.",
          "Standing all day on hard salon floors adds fatigue through the hips and lower back, so the shoulders creep forward even more by late afternoon. Many technicians also grip tools harder when the schedule runs late. That grip force travels straight into the forearms and can irritate pathways that feel like [carpal tunnel](/conditions/carpal-tunnel), [tennis elbow](/conditions/tennis-elbow), or [neck-driven arm pain](/conditions/neck-pain).",
          "The goal is not to abandon your craft. It is to reduce peak load per client, give tissues short recovery windows, and restore mobility so the same shift feels less punishing by Friday.",
        ],
      },
      {
        heading: "Salon workstation setup that actually helps",
        paragraphs: [
          "Raise the client’s hand toward you instead of folding yourself down to the table. A small cushion or adjustable armrest under their forearm often cuts neck flexion more than any stretch. Keep tools within an easy reach zone so you are not reaching across the table with a rounded upper back.",
          "Chair height matters: hips roughly level with or slightly above the knees, feet flat, and the table close enough that elbows stay near your sides. If you share a station, mark your preferred chair and lamp height with tape — resetting from a colleague’s setup is a common flare trigger on Monday mornings.",
        ],
        bullets: [
          "Client hand supported; your elbows close to your ribs",
          "Lamp aimed at the nail, not forcing you to lean into shadow",
          "Alternate which side of the table you sit on across the day when the station allows",
          "Swap grip-heavy tools for lighter files when detailing allows",
        ],
      },
      {
        heading: "Micro-breaks between clients (60–90 seconds)",
        paragraphs: [
          "You rarely get a full break, but you do get the walk to the till, the wipe-down, or the wait for polish to set. Use those gaps as micro-breaks rather than scrolling with the same forward-head posture.",
          "Every two to three clients: stand tall, roll the shoulders open, and look at something at eye level across the room for 20 seconds. Open and close the fists 10 times, then gently shake the hands out. That simple reset reduces the “locked” forearm feeling many technicians notice by mid-shift.",
        ],
      },
      {
        heading: "Two self-care drills you can do at the station",
        level: 3,
        paragraphs: [
          "Wrist extensor stretch: elbow straight, palm facing down, gently pull the hand toward you with the other hand until you feel a mild stretch along the top of the forearm. Hold 20–30 seconds each side, twice between busy blocks. Stop if you get sharp nerve-like tingling into the fingers.",
          "Chin-nod neck reset: sit tall, imagine a string lifting the crown of your head, then make a tiny “yes” nod that lengthens the back of the neck without tipping the head back. Do 5 slow nods, then turn gently left and right within a comfortable range. Pair this with the [neck pain guide](/conditions/neck-pain) if symptoms spread into the shoulder blade.",
        ],
      },
      {
        heading: "How osteopathy helps salon workers",
        image: {
          src: "/images/blog/rsi-wrist-forearm-office-osteopath.jpg",
          alt: "Forearm and wrist strain from repetitive fine motor work",
        },
        paragraphs: [
          "Assessment covers the cervical spine, thoracic posture, shoulder girdle, elbows, and wrists — plus how your grip and standing stamina fit the week’s bookings. Treatment may include gentle joint mobilisation, soft-tissue work to the forearm flexors/extensors and upper trapezius, and clear pacing advice for double-booked days.",
          "If symptoms suggest true nerve entrapment or need medical review, we say so plainly. Many technicians improve when we combine hands-on care with workstation tweaks rather than rest alone — complete time off is rarely realistic when the salon diary is full.",
        ],
      },
      {
        heading: "When to book rather than push through",
        paragraphs: [
          "Book sooner if night pain, thumb weakness, or pins and needles into the fingers are waking you, or if neck pain is spreading into headaches after every shift. Early assessment often shortens recovery and protects your livelihood.",
          "Wear clothes you can move in, and bring a short note of which services flare you most (acrylics, gel removal, long sets). Online booking is on our [book page](/book); fees and NHS/student discount details are listed separately.",
        ],
      },
    ],
    cta: "Compare your symptoms with our neck pain guide, then book if salon days are still ending in ache or numbness.",
    ctaHref: "/conditions/neck-pain",
    ctaLabel: "Read the neck pain guide",
  },

  "restaurant-kitchen-back-pain-osteopath-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Hospitality work combines hard floors, heavy lifts, heat, and hurry. Hips, knees, and lower backs take the hit — especially on long Woolwich and Greenwich kitchen shifts where the pass never slows and “just one more cover” becomes another two hours on your feet.",
          "At Nguyen's Osteopathic Clinic we see chefs, KP staff, and front-of-house teams with the same pattern: a stiff, aching low back that flares when lifting stock, twisting to the pass, or standing through a double. Care focuses on calming irritability, restoring hip and spinal mobility, and building lift habits that survive a real service.",
        ],
      },
      {
        heading: "What kitchen load does to the back",
        paragraphs: [
          "Repeated flexion under load — boxes from the walk-in, pans from low shelves, bins to the yard — asks a lot of the lumbar discs and muscles that stabilise them. Add wet floors, awkward reaches over the pass, and a hot environment that keeps you slightly dehydrated, and tissues have less recovery between rushes.",
          "Many kitchen workers also live in a slight forward-lean all shift so they can see tickets and plates. That posture shortens the hip flexors and makes standing upright at the end of the night feel like work. Our [non-specific low back pain](/conditions/non-specific-low-back-pain) and [sciatica](/conditions/sciatica) guides cover clinical patterns; this article is about surviving the kitchen week.",
          "You do not need to leave hospitality to get better. Small changes to how you lift, stand, and recover between services often matter more than a heroic rest day you cannot take.",
        ],
      },
      {
        heading: "Safer lifting when the pass is slamming",
        paragraphs: [
          "Hip-hinge, not round-and-yank: keep the load close, soft knees, and think “push the floor away” with your legs rather than yanking with your back. For stock runs, make two lighter trips when the diary allows — ego lifts are a classic Monday flare.",
          "Ask for a team lift on anything awkward or above chest height. Twist with your feet, not your spine, when turning from prep bench to pass. If you must turn with a load, step around rather than rotating through a bent lumbar spine.",
        ],
        bullets: [
          "Load close to the body; avoid reaching into deep shelves while bent",
          "Face what you are lifting — rearrange feet before you rotate",
          "Use a step stool for high shelves instead of overreaching",
          "Swap sides when carrying trays so one hip does not take every service",
        ],
      },
      {
        heading: "Foot care and standing stamina",
        paragraphs: [
          "Hard kitchen floors punish feet and rebound into the knees and low back. Rotate into supportive shoes with a firmer midsole when your rota allows, and change socks mid-double if they are soaked. A small anti-fatigue mat at plating stations helps when the manager permits it.",
          "If first-step heel pain is joining the back ache, read our [plantar fasciitis guide](/conditions/plantar-fasciitis) — standing trades often stack both problems. Quick pivots on wet tiles can also stir [knee pain from standing and pivoting](/conditions/knee-oa).",
        ],
      },
      {
        heading: "Two drills for between services",
        level: 3,
        paragraphs: [
          "Hip-flexor opener (after a double): kneel on one knee (pad under the knee), gently tuck the pelvis under, and shift forward until you feel a mild stretch at the front of the hip — not a sharp lumbar pinch. Hold 20–30 seconds each side. This undoes the “chef lean” many people sleep with.",
          "Standing back extension snack: hands on the belt line, gently lean back 5–8 times within comfort after a heavy lift block. Stop if leg pain or pins and needles appear — that needs assessment, not more stretching. Pair with short walk breaks when tickets allow.",
        ],
      },
      {
        heading: "Shift recovery that fits hospitality life",
        image: {
          src: "/images/blog/back-pain-woolwich-osteopathy.jpg",
          alt: "Lower back pain after physical work and lifting",
        },
        paragraphs: [
          "After service: hydrate, eat something with protein and carbs, and avoid collapsing into a deep sofa curl for three hours if your back is irritable — a short walk home or a warm shower often settles tissues better. Sleep on your side with a pillow between the knees if that reduces ache.",
          "Osteopathy here may include soft-tissue work, gentle mobilisation, and a clear plan for the next rota. We will not pretend you can take two weeks off; we design around doubles, late finishes, and the reality of kitchen culture.",
        ],
      },
      {
        heading: "When to get assessed",
        paragraphs: [
          "Book if pain is stopping sleep, if leg symptoms are travelling below the knee, or if you are compensating so hard that the other side of your back is now angry too. You do not need a GP referral to see Austin Duy Nguyen at St James Pharmacy, Powis Street.",
        ],
      },
    ],
    cta: "If kitchen shifts are wrecking your lower back, start with our low back pain guide — or book an assessment before the next double.",
    ctaHref: "/conditions/non-specific-low-back-pain",
    ctaLabel: "Read the low back pain guide",
  },

  "desk-neck-and-shoulder-pain": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Hybrid and office work around Woolwich often means hours at a laptop. The neck and upper shoulders take the load when the screen sits too low, the chair is too soft, or you hold tension through deadlines and back-to-back calls.",
          "Patients describe a heavy aching neck, tight shoulders, or headaches that build through the afternoon. Osteopathy can release irritable soft tissue, improve joint mobility, and show you movement snacks that fit a real SE18 workday — not a wellness retreat.",
        ],
      },
      {
        heading: "Why desk setups create neck pain",
        paragraphs: [
          "Looking down at a laptop closes the upper cervical joints and asks the upper trapezius and levator scapulae to hold a static load for hours. Add phone-shoulder clenching on calls and the mid-back stiffens behind the shoulder blades — a common driver of [neck pain treatment in Woolwich](/conditions/neck-pain).",
          "Long sits also load the lumbar discs and hip flexors, so [lower back pain from prolonged sitting](/conditions/non-specific-low-back-pain) often arrives with the neck ache. The mid-back is where [upper-back postural strain](/conditions/thoracic-joint-dysfunction) shows up when the thoracic spine stops rotating freely. Home-sofa laptop days and café sessions are often worse than a decent office monitor — below is what you can change before and between appointments.",
        ],
      },
      {
        heading: "Desk and screen setup in five checks",
        paragraphs: [
          "Raise the screen so the top sits near eye level — a laptop stand plus separate keyboard and mouse beats craning down at a trackpad. Elbows stay close to your sides; feet flat; hips slightly above the knees if your chair allows.",
          "Put the secondary monitor (or the one you use most) straight ahead so you are not living in a constant twist. Keep the phone off your shoulder — headset or speaker saves more necks than any massage gun.",
        ],
        bullets: [
          "Screen top near eye level",
          "Elbows supported, shoulders soft",
          "Feet flat; avoid perched tiptoe sitting",
          "Mouse within easy reach — no outstretched arm",
          "Stand or walk 1–2 minutes each half hour when meetings allow",
        ],
      },
      {
        heading: "Movement snacks that fit Zoom days",
        paragraphs: [
          "You do not need a gym session every hour. Set a soft reminder every 30–45 minutes: stand, roll the shoulders open, and look at something far away for 20 seconds to reset focus and neck posture.",
          "If headaches are part of your picture, also read [tension headaches and neck pain](/blog/tension-headaches-neck-osteopath-woolwich) and [cervicogenic headache](/conditions/cervicogenic-headache).",
        ],
      },
      {
        heading: "Two exercises for desk workers",
        level: 3,
        paragraphs: [
          "Chin tuck (gentle): sit tall, slide your chin straight back as if making a double chin — feel length at the base of the skull. Hold 5 seconds, repeat 5–8 times. Avoid tipping the head back or forcing into dizziness.",
          "Shoulder-blade slide: sit or stand, gently draw the shoulder blades down and slightly together without puffing the chest. Hold 5 seconds, repeat 8–10 times. This counters the “rounded desk” posture without aggressive stretching.",
        ],
      },
      {
        heading: "How osteopathy helps",
        image: {
          src: "/images/blog/tension-headaches-neck-osteopath-woolwich.jpg",
          alt: "Person experiencing neck tension related to desk work and headaches",
        },
        paragraphs: [
          "Assessment covers cervical and thoracic mobility, shoulder contribution, and nerve irritability when arm symptoms are present. Treatment may include gentle mobilisation and soft-tissue work, never forced into sharp pain.",
          "Arm pins and needles may overlap with [cervical radiculopathy](/conditions/cervical-radiculopathy) — we screen rather than assume it is only tight muscles. If night pain or overhead reaching dominate, the plan may shift toward shoulder tendon care.",
        ],
      },
      {
        heading: "When to book",
        paragraphs: [
          "Progressive arm weakness, unremitting night pain, trauma, or systemic symptoms need medical review. For the common desk-driven ache that returns every Sunday evening, an osteopathic assessment at St James Pharmacy, Powis Street is a practical next step without a GP referral.",
        ],
      },
    ],
    cta: "If afternoon headaches are joining your desk neck ache, read our tension headache article next — or book when you want hands-on care.",
    ctaHref: "/blog/tension-headaches-neck-osteopath-woolwich",
    ctaLabel: "Read the headache article",
  },

  "sciatica-woolwich-osteopath": {
    updated: "2026-10-15",
    readingMinutes: 8,
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
        heading: "Common local triggers",
        paragraphs: [
          "South-east London lifestyles stack load on the lower back: standing shifts, driving, wallet-in-back-pocket sitting, and desk weeks followed by sudden DIY or five-a-side.",
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
          "Many people improve with conservative care. Read our fuller notes on [sciatica treatment in Woolwich](/conditions/sciatica) and [lumbar disc / radiculopathy](/conditions/lumbar-disc-radiculopathy) if you want condition-level detail before you book.",
          "If findings suggest imaging, GP review, or urgent pathways — progressive weakness, saddle numbness, or bladder change — we say so plainly and help you act quickly.",
        ],
      },
      {
        heading: "Two things to try this week (if symptoms are mild)",
        level: 3,
        paragraphs: [
          "Position change snack: every 20–30 minutes of sitting, stand and walk for one minute. Sciatic irritability often hates stillness more than gentle movement. On the train, get up at an extra stop when you can.",
          "Side-lying pillow support: sleep with a pillow between the knees if that reduces buttock or leg pull. Avoid aggressive toe-touch stretches that recreate sharp leg pain — those often wind the nerve up rather than “release” it.",
        ],
      },
      {
        heading: "Recovery timelines and when to book sooner",
        paragraphs: [
          "Many acute sciatic flares ease over two to six weeks with sensible load and targeted care. Stubborn or recurrent patterns may need six to twelve weeks. Leg symptoms often lag behind back comfort — that is common, not a failure of treatment.",
          "Do not wait months if pain is stopping sleep, work, or walking. You do not need a GP referral to see Austin Duy Nguyen at St James Pharmacy, Powis Street.",
        ],
      },
    ],
    cta: "If leg pain is limiting walking or sleep, start with our sciatica condition guide — or book an assessment when you want hands-on care.",
    ctaHref: "/conditions/sciatica",
    ctaLabel: "Read sciatica condition guide",
  },

  "focused-shockwave-therapy-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 7,
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
          "Explore related guides on [plantar fasciitis](/conditions/plantar-fasciitis), [tennis elbow](/conditions/tennis-elbow), and [Achilles tendinopathy](/conditions/achilles-tendinopathy) if those match your symptoms. Men's health protocols using LI-ESWT are discussed separately on our [men's health page](/mens-health).",
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
        heading: "Practical tips if you are considering a course",
        paragraphs: [
          "Bring a short list of what you have already tried (rest, gels, physio, orthotics) so we do not repeat dead ends. Wear clothing that exposes the treatment area easily. Mild local ache afterward is common; plan lighter jumping or gripping for a day if that region was treated.",
          "Pair the device course with the boring fundamentals: calf capacity for heel pain, grip and shoulder sharing for elbow pain, and training-error fixes. That combination is what turns sessions into lasting change.",
        ],
      },
      {
        heading: "How it pairs with osteopathy",
        paragraphs: [
          "Hands-on osteopathy addresses joint and soft-tissue drivers around the tendon. Shockwave targets local tendon irritability. Together they often cover both the painful spot and the movement pattern that keeps reloading it — which is why combined plans are common for stubborn heel and elbow presentations in Woolwich.",
        ],
      },
    ],
    cta: "Ready to see whether focused shockwave belongs in your plan? Book a clinical assessment in Woolwich.",
    ctaHref: "/book",
    ctaLabel: "Book an assessment",
  },

  "plantar-fasciitis-shockwave-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
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
        heading: "Two self-care drills for heel pain",
        paragraphs: [
          "Wall calf stretch: stand facing a wall, back leg straight with heel down, front knee soft. Lean until you feel a mild stretch in the calf — not a sharp stab in the heel. Hold 30 seconds each side, twice daily.",
          "Seated plantar fascia massage: sit, cross the ankle over the opposite knee, and use your thumb to apply gentle pressure along the arch for 60–90 seconds. Keep it uncomfortable-but-tolerable, not bruising. Stop if numbness into the toes appears.",
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
          "For persistent cases, [focused shockwave](/shockwave) may be appropriate after screening. It is not automatic for every heel — suitability and fees are discussed first. Related reading: [Achilles tendinopathy](/conditions/achilles-tendinopathy) when morning stiffness sits higher in the tendon.",
        ],
      },
      {
        heading: "Footwear and standing jobs",
        paragraphs: [
          "Retail and hospitality floors in SE18 are unforgiving. Rotating into a firmer shoe mid-shift and using a small anti-fatigue mat where allowed can cut end-of-day heel spikes. Avoid spending evenings barefoot on hard tiles if mornings are already brutal.",
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
    readingMinutes: 8,
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
          "Pain on the outer elbow with gripping, tenderness over the lateral epicondyle, and ache lifting a kettle are typical. Neck referral can confuse the picture — we assess rather than chase the label alone. Full notes live on our [tennis elbow condition page](/conditions/tennis-elbow).",
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
        heading: "Two practical drills",
        paragraphs: [
          "Isometric wrist extension hold: forearm supported on a table, palm down, make a fist and gently press the back of the hand up into your other hand (or under a light table edge) without moving. Hold 30–45 seconds, 3–4 times. Mild tendon discomfort can be acceptable; sharp next-day spikes mean reduce effort.",
          "Grip swap practice: for one day, notice every one-handed lift (kettle, bag, tool) and switch to two hands or a thicker grip wrap. Reducing peak load often calms the tendon faster than another week of complete rest.",
        ],
      },
      {
        heading: "Treatment options we discuss",
        image: {
          src: "/images/blog/golfers-elbow-osteopath-woolwich.jpg",
          alt: "Elbow and forearm strain relevant to gripping and tendon overload",
        },
        paragraphs: [
          "Hands-on care calms irritable soft tissue and related joints. Progressive loading rebuilds capacity. [Focused shockwave](/shockwave) is considered for persistent tendinopathy when appropriate — see also [medial elbow / golfer's elbow](/conditions/medial-epicondylalgia) if your pain is on the inner side.",
          "Fees for shockwave and osteopathy are listed on [/fees](/fees). We will not start a course without explaining expected session numbers and review points.",
        ],
      },
      {
        heading: "Tools, typing, and training errors",
        paragraphs: [
          "Thickening tool handles, switching to two-hand lifts, and reducing long single-session DIY days lower peak tendon load more than any cream. Keyboard and mouse posture matter when the elbow is already irritable — a quick desk audit often reveals wrist extension and shoulder hiking that keep the tendon busy all day.",
        ],
      },
    ],
    cta: "Curious whether shockwave fits stubborn tennis elbow? Read the shockwave guide, then book if gripping pain is limiting work.",
    ctaHref: "/shockwave",
    ctaLabel: "View shockwave therapy",
  },

  "shoulder-pain-frozen-shoulder-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
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
        heading: "Sleep and dressing workarounds",
        paragraphs: [
          "Side-lying on the painful shoulder is a classic night breaker. A hug pillow or switching sides with support can protect sleep while irritability settles — sleep loss itself amplifies pain sensitivity.",
          "Dressing tip: sleeve on the painful side first when putting a shirt on, and off last when undressing. Rearrange kitchen reaches so heavy items sit between waist and chest height while range is limited.",
        ],
      },
      {
        heading: "Two gentle mobility drills (within comfort)",
        level: 3,
        paragraphs: [
          "Pendulum circles: lean forward with the good hand on a counter, let the painful arm hang relaxed, and make small circles for 30–45 seconds. This is gravity-assisted motion — not a stretch into sharp pinch.",
          "Table slide (flexion): sit sideways to a table, place a cloth under the hand of the painful side, and gently slide forward as far as comfortable. Hold 5 seconds, repeat 8–10 times. Stop short of forcing a frozen end-range.",
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
          "Neck-driven shoulder blade pain may need cervical care too; see [desk neck and shoulder pain](/blog/desk-neck-and-shoulder-pain) if screens are a big part of your week. Diabetes and thyroid history matter for frozen shoulder risk — mention them early.",
        ],
      },
      {
        heading: "Recovery expectations",
        paragraphs: [
          "Simple mechanical shoulder pain may improve over weeks. Frozen shoulder often spans many months naturally; good care reduces disability along the way. Trauma with sudden loss of power or suspected dislocation needs medical assessment first.",
        ],
      },
    ],
    cta: "Compare your symptoms with the frozen shoulder guide, or book if night pain and stiffness are rising.",
    ctaHref: "/conditions/frozen-shoulder",
    ctaLabel: "View frozen shoulder guide",
  },

  "lumbar-disc-pain-osteopath-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "A “slipped disc” is usually a bulging or irritated disc that sensitises nearby nerves. Pain may stay in the back or travel into the buttock and leg. Desk work, lifting, and long commutes are common local triggers.",
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
        heading: "Two practical strategies while irritability settles",
        level: 3,
        paragraphs: [
          "Sit-to-stand coaching: scoot to the chair edge, feet under you, hinge at the hips, and stand without twisting. Use armrests if needed. This cuts the “catch” many disc flares create when shooting up from soft sofas.",
          "Walk before you stretch: short, frequent walks often calm irritable discs better than aggressive toe-touches. Aim for several five-minute walks rather than one long march that flares you that evening.",
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
          "Most disc-related patterns improve over six to twelve weeks with conservative care. Surgery is for selected severe or progressive cases — not the default after one bad weekend. An MRI findings list without a clinical story can increase fear more than it improves outcomes — we interpret imaging in context when you already have it.",
        ],
      },
      {
        heading: "Sitting, lifting, and fear of movement",
        paragraphs: [
          "Fear that every bend will “slip the disc further” keeps people rigid and deconditioned. Most irritable discs prefer paced movement to panic-rest. Commuters can use standing stops and a small lumbar support roll; warehouse and care staff benefit from team-lift habits and hip-hinge refreshers.",
          "Related reading when nerve signs are absent: [non-specific low back pain](/conditions/non-specific-low-back-pain).",
        ],
      },
    ],
    cta: "If disc-type pain is travelling into the leg, read our sciatica article next — or book for a hands-on assessment in Woolwich.",
    ctaHref: "/blog/sciatica-woolwich-osteopath",
    ctaLabel: "Read the sciatica article",
  },

  "osteopath-woolwich-what-to-expect": {
    updated: "2026-10-15",
    readingMinutes: 7,
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
        heading: "Two things that make the first hour more useful",
        level: 3,
        paragraphs: [
          "Write your top three goals before you arrive — sleeping on your side again, lifting a toddler, sitting through a commute. Clinicians hear richer detail when you have already named what matters.",
          "Note your top aggravators too: which tasks or positions spike symptoms within minutes. That timeline speeds assessment more than a vague “it’s been sore for ages.”",
        ],
      },
      {
        heading: "What treatment may include",
        paragraphs: [
          "Depending on your presentation, care may involve soft-tissue techniques, joint mobilisation, and graded movement advice. Some patients also discuss acupuncture, cupping, or focused shockwave when clinically suitable — always with rationale and fees explained first on our [fees page](/fees).",
          "You should feel involved in decisions. If something is uncomfortable, say so; techniques are adapted to your comfort and medical history. Consent is ongoing.",
        ],
      },
      {
        heading: "Where to find us and what happens after",
        paragraphs: [
          "The clinic is inside St James Pharmacy, Powis Street, Woolwich SE18 6LQ. Ask at the pharmacy counter on arrival. Mild ache after hands-on treatment can occur as tissues settle — clear aftercare is given before you leave. If anything unexpected appears, call the clinic rather than worrying overnight.",
          "Vietnamese-speaking patients who prefer to explain symptoms in Vietnamese can do so with Austin — language should not block good MSK care. Booking is online via [/book](/book), or call if you need help choosing an appointment type.",
        ],
      },
    ],
    cta: "Ready for your first visit? Book online — or call if you are unsure which appointment type fits.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  },

  // Keep checklist cleaned (related companion to what-to-expect; not one of the top-10 list but was in this file)
  "first-osteopathy-visit-checklist-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 6,
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
        ],
      },
      {
        heading: "Practical arrival tips",
        paragraphs: [
          "Arrive a few minutes early and check in at St James Pharmacy on Powis Street. Avoid arriving straight from a maximal gym session if you can — it can temporarily change how tissues feel on examination.",
          "Booking is online via [/book](/book), or call if you need help choosing an appointment type.",
        ],
      },
    ],
    cta: "Use this checklist, then book your first assessment when ready.",
    ctaHref: "/book",
    ctaLabel: "Book your first visit",
  },

  "upper-back-pain-desk-workers-woolwich": {
    updated: "2026-10-15",
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Thoracic (mid-back) pain often sits between the shoulder blades after hours at a laptop — especially with a low screen, a soft sofa “office,” or arms reaching forward to a trackpad all afternoon around Woolwich and Greenwich.",
          "At Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street, we assess rib and thoracic mobility, shoulder girdle load, and neck contribution, then give desk resets you can repeat between meetings. You do not need a GP referral to book.",
        ],
      },
      {
        heading: "Why desk days lock the mid-back",
        paragraphs: [
          "Looking down at a laptop closes the upper back and asks the muscles between the shoulder blades to hold a long static load. Soft sofas and café tables make it worse: hips sink, the chest collapses, and the mid-back never gets the extension it needs through the day.",
          "Phone-shoulder clenching on calls and a secondary monitor off to one side add a constant twist. By evening many people feel a dull band between the blades, a catch on deep breath, or stiffness turning to check a blind spot in traffic after a hybrid SE18 commute.",
          "The fix is rarely “sit up straighter” alone. Tissues that have been compressed all day need mobility, load variety, and a setup that does not recreate the same fold every time you open the laptop.",
        ],
      },
      {
        heading: "Desk and screen setup for mid-back relief",
        paragraphs: [
          "Raise the screen so the top sits near eye level — a laptop stand plus separate keyboard and mouse beats craning into a trackpad. Keep elbows close to your sides; if the mouse sits too far forward, the shoulder blade muscles stay “on” all day.",
          "Place the monitor you use most straight ahead so you are not living in a constant rotation. Soft sofa working from home is a common Woolwich flare: move to a firm chair and table for deep-work blocks, even if you keep the sofa for lighter reading.",
        ],
        bullets: [
          "Screen top near eye level",
          "Keyboard and mouse within easy reach — no outstretched arms",
          "Feet flat; avoid perched tiptoe sitting",
          "Stand or walk 1–2 minutes each half hour when meetings allow",
          "Secondary screen straight ahead, not permanently twisted",
        ],
      },
      {
        heading: "Two exercises for upper-back desk pain",
        level: 3,
        paragraphs: [
          "Seated open-book rotation: sit tall, hands across the chest, gently rotate the mid-back left and right within a comfortable range — think “turn from the breastbone,” not yanking the neck. 8–10 slow turns each side, twice on long desk days. Stop if you get sharp rib or arm pain.",
          "Doorway chest opener: forearm on the doorframe at roughly shoulder height, step the same-side foot through until you feel a mild stretch across the front of the chest and shoulder — not a pinch in the joint. Hold 20–30 seconds each side. This undoes the laptop fold that keeps the mid-back compressed.",
        ],
      },
      {
        heading: "Movement snacks between meetings",
        paragraphs: [
          "You do not need a gym session every hour. After each call block: stand, roll the shoulders open, and look at something far away for 20 seconds. Two slow shoulder-blade squeezes (down and slightly together, without puffing the chest) often ease the “stuck” band between the blades more than aggressive stretching.",
          "If pain spikes with deep breaths, overhead reaching, or night pain lying on one side, mention that at assessment — it can shift the plan toward rib or shoulder drivers rather than posture coaching alone.",
        ],
      },
      {
        heading: "How osteopathy helps desk-related upper back pain",
        image: {
          src: "/images/blog/upper-back-pain-desk-workers-woolwich.jpg",
          alt: "Desk worker at a laptop with rounded upper-back posture",
        },
        paragraphs: [
          "Assessment covers thoracic and rib mobility, cervical contribution, and shoulder blade control. Treatment may include gentle mobilisation and soft-tissue work through the mid-back and between the blades — never forced into sharp pain.",
          "We pair hands-on care with the setup and movement snacks above so symptoms are less likely to rebound the next hybrid week. Related reading: [neck pain](/conditions/neck-pain) and [upper-back postural strain](/conditions/thoracic-joint-dysfunction) when more than one area is irritable.",
        ],
      },
      {
        heading: "When to book",
        paragraphs: [
          "Book if the band between your blades returns every Sunday evening, if desk days end with headache, or if twisting to reverse the car is limited. Progressive arm weakness, trauma, or unremitting night pain need medical review first.",
          "Wear clothes you can move in. Online booking is on our [book page](/book); fees and NHS/student discount details are listed separately.",
        ],
      },
    ],
    cta: "If mid-back stiffness is limiting your workday, read the thoracic guide — or book an assessment when you want hands-on care.",
    ctaHref: "/conditions/thoracic-joint-dysfunction",
    ctaLabel: "View thoracic / upper-back guide",
  },
};
