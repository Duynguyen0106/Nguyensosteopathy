export type ConditionRegion =
  | "Cervical"
  | "Thoracic"
  | "Lumbar"
  | "Pelvis & Hip"
  | "Knee"
  | "Ankle & Foot"
  | "Shoulder"
  | "Elbow & Wrist"
  | "Whole body";

export type ConditionFaq = {
  question: string;
  answer: string;
};

export type Condition = {
  slug: string;
  title: string;
  shortTitle: string;
  region: ConditionRegion;
  summary: string;
  heroLine: string;
  symptoms: string[];
  howWeHelp: string[];
  /** Long-form sections for expanded condition landers (600–800 words total). */
  causes?: string;
  whoAffected?: string;
  whatToExpect?: string;
  recoveryTimeline?: string;
  /** Optional overrides; otherwise generated via getConditionFaqs(). */
  faqs?: ConditionFaq[];
  /** Prefer these over same-region fallbacks for “Related conditions”. */
  relatedConditionSlugs?: string[];
  relatedServiceSlug: string;
  relatedBlogSlug?: string;
  keywords: string[];
  featured?: boolean;
};

/**
 * Patient FAQs for condition landers. Prefer explicit `condition.faqs`;
 * otherwise build 4–5 answers from summary, signs, and how-we-help so the
 * visible accordion and FAQPage JSON-LD stay identical.
 */
export function getConditionFaqs(condition: Condition): ConditionFaq[] {
  if (condition.faqs && condition.faqs.length > 0) {
    return condition.faqs;
  }

  const name = condition.shortTitle;
  const nameLower = name.toLowerCase();
  const help = condition.howWeHelp.filter(Boolean);
  const signs = condition.symptoms.filter(Boolean);
  const helpSentence =
    help.length > 0
      ? help
          .slice(0, 3)
          .map((item) => item.replace(/\.$/, ""))
          .join("; ") + "."
      : "We assess the joints, soft tissue, and movement patterns involved, then match hands-on care and advice to your stage.";
  const signsSentence =
    signs.length > 0
      ? `Common signs include ${signs
          .slice(0, 3)
          .map((item) => item.replace(/\.$/, "").toLowerCase())
          .join("; ")}.`
      : `Symptoms often change with posture, load, or activity.`;

  return [
    {
      question: `Can osteopathy help with ${nameLower}?`,
      answer: `Yes — for many people with ${nameLower}, osteopathy is a suitable conservative option. ${condition.summary} At Nguyen's Osteopathic Clinic in Woolwich we ${helpSentence.charAt(0).toLowerCase()}${helpSentence.slice(1)}`,
    },
    {
      question: `How many sessions will I need for ${nameLower}?`,
      answer: `It depends on how irritable symptoms are, how long you have had them, and what you need to return to. Many mechanical patterns improve over a short course of care with clear review points; longer-standing or complex cases may need more graded rehab. We explain likely timeframes after your first assessment rather than selling a fixed package.`,
    },
    {
      question: `Is osteopathy safe for ${nameLower}?`,
      answer: `Osteopathy is generally safe when techniques are matched to your assessment, medical history, and symptom irritability. We screen for red flags that need GP or urgent pathways first, explain findings in plain English, and adapt or avoid techniques that are not appropriate for your presentation of ${nameLower}.`,
    },
    {
      question: `What should I do before my appointment for ${nameLower}?`,
      answer: `Wear clothes you can move in, and bring a short timeline of what aggravates or eases symptoms. ${signsSentence} Recent scan letters help when you have them but are not required, and you do not need a GP referral to book. Mention pregnancy, blood thinners, recent surgery, or neurological change early so care stays appropriate.`,
    },
    {
      question: `When should I seek urgent care instead of osteopathy for ${nameLower}?`,
      answer: `Seek urgent medical care for rapidly worsening weakness, saddle numbness, bladder or bowel change, unexplained weight loss, fever with severe spinal pain, chest pain of cardiac concern, or trauma with suspected fracture. For persistent but non-emergency ${nameLower}, an osteopathic assessment at our Woolwich clinic is a sensible next step.`,
    },
  ];
}

/** Region order aligned with the MSK Tutor conditions catalogue. */
export const conditionRegions: ConditionRegion[] = [
  "Cervical",
  "Thoracic",
  "Lumbar",
  "Pelvis & Hip",
  "Knee",
  "Ankle & Foot",
  "Shoulder",
  "Elbow & Wrist",
  "Whole body",
];

/**
 * Conditions index sourced from the MSK Tutor (Osteotutor) catalogue
 * (https://osteotutor-c0c151c1.vercel.app — see site.products.mskTutor),
 * rewritten for patient-facing Woolwich clinic pages. Featured landers
 * keep richer SEO copy; remaining entries share a consistent template.
 */
export const conditions: Condition[] = [
  {
    slug: "sciatica",
    title: "Sciatica Treatment in Woolwich",
    shortTitle: "Sciatica",
    region: "Lumbar",
    summary:
      "Osteopathic care for sciatic-type leg pain, buttock ache, and lower-back referral — assessment first, then hands-on treatment and clear advice.",
    heroLine:
      "Leg pain, tingling, or buttock ache that travels from the lower back deserves a clear plan — not guesswork.",
    symptoms: [
      "Sharp or burning pain down one leg",
      "Buttock or hamstring tightness with sitting",
      "Pins and needles or numbness in the foot",
      "Pain worse with bending, coughing, or long drives",
    ],
    howWeHelp: [
      "Assess lumbar, pelvis, and nerve tension patterns",
      "Ease protective muscle spasm with osteopathic techniques",
      "Guide pacing, sitting, and return-to-movement advice",
      "Discuss imaging or GP referral only when clinically needed",
    ],
    causes:
      "Sciatica is a pattern of nerve-related leg pain, not a single disease. Irritation often comes from a lumbar disc bulge or herniation pressing on a nerve root, narrowed exit foramina (stenosis), or stiff, overloaded joints in the lower back and pelvis that sensitise the sciatic pathway. Protective muscle spasm in the buttock and hamstring can then amplify the feeling of “nerve stretch” when you sit, bend, or drive. Sudden heavy lifting, awkward twisting, or a long period of sitting after a weekend of DIY are common triggers we see locally. Less often, referred pain from the sacroiliac joint or piriformis region mimics true radicular sciatica — which is why assessment matters before you chase a label. At Nguyen’s Osteopathic Clinic in Woolwich we look at how your back, pelvis, hips, and daily load interact, rather than treating the leg in isolation, so care targets the driver instead of chasing symptoms down the calf alone.",
    whoAffected:
      "Desk workers with long sitting blocks, tradespeople who lift and twist, drivers, and people returning to the gym after time off are frequent visitors with sciatic-type symptoms in SE18 and nearby Greenwich borough. Pregnancy-related pelvic change and previous lumbar episodes also raise risk. Age alone does not cause sciatica, but disc and joint changes become more common from mid-life. Weekend warriors who spike training volume, and parents lifting toddlers from awkward angles, often present with the same pattern. If you have progressive weakness, saddle numbness, or bladder/bowel change, that is a red-flag pathway and we help you escalate to urgent medical care rather than continuing routine osteopathy alone.",
    whatToExpect:
      "Your first visit includes a focused history, neurological screen where indicated, and hands-on assessment of lumbar, pelvic, and nerve mobility. We explain findings in plain language before any treatment starts. Hands-on care may combine gentle mobilisation, soft-tissue work, and graded nerve-friendly movement — never forced into a painful stretch. You leave with clear pacing for sitting, sleep positions, and what to modify at work or the gym that week. Follow-ups track leg symptoms, strength, and how far you can walk or sit before flare, adjusting the plan as irritability drops. When imaging, GP review, or shockwave for a related tendon driver is appropriate, we say so plainly so you are not guessing between options.",
    recoveryTimeline:
      "Many acute sciatic flares ease over 2–6 weeks with sensible load and targeted care; stubborn or recurrent patterns may need 6–12 weeks of guided rehab. Disc-related cases often improve before the scan “looks perfect,” so we measure function — walking tolerance, sleep, and work capacity — not image fear. Early wins are usually better sleep and shorter flare after sitting; later wins are lifting, commuting, and sport without the same bang of leg pain. If progress stalls, we review the working diagnosis and refer rather than repeating the same session indefinitely.",
    faqs: [
      {
        question: "Is sciatica the same as a slipped disc?",
        answer:
          "Not always. Disc irritation is a common driver, but joint, muscle, and pelvic patterns can produce similar leg symptoms. We assess first so care matches the likely source.",
      },
      {
        question: "Should I rest completely until the leg pain settles?",
        answer:
          "Total bed rest rarely helps. Short relative rest, then graded walking and nerve-friendly movement, usually recovers faster than staying still for days.",
      },
      {
        question: "Do I need an MRI before seeing an osteopath?",
        answer:
          "Most people do not. We screen for red flags and refer for imaging when weakness, persistent night pain, or stalled recovery makes it clinically useful.",
      },
      {
        question: "How many sessions will I need for sciatica in Woolwich?",
        answer:
          "Many patients notice change within 2–4 visits; complex or long-standing cases take longer. We review goals and fees up front so you can plan.",
      },
      {
        question: "Can osteopathy help if my pain is mainly in the buttock?",
        answer:
          "Yes — buttock-dominant patterns are common. We still screen the lumbar nerve roots and pelvis so we are not missing true radicular drivers.",
      },
    ],
    relatedConditionSlugs: [
      "lumbar-disc-radiculopathy",
      "piriformis-syndrome",
      "non-specific-low-back-pain",
      "si-joint-dysfunction",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "sciatica-woolwich-osteopath",
    keywords: [
      "sciatica Woolwich",
      "sciatica osteopath SE18",
      "leg pain osteopath Woolwich",
    ],
    featured: true,
  },
  {
    slug: "neck-pain",
    title: "Neck Pain Osteopath in Woolwich",
    shortTitle: "Neck pain",
    region: "Cervical",
    summary:
      "Relief for stiff, desk-related, or work-strained necks — including nail-technician and screen postures common in SE London.",
    heroLine:
      "A stiff or aching neck often comes from how you work and sleep — we find the pattern and free movement again. NHS staff and students are welcome — say if you need appointment times that fit shift patterns.",
    symptoms: [
      "Morning stiffness or limited turning",
      "Pain between the shoulder blades",
      "Tension headaches starting from the neck",
      "Ache after long phone, screen, or nail-desk work",
    ],
    howWeHelp: [
      "Assess cervical and upper-thoracic joints and soft tissue",
      "Hands-on treatment to reduce protective tension",
      "Simple desk and sleep-position coaching",
      "Link care to your real work demands",
    ],
    causes:
      "Neck pain usually builds from sustained postures, protective muscle guarding, and irritated cervical or upper-thoracic joints rather than a single \"out of place\" bone. Long phone or screen use, nail-desk work, awkward sleep positions, and sudden reaches can all load the same tissues. Disc or facet irritation may refer into the shoulder blade; soft-tissue tension can feed headache patterns. At Nguyen's Osteopathic Clinic in Woolwich we map how your work, sleep, and training interact with mobility and strength so treatment matches the real driver — not a generic stretch sheet.",
    whoAffected:
      "Office and hybrid workers, nail technicians, drivers, and parents carrying children on one hip are common presentations in SE18. People returning to the gym after time off often flare the neck when pressing or looking up. Mid-life desk workers with previous whiplash or migraine history may notice stiffness returning under stress. Red flags such as progressive arm weakness, unexplained weight loss, or severe unremitting night pain need medical review; we help you spot those early.",
    whatToExpect:
      "We take a focused history, screen neurological signs when needed, and examine cervical and thoracic movement plus shoulder contribution. Hands-on care may include gentle mobilisation, soft-tissue work, and graded mobility — never forced into sharp pain. You leave with desk height, break timing, and sleep-position tips matched to your week. Follow-ups track turning range, headache days, and work tolerance, adjusting load as irritability settles. Fees are clear before you book follow-ups; we only add sessions when they still earn their place.",
    recoveryTimeline:
      "Many postural neck flares settle over 2–6 weeks with sensible breaks and targeted care. Longer-standing patterns or combined headache may need 6–10 weeks of guided rehab. Early wins are usually easier morning turns and fewer afternoon spikes; later wins are full workdays and training without the same protective stiffness. If progress stalls, we review the plan and refer rather than repeating identical sessions. Expect uneven weeks. We judge progress by desk endurance and sleep, then space visits or involve your GP if change stalls.",
    faqs: [
      {
        question: "Is neck cracking safe during osteopathy?",
        answer:
          "We only use techniques suited to your assessment. Many necks improve with gentle mobilisation and soft-tissue work without high-velocity thrusts.",
      },
      {
        question: "Can desk setup alone fix my neck pain?",
        answer:
          "Setup helps, but irritable joints and soft tissue often need hands-on care plus graded movement. We combine both.",
      },
      {
        question: "Why does my neck pain cause headaches?",
        answer:
          "Upper cervical joints and muscle tension can refer into the head. Treating the neck pattern often reduces those headaches.",
      },
      {
        question: "Should I use a firm pillow?",
        answer:
          "Pillow \"firmness\" matters less than height that keeps your neck neutral. We trial simple changes rather than buying expensive gear first.",
      }
    ],
    relatedConditionSlugs: [
      "cervicogenic-headache",
      "whiplash",
      "cervical-radiculopathy",
      "thoracic-joint-dysfunction",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "nail-technician-neck-wrist-pain-osteopath",
    keywords: [
      "neck pain Woolwich",
      "neck osteopath SE18",
      "desk neck pain osteopath",
    ],
    featured: true,
  },
  {
    slug: "cervical-radiculopathy",
    title: "Cervical radiculopathy Treatment in Woolwich",
    shortTitle: "Cervical radiculopathy",
    region: "Cervical",
    summary:
      "Arm pain, pins and needles, or hand weakness from an irritated neck nerve root — assessed and calmed with osteopathy in Woolwich before you chase every scan.",
    heroLine:
      "Arm pain from an irritated neck nerve root needs a clear plan — assessment, calm hands-on care, and desk advice that fits SE18 life.",
    symptoms: [
      "Arm pain, pins and needles, or numbness in a finger pattern",
      "Neck positions that light up the arm — looking up, or long desk flexion",
      "Grip tiredness or subtle hand weakness on heavier days",
    ],
    howWeHelp: [
      "Screen cervical nerve roots, reflex changes, and arm dermatomes",
      "Gentle neck and thoracic mobilisation within comfortable ranges",
      "Nerve-friendly movement and desk-break coaching for arm flares",
      "Escalate to GP or imaging if weakness or night pain progresses",
    ],
    causes:
      "Cervical radiculopathy is nerve-root irritation in the neck that refers into the arm as pain, pins and needles, or weakness. Disc or foraminal narrowing, stiff uncovertebral joints, and protective muscle spasm commonly sensitise a root after awkward sleep, sudden loading, or cumulative desk flexion. Not every arm tingle is a trapped neck nerve — shoulder, thoracic outlet–type patterns, and peripheral nerve entrapments need separation. At Nguyen’s Osteopathic Clinic we map the dermatome, myotome, and neck positions that ease or provoke symptoms before choosing hands-on care, so we are not mobilising into a worsening neurological picture. Night postures with the arm overhead or the neck fully flexed on stacked pillows often keep the root sensitised even when daytime desk load is modest.",
    whoAffected:
      "Desk and hybrid workers, trades looking up for long spells, and people after sudden neck twists present often from SE18. Drivers with poorly set headrests and phone-flexion habits notice night arm symptoms. Cyclists and overhead athletes can flare roots with sustained extension postures. Progressive arm weakness, gait change, or bowel/bladder red flags need urgent medical pathways. Most mechanical radicular patterns improve with relative rest of provocative positions and guided mobility when serious pathology is absent. People who chase hard massage into radiating positions sometimes feel worse the next day — intensity must match irritability.",
    whatToExpect:
      "Assessment includes neurological screening, neck and thoracic mobility, and arm tension tests. Care eases protective spasm, gently improves available neck motion, and coaches desk and sleep positions that unload the irritable root. Hands-on work stays within calm ranges; we do not force into radiating positions. Referral for imaging or medical review follows progressive weakness or stalled recovery. Night symptoms and arm endurance guide progress, with clear advice on when to pause self-care and seek urgent help.",
    recoveryTimeline:
      "Many sensory-dominant patterns ease over 4–10 weeks. Early wins are quieter nights and fewer desk flares; later wins are full workdays without the same arm bang. Motor weakness timelines depend on severity and may need earlier specialist input. We review neurology each visit so conservative care is not stretched past sense. Patients who keep desk resets after settling usually keep gains longer than those who return to all-day flexion the week symptoms fade. Keeping desk resets and sleep setup after settling usually protects against the classic Monday arm flare.",
    faqs: [
      {
        question: "Do I need surgery for cervical radiculopathy?",
        answer:
          "Most people improve without surgery. We escalate if progressive weakness or intractable pain persists despite appropriate care.",
      },
      {
        question: "Is traction helpful?",
        answer:
          "Some people benefit from carefully dosed unloading; others prefer mobilisation and movement. We trial what your irritability allows.",
      },
      {
        question: "Can I still work at a desk?",
        answer:
          "Usually yes with break strategies and screen height changes. Complete rest rarely speeds nerve recovery.",
      },
      {
        question: "Will osteopathy make the arm pain worse?",
        answer:
          "Treatment should stay within a tolerable range. Temporary ache can occur; sharp radiating increase is a cue to modify the plan.",
      }
    ],
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "whiplash",
      "cubital-tunnel",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "desk-neck-and-shoulder-pain",
    keywords: [
      "Cervical radiculopathy Woolwich",
      "Cervical radiculopathy osteopath SE18",
      "cervical radiculopathy Woolwich",
    ],
  },
  {
    slug: "cervicogenic-headache",
    title: "Cervicogenic headache Treatment in Woolwich",
    shortTitle: "Cervicogenic headache",
    region: "Cervical",
    summary:
      "One-sided headaches that start in the neck, not another vague tension label — upper-cervical osteopathy and desk advice for Woolwich and SE18.",
    heroLine:
      "When headache starts in the neck, we treat the upper cervical drivers — not another vague tension-type label.",
    symptoms: [
      "One-sided headache that starts in the neck or base of skull",
      "Pain reproduced by sustained desk posture or neck movement",
      "Stiff upper neck with light or screen sensitivity on bad days",
    ],
    howWeHelp: [
      "Reproduce headache drivers with upper-cervical and posture tests",
      "Soft-tissue and gentle mobilisation of C0–C3 and upper thoracic segments",
      "Screen-height, break, and sleep-position tweaks between visits",
      "Separate migraine or urgent red-flag patterns from neck-driven pain",
    ],
    causes:
      "Cervicogenic headache is driven by upper cervical joints and soft tissue referring pain into the head — often one-sided and linked to neck posture or movement. Sustained desk flexion, awkward sleep, and previous neck injury are common contributors. It can overlap with migraine or tension-type headache, so we look for neck reproduction of symptoms rather than assuming every headache is \"just stress.\"",
    whoAffected:
      "Desk workers, drivers, and people with prior whiplash or chronic neck stiffness present frequently in Woolwich. Those who clench at screens or sleep prone may notice morning starts. Sudden severe headache unlike your usual pattern, neurological change, or fever needs urgent medical care — we help you recognise when osteopathy is not the first step.",
    whatToExpect:
      "Assessment includes neck movement, upper cervical palpation, and screening for migraine red flags. Treatment focuses on gentle upper cervical and thoracic work plus soft-tissue release, paired with posture and break advice. We track headache frequency, intensity, and medication use between visits so progress is measurable. Headache diaries and medication use guide spacing of visits — not a fixed package.",
    recoveryTimeline:
      "Many cervicogenic patterns improve over 3–8 weeks when neck drivers are addressed. Stubborn mixed headache may need longer and sometimes medical co-management. Early wins are shorter morning episodes; later wins are longer screen days without the same build-up. Headache-free days usually climb before perfect posture does — we track both.",
    faqs: [
      {
        question: "How do I know my headache is from my neck?",
        answer:
          "Neck movement or sustained posture often reproduces symptoms, and pain may start in the neck or occiput. We assess rather than guess from the name alone.",
      },
      {
        question: "Can osteopathy replace migraine medication?",
        answer:
          "No. We may reduce neck-driven triggers, but medication decisions stay with your GP or neurologist.",
      },
      {
        question: "Should I stop exercising?",
        answer:
          "Usually not. We adjust training that spikes neck load and keep helpful movement going.",
      },
      {
        question: "Why do headaches return after a good week?",
        answer:
          "Work load, sleep, and stress often re-irritate the same joints. We refine pacing so gains stick.",
      }
    ],
    relatedConditionSlugs: [
      "neck-pain",
      "cervical-radiculopathy",
      "whiplash",
      "thoracic-joint-dysfunction",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "tension-headaches-neck-osteopath-woolwich",
    keywords: [
      "Cervicogenic headache Woolwich",
      "Cervicogenic headache osteopath SE18",
      "cervicogenic headache Woolwich",
    ],
  },
  {
    slug: "whiplash",
    title: "Whiplash-associated disorder Treatment in Woolwich",
    shortTitle: "Whiplash-associated disorder",
    region: "Cervical",
    summary:
      "Neck pain, stiffness, and guarded turning after a collision or sudden jolt — paced osteopathic care that rebuilds confidence without forcing range.",
    heroLine:
      "A structured look at whiplash-associated disorder for SE18 patients — history, examination, and a plan you can follow.",
    symptoms: [
      "Neck pain and stiffness after a collision or sudden jolt",
      "Headache, dizziness, or guarded turning in traffic",
      "Sleep disturbance and irritability when the neck is bumped",
    ],
    howWeHelp: [
      "Map irritability after the accident — joints, soft tissue, and confidence to move",
      "Graded hands-on care that respects acute protective spasm",
      "Early paced return to driving, desk work, and sleep positions",
      "Flag delayed neurological change or persistent dizziness for medical review",
    ],
    causes:
      "Whiplash-associated disorder follows rapid acceleration-deceleration — most often a road traffic collision — that strains cervical joints, soft tissue, and sometimes nerve structures. Delayed stiffness, headache, and shoulder girdle guarding are common even when early scans look “clear.” Fear of movement and sleep disruption then prolong recovery if activity is avoided for weeks. Serious pathology (fracture, neurological deficit, vascular injury) must be screened before routine mobilisation. At our Woolwich clinic we treat the sensitive system in front of us, not a single crash narrative, and we coordinate with medical care when clearance or documentation is needed. Secondary headache, jaw clenching, and shoulder bracing often arrive days after the collision and can outlast the initial neck ache if unaddressed.",
    whoAffected:
      "Drivers, passengers, and cyclists after collisions present commonly across Greenwich borough. People with prior neck pain or high early distress scores may recover more slowly and need clearer pacing. Office workers returning to screens too hard too soon often prolong flares. Any loss of consciousness concern, progressive neurological change, or severe midline tenderness after trauma needs medical clearance first. Most soft-tissue dominant patterns still benefit from early guided movement once serious injury is excluded. People stuck in litigation stress or poor sleep after a crash may need clearer pacing and GP coordination alongside hands-on care.",
    whatToExpect:
      "After appropriate medical clearance when indicated, we assess neck motion, neurological status, and headache drivers. Care combines gentle mobilisation and soft-tissue work with graded return to driving, desk, and sleep positions. Hands-on intensity matches irritability — never forced into sharp radiating pain. We explain expected timelines honestly and coordinate with GP or insurers when documentation is needed. Headache days and turn-to-shoulder checks for driving lead goals you can measure between visits.",
    recoveryTimeline:
      "Many improve over 4–12 weeks with early guided movement. Early wins are sleep and daily turning; later wins are longer drives and desk days without the same bang. Delayed recovery beyond expected windows earns reassessment for neuropathic drivers, concussion overlap, or imaging — not endless identical sessions. We set review points so you know when progress is on track. Graded exposure to driving and screens after settling protects against boom-bust returns. Graded return to screens and driving mirrors after settling usually prevents boom-bust symptom spikes.",
    faqs: [
      {
        question: "Should I wear a neck collar?",
        answer:
          "Prolonged collar use usually slows recovery. Early gentle movement under guidance is preferred for most soft-tissue cases.",
      },
      {
        question: "When can I drive again?",
        answer:
          "When you can turn safely and react without severe pain. We help you judge that functionally rather than by calendar alone.",
      },
      {
        question: "Is massage enough after a crash?",
        answer:
          "Soft tissue helps, but joint mobility, graded exercise, and reassurance are usually needed together.",
      },
      {
        question: "Why do headaches start days later?",
        answer:
          "Protective muscle spasm and joint irritation can build after the event. Assessment links them to the neck pattern.",
      }
    ],
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "cervical-radiculopathy",
      "thoracic-joint-dysfunction",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "whiplash-neck-pain-osteopath-se18",
    keywords: [
      "Whiplash-associated disorder Woolwich",
      "Whiplash-associated disorder osteopath SE18",
      "whiplash Woolwich",
    ],
  },
  {
    slug: "thoracic-joint-dysfunction",
    title: "Thoracic joint / postural pain Treatment in Woolwich",
    shortTitle: "Thoracic joint / postural pain",
    region: "Thoracic",
    summary:
      "Mid-back ache and stuck segments between the shoulder blades from desk posture — thoracic mobilisation and endurance advice in Woolwich.",
    heroLine:
      "Thoracic joint / postural pain care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Mid-back ache or stuck segments between the shoulder blades",
      "Pain with deep breath, rotation, or long slouched sitting",
      "Rib-angle tenderness that eases when you move and then returns at the desk",
    ],
    howWeHelp: [
      "Assess mid-back joints, ribs, and breathing-related stiffness",
      "Mobilise restricted thoracic segments and ease guarding musculature",
      "Posture and desk-rotation advice for long sitting days",
      "Rule out cardiac or visceral referral when chest symptoms are atypical",
    ],
    causes:
      "Mid-back or interscapular ache often comes from stiff thoracic joints, overloaded postural muscles, and prolonged flexed sitting. Rib cage mobility and breathing pattern influence how the area feels with deep breaths or desk work. Disc issues are less common here than in the lumbar spine, but we still screen when symptoms are atypical. Local Woolwich desk and retail roles frequently feed this pattern.",
    whoAffected:
      "Office workers, students, and people who drive long shifts are frequent visitors. Gym-goers who press heavy while lacking thoracic extension may flare between the blades. Chest pain of cardiac concern is never assumed musculoskeletal — sudden severe chest pain, breathlessness, or arm heaviness needs urgent medical care first.",
    whatToExpect:
      "We assess thoracic and rib mobility, cervical and lumbar contribution, and desk demands. Treatment may include mobilisation, soft-tissue work, and extension-biased movement, plus break strategies you can actually keep. Breathing and scapular control cues often reduce end-of-day ache. Mid-back ease and desk endurance tell us when to space sessions.",
    recoveryTimeline:
      "Postural thoracic pain often eases over 2–6 weeks with mobility and load changes. Structural kyphosis-related discomfort may need longer maintenance habits. Progress is measured by sitting tolerance and training comfort, not by \"perfect posture.\" Desk weeks vary; we keep mid-back goals tied to breathing and rotation you need for work.",
    faqs: [
      {
        question: "Is a standing desk enough?",
        answer:
          "It can help, but stiff joints and weak endurance still need mobility and strength work. We combine setup with treatment.",
      },
      {
        question: "Can thoracic pain feel like rib pain?",
        answer:
          "Yes — costovertebral joints can refer locally. We differentiate musculoskeletal patterns from medical chest pain.",
      },
      {
        question: "Should I foam-roll daily?",
        answer:
          "Gentle mobility can help; aggressive rolling on irritable tissue may aggravate. We dose what suits your stage.",
      },
      {
        question: "Why does deep breathing hurt?",
        answer:
          "Rib and thoracic joints move with breath. Improving that mobility often settles the catch.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "neck-pain",
      "costochondritis",
      "scheuermanns",
      "non-specific-low-back-pain",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "upper-back-pain-desk-workers-woolwich",
    keywords: [
      "Thoracic joint / postural pain Woolwich",
      "Thoracic joint / postural pain osteopath SE18",
      "thoracic joint dysfunction Woolwich",
    ],
  },
  {
    slug: "costochondritis",
    title: "Costochondritis / costovertebral pain Treatment in Woolwich",
    shortTitle: "Costochondritis / costovertebral pain",
    region: "Thoracic",
    summary:
      "Chest-wall tenderness you can point to, worse with breath or reach — rib and thoracic care once cardiac red flags are cleared.",
    heroLine:
      "Practical assessment and a clear plan for costochondritis / costovertebral pain — so you understand the driver and the next steps.",
    symptoms: [
      "Sharp or aching chest-wall tenderness near the sternum or ribs",
      "Pain with deep breath, cough, or reaching across the body",
      "Local tenderness you can point to — not a crushing central pressure",
    ],
    howWeHelp: [
      "Differentiate costochondral tenderness from cardiac or lung red flags",
      "Gentle rib and thoracic mobilisation plus soft-tissue release",
      "Breathing, lift, and cough pacing while irritability settles",
      "Coordinate with GP if chest pain character remains uncertain",
    ],
    causes:
      "Costochondritis and related costovertebral irritation produce sharp, localised chest or rib-angle pain that you can usually point to with one finger. The costal cartilages and rib joints become sensitised after viral illness, coughing fits, sudden loading in the gym, or repetitive reaching and twisting at work. Protective spasm in the intercostals and thoracic erectors then makes every deep breath or sneeze feel risky, which feeds a cycle of shallow breathing and further stiffness. Unlike cardiac pain, the discomfort is typically reproducible with palpation, trunk rotation, or pressing the arms across the body. That said, chest pain always deserves a careful filter — we never treat mechanical labels as a substitute for urgent medical assessment when the story includes crushing pressure, sweating, syncope, or breathlessness at rest. At Nguyen’s Osteopathic Clinic in Woolwich we map rib motion, thoracic segments, and shoulder girdle load together so care targets the driver rather than chasing a single tender spot.",
    whoAffected:
      "Active adults after winter coughs, CrossFit or bench-press spikes, and DIY weekends present often across SE18 and Greenwich. Desk workers who sit slumped then suddenly reach overhead notice the same pattern. People with health anxiety about heart disease may avoid movement for weeks, which prolongs recovery once cardiac causes are cleared. Pregnancy-related rib flare and postpartum coughing can also light up the costochondral junctions. Anyone with unexplained fever, progressive shortness of breath, or pain that migrates into the jaw or left arm needs emergency or GP pathways first — osteopathy starts only when a musculoskeletal pattern is clear and safe.",
    whatToExpect:
      "Your first visit clarifies red-flag screening history, then examines local tenderness, rib spring, thoracic rotation, and breathing mechanics. Once the pattern looks musculoskeletal, hands-on care may combine gentle rib and thoracic mobilisation with soft-tissue work to the chest wall and upper back — never forced into a painful gasp. You leave with pacing for coughs, sneezes, and which pressing or twisting gym moves to pause briefly. Follow-ups track how far you can inhale, sleep on your side, and return to desks or trains without guarding. If the character of pain stays uncertain, we stop and coordinate with your GP rather than repeating sessions on hope alone.",
    recoveryTimeline:
      "Many mechanical costochondral flares settle over 2–8 weeks with sensible load and thoracic mobility work. Early wins are usually deeper breaths and less night guarding; later wins are pressing, carrying shopping, and commuting without the same stab. Recurrence drops when thoracic extension and gradual return to load are restored rather than jumping straight back to max bench. Persistent unexplained chest pain always warrants medical review — chest-wall calm can take weeks, but anything cardiac-suspicious skips the conservative queue entirely.",
    faqs: [
      {
        question: "How do I know it is not my heart?",
        answer:
          "Cardiac symptoms differ — seek urgent care for crushing pain, sweating, or breathlessness. Reproducible local tenderness is more typically musculoskeletal, but we never guess with your safety.",
      },
      {
        question: "Can I still exercise?",
        answer:
          "Usually with modified pressing and twisting until irritability drops. Complete rest is rarely required for weeks.",
      },
      {
        question: "Do I need anti-inflammatories?",
        answer:
          "Ask your pharmacist or GP. We focus on mechanical drivers and movement; medication is a separate clinical decision.",
      },
      {
        question: "Why does it hurt to sneeze?",
        answer:
          "Sudden rib cage motion loads irritated joints. Improving mobility and brief bracing cues often helps.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "scheuermanns",
      "neck-pain",
      "subacromial-pain",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "rib-pain-breathing-osteopath-woolwich",
    keywords: [
      "Costochondritis / costovertebral pain Woolwich",
      "Costochondritis / costovertebral pain osteopath SE18",
      "costochondritis Woolwich",
    ],
  },
  {
    slug: "scheuermanns",
    title: "Scheuermann's / postural hyperkyphosis Treatment in Woolwich",
    shortTitle: "Scheuermann's / postural hyperkyphosis",
    region: "Thoracic",
    summary:
      "Rounded mid-back posture and end-of-day ache from Scheuermann’s or postural kyphosis — realistic mobility and strength, not forced straightening.",
    heroLine:
      "A structured look at scheuermann's / postural hyperkyphosis for SE18 patients — history, examination, and a plan you can follow. Local commuting, standing retail shifts, and desk hours in SE18 often shape how symptoms show up day to day.",
    symptoms: [
      "Rounded mid-back posture with aching after long sitting",
      "Limited extension and tight anterior chest soft tissue",
      "Fatigue through the thoracic spine during study or desk days",
    ],
    howWeHelp: [
      "Assess kyphosis pattern, extension tolerance, and soft-tissue tightness",
      "Mobilise thoracic segments and stretch anterior chest restriction",
      "Extension-bias exercise and desk setup that support posture without forcing it",
      "Discuss imaging or specialist input only when pain or curve progression warrants it",
    ],
    causes:
      "Scheuermann's kyphosis is a structural increase in thoracic curve that develops in adolescence; postural hyperkyphosis can look similar without the same bony change. Both can leave the mid-back stiff, tire easily in extension, and ache with prolonged sitting. Adult care focuses on mobility, posterior-chain strength, and load tolerance — not \"straightening\" the spine overnight.",
    whoAffected:
      "Teens, young adults, and adults who were told they have a \"rounded back\" present for ache or gym limitations. Desk-heavy roles amplify end-of-day fatigue. Neurological change or rapidly progressive deformity needs medical/spinal review.",
    whatToExpect:
      "We assess structural versus postural contributors, thoracic extension, and hip/shoulder mobility that compensate. Treatment includes hands-on mobility within comfort, extension-biased exercise, and desk strategies. Expectations stay realistic: comfort and capacity improve more than cosmetic curve change in adults. Posture goals stay realistic for your age and curve — no forced military straightening.",
    recoveryTimeline:
      "Symptom relief often builds over 6–12 weeks of consistent mobility and strength work. Maintenance habits matter more than short bursts of treatment. We review if pain pattern suggests something beyond postural load. Postural endurance builds slowly — we avoid shame-based stand-up-straight programmes.",
    faqs: [
      {
        question: "Can osteopathy reverse Scheuermann's?",
        answer:
          "Structural curves do not fully reverse in adults. We improve mobility, strength, and symptom control.",
      },
      {
        question: "Should I wear a brace?",
        answer:
          "Bracing decisions belong with specialists, usually in growing teens. Adults focus on exercise and ergonomics.",
      },
      {
        question: "Is deadlifting banned?",
        answer:
          "Not automatically. Technique and gradual loading often allow return; we modify when extension tolerance is low.",
      },
      {
        question: "Why does my neck hurt too?",
        answer:
          "Compensatory cervical extension is common with thoracic kyphosis. We treat both regions when linked.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "costochondritis",
      "non-specific-low-back-pain",
      "neck-pain",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "upper-back-pain-desk-workers-woolwich",
    keywords: [
      "Scheuermann's / postural hyperkyphosis Woolwich",
      "Scheuermann's / postural hyperkyphosis osteopath SE18",
      "scheuermanns Woolwich",
    ],
  },
  {
    slug: "non-specific-low-back-pain",
    title: "Non-specific low back pain Treatment in Woolwich",
    shortTitle: "Non-specific low back pain",
    region: "Lumbar",
    summary:
      "Common low-back ache without clear leg neurology — assessment-first osteopathy, load advice, and calm language for Woolwich patients.",
    heroLine:
      "Support for non-specific low back pain with osteopathy in Woolwich: assessment first, then tailored hands-on care.",
    symptoms: [
      "Aching or stiffness across the lower back without clear leg neurology",
      "Worse with prolonged sitting, first mornings, or awkward lifts",
      "Difficulty with bending, gardening, or getting out of the car smoothly",
    ],
    howWeHelp: [
      "Identify irritable lumbar patterns without over-labelling every ache",
      "Hands-on care for stiff segments and protective muscle guarding",
      "Simple load, sitting, and walking plans you can keep through the week",
      "Screen red flags and avoid unnecessary imaging when recovery is on track",
    ],
    causes:
      "Most low back pain has no single catastrophic finding on a scan — it is a sensitive, loaded system of joints, discs, and soft tissue reacting to sudden load, deconditioning, poor sleep, or stress. Desk blocks, awkward lifts, and weekend DIY after quiet weeks are classic Woolwich triggers. Protective spasm then makes every bend feel risky, which feeds avoidance and further stiffness. Red flags (saddle numbness, progressive weakness, fever, trauma) are uncommon but always screened before routine care. At Nguyen’s Osteopathic Clinic we treat the pattern and your real week — commute, lifting, and sleep — not a scary MRI word alone. Soft sofas, wallets in back pockets, and poor sleep amplify sensitivity even when the original lift was minor.",
    whoAffected:
      "Working-age adults, parents lifting toddlers, trades, and people returning to sport after inactivity are frequent visitors from SE18 and nearby. Elizabeth line and DLR commuters notice end-of-day ache that eases with walking then returns with long sits. People who have rested completely for days often feel stiffer when they restart. Night pain with fever, unexplained weight loss, or bowel/bladder change needs medical pathways first. Most mechanical patterns improve when load, sleep, and graded movement are rebuilt together. People who fear that every twinge means disc damage often avoid helpful movement and prolong stiffness.",
    whatToExpect:
      "Your first visit clarifies red-flag history, then examines lumbar, pelvic, and hip contributors. Hands-on care eases protective spasm and improves available motion; you leave with pacing for sits, lifts, and sleep that fits a real Woolwich week. Follow-ups track flare length and work capacity, adjusting the plan as irritability drops. Imaging is discussed when neurology or stalled recovery makes it useful — not by default. Sitting tolerance and lift confidence lead weekly goals so progress is visible.",
    recoveryTimeline:
      "Many acute flares ease over 2–6 weeks; recurrent patterns may need 6–12 weeks of guided rehab. Early wins are better sleep and shorter flares after sitting; later wins are lifting, commuting, and sport without the same bang. Recurrence drops when desk resets and hip hinge habits stick after settling. If progress stalls we revisit diagnosis and referral rather than repeating unchanged care. A small maintenance mobility and strength habit usually beats boom-bust DIY weekends. Keeping short daily walks during flare weeks usually shortens recovery better than bed rest.",
    faqs: [
      {
        question: "Do I need an MRI for ordinary back pain?",
        answer:
          "Usually not. Imaging is for red flags or stalled recovery, not routine reassurance.",
      },
      {
        question: "Is bed rest best?",
        answer:
          "Short relative rest then graded activity recovers faster than days in bed.",
      },
      {
        question: "Will cracking my back fix it?",
        answer:
          "Some people feel temporary relief; lasting change needs movement and load capacity too.",
      },
      {
        question: "Can stress make back pain worse?",
        answer:
          "Yes — stress sensitises pain systems. We still treat mechanical drivers while acknowledging that context.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "sciatica",
      "facet-syndrome",
      "si-joint-dysfunction",
      "lumbar-disc-radiculopathy",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "back-pain-woolwich-osteopathy",
    keywords: [
      "Non-specific low back pain Woolwich",
      "Non-specific low back pain osteopath SE18",
      "non specific low back pain Woolwich",
    ],
  },
  {
    slug: "lumbar-disc-radiculopathy",
    title: "Lumbar disc / radiculopathy Treatment in Woolwich",
    shortTitle: "Lumbar disc / radiculopathy",
    region: "Lumbar",
    summary:
      "Disc-related back and leg pain with pins and needles or nerve tension — nerve-friendly osteopathy and clear escalation when strength fades.",
    heroLine:
      "Support for lumbar disc / radiculopathy with osteopathy in Woolwich: assessment first, then tailored hands-on care. NHS staff and students are welcome — say if you need appointment times that fit shift patterns.",
    symptoms: [
      "Low-back pain with leg referral, pins and needles, or numbness",
      "Worse with sitting, bending, or coughing",
      "Walking or standing tolerance that shrinks on flare days",
    ],
    howWeHelp: [
      "Neurological screen of leg strength, sensation, and nerve tension",
      "Disc-friendly mobilisation and soft-tissue work away from sharp irritation",
      "Sitting, lifting, and walk-tolerance coaching while the flare settles",
      "Urgent pathway advice for progressive weakness or cauda equina signs",
    ],
    causes:
      "Lumbar disc irritation can sensitise a nerve root, producing back pain with or without dermatomal leg symptoms. Flexion-heavy lifting, prolonged sitting, and sudden load spikes are common triggers. Most disc-related patterns improve conservatively; the disc \"bulge\" on a scan is not always the whole story, which is why we examine function carefully.",
    whoAffected:
      "Adults in physical jobs, gym lifters, and desk workers with episodic back pain present often. True progressive neurological deficit or cauda equina symptoms need urgent care. We help distinguish irritable disc patterns from simple mechanical back pain.",
    whatToExpect:
      "Neurological screen, lumbar and pelvic assessment, and clear explanation come first. Treatment stays nerve-friendly — gentle mobilisation, soft-tissue care, and graded activity rather than aggressive end-range forcing. We plan sitting, driving, and lifting modifications that still keep you moving. Leg symptoms and walk distance decide progress; we escalate neurological change without delay.",
    recoveryTimeline:
      "Many disc-related radicular patterns improve over 6–12 weeks. Leg symptoms often lag behind back ease. Failure to progress, rising weakness, or new red flags triggers referral. Disc stories improve by walking and sleep first; progressive deficit is never wait-another-fortnight advice.",
    faqs: [
      {
        question: "Does a disc bulge mean I need surgery?",
        answer:
          "No. Most improve without surgery. Operations are for selected severe or progressive cases.",
      },
      {
        question: "Should I avoid bending forever?",
        answer:
          "No. We temporarily modify aggravating loads then rebuild bending tolerance.",
      },
      {
        question: "Is walking good for disc pain?",
        answer:
          "Usually yes in tolerable doses. It often calms symptoms better than long sitting.",
      },
      {
        question: "Can osteopathy push the disc back in?",
        answer:
          "We reduce irritation and improve movement; discs remodel with time and load, not a single \"pop.\"",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "sciatica",
      "non-specific-low-back-pain",
      "lumbar-stenosis",
      "piriformis-syndrome",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "lumbar-disc-pain-osteopath-woolwich",
    keywords: [
      "Lumbar disc / radiculopathy Woolwich",
      "Lumbar disc / radiculopathy osteopath SE18",
      "lumbar disc radiculopathy Woolwich",
    ],
  },
  {
    slug: "lumbar-stenosis",
    title: "Lumbar spinal stenosis Treatment in Woolwich",
    shortTitle: "Lumbar spinal stenosis",
    region: "Lumbar",
    summary:
      "Leg heaviness that builds on walking or standing and eases when you sit or lean forward — stenosis-aware pacing and mobilisation in SE18.",
    heroLine:
      "A structured look at lumbar spinal stenosis for SE18 patients — history, examination, and a plan you can follow.",
    symptoms: [
      "Leg heaviness or ache that builds with walking or standing",
      "Relief when you sit or lean forward on a trolley",
      "Shopping-distance limits that improve with rest positions",
    ],
    howWeHelp: [
      "Assess walking tolerance, extension irritability, and vascular vs neurogenic clues",
      "Flexion-biased mobilisation and soft-tissue ease for the lumbar corridor",
      "Pacing for shopping, hills, and standing tasks common in Woolwich life",
      "Discuss GP or imaging when walking distance collapses or neurological signs worsen",
    ],
    causes:
      "Lumbar spinal stenosis narrows space for nerves, often from age-related joint and disc change. Classic neurogenic claudication brings leg pain or heaviness with walking or standing that eases with sitting or bending forward. Not all walking leg pain is stenosis — vascular claudication and hip disease can mimic it — so history and exam matter.",
    whoAffected:
      "Adults over 60 are most commonly affected, though younger people with structural change can present. Shop workers and walkers who need frequent sitting breaks often seek help in SE London. Progressive neurological loss needs medical/surgical pathways.",
    whatToExpect:
      "We differentiate stenosis patterns, assess flexion-biased relief strategies, and improve hip and thoracic mobility that reduce demand on the lumbar canal during gait. Hands-on care is gentle; exercise emphasises tolerable walking progression and strength. We coordinate with GP when injection or surgical opinion is appropriate. Shopping and standing tolerance are better markers than chasing a perfect MRI story.",
    recoveryTimeline:
      "Symptom management is often measured in months, with gains in walking distance and sit-to-stand ease. Structural narrowing may persist on scans even as function improves. Escalation is considered when community walking remains severely limited. Standing and shopping distance are the truth serum — we adjust or refer when they shrink.",
    faqs: [
      {
        question: "Will osteopathy widen my spinal canal?",
        answer:
          "No. We improve how you move and load so symptoms are more manageable.",
      },
      {
        question: "Is cycling better than walking?",
        answer:
          "Flexed postures like cycling are often more comfortable. We use that as a bridge while building walking tolerance.",
      },
      {
        question: "Do I need surgery?",
        answer:
          "Only selected cases. Many people manage well with conservative care and pacing.",
      },
      {
        question: "Why is standing in queues so hard?",
        answer:
          "Extension narrows the canal further. Micro-flex strategies and strength work can help.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "sciatica",
      "lumbar-disc-radiculopathy",
      "facet-syndrome",
      "non-specific-low-back-pain",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "back-pain-woolwich-osteopathy",
    keywords: [
      "Lumbar spinal stenosis Woolwich",
      "Lumbar spinal stenosis osteopath SE18",
      "lumbar stenosis Woolwich",
    ],
  },
  {
    slug: "spondylolysis",
    title: "Spondylolysis / spondylolisthesis Treatment in Woolwich",
    shortTitle: "Spondylolysis / spondylolisthesis",
    region: "Lumbar",
    summary:
      "Extension-biased lumbar pain in sport or heavy work — protected loading and staged return when stress-fracture risk is on the table.",
    heroLine:
      "Practical assessment and a clear plan for spondylolysis / spondylolisthesis — so you understand the driver and the next steps. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Extension-biased lumbar pain in sport or heavy loading",
      "One-sided low-back ache after cricket, gymnastics, or repeated overhead work",
      "Stiffness that settles with rest but returns when extension volume rises",
    ],
    howWeHelp: [
      "Screen extension-load history in sport or heavy work",
      "Calm irritable lumbar segments while protecting healing timelines",
      "Graded return to extension, running, or lifting with clear stop rules",
      "Coordinate imaging or sports-medicine review when stress fracture risk is high",
    ],
    causes:
      "Spondylolysis is a stress reaction or fracture of the pars interarticularis, sometimes with slip (spondylolisthesis). Extension and rotation sports — cricket bowling, gymnastics, football — raise risk. Pain typically worsens with bending backwards. Early load management protects healing; ignoring it can prolong bone stress.",
    whoAffected:
      "Adolescents and young athletes are classic presentations; adults can have chronic pars defects with mechanical pain. Parents and coaches in Woolwich often bring active teens with extension-related backache. Night pain or neurological change needs broader medical review.",
    whatToExpect:
      "We screen for bone-stress risk, modify extension-heavy training, and build core and hip strength in safer ranges. Hands-on care addresses protective spasm without forcing extension. Referral for imaging occurs when suspicion is high or progress stalls. Sport return waits on pain-free extension milestones, not calendar guesswork.",
    recoveryTimeline:
      "Bone stress healing may need several months of guided loading. Return-to-sport is staged, not calendar-only. Chronic mechanical pain with old defects can still improve with strength and movement coaching over 8–12 weeks. Bone stress healing is staged; early bravado in extension sports is how these relapse.",
    faqs: [
      {
        question: "Can I keep playing while it heals?",
        answer:
          "Sometimes with modified roles; high-risk extension sports often need a pause. We individualise with your goals and imaging.",
      },
      {
        question: "Is a brace required?",
        answer:
          "Not always. Decisions follow specialist advice when used; many cases progress with load modification alone.",
      },
      {
        question: "Will it always slip?",
        answer:
          "Not every pars defect progresses to meaningful slip. Monitoring and smart loading matter.",
      },
      {
        question: "Can osteopathy heal the fracture?",
        answer:
          "Bone healing is biological. We create the right load environment and treat related soft-tissue pain.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "facet-syndrome",
      "non-specific-low-back-pain",
      "si-joint-dysfunction",
      "hamstring-strain",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "sports-injury-osteopath-woolwich",
    keywords: [
      "Spondylolysis / spondylolisthesis Woolwich",
      "Spondylolysis / spondylolisthesis osteopath SE18",
      "spondylolysis Woolwich",
    ],
  },
  {
    slug: "facet-syndrome",
    title: "Facet joint / extension-pattern LBP Treatment in Woolwich",
    shortTitle: "Facet joint / extension-pattern LBP",
    region: "Lumbar",
    summary:
      "Sharp low-back catches with bending backwards or twisting — facet-friendly mobilisation and morning-lock strategies in Woolwich.",
    heroLine:
      "Extension catches and morning lock in the low back deserve targeted facet-friendly care, not generic rest advice.",
    symptoms: [
      "Sharp low-back catch with bending backwards or twisting",
      "Morning lock that eases once you move",
      "Local lumbar tenderness without strong leg neurological signs",
    ],
    howWeHelp: [
      "Reproduce extension and rotation patterns typical of facet irritability",
      "Mobilise stiff segments and ease deep lumbar guarding",
      "Desk-to-standing transitions and sleeping positions that reduce morning lock",
      "Refer on if night pain, fever, or neurological change sits outside this pattern",
    ],
    causes:
      "Facet (zygapophyseal) joints can become irritable with extension and rotation, producing well-localised unilateral low back pain that eases with flexion. Sudden gardening, overhead work, or gym extension moves may trigger flares. Facet patterns often coexist with disc and muscle contributors, so we treat the movement problem, not only the joint name.",
    whoAffected:
      "Active adults and older patients with extension-biased pain present commonly. People who stand long hours or sleep prone may notice morning catch. Progressive neurological symptoms are not typical of simple facet pain and need reassessment.",
    whatToExpect:
      "Assessment reproduces extension-rotation pain carefully, then hands-on techniques reduce joint irritability and soft-tissue guarding. You learn which positions to dose and how to rebuild extension tolerance gradually. Hip mobility work often reduces lumbar demand. Morning lock and extension tolerance guide how often we need to see you.",
    recoveryTimeline:
      "Many facet flares settle in 2–6 weeks. Recurrent patterns need strength and habit changes to stick. We escalate if pain becomes constant, night-dominant, or neurologically progressive. Extension tolerance usually returns before perfect mornings — we pace gardening and DIY accordingly.",
    faqs: [
      {
        question: "Do facet injections replace osteopathy?",
        answer:
          "Injections are sometimes used medically. We still rebuild movement and strength so relief lasts.",
      },
      {
        question: "Should I avoid bending backwards forever?",
        answer:
          "No. Temporary modification then graded return is the goal.",
      },
      {
        question: "Why is twisting painful?",
        answer:
          "Facets guide rotation. Irritated joints protest combined extension-rotation until calming and reloading occur.",
      },
      {
        question: "Can a mattress cause facet pain?",
        answer:
          "Sleep position matters more than brand. We trial simple changes before expensive replacements.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "spondylolysis",
      "si-joint-dysfunction",
      "sciatica",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "morning-back-stiffness-osteopath",
    keywords: [
      "Facet joint / extension-pattern LBP Woolwich",
      "Facet joint / extension-pattern LBP osteopath SE18",
      "facet syndrome Woolwich",
    ],
  },
  {
    slug: "si-joint-dysfunction",
    title: "Sacroiliac joint dysfunction Treatment in Woolwich",
    shortTitle: "Sacroiliac joint dysfunction",
    region: "Pelvis & Hip",
    summary:
      "One-sided pelvic or buttock pain on stairs, cars, or single-leg stance — careful SI assessment so sciatica labels are not assumed.",
    heroLine:
      "One-sided pelvic pain on stairs or getting out of the car — we assess load transfer before chasing a sciatica label.",
    symptoms: [
      "One-sided buttock or pelvic pain with stairs or getting out of the car",
      "Discomfort rolling in bed or standing on one leg to dress",
      "Pain that can mimic sciatica but often stays above the knee",
    ],
    howWeHelp: [
      "Test pelvic symmetry, load transfer, and lumbar contribution carefully",
      "Gentle sacroiliac and hip soft-tissue techniques matched to irritability",
      "Advice for stairs, getting out of cars, and one-sided standing habits",
      "Distinguish pregnancy-related pelvic pain and true radicular mimics",
    ],
    causes:
      "Sacroiliac joint pain is often localised near the dimples of Venus and linked to asymmetric load, pregnancy-related ligament change, or force-closure deficits in the pelvic girdle. Stepping off a kerb awkwardly, single-leg sport, or carrying a toddler on one hip can flare it. True inflammatory sacroiliitis needs medical pathways; mechanical SI patterns respond to load and motor control care.",
    whoAffected:
      "Peripartum patients, runners, and people with leg-length or gait asymmetry present often in Woolwich. Desk workers who cross legs habitually may notice one-sided buttock pain. Fever, night sweats, or inflammatory red flags prompt GP referral.",
    whatToExpect:
      "We assess pelvic landmarks carefully without over-claiming \"out of place\" narratives, then treat soft tissue and joints while rebuilding glute and trunk control. Advice covers sleep positions, walking progression, and temporary load tweaks. Belts are considered selectively, not by default. Stairs, cars, and single-leg stance become the practical tests between visits.",
    recoveryTimeline:
      "Mechanical SI pain often improves over 3–8 weeks with consistent rehab. Pregnancy-related patterns may fluctuate until postpartum recovery progresses. Persistent inflammatory suspicion is not managed as simple mechanical pain alone. Pelvic load transfer rebuilds with uneven days; we watch stairs and single-leg tasks closely.",
    faqs: [
      {
        question: "Can the SI joint \"go out\"?",
        answer:
          "The joint moves very little. Symptoms are usually about irritation and control, not a dramatic dislocation.",
      },
      {
        question: "Do I need an SI belt?",
        answer:
          "Sometimes short-term for peripartum instability feelings. Strength and pacing matter more long term.",
      },
      {
        question: "Is this the same as sciatica?",
        answer:
          "Not always. SI pain is often local; sciatica refers down the leg. We differentiate on assessment.",
      },
      {
        question: "Can I keep running?",
        answer:
          "Often with reduced volume and surface changes while irritability settles.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "piriformis-syndrome",
      "coccydynia",
      "sciatica",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "sacroiliac-joint-pain-woolwich",
    keywords: [
      "Sacroiliac joint dysfunction Woolwich",
      "Sacroiliac joint dysfunction osteopath SE18",
      "si joint dysfunction Woolwich",
    ],
  },
  {
    slug: "coccydynia",
    title: "Coccydynia Treatment in Woolwich",
    shortTitle: "Coccydynia",
    region: "Lumbar",
    summary:
      "Tailbone pain that shortens sitting and meetings — cushion strategies and gentle pelvic care at our Woolwich clinic.",
    heroLine:
      "Coccydynia care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement.",
    symptoms: [
      "Tailbone pain worse with sitting or rising from a chair",
      "Discomfort on hard seats, bikes, or long meetings",
      "Local coccyx tenderness that makes desk days shorter",
    ],
    howWeHelp: [
      "Assess sitting tolerance, pelvic floor guarding, and lumbar contribution",
      "Gentle coccyx-region and pelvic soft-tissue care when indicated",
      "Cushion, sit-stand, and toilet-position strategies for daily relief",
      "Flag trauma, infection, or unexplained weight-loss pathways promptly",
    ],
    causes:
      "Coccydynia is pain at the tailbone that flares with sitting, rising from a chair, or hard seats after a fall, childbirth, cycling, or weeks of unforgiving office chairs. Local soft tissue, pelvic floor guarding, and lumbar or sacroiliac contributors can keep the area sensitised long after the original knock. People often lean to one side, shorten meetings, and avoid trains — which then stiffens the surrounding pelvis and prolongs the problem. Rarely, infection, fracture non-union, or other pelvic pathology mimics simple coccyx pain, so we take trauma history, bowel change, fever, and unexplained weight loss seriously rather than labelling every seat ache as “just the tailbone.” At our Woolwich clinic we look at how you sit, how the pelvis loads on stairs, and whether lumbar referral is amplifying local tenderness.",
    whoAffected:
      "Post-partum patients, cyclists, and people after slips on ice or stairs present frequently from Plumstead, Thamesmead, and the Woolwich Arsenal area. Desk workers on hard chairs and drivers on long SE London routes notice end-of-day spikes. Hypermobile patients and those with pelvic floor tension after pregnancy may struggle with toilet positions and soft sofas alike. Night pain with fever, progressive neurological change, or bowel/bladder red flags need medical review first — osteopathy is not the front door for those pathways.",
    whatToExpect:
      "Assessment includes sitting tolerance, pelvic and lumbar contribution, and gentle hands-on care that respects coccyx irritability — we avoid aggressive direct trauma unless specifically indicated and consented. Cushion strategies (U-shaped or wedge), sit-stand mixing, and graded sitting rebuild desk and meeting capacity. Home advice covers toilet posture, bike saddle volume, and how to rise from chairs without a sharp jolt. Follow-ups measure sitting minutes and night comfort; we discuss GP or specialist pathways for persistent post-trauma cases rather than promising endless cushions alone.",
    recoveryTimeline:
      "Many cases ease over 4–12 weeks when load and pelvic mobility improve together. Post-partum recovery may track pelvic healing and sleep interruption. Early wins are longer comfortable sits and less dread of hard seats; later wins are commuting, cycling, and full workdays. Chronic sitting pain needs habit change as much as treatment sessions — sitting minutes climb before long meetings feel easy, and trauma red flags skip routine pacing entirely.",
    faqs: [
      {
        question: "Do I need a doughnut cushion?",
        answer:
          "A U-shaped or wedge cushion can help short term. We trial practical options before expensive kit.",
      },
      {
        question: "Is internal treatment required?",
        answer:
          "Not routinely. Most people improve with external care and load advice; specialists decide if internal approaches are indicated.",
      },
      {
        question: "Can I cycle?",
        answer:
          "Often after saddle and volume adjustments. Early return on a painful saddle delays settling.",
      },
      {
        question: "Why is sitting worse than walking?",
        answer:
          "Direct pressure loads the coccyx. Walking spreads load — we use that in your plan.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "si-joint-dysfunction",
      "non-specific-low-back-pain",
      "piriformis-syndrome",
      "facet-syndrome",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "coccyx-tailbone-pain-osteopath-woolwich",
    keywords: [
      "Coccydynia Woolwich",
      "Coccydynia osteopath SE18",
      "coccydynia Woolwich",
    ],
  },
  {
    slug: "hip-oa",
    title: "Hip osteoarthritis Treatment in Woolwich",
    shortTitle: "Hip osteoarthritis",
    region: "Pelvis & Hip",
    summary:
      "Groin or deep hip ache with hills, socks, and morning stiffness — osteopathy and load advice that keep SE18 walks possible.",
    heroLine:
      "Support for hip osteoarthritis with osteopathy in Woolwich: assessment first, then tailored hands-on care. We connect clinic findings to your real week so advice fits Woolwich life, not a generic leaflet.",
    symptoms: [
      "Groin or deep hip ache with walking, hills, or putting on socks",
      "Morning stiffness that eases then returns after longer walks",
      "Reduced rotation and a limp on busier days",
    ],
    howWeHelp: [
      "Map hip range, walking tolerance, and lumbar referral overlap",
      "Mobilise stiff hip capsules and ease peri-articular soft tissue",
      "Load advice for hills, stairs, and SE London commuting distances",
      "Discuss GP, imaging, or injection pathways when function plateaus",
    ],
    causes:
      "Hip osteoarthritis involves joint cartilage change, stiffness, and activity-related groin or deep lateral hip pain. Morning stiffness that eases then returns after longer walks, hills, or putting on socks is typical. Previous cam/pincer morphology, heavy physical work, and age-related change contribute; secondary gluteal weakness and lumbar referral amplify the story. Greater trochanteric pain and FAI-type pinch can coexist or mimic OA, so we localise groin versus outer-hip drivers carefully at Nguyen’s Osteopathic Clinic in Woolwich. Imaging labels help when they change decisions; function still leads day-to-day planning. Car transfers, low sofas, and soft mattresses can all provoke the same deep ache when rotation range and glute endurance are limited.",
    whoAffected:
      "Adults over fifty, previous athletes, and people with standing or lifting jobs present often. Grandparents who want Thames Path walks and drivers who struggle getting in and out of cars are common. People who avoid walking for fear of “wearing the joint out” often decondition faster — sensible load usually helps more than total rest. Rapidly progressive night pain, unexplained weight loss, or true locking needs medical pathways. Most mechanical hip OA patterns still improve walking and sock-reach with strength and pacing even when X-rays stay imperfect.",
    whatToExpect:
      "We assess gait, rotation range, single-leg control, and lumbar contribution. Treatment builds hip and glute endurance, eases secondary soft tissue, and coaches hill and sit-to-stand pacing for real SE18 errands. Hands-on care supports comfort; we avoid forcing into painful end-range pinch. Injection or surgical timing is discussed when function remains limited after fair conservative care. Sock reach, car transfers, and walking distance lead the plan so progress is visible week to week. We also review walking aids and footwear when they would improve confidence on uneven Woolwich pavements without encouraging total avoidance.",
    recoveryTimeline:
      "Gains often appear over 6–12 weeks. Structural change remains; function is the target. Early wins are dressing and shorter flares after walks; later wins are hills and longer SE18 errands. Recurrence of flare weeks is expected after heavy days — we shorten recovery and escalate if walking capacity keeps declining despite rehab. Maintenance glute work after settling helps protect the gains you worked for. Patients who keep short daily walks during flare weeks usually regain distance faster than those who rest completely for a fortnight.",
    faqs: [
      {
        question: "Is walking bad for hip OA?",
        answer:
          "Usually helpful in tolerable doses. Sudden hills or long spikes can flare — we dose progression.",
      },
      {
        question: "Will osteopathy regrow cartilage?",
        answer:
          "No. We improve how the joint is loaded and how surrounding tissues share work.",
      },
      {
        question: "Do I need a hip replacement?",
        answer:
          "Only when pain and function stay unacceptable despite appropriate care. We help you gather that picture with your GP.",
      },
      {
        question: "Can swimming help?",
        answer:
          "Yes — low-impact loading suits many hips. We match stroke choices to your irritability.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "greater-trochanteric-pain",
      "femoroacetabular-impingement",
      "si-joint-dysfunction",
      "knee-oa",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Hip osteoarthritis Woolwich",
      "Hip osteoarthritis osteopath SE18",
      "hip oa Woolwich",
    ],
  },
  {
    slug: "greater-trochanteric-pain",
    title: "Greater trochanteric pain syndrome Treatment in Woolwich",
    shortTitle: "Greater trochanteric pain syndrome",
    region: "Pelvis & Hip",
    summary:
      "Outer-hip pain on side-sleep and stairs — gluteal tendon load management, not hip-arthritis by default.",
    heroLine:
      "Side-sleep and stair pain on the outer hip often means tendon load, not hip arthritis by default.",
    symptoms: [
      "Lateral hip pain lying on that side or climbing stairs",
      "Tenderness over the greater trochanter you can point to",
      "Flare after hills, long walks, or sudden training spikes",
    ],
    howWeHelp: [
      "Confirm lateral hip tendon irritability versus lumbar referral",
      "Hands-on care for gluteal tendons and ITB-region tension",
      "Side-sleep, stair, and running-load modifications that calm flares",
      "Escalate if night pain or weakness suggests tear or other pathology",
    ],
    causes:
      "Greater trochanteric pain syndrome (GTPS) involves the gluteal tendons and bursal tissues on the outside of the hip — the bony point you can feel at the side. Side-lying sleep, sudden walking or running volume, weak hip abductor control, and pelvic drop on stairs commonly overload the tendon complex. It is often mislabelled as “hip bursitis” alone; tendon load capacity is usually the bigger story, and rubbing the bursal tissues without rebuilding strength rarely lasts. Lumbar referral, hip osteoarthritis, and ITB-related patterns can mimic lateral hip pain, which is why we screen the back and kinetic chain rather than treating the trochanter in isolation. At Nguyen’s Osteopathic Clinic in Woolwich we match hands-on ease with a graded loading plan so night pain and stairs improve together.",
    whoAffected:
      "Runners, walkers increasing distance for commuting or park runs, and middle-aged adults — especially women peri-menopause — present frequently across Greenwich borough. Side sleepers notice night pain that wakes them when they roll onto the sore hip. Desk workers who sit long then spike weekend hills, and parents carrying toddlers on one hip, often share the same outer-hip flare. Progressive night pain with weakness raising the leg, or pain that clearly tracks from the lower back into the thigh, needs a broader assessment — and sometimes imaging or GP input — rather than another foam-roll session.",
    whatToExpect:
      "Assessment tests tendon irritability, single-leg control, and lumbar contribution. Treatment combines soft-tissue care around the gluteal tendons with progressive loading — not endless rest or massage-only plans. Sleep position (pillows between knees), stair pacing, and training volume are adjusted in parallel so the tendon gets a calm base then a rebuild. When clinically suitable we discuss focused shockwave for stubborn tendon pain and explain fees before starting. Side-sleep comfort and stair count tell us whether load is landing right week to week.",
    recoveryTimeline:
      "Tendon-focused plans often need 8–12 weeks of consistent loading. Night pain usually settles before high-speed walking, hills, or return to running feel easy. Early wins are sleeping on the affected side again and fewer stair flares; later wins are longer Woolwich walks and sport without the same outer-hip bang. Recurrence drops when hip control and sensible volume spikes are maintained — skipping rehab after a quiet fortnight is the classic way GTPS returns.",
    faqs: [
      {
        question: "Should I stop walking completely?",
        answer:
          "Rarely. We reduce aggravating volume then rebuild. Complete rest deconditions the tendon.",
      },
      {
        question: "Is a steroid injection the fix?",
        answer:
          "Injections may calm flares but relapse without load rehab. We prioritise tendon capacity.",
      },
      {
        question: "Why does lying on that side hurt?",
        answer:
          "Direct compression irritates the tendon complex. Pillows and position changes help early on.",
      },
      {
        question: "Can osteopathy and shockwave combine?",
        answer:
          "Yes when clinically suitable. We screen first and explain fees before starting.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "hip-oa",
      "piriformis-syndrome",
      "itb-syndrome",
      "femoroacetabular-impingement",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "hip-bursitis-osteopath-woolwich",
    keywords: [
      "Greater trochanteric pain syndrome Woolwich",
      "Greater trochanteric pain syndrome osteopath SE18",
      "greater trochanteric pain Woolwich",
    ],
  },
  {
    slug: "femoroacetabular-impingement",
    title: "Femoroacetabular impingement / labral pain Treatment in Woolwich",
    shortTitle: "Femoroacetabular impingement / labral pain",
    region: "Pelvis & Hip",
    summary:
      "Groin pinch with deep squat, sit, or twist — FAI-aware mobility that never stretches into the catch.",
    heroLine:
      "A structured look at femoroacetabular impingement / labral pain for SE18 patients — history, examination, and a plan you can follow. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Pinch in the groin with deep squat, sit, or twist",
      "Sport or gym positions that catch at end range",
      "Stiffness after sitting that eases once you walk a little",
    ],
    howWeHelp: [
      "Assess flexion-adduction pinch, sport demands, and pelvic control",
      "Mobilise restricted planes without forcing into the pinch",
      "Technique and volume advice for gym, cycling, or twist sports",
      "Discuss imaging or ortho opinion when mechanical locking persists",
    ],
    causes:
      "FAI involves cam or pincer morphology that can pinch soft tissue at end-range hip flexion and rotation, producing groin pain with sitting, squatting, or cutting sports. Morphology alone does not equal symptoms — irritability and strength matter. Labral irritation may coexist.",
    whoAffected:
      "Young active adults in football, dance, and gym sports present often. Desk workers with deep hip flexion sitting can flare groin ache. Locking, giving way, or progressive restriction needs careful assessment and sometimes imaging pathways.",
    whatToExpect:
      "We assess range, strength, and aggravating positions, then treat secondary soft tissue while modifying deep flexion loads temporarily. Rehab builds control around the hip rather than forcing end-range. Surgical opinion is discussed when conservative care plateaus in suitable candidates. Pinch-free gym ranges set the pace — we will not stretch into the catch.",
    recoveryTimeline:
      "Symptom improvement often spans 8–12 weeks. Return to cutting sport is staged. Morphology remains; capacity and load management change the day-to-day experience. Pinch-free depth returns in layers; locking or giving-way earns imaging talk sooner.",
    faqs: [
      {
        question: "Does FAI always need keyhole surgery?",
        answer:
          "No. Many people manage well with rehab and activity modification.",
      },
      {
        question: "Are deep squats banned forever?",
        answer:
          "Not necessarily. We reduce depth while irritable, then rebuild tolerance.",
      },
      {
        question: "Can osteopathy fix the bone shape?",
        answer:
          "No. We change how you load and move around the existing anatomy.",
      },
      {
        question: "Why is sitting in low chairs painful?",
        answer:
          "Deep flexion can impinge irritable tissues. Seat height tweaks often help early.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "hip-oa",
      "greater-trochanteric-pain",
      "groin-pain",
      "si-joint-dysfunction",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Femoroacetabular impingement / labral pain Woolwich",
      "Femoroacetabular impingement / labral pain osteopath SE18",
      "femoroacetabular impingement Woolwich",
    ],
  },
  {
    slug: "piriformis-syndrome",
    title: "Deep gluteal / piriformis syndrome Treatment in Woolwich",
    shortTitle: "Deep gluteal / piriformis syndrome",
    region: "Pelvis & Hip",
    summary:
      "Deep buttock ache that mimics sciatica — lumbar screen first, then deep-gluteal soft-tissue and sitting tweaks.",
    heroLine:
      "A structured look at deep gluteal / piriformis syndrome for SE18 patients — history, examination, and a plan you can follow.",
    symptoms: [
      "Deep buttock ache that can refer toward the thigh",
      "Worse with prolonged sitting or wallet-in-back-pocket habits",
      "Pain that mimics sciatica but neurological screens often stay clear",
    ],
    howWeHelp: [
      "Separate deep gluteal myofascial pain from true lumbar radiculopathy",
      "Release guarded deep rotators and ease pelvic load transfer",
      "Sitting, wallet, and drive-time tweaks for buttock-dominant flares",
      "Neurological screen so nerve-root drivers are not missed",
    ],
    causes:
      "Piriformis-related or deep gluteal pain describes buttock irritability that can refer into the thigh and mimic sciatica. Prolonged sitting on the Elizabeth line, sudden sprint or hill work, and pelvic asymmetry commonly aggravate the deep external rotators. True lumbar nerve-root compression can look identical from the patient’s view, so we screen lumbar neurology carefully rather than stretching every buttock ache as “piriformis.” Sacroiliac and hip joint drivers also feed deep gluteal patterns we see at Nguyen’s Osteopathic Clinic. Naming the pattern matters because the wrong stretch into an irritable nerve root can prolong the problem. Wallets in back pockets and soft sofas that collapse the pelvis into a twist add daily irritation on top of commute sitting.",
    whoAffected:
      "Desk workers on long sits, runners, drivers, and people after awkward lifts present often from SE18 and nearby. Night pain with progressive leg weakness, saddle numbness, or bladder change is a red-flag lumbar pathway — not a stretch plan. Hybrid workers who sit all week then spike weekend hills notice the same deep buttock flare. Most mechanical deep gluteal patterns settle with load change, pelvic control, and graded exposure to sitting when lumbar radiculopathy is excluded.",
    whatToExpect:
      "We screen lumbar nerve roots, then assess hip and pelvic contributors and sitting tolerance. Care eases deep gluteal soft tissue, rebuilds hip control, and coaches sit-stand mixing for commute days. Nerve-friendly movement is used when neural tension is part of the picture; aggressive end-range stretches are avoided while irritability is high. Imaging talk follows atypical neurology or stalled recovery. Sitting minutes and walk tolerance lead weekly goals you can track between visits. When true radicular signs dominate, we shift emphasis to nerve-friendly pacing and lumbar assessment rather than deeper buttock stretching.",
    recoveryTimeline:
      "Many improve over 4–10 weeks. Early wins are longer comfortable sits; later wins are hills and desk days without the same buttock bang. If leg symptoms dominate or neurology progresses, we shift to sciatica or radiculopathy pathways and escalate rather than deepening stretches. Recurrence drops when commute sitting and weekend load spikes are managed after settling. Review points keep the plan honest. Graded exposure to longer sits after settling usually beats avoiding all commuting until symptoms vanish.",
    faqs: [
      {
        question: "Is piriformis syndrome the same as sciatica?",
        answer:
          "Not exactly. Symptoms can overlap; lumbar nerve roots must still be screened.",
      },
      {
        question: "Should I stretch the piriformis hard daily?",
        answer:
          "Aggressive stretching can irritate. We prefer dosed mobility and strength.",
      },
      {
        question: "Can a wallet cause this?",
        answer:
          "Bulky back-pocket wallets can aggravate sitting buttock pain. Simple habit change helps.",
      },
      {
        question: "Do I need an injection?",
        answer:
          "Rarely first-line. Most improve with mechanical care; specialists decide otherwise.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "sciatica",
      "si-joint-dysfunction",
      "greater-trochanteric-pain",
      "hamstring-strain",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "sciatica-woolwich-osteopath",
    keywords: [
      "Deep gluteal / piriformis syndrome Woolwich",
      "Deep gluteal / piriformis syndrome osteopath SE18",
      "piriformis syndrome Woolwich",
    ],
  },
  {
    slug: "hamstring-strain",
    title: "Hamstring strain / proximal tendinopathy Treatment in Woolwich",
    shortTitle: "Hamstring strain / proximal tendinopathy",
    region: "Pelvis & Hip",
    summary:
      "Sudden pulls or nagging proximal hamstring tendon pain — staged loading so runners and gym-goers return without re-tearing.",
    heroLine:
      "From sudden pulls to nagging proximal tendon pain — we stage loading so SE18 runners and gym-goers return without re-tearing.",
    symptoms: [
      "Sudden or gradual pain in the belly or origin of the hamstring",
      "Discomfort accelerating, lunging, or hinging at the hip",
      "Tightness that limits stride or gym deadlift confidence",
    ],
    howWeHelp: [
      "Grade the strain stage and check proximal tendon irritability",
      "Early protected movement then progressive strength loading",
      "Return-to-sprint or gym plans with clear re-injury stop rules",
      "Refer if suspected avulsion or stalled healing beyond expected timelines",
    ],
    causes:
      "Hamstring strains occur when fibres are overloaded in high-speed running, kicking, or sudden stretch under fatigue. Previous strain is the biggest risk factor. Proximal tendon pain behaves more like tendinopathy and needs different loading than a mid-belly muscle tear.",
    whoAffected:
      "Footballers, sprinters, and weekend athletes in Woolwich present often. Older athletes returning too fast after rest are vulnerable. Complete tears with major bruising and weakness need medical imaging pathways.",
    whatToExpect:
      "We stage healing: protect early irritability, then progressive strength and speed exposure. Hands-on care helps secondary spasm; rehab quality decides return-to-play. Lumbar and pelvic contributors are checked so recurrence risk drops. Sprint and hinge milestones decide clearance; reinjury risk beats bravado.",
    recoveryTimeline:
      "Mild strains may return in 2–4 weeks; moderate tears often need 6–12 weeks. Proximal tendon pain can take longer. Re-injury risk rises if speed is rushed. Reinjury risk peaks when speed returns early — we clear milestones, not wishful dates.",
    faqs: [
      {
        question: "When can I sprint again?",
        answer:
          "After strength and pain-free running progressions allow — not by a fixed calendar alone.",
      },
      {
        question: "Should I stretch a fresh tear?",
        answer:
          "Aggressive stretching early can worsen it. We guide safe mobility by stage.",
      },
      {
        question: "Is massage enough?",
        answer:
          "No. Strength and graded return-to-speed are essential to cut re-injury risk.",
      },
      {
        question: "Why does it keep coming back?",
        answer:
          "Incomplete rehab, fatigue, and sprint exposure errors are common. We rebuild capacity properly.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "piriformis-syndrome",
      "groin-pain",
      "si-joint-dysfunction",
      "patellofemoral-pain",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "football-muscle-strain-osteopath-se18",
    keywords: [
      "Hamstring strain / proximal tendinopathy Woolwich",
      "Hamstring strain / proximal tendinopathy osteopath SE18",
      "hamstring strain Woolwich",
    ],
  },
  {
    slug: "groin-pain",
    title: "Adductor-related groin pain Treatment in Woolwich",
    shortTitle: "Adductor-related groin pain",
    region: "Pelvis & Hip",
    summary:
      "Adductor pain with kicking, cutting, or squeeze tests — sport-aware osteopathy and clear hernia escalation when needed.",
    heroLine:
      "Adductor-related groin pain care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement.",
    symptoms: [
      "Adductor pain with kicking, cutting, or squeezing the knees",
      "Morning stiffness in the groin after sport days",
      "Tenderness along the inner thigh that flares with change of direction",
    ],
    howWeHelp: [
      "Differentiate adductor, hip-joint, and abdominal wall contributors",
      "Hands-on care for adductors and pelvic control soft tissue",
      "Kick, cut, and change-of-direction load management for sport return",
      "Escalate hernia or acute avulsion concerns to medical review",
    ],
    causes:
      "Groin pain in sport can involve adductors, hip joint, pubic symphysis, or referred lumbar-pelvic sources. Sudden change of direction, kicking, and spikes in training load are typical triggers. \"Osteitis pubis\" labels are overused — precise assessment guides loading.",
    whoAffected:
      "Football and racket-sport athletes, plus people with FAI-type hips, present often. Desk workers can have adductor irritability from sitting and then weekend sport. Systemic inflammatory disease is considered when pain is migratory or accompanied by morning stiffness elsewhere.",
    whatToExpect:
      "We differentiate hip joint versus soft-tissue drivers, then combine hands-on care with progressive adductor and trunk loading. Running and kicking volume are reshaped rather than stopped forever. Imaging is discussed when progress stalls or joint pathology is suspected. Kick and cut drills return only when adductor load is quiet on everyday walking.",
    recoveryTimeline:
      "Adductor-dominant patterns often need 6–12 weeks. Hip-joint driven groin pain follows joint irritability timelines and may need longer modification of deep flexion. Adductor capacity rebuilds with stutter steps; hernia concerns leave the osteopathy-only lane.",
    faqs: [
      {
        question: "Can I play through groin pain?",
        answer:
          "Playing through high irritability often prolongs it. Relative rest plus rehab is usually faster overall.",
      },
      {
        question: "Are squeezes enough rehab?",
        answer:
          "They are a start. Sport needs speed, change of direction, and trunk control progressions too.",
      },
      {
        question: "Is this a hernia?",
        answer:
          "Sometimes groin pain has hernia overlap. Atypical signs prompt medical assessment.",
      },
      {
        question: "Does osteopathy help pubic pain?",
        answer:
          "Yes for mechanical drivers — load advice and soft-tissue/joint care — alongside rehab.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "femoroacetabular-impingement",
      "hip-oa",
      "hamstring-strain",
      "si-joint-dysfunction",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "sports-injury-osteopath-woolwich",
    keywords: [
      "Adductor-related groin pain Woolwich",
      "Adductor-related groin pain osteopath SE18",
      "groin pain Woolwich",
    ],
  },
  {
    slug: "knee-oa",
    title: "Knee osteoarthritis Treatment in Woolwich",
    shortTitle: "Knee osteoarthritis",
    region: "Knee",
    summary:
      "Knee ache, stiffness, and crepitus with stairs and hills — quad-friendly care and honest talk about injections when plateaus hit.",
    heroLine:
      "A structured look at knee osteoarthritis for SE18 patients — history, examination, and a plan you can follow. We connect clinic findings to your real week so advice fits Woolwich life, not a generic leaflet.",
    symptoms: [
      "Knee ache and stiffness with stairs, hills, or rising from chairs",
      "Crepitus or swelling after longer walks",
      "Reduced bend that makes kneeling or garden work harder",
    ],
    howWeHelp: [
      "Assess swelling, range, and how stairs and hills load the joint",
      "Mobilise stiff knees and ease peri-patellar soft tissue",
      "Quad and pace advice that keeps you walking without grinding flares",
      "Coordinate with GP for imaging, injection, or surgical timing when needed",
    ],
    causes:
      "Knee osteoarthritis involves joint cartilage change, stiffness, and activity-related ache that often eases then returns with longer walks or stairs. Morning stiffness, crepitus, and reduced confidence on uneven SE18 pavements are common. Previous injury, excess load spikes, and age-related change contribute; secondary soft-tissue tension and hip weakness amplify disability more than many people expect. X-ray severity often poorly matches how limited you feel, so we treat walking tolerance and stair confidence — not only the film. Inflammatory arthritis and meniscal mechanical blocks can overlap and need different pathways, which is why assessment comes before a generic “arthritis stretches” sheet. Weather changes and longer supermarket walks often reveal capacity limits before constant pain does, which is why we measure function as carefully as discomfort.",
    whoAffected:
      "Adults over fifty, previous athletes, and people with physically demanding jobs present frequently from Greenwich borough. Grandparents who want longer park walks and shoppers who struggle with stairs are typical visitors. People who have “rested” for months often feel weaker and less confident even when pain is moderate. Hot, swollen multiple joints, night fever, or sudden locking after trauma need medical review. Most mechanical OA patterns still gain meaningful function with strength, pacing, and footwear advice even when structure remains changed. People told to “rest the joint” for months commonly arrive weaker and more fearful of stairs than when symptoms began.",
    whatToExpect:
      "Assessment measures range, strength, gait, and what tasks fail first — socks, stairs, or supermarket walks. Care builds quad and hip endurance, eases secondary soft tissue, and coaches pacing for hills and standing work. Hands-on mobilisation supports comfort without promising a “new knee.” Injection or surgical timing is discussed when function stays limited after a fair rehab trial, with clear questions you can take to your GP. Walking distance and stair confidence define success more than chasing zero ache on every weather day.",
    recoveryTimeline:
      "Comfort and task ease often improve over 6–12 weeks when strength and pacing run together. Structural OA remains; skill changes daily disability. Early wins are morning ease and shop trips; later wins are longer Woolwich walks without the same flare. Flare weeks still happen after heavy days — the aim is shorter recovery between them and a clear escalation path if walking capacity keeps falling. Maintenance strength after settling is part of the plan, not an optional extra. Flare plans that shorten rather than cancel walking usually keep people more active than boom-bust rest weeks.",
    faqs: [
      {
        question: "Does walking grind the joint away?",
        answer:
          "Appropriate walking is usually helpful. Sudden hills or very long spikes can flare symptoms.",
      },
      {
        question: "Are squats banned?",
        answer:
          "Not automatically. Depth and load are adjusted to irritability.",
      },
      {
        question: "Will osteopathy cure arthritis?",
        answer:
          "No. We reduce secondary stiffness and build strength around the joint.",
      },
      {
        question: "Do I need a knee replacement?",
        answer:
          "Only when pain and function remain unacceptable despite good conservative care.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "meniscal-injury",
      "hip-oa",
      "itb-syndrome",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Knee osteoarthritis Woolwich",
      "Knee osteoarthritis osteopath SE18",
      "knee oa Woolwich",
    ],
  },
  {
    slug: "patellofemoral-pain",
    title: "Patellofemoral pain syndrome Treatment in Woolwich",
    shortTitle: "Patellofemoral pain syndrome",
    region: "Knee",
    summary:
      "Front-of-knee pain with stairs, squats, or movie-theatre sitting — tracking and load advice before pain becomes the coach.",
    heroLine:
      "Support for patellofemoral pain syndrome with osteopathy in Woolwich: assessment first, then tailored hands-on care.",
    symptoms: [
      "Front-of-knee pain with stairs, squats, or prolonged sitting",
      "Movie-theatre stiffness that eases once you straighten the knee",
      "Discomfort when running hills or increasing training volume",
    ],
    howWeHelp: [
      "Map kneecap tracking irritability with squat and step tests",
      "Soft-tissue and patellar mobilisation plus hip-knee control work",
      "Running volume, stair, and desk-to-walk pacing advice",
      "Rule out inflammatory or acute traumatic knee red flags",
    ],
    causes:
      "Patellofemoral pain is front-of-knee or kneecap irritability that flares with stairs, hills, squats, or prolonged sitting with bent knees — the “movie theatre” sign. It is usually a load-capacity story in the joint between kneecap and femur, not “something floating out of place” that needs endless cracking. Hip weakness, sudden running volume, soft shoes on hard SE London pavements, and desk-to-weekend training spikes commonly drive it. True locking, marked swelling after trauma, or giving-way from instability points to other pathways — meniscus, ligament, or osteochondral injury — that we screen for carefully before building a kneecap load plan at Nguyen’s Osteopathic Clinic. Soft, unsupportive city shoes on hard pavements raise demand through the kneecap with every Arsenal stair climb, especially when hip endurance is already low from desk weeks.",
    whoAffected:
      "Runners, gym athletes, adolescents in growth spurts, and people who stand long retail shifts present often from Woolwich and Greenwich. Commuters who climb Arsenal stairs daily notice end-of-day ache that eases with rest then returns on the next hill. People returning to sport after exams or injury layoffs often spike volume too quickly. Sudden trauma with swelling, locking that needs a wriggle to unlock, or knee giving way needs assessment beyond a simple kneecap load plan. Most non-traumatic front-of-knee pain responds to graded loading when red flags are absent.",
    whatToExpect:
      "We test kneecap irritability, single-leg control, hip contribution, and footwear. Then we set a progressive quad and hip loading ladder with stair and squat modifications you can actually keep on workdays. Hands-on care addresses related soft tissue without pretending massage alone is the cure. Step-down height and running volume are staged carefully so flares shorten rather than disappear overnight. Imaging talk follows atypical trauma or stalled recovery. Stairs without the same front-knee bang and sit-to-stand comfort are the practical weekly goals.",
    recoveryTimeline:
      "Many improve over 6–12 weeks with consistent loading. Early wins are sitting-to-stand and fewer stair flares; later wins are hills and return to training. Recurrence drops when hip control and volume spikes stay managed after symptoms quiet. If locking or swelling appears, we pause the programme and escalate rather than grinding step-downs through a different problem. Patients who keep a small maintenance strength habit usually keep gains longer than those who stop the week pain fades. Keeping a twice-weekly strength habit after settling usually beats resting completely then jumping back to previous hill sessions.",
    faqs: [
      {
        question: "Should I stop running completely?",
        answer:
          "Sometimes briefly; often we reduce volume/speed instead. Complete rest alone rarely rebuilds capacity.",
      },
      {
        question: "Do I need special trainers?",
        answer:
          "Comfortable, reasonably supportive shoes help. Expensive custom kit is not first-line for everyone.",
      },
      {
        question: "Is the kneecap out of place?",
        answer:
          "Usually not. We improve how forces are shared rather than \"relocating\" the patella.",
      },
      {
        question: "Can osteopathy help movie-theatre knee?",
        answer:
          "Yes — we address sitting intolerance and rebuild load capacity for bent-knee positions.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "patellar-tendinopathy",
      "knee-oa",
      "itb-syndrome",
      "hip-oa",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "running-injuries-osteopath-woolwich",
    keywords: [
      "Patellofemoral pain syndrome Woolwich",
      "Patellofemoral pain syndrome osteopath SE18",
      "patellofemoral pain Woolwich",
    ],
  },
  {
    slug: "patellar-tendinopathy",
    title: "Patellar tendinopathy Treatment in Woolwich",
    shortTitle: "Patellar tendinopathy",
    region: "Knee",
    summary:
      "Pain at the base of the kneecap with jumping or deceleration — heavy-slow tendon loading timed to your training week.",
    heroLine:
      "Patellar tendinopathy care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Pain at the base of the kneecap with jumping or deceleration",
      "Morning tendon stiffness that warms then returns after sport",
      "Local tenderness on the patellar tendon rather than diffuse kneecap ache",
    ],
    howWeHelp: [
      "Confirm tendon-loading pain versus fat-pad or PFPS mimics",
      "Isometric then progressive tendon loading matched to sport demands",
      "Jump and squat volume caps while the tendon calms",
      "Discuss shockwave or imaging only when rehab plateaus",
    ],
    causes:
      "Patellar tendinopathy is load-related pain at the tendon below the kneecap, common in jumping sports. Energy-storage loading (jumping, sudden change of direction) exceeds tendon capacity. Rest alone often fails because tendons need progressive loading to adapt.",
    whoAffected:
      "Basketball, volleyball, and football athletes, plus gym athletes doing heavy plyometrics, present often. Adolescents can have related traction issues that need age-appropriate plans. Morning stiffness after hard sessions is common.",
    whatToExpect:
      "We confirm tendon versus fat-pad or PF joint drivers, then start progressive tendon loading — isometric then heavier strength — while adjusting jump volume. Hands-on care addresses secondary soft tissue; shockwave may be discussed for stubborn cases at our Woolwich clinic. Tendon load sessions are planned around your training week, not random rest days.",
    recoveryTimeline:
      "Tendon rehab commonly needs 8–12+ weeks. Pain during loading within agreed limits can be acceptable; sharp after-response guides dosing. Tendons hate boom-bust weeks — consistent load beats heroic rest-then-spike cycles.",
    faqs: [
      {
        question: "Is pain during exercises bad?",
        answer:
          "Mild–moderate tendon pain that settles by the next day is often acceptable in rehab. We set clear limits.",
      },
      {
        question: "Should I foam-roll the tendon?",
        answer:
          "Direct aggressive rolling on the tendon is usually unhelpful. Load progressions matter more.",
      },
      {
        question: "Can I keep competing?",
        answer:
          "Sometimes with reduced jump counts. High irritability may need a short competition pause.",
      },
      {
        question: "Does shockwave help patellar tendon pain?",
        answer:
          "It can for persistent cases after screening. We explain suitability and fees first.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "itb-syndrome",
      "knee-oa",
      "achilles-tendinopathy",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "patellar-tendinopathy-shockwave-woolwich",
    keywords: [
      "Patellar tendinopathy Woolwich",
      "Patellar tendinopathy osteopath SE18",
      "patellar tendinopathy Woolwich",
    ],
  },
  {
    slug: "acl-rehab",
    title: "ACL injury / post-reconstruction Treatment in Woolwich",
    shortTitle: "ACL injury / post-reconstruction",
    region: "Knee",
    summary:
      "Instability or post-reconstruction stiffness after ACL injury — criteria-based rehab aligned with surgeon protocols.",
    heroLine:
      "Acl injury / post-reconstruction care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement.",
    symptoms: [
      "Instability, giving way, or post-op stiffness after ACL injury",
      "Quad lag and swelling that limit stairs and pivots",
      "Confidence gaps with cutting, landing, or uneven Woolwich pavements",
    ],
    howWeHelp: [
      "Stage rehab to graft healing and surgeon protocols when present",
      "Restore range, quad control, and confidence with graded drills",
      "Sport-specific return criteria rather than calendar-only clearance",
      "Flag instability episodes or effusion spikes for clinical review",
    ],
    causes:
      "ACL injuries occur with cutting, landing, or collision mechanisms that stress the ligament. Post-injury or post-reconstruction rehab rebuilds strength, hop capacity, and confidence. Residual stiffness, quad lag, and fear of pivoting are common barriers.",
    whoAffected:
      "Footballers, skiers, and court-sport athletes present across SE London. Desk workers after ACL surgery need graded return to commuting and gym. Red-flag infection or DVT signs after surgery need urgent medical care.",
    whatToExpect:
      "We coordinate with surgical protocols when present, focusing on range, strength, gait, and later plyometric progressions. Hands-on care helps soft-tissue restrictions; gym programming is specific, not generic. Return-to-sport testing is criteria-based. Criteria-based return beats date-based clearance — swelling and quad lag decide.",
    recoveryTimeline:
      "Post-op ACL timelines often span 9–12+ months for pivoting sport. Non-operative management still needs months of strength and neuromuscular work. Rushing cutting drills raises re-injury risk. Swelling and quad lag veto calendar clearance every time.",
    faqs: [
      {
        question: "Do I always need ACL surgery?",
        answer:
          "Not always. Activity goals and instability episodes guide orthopaedic decisions.",
      },
      {
        question: "When can I run after reconstruction?",
        answer:
          "When strength, swelling, and movement criteria allow — commonly around 3–4 months, individualised.",
      },
      {
        question: "Can osteopathy replace physio protocols?",
        answer:
          "We complement criteria-based rehab. Surgical protocols still guide key milestones.",
      },
      {
        question: "Why is my quad so weak?",
        answer:
          "Inhibition after injury/surgery is common. Targeted strength is essential, not just walking.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "meniscal-injury",
      "patellofemoral-pain",
      "knee-oa",
      "hamstring-strain",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "return-to-sport-after-sprain-woolwich",
    keywords: [
      "ACL injury / post-reconstruction Woolwich",
      "ACL injury / post-reconstruction osteopath SE18",
      "acl rehab Woolwich",
    ],
  },
  {
    slug: "meniscal-injury",
    title: "Meniscal injury Treatment in Woolwich",
    shortTitle: "Meniscal injury",
    region: "Knee",
    summary:
      "Joint-line pain, catching, or effusion after a twist — calm the knee and know when true locking needs imaging.",
    heroLine:
      "Twist pain, catching, or effusion after an awkward turn — we calm the knee and know when locking needs imaging.",
    symptoms: [
      "Joint-line pain with twist, squat, or getting out of a low chair",
      "Catching, locking, or effusion after awkward turns",
      "Difficulty fully bending or straightening on flare days",
    ],
    howWeHelp: [
      "Assess locking, catching, and joint-line irritability carefully",
      "Calm effusion and restore safe range without forcing rotation",
      "Graded squat and pivot advice for work and sport return",
      "Discuss MRI or ortho pathways when true locking persists",
    ],
    causes:
      "Meniscal injury involves the cartilage shock absorbers in the knee — from acute twist trauma on sport or uneven pavement to degenerative tears with age and load. Pain along the joint line, swelling after pivots, and true locking or catching are classic clues. Not every joint-line ache is a tear that needs surgery; many degenerative patterns settle with strength and pacing. Ligament injury, patellofemoral pain, and referred hip pain can overlap, so we take trauma history and mechanical symptoms seriously before labelling at our Woolwich clinic. Deep squatting to low cupboards and twisting out of cars are everyday Woolwich triggers that keep degenerative meniscal tissue irritable even without sport.",
    whoAffected:
      "Athletes after twist injuries, adults with degenerative joint change, and people who kneel or squat heavily at work present often. Weekend football and awkward gets-out-of-a-car twists are common stories. Sudden inability to fully straighten, repeated locking, or a hot swollen knee after trauma needs timely medical or imaging pathways. Gradual joint-line ache without locking often still benefits from osteopathy-led load rehab while we watch for mechanical blocks that would change the plan. People who continue pivoting through a catching knee often prolong swelling and delay strength gains.",
    whatToExpect:
      "Assessment tests joint line tenderness, swelling, range, and locking history. Care rebuilds quad and hip control, eases secondary soft tissue, and stages squat and twist loads carefully. Hands-on work supports comfort; we do not force through a locked knee. Orthopaedic opinion is discussed for true locking, large traumatic tears, or stalled function after a fair trial. Stair and pivot confidence guide progress so you know when sport return is criteria-based rather than guessed.",
    recoveryTimeline:
      "Non-locking patterns often improve over 6–12 weeks. Early wins are daily walking and fewer after-squat flares; later wins are sport pivots when criteria allow. True locking or persistent mechanical block moves up the surgical conversation sooner. We review honestly so you are not guessing between rehab and referral. Maintenance strength after settling helps protect the knee on Woolwich pavements and stairs. Criteria-based return to sport — swelling quiet, control restored — protects better than calendar weeks alone.",
    faqs: [
      {
        question: "Does a meniscal tear always need keyhole surgery?",
        answer:
          "No. Many degenerative tears improve without surgery.",
      },
      {
        question: "Can I squat?",
        answer:
          "Often with modified depth and load while irritability settles.",
      },
      {
        question: "Why does it swell after walks?",
        answer:
          "Load exceeded current capacity. We adjust volume and build strength.",
      },
      {
        question: "Is clicking dangerous?",
        answer:
          "Painless clicking is common. Painful locking or giving way needs reassessment.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "knee-oa",
      "acl-rehab",
      "patellofemoral-pain",
      "itb-syndrome",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Meniscal injury Woolwich",
      "Meniscal injury osteopath SE18",
      "meniscal injury Woolwich",
    ],
  },
  {
    slug: "itb-syndrome",
    title: "Iliotibial band syndrome Treatment in Woolwich",
    shortTitle: "Iliotibial band syndrome",
    region: "Knee",
    summary:
      "Lateral knee pain that builds a few kilometres into a run — cadence and hill changes plus hip-knee control work.",
    heroLine:
      "Support for iliotibial band syndrome with osteopathy in Woolwich: assessment first, then tailored hands-on care.",
    symptoms: [
      "Lateral knee pain that builds with running or downhill walking",
      "Sharp discomfort a few kilometres into a run",
      "Tenderness where the ITB crosses the lateral femoral condyle",
    ],
    howWeHelp: [
      "Link lateral knee pain to hip control and training spikes",
      "Ease ITB-region tension and mobilise related hip/knee segments",
      "Cadence, hill, and mileage changes that reduce friction flares",
      "Screen for lateral meniscus or LCL mimics when history is atypical",
    ],
    causes:
      "Iliotibial band (ITB) related pain is typically lateral knee irritation in runners and cyclists from repetitive friction-load at the lateral femoral condyle as training volume rises. Hip abductor weakness, sudden mileage spikes, cambered roads around the Common, and old shoes on hard pavements commonly tip capacity over the edge. It is rarely “a tight band that must be foam-rolled harder”; load management and hip control matter more than aggressive rubbing. Lumbar referral and true joint line meniscal pain can mimic lateral knee ache — assessment separates them before you invent a new stretch routine. Downhill running and long descents from Woolwich Common amplify lateral knee load when hip control is already fatigued late in a session.",
    whoAffected:
      "Runners increasing distance, cyclists on long weekend rides, and military-style training blocks present often from Woolwich and Greenwich. Commuters who add park runs after desk weeks notice outer-knee ache that settles with rest then returns at a predictable mileage. Newer runners who jump distance too quickly are classic visitors. Trauma with swelling or locking is not classic ITB and needs a different pathway. Most training-error patterns settle when volume and hip control are rebuilt.",
    whatToExpect:
      "We confirm lateral knee load irritability, hip control, footwear, and training history across the last month. Care reduces aggravating volume briefly, then rebuilds hip endurance and graded run or cycle return with clear stage rules. Hands-on soft-tissue work supports comfort without endless aggressive ITB grinding that often irritates more than it helps. Cadence, surface, and shoe age are coached in parallel. Predictable pain-free distance is the weekly scoreboard. We may temporarily swap cambered road routes for flatter Thames Path segments while capacity rebuilds.",
    recoveryTimeline:
      "Many improve over 4–10 weeks when load is rebuilt sensibly. Early wins are daily walks without outer-knee sting; later wins are longer runs without the same bang at a fixed kilometre. Recurrence drops when mileage spikes and hip weakness are managed after symptoms quiet. If locking or joint-line swelling appears, we stop treating it as ITB and reassess. A small maintenance hip routine after settling usually beats boom-bust training. Building weekly distance in small steps after settling usually prevents the classic return of pain at the same kilometre mark.",
    faqs: [
      {
        question: "Should I foam-roll the ITB hard every day?",
        answer:
          "Aggressive rolling is often poorly tolerated and not the main fix. Strength and load management matter more.",
      },
      {
        question: "Do I need new shoes?",
        answer:
          "Worn-out shoes can contribute, but training error is usually bigger. We check both.",
      },
      {
        question: "Can I replace running with cycling?",
        answer:
          "Yes as cross-training if comfortable. We still rebuild running-specific capacity.",
      },
      {
        question: "Is surgery ever needed?",
        answer:
          "Rarely. Almost all cases are managed conservatively.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "greater-trochanteric-pain",
      "knee-oa",
      "shin-splints",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "running-injuries-osteopath-woolwich",
    keywords: [
      "Iliotibial band syndrome Woolwich",
      "Iliotibial band syndrome osteopath SE18",
      "itb syndrome Woolwich",
    ],
  },
  {
    slug: "lateral-ankle-sprain",
    title: "Lateral ankle sprain Treatment in Woolwich",
    shortTitle: "Lateral ankle sprain",
    region: "Ankle & Foot",
    summary:
      "Outer-ankle pain and swelling after a roll — early protected mobility, then hop tests that clear sport honestly.",
    heroLine:
      "A structured look at lateral ankle sprain for SE18 patients — history, examination, and a plan you can follow. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Pain and swelling on the outer ankle after a roll or invert",
      "Difficulty weight-bearing or trusting uneven ground",
      "Stiffness each morning in the first weeks after injury",
    ],
    howWeHelp: [
      "Grade ligament irritability and rule out fracture red flags",
      "Early protected mobility then progressive balance loading",
      "Return-to-walk and sport plans with brace advice when useful",
      "Refer for imaging if weight-bearing remains impossible or Ottawa rules positive",
    ],
    causes:
      "Lateral ankle sprains stretch or tear the outer ankle ligaments after inversion on uneven ground or in sport. Swelling and bruising vary with grade. Incomplete rehab — not the initial twist alone — predicts chronic instability.",
    whoAffected:
      "Footballers, netball players, and people who miss a kerb in Woolwich present often. Recurrent rollers need balance and strength work, not only rest and a tubigrip.",
    whatToExpect:
      "Early care manages swelling and protected mobility, then progressive strength, balance, and return-to-run or sport drills. Hands-on treatment helps residual stiffness. We screen for fracture risk when Ottawa rules suggest imaging. Single-leg balance and hop tests clear sport — not a hopeful ankle strap alone.",
    recoveryTimeline:
      "Mild sprains may settle in 1–3 weeks; moderate injuries often need 4–8 weeks for sport. Chronic instability rehab can take longer but responds well to neuromuscular training. Proprioception lags swelling; hop tests clear sport more honestly than it-feels-okay-walking alone.",
    faqs: [
      {
        question: "Should I wrap it tightly for weeks?",
        answer:
          "Short-term support can help; long-term dependency without rehab raises re-sprain risk.",
      },
      {
        question: "When can I run?",
        answer:
          "When walking is near normal, swelling is controlled, and hop progressions allow — individualised.",
      },
      {
        question: "Do I need an X-ray?",
        answer:
          "If you cannot weight-bear or have key bony tenderness, yes — we help you decide using standard rules.",
      },
      {
        question: "Why does it keep going over?",
        answer:
          "Ligament laxity plus poor balance/strength. Rehab targets that combination.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "achilles-tendinopathy",
      "shin-splints",
      "plantar-fasciitis",
      "hallux-rigidus",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "ankle-sprain-rehab-osteopath-woolwich",
    keywords: [
      "Lateral ankle sprain Woolwich",
      "Lateral ankle sprain osteopath SE18",
      "lateral ankle sprain Woolwich",
    ],
  },
  {
    slug: "achilles-tendinopathy",
    title: "Achilles tendinopathy Treatment in Woolwich",
    shortTitle: "Achilles tendinopathy",
    region: "Ankle & Foot",
    summary:
      "Morning Achilles stiffness and start-up pain on walks or runs — progressive calf loading for mid-portion or insertional flares.",
    heroLine:
      "Practical assessment and a clear plan for achilles tendinopathy — so you understand the driver and the next steps.",
    symptoms: [
      "Morning Achilles stiffness and pain at the start of walks or runs",
      "Tendon thickening or tenderness mid-portion or at the insertion",
      "Flare after hills, speed work, or a sudden jump in training",
    ],
    howWeHelp: [
      "Confirm mid-portion versus insertional Achilles irritability",
      "Heavy-slow resistance loading timed to your training week",
      "Hill, speed, and footwear tweaks that reduce morning stiffness",
      "Escalate rupture suspicion or insertional flares that worsen with stretch",
    ],
    causes:
      "Achilles tendinopathy is load-related pain in the tendon that connects your calf to the heel — usually from walking, running, or a sudden spike in calf demand after quiet weeks. Compression from uphill walking, stiff shoes, and long pavement days around Woolwich and Greenwich commonly keep the mid-portion irritable. Insertional pain near the heel behaves differently from mid-portion pain higher up the tendon, so footwear and stretch choices matter — aggressive calf stretching into a compressed insertional tendon often flares rather than helps. Sudden “weekend warrior” returns to park runs after desk weeks are a classic local trigger, as are shopping days in dress shoes after months of trainers. We rarely treat the Achilles in isolation at Nguyen’s Osteopathic Clinic: calf capacity, ankle stiffness, hip endurance, and how you push off on hills all feed the same story. Sudden calf swelling, inability to push off, or a loud pop needs urgent medical review for tear rather than another foam-roll session.",
    whoAffected:
      "Runners, walkers increasing distance for commuting, racquet-sport players, and desk workers who suddenly restart calf-heavy gym work present often from SE18 and nearby boroughs. People in stiff dress shoes on hard floors notice end-of-day ache that eases overnight then returns with the first steps after sitting. Masters athletes returning after injury layoffs and parents chasing toddlers on hills share similar load-error patterns. Progressive calf swelling, inability to push off, night throbbing with redness, or a sudden “pop” needs urgent medical review for tear or vascular pathways — not another stretch session. Age-related tendon change raises risk from mid-life, but training errors remain the usual driver we can change in clinic.",
    whatToExpect:
      "Assessment maps mid-portion versus insertional irritability, calf endurance, single-leg heel-raise capacity, and walking or running volume across a typical Woolwich week. Care combines relative rest of the worst loads with progressive tendon loading — not endless massage or complete rest that deconditions the tendon further. Hands-on work eases related calf and foot soft tissue while we coach hills, shoes, and return-to-run or return-to-walk steps in clear stages. Focused shockwave can be discussed for stubborn cases after clinical screening, with fees explained before starting. Morning first-step comfort, shopping tolerance, and hill walking guide progress more than a quiet day on the sofa. You leave each visit knowing which loads to keep, which to pause, and which drills rebuild capacity.",
    recoveryTimeline:
      "Tendon plans often need 8–12 weeks of consistent loading before high-speed walking or running feels trustworthy again. Early wins are quieter mornings and fewer after-walk flares; later wins are longer Thames Path walks and graded return to park runs. Recurrence drops when volume spikes are managed and calf capacity stays rebuilt after symptoms quiet. If progress stalls we revisit diagnosis, footwear, insertional versus mid-portion pattern, and whether shockwave or further medical input is the better next step rather than repeating unchanged sessions. Patients who keep a small maintenance load after settling usually keep gains longer than those who stop everything the week pain fades.",
    faqs: [
      {
        question: "Should I stretch my Achilles hard?",
        answer:
          "Aggressive stretching, especially insertional pain, can aggravate. Strength loading is usually preferred.",
      },
      {
        question: "Are heel raises enough?",
        answer:
          "They are central — progressed properly. Speed and energy-storage loads come later for athletes.",
      },
      {
        question: "Can I keep walking?",
        answer:
          "Usually yes with dose control. Complete rest weakens the tendon.",
      },
      {
        question: "Does shockwave help Achilles pain?",
        answer:
          "It can for persistent mid-portion cases. We assess suitability and explain fees first.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "shin-splints",
      "lateral-ankle-sprain",
      "patellar-tendinopathy",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "achilles-tendinopathy-shockwave-woolwich",
    keywords: [
      "Achilles tendinopathy Woolwich",
      "Achilles tendinopathy osteopath SE18",
      "achilles tendinopathy Woolwich",
    ],
  },
  {
    slug: "plantar-fasciitis",
    title: "Plantar Fasciitis & Heel Pain in Woolwich",
    shortTitle: "Heel pain",
    region: "Ankle & Foot",
    summary:
      "First-step heel pain and plantar fascia irritation — load advice, hands-on care, and focused shockwave when clinically suitable.",
    heroLine:
      "That sharp first-step heel pain does not have to run your mornings. We connect clinic findings to your real week so advice fits Woolwich life, not a generic leaflet.",
    symptoms: [
      "Sharp heel pain with the first steps of the day",
      "Ache after standing or walking shifts",
      "Tenderness under the inner heel",
      "Stiffness after sitting that eases then returns",
    ],
    howWeHelp: [
      "Assess foot, calf, and kinetic-chain loading",
      "Hands-on soft-tissue and joint work where useful",
      "Footwear and load-management advice",
      "Consider focused shockwave for stubborn cases",
    ],
    causes:
      "Plantar fasciitis (plantar heel pain) involves overload of the plantar fascia — the thick band under the foot that supports the arch. The classic story is sharp first-step pain on getting out of bed, then an ache that eases with walking and returns after long standing. Sudden walking volume, hard shop or warehouse floors, unsupportive footwear, tight calves, and body-load changes all contribute. In Woolwich and SE18 we often see retail, hospitality, teaching, and commuting patterns that keep the fascia loaded for hours without much recovery. The tissue is usually irritable rather than “torn,” which is why aggressive stretching or marathon foam-rolling can temporarily worsen symptoms. Hip and calf mechanics also matter: limited ankle dorsiflexion or weak hip control can push more stress into the heel with every step. At Nguyen's Osteopathic Clinic we treat the driver pattern — foot, calf, and kinetic chain — not only the sore spot under the heel.",
    whoAffected:
      "Teachers, retail and pharmacy staff, runners building mileage, and people who switch abruptly to flat shoes or minimal trainers present often. Standing occupations around Powis Street and Woolwich town centre are common. Night pain with whole-foot swelling, fever, or inability to weight-bear after trauma needs broader medical thought first. People with long-standing diabetes or numbness in both feet should mention that early so we can screen safely. If first-step pain has ruled your mornings for months, you are not alone — and you do not have to wait for a “perfect” rest week that never arrives before seeking assessment.",
    whatToExpect:
      "We assess foot, calf, and kinetic-chain load, then combine soft-tissue care, footwear advice, and progressive loading rather than endless rest. Temporary cushioning or a simple heel raise can help irritability settle while capacity rebuilds. Focused shockwave is considered for stubborn cases after clinical screening at Nguyen's Osteopathic Clinic — it is an option, not an automatic first step. You leave with clear rules for morning steps, standing breaks, and how far to push walking that week. First-step pain is our progress marker; we adjust load before you chase another gadget or orthotic that may not address the driver.",
    recoveryTimeline:
      "Many improve over 6–12 weeks of consistent load management; chronic cases can take longer, especially if standing hours stay high. First-step pain usually improves before long standing shifts feel easy — we keep loading honest through that lag so you do not spike volume the week symptoms first quieten. Early wins are fewer morning winces; later wins are full retail or teaching days and easy weekend walks. If progress stalls, we review footwear, calf capacity, and whether shockwave or medical input is the better next lever.",
    faqs: [
      {
        question: "Do I need expensive orthotics?",
        answer:
          "Not always. Temporary cushioning and load changes help many people; custom devices are selective.",
      },
      {
        question: "Should I walk barefoot at home?",
        answer:
          "If it spikes first-step pain, use supportive slippers short term while rehab builds.",
      },
      {
        question: "Are night splints mandatory?",
        answer:
          "Optional. Some sleep well with them; others prefer morning load routines we teach.",
      },
      {
        question: "Can shockwave help heel pain?",
        answer:
          "Yes for persistent plantar heel pain after screening. We discuss what to expect and fees.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "achilles-tendinopathy",
      "shin-splints",
      "morton-neuroma",
      "hallux-rigidus",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "plantar-fasciitis-shockwave-woolwich",
    keywords: [
      "plantar fasciitis Woolwich",
      "heel pain osteopath SE18",
      "shockwave heel pain Woolwich",
    ],
    featured: true,
  },
  {
    slug: "shin-splints",
    title: "Medial tibial stress syndrome Treatment in Woolwich",
    shortTitle: "Medial tibial stress syndrome",
    region: "Ankle & Foot",
    summary:
      "Medial shin ache that climbs with running volume — load and surface changes, with urgent rest when hop pain suggests bone stress.",
    heroLine:
      "Medial tibial stress syndrome care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement.",
    symptoms: [
      "Medial shin ache that builds with running volume",
      "Tenderness along the tibia after hard surfaces or new shoes",
      "Pain that may linger into daily walking on hotter training weeks",
    ],
    howWeHelp: [
      "Differentiate medial tibial stress from compartment or stress-fracture risk",
      "Ease calf and tibial soft-tissue overload with hands-on care",
      "Run volume, surface, and shoe progression that calms bone stress",
      "Urgent rest and imaging advice when focal hop pain suggests fracture",
    ],
    causes:
      "Medial tibial stress syndrome (\"shin splints\") is load-related pain along the shin from running or marching volume that outpaces bone and soft-tissue adaptation. Hard surfaces, sudden mileage jumps, and calf endurance deficits contribute. True stress fracture must be considered when pain becomes focal and progressive.",
    whoAffected:
      "New runners, military-style training, and athletes changing surfaces present often. Adolescents in growth spurts need careful dosing. Night pain and single-point bone tenderness raise stress-fracture suspicion.",
    whatToExpect:
      "We differentiate soft-tissue overload from bone stress risk, adjust running load, and build calf/foot capacity. Hands-on care eases secondary tightness. Imaging referral happens when bone stress is likely. Hop pain and run volume decide rest versus reload; bone stress always outranks pace goals.",
    recoveryTimeline:
      "Shin splints often settle in 3–8 weeks with load reshaping. Suspected stress fractures need longer relative rest and medical guidance. Bone stress rules out stubborn mileage goals; hop pain ends the negotiation.",
    faqs: [
      {
        question: "Can I run through shin splints?",
        answer:
          "Pushing through rising bone pain risks stress fracture. We modify early.",
      },
      {
        question: "Do better shoes fix it?",
        answer:
          "Shoes help some; training error is usually the main driver.",
      },
      {
        question: "Is it compartment syndrome?",
        answer:
          "Exertional compartment symptoms differ (tightness, neurological change). Atypical patterns get referred.",
      },
      {
        question: "Should I ice every night?",
        answer:
          "Ice can soothe; load management and strength decide recovery.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "achilles-tendinopathy",
      "plantar-fasciitis",
      "lateral-ankle-sprain",
      "itb-syndrome",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "shin-splints-osteopath-woolwich",
    keywords: [
      "Medial tibial stress syndrome Woolwich",
      "Medial tibial stress syndrome osteopath SE18",
      "shin splints Woolwich",
    ],
  },
  {
    slug: "hallux-rigidus",
    title: "Hallux rigidus / 1st MTP OA Treatment in Woolwich",
    shortTitle: "Hallux rigidus / 1st MTP OA",
    region: "Ankle & Foot",
    summary:
      "Stiff, painful big-toe push-off in city shoes — 1st MTP mobilisation and footwear tweaks for longer Woolwich walks.",
    heroLine:
      "Practical assessment and a clear plan for hallux rigidus / 1st mtp oa — so you understand the driver and the next steps. We connect clinic findings to your real week so advice fits Woolwich life, not a generic leaflet.",
    symptoms: [
      "Stiff, painful big-toe joint at push-off",
      "Dorsal bunions or swelling around the 1st MTP",
      "Difficulty in flexible city shoes or on longer walks",
    ],
    howWeHelp: [
      "Assess 1st MTP range, gait push-off, and footwear pinch",
      "Mobilise the stiff big-toe joint and ease intrinsic foot tension",
      "Shoe-rocker and activity tweaks for walking and gym days",
      "Discuss ortho opinion when end-stage stiffness limits daily life",
    ],
    causes:
      "Hallux rigidus is stiffness and osteoarthritis of the first metatarsophalangeal (big-toe) joint that limits the toe bend needed for push-off. Prior turf-toe style trauma, repetitive forefoot load in sport or standing work, and age-related joint change all contribute. As the joint loses extension, people roll the foot outward or shorten the stride, which can then irritate the knee, hip, or plantar fascia. Dorsal bony spurs and local swelling make flexible city shoes feel pinching on pavements around Woolwich and Greenwich. Inflammatory arthritis can look similar when joints are hot and multiple — that pathway needs medical care rather than footwear tips alone. We assess how much useful motion remains and how your gait is compensating, not only how “bad” an X-ray looks.",
    whoAffected:
      "Adults with forefoot pain on walking — especially uphill, on stairs, or in soft ballet-style flats — present often from SE18 and nearby. Dancers, court athletes, and people who stand long retail shifts may notice earlier stiffness. Middle-aged walkers increasing park-run volume commonly flare the joint before they notice knee ache from the altered push-off. Red, hot, or rapidly swelling joints, or sudden inability to bear weight after trauma, need medical or imaging pathways first.",
    whatToExpect:
      "We measure available 1st MTP range, watch gait push-off, and review the shoes you actually wear to work and on weekends. Hands-on care gently mobilises the stiff big-toe joint and eases intrinsic foot and calf tension that add to toe bend demand. Advice usually includes a stiffer sole or rocker profile, activity tweaks for hills and gym days, and strength cues so the knee and hip stop overcompensating. Surgical or orthopaedic opinion is discussed when end-stage stiffness still limits daily walking after a fair conservative trial — we explain that plainly rather than promising full motion return.",
    recoveryTimeline:
      "Comfort gains often appear over 4–10 weeks when footwear and load match the joint’s remaining motion. Structural stiffness may remain; the targets are push-off comfort, walking distance, and fewer upstream flares. Early wins are longer pavement walks in workable shoes; later wins are hills and workdays without shortening every stride. Success is measured in the shoes you live in — not barefoot clinic tests alone.",
    faqs: [
      {
        question: "Do I need surgery for a stiff big toe?",
        answer:
          "Not first-line. Many manage with footwear and rehab; surgery is for refractory cases.",
      },
      {
        question: "Are flexible ballet flats OK?",
        answer:
          "They often increase toe bend pain. A stiffer sole usually feels better.",
      },
      {
        question: "Can osteopathy restore full toe motion?",
        answer:
          "We improve available comfortable range; advanced OA may not regain full motion.",
      },
      {
        question: "Why do my knees hurt too?",
        answer:
          "Altered push-off changes knee load. We treat the chain, not only the toe.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "morton-neuroma",
      "achilles-tendinopathy",
      "knee-oa",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "osteoarthritis-joints-osteopath-woolwich",
    keywords: [
      "Hallux rigidus / 1st MTP OA Woolwich",
      "Hallux rigidus / 1st MTP OA osteopath SE18",
      "hallux rigidus Woolwich",
    ],
  },
  {
    slug: "morton-neuroma",
    title: "Morton's neuroma Treatment in Woolwich",
    shortTitle: "Morton's neuroma",
    region: "Ankle & Foot",
    summary:
      "Burning forefoot pain or a pebble-in-shoe feeling — width and cushion advice, with podiatry talk when nights burn.",
    heroLine:
      "A structured look at morton's neuroma for SE18 patients — history, examination, and a plan you can follow.",
    symptoms: [
      "Burning or electric pain under the forefoot between the toes",
      "Feeling of a pebble in the shoe when walking",
      "Worse in narrow footwear or after long pavement days",
    ],
    howWeHelp: [
      "Reproduce interdigital neuritis versus metatarsal stress patterns",
      "Gentle forefoot mobilisation and soft-tissue ease",
      "Width, cushioning, and lace advice for city walking shoes",
      "Coordinate with podiatry or imaging when night burning persists",
    ],
    causes:
      "Morton’s neuroma-type pain is irritation of an interdigital nerve in the forefoot — classically between the third and fourth toes — felt as burning, electric zaps, or a pebble stuck in the shoe. Narrow toe boxes, high heels, long pavement days, and sudden running volume raise forefoot compression. Plantar plate stress and metatarsal overload can produce a similar story, so not every interdigital ache is a true neuroma. Higher nerve sources from the lumbar spine or tarsal tunnel occasionally refer into the toes; we screen when numbness tracks with back pain or night burning that ignores shoe changes. At Nguyen’s Osteopathic Clinic we combine foot mechanics with practical footwear width advice rather than jumping straight to procedures.",
    whoAffected:
      "Adults in narrow fashion shoes, retail and hospitality staff on hard floors, runners, and court athletes present often across Woolwich and Greenwich. People who switch from wide trainers to dress shoes for commuting notice mid-week flares. Progressive numbness with lumbar symptoms, or night burning that wakes you despite roomy footwear, may suggest higher or more irritable neural drivers needing broader assessment and sometimes podiatry or imaging.",
    whatToExpect:
      "Assessment aims to reproduce interdigital symptoms, check metatarsal load, and screen for referral patterns. Hands-on care eases related forefoot and calf soft tissue; we then coach width, cushioning, and lace strategies for the shoes you wear on SE London pavements. Metatarsal padding can calm short-term irritability while load is rebuilt. Walking distance and flare after shopping or park runs guide progress; persistent night burning triggers a clear conversation about podiatry, imaging, or injection pathways rather than endless padding alone.",
    recoveryTimeline:
      "Footwear and load changes often help within 2–6 weeks when compression was the main driver. Stubborn neural pain may need 8–12 weeks and specialist input. Early wins are fewer pebble sensations in daily shoes; later wins are longer city walks and return to running surfaces that previously sparked burning. Escalating night pain or progressive numbness moves up the referral timeline — we do not stretch conservative care past the point of sense.",
    faqs: [
      {
        question: "Do I need an injection or surgery?",
        answer:
          "Not first. Many improve with shoes and load; procedures are for refractory cases.",
      },
      {
        question: "Are barefoot shoes helpful?",
        answer:
          "Sometimes poorly tolerated early. Width and cushioning usually matter more initially.",
      },
      {
        question: "Can neck or back nerves cause toe burning?",
        answer:
          "Occasionally. We screen when the pattern suggests higher referral.",
      },
      {
        question: "Should I stop running?",
        answer:
          "Reduce volume/surfaces that spike pain; complete stop is not always required.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "hallux-rigidus",
      "achilles-tendinopathy",
      "shin-splints",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "plantar-fasciitis-shockwave-woolwich",
    keywords: [
      "Morton's neuroma Woolwich",
      "Morton's neuroma osteopath SE18",
      "morton neuroma Woolwich",
    ],
  },
  {
    slug: "subacromial-pain",
    title: "Subacromial pain syndrome Treatment in Woolwich",
    shortTitle: "Subacromial pain syndrome",
    region: "Shoulder",
    summary:
      "Painful arc lifting the arm, worse at night on that side — cuff-friendly mobilisation and overhead load advice.",
    heroLine:
      "Support for subacromial pain syndrome with osteopathy in Woolwich: assessment first, then tailored hands-on care. Local commuting, standing retail shifts, and desk hours in SE18 often shape how symptoms show up day to day.",
    symptoms: [
      "Painful arc when lifting the arm out to the side or overhead",
      "Night pain when lying on the shoulder",
      "Difficulty with reaching, dressing, or gym pressing",
    ],
    howWeHelp: [
      "Test painful arc, cuff strength, and scapular contribution",
      "Mobilise stiff shoulder and thoracic segments within comfort",
      "Overhead and sleep-position load advice for work and gym",
      "Flag traumatic weakness or night pain that may need imaging",
    ],
    causes:
      "Subacromial pain describes irritable structures under the acromion — bursal tissue and cuff tendons — that flare with overhead reach, lying on the side, or repetitive elevation at work or the gym. It is often a load and control problem rather than a bone that must be “filed away.” Scapular upward rotation deficits, thoracic stiffness, and sudden painting or pressing volume commonly tip capacity over the edge. Frozen shoulder and cervical referral can look similar early on, so assessment separates global loss of rotation from a painful arc with preserved passive motion. We treat the driver of compression and load at our Woolwich clinic, not a single ultrasound buzzword, and we explain when imaging would change the plan versus when graded rehab should lead. Poor sleep positions and unsupported laptop work amplify the same compression pattern overnight, which is why night advice sits beside gym modifications in most plans.",
    whoAffected:
      "Desk and hybrid workers who then DIY overhead, gym athletes returning to pressing, painters, hair and beauty trades, and racket players present frequently from Woolwich and Plumstead. Side sleepers notice night pain that wakes them when they roll onto the sore shoulder. Rapid loss of all directions of motion with severe night pain suggests adhesive capsulitis pathways; trauma with inability to lift needs urgent review. Most mechanical subacromial patterns settle with load change and control work when red flags are absent, especially when thoracic mobility and scapular endurance are rebuilt together.",
    whatToExpect:
      "Assessment tests the painful arc, scapular control, thoracic contribution, and neck referral. Treatment eases irritability then rebuilds cuff and scapular endurance below the pinch, with hands-on care for surrounding soft tissue and mid-back mobility. We coach which presses and reaches to pause briefly and how to sleep without crushing the shoulder. Shockwave is less first-line here than for stubborn tendinopathy elsewhere, but we discuss options if progress stalls after a fair loading trial. Shelf-reach, dressing, and sleep comfort lead the weekly scoreboard so you can see change between visits.",
    recoveryTimeline:
      "Many cases improve over 6–12 weeks when load and scapular control improve together. Early wins are quieter nights and reaching into a cupboard; later wins are pressing and sport without the same arc flare. Recurrence drops when thoracic mobility and overhead volume stay sensible after symptoms settle. Persistent night pain with rapidly freezing motion earns a fresh diagnostic look rather than more of the same drills. We set clear review points so stalled progress triggers reassessment instead of habit. A short maintenance routine for scapular endurance after settling usually prevents the classic boom-bust return when DIY or gym volume rises again.",
    faqs: [
      {
        question: "Should I stop all arm use?",
        answer:
          "No. Relative rest of aggravators plus graded loading works better than total rest.",
      },
      {
        question: "Do I need an ultrasound scan?",
        answer:
          "Not routinely. Imaging helps when progress stalls or tear is suspected clinically.",
      },
      {
        question: "Are resistance bands enough?",
        answer:
          "They help early; heavier progressive strength is often needed later.",
      },
      {
        question: "Can neck treatment help shoulder pain?",
        answer:
          "Yes when cervical referral contributes. We assess the link rather than assume.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "rotator-cuff-tear",
      "frozen-shoulder",
      "ac-joint-injury",
      "neck-pain",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "shoulder-pain-frozen-shoulder-woolwich",
    keywords: [
      "Subacromial pain syndrome Woolwich",
      "Subacromial pain syndrome osteopath SE18",
      "subacromial pain Woolwich",
    ],
  },
  {
    slug: "rotator-cuff-tear",
    title: "Rotator cuff tear Treatment in Woolwich",
    shortTitle: "Rotator cuff tear",
    region: "Shoulder",
    summary:
      "Weakness or night pain lifting the arm after trauma or wear — protected range, graded strength, and imaging timing when function collapses.",
    heroLine:
      "Rotator cuff tear care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement.",
    symptoms: [
      "Weakness or pain lifting the arm, especially after trauma or wear",
      "Night pain and difficulty sleeping on that side",
      "Loss of confidence with overhead or carrying tasks",
    ],
    howWeHelp: [
      "Screen tear size clues — drop arm, night pain, and strength loss",
      "Protect irritable cuff tissue while restoring safe range",
      "Graded strengthening matched to repair or conservative pathways",
      "Discuss ultrasound/MRI and ortho timing when function collapses",
    ],
    causes:
      "Rotator cuff–related shoulder pain spans tendinopathy through partial tears to larger tears after trauma or long wear. Overhead reach, night pain when lying on the side, and a painful arc lifting the arm are common patterns we see in Woolwich. Degenerative cuff change is frequent from mid-life; acute tears after a fall, bike crash, or heavy lift need clearer staging and sometimes earlier imaging. Neck referral and adhesive capsulitis can mimic cuff pain, so we screen the cervical spine and global shoulder stiffness rather than assuming every arc pain is a tear on a scan. At Nguyen’s Osteopathic Clinic we match care to irritability and function — not only the MRI label — because many partial tears still regain useful reach with graded rehab when red flags are absent.",
    whoAffected:
      "Adults with overhead work or gym habits, people after falls onto the arm, painters, and mid-life patients with gradual night pain present often across Greenwich borough. Desk workers who suddenly decorate ceilings or lift heavy luggage notice the same flare. Climbing and racket sports raise demand on the cuff and scapular team. Progressive weakness that stops you lifting the arm, trauma with deformity, or unexplained fever with night pain needs medical pathways first. Partial tears often improve with rehab; large traumatic tears in active people may need earlier orthopaedic opinion rather than months of hope alone. Shift workers and carers who lift repeatedly through the day often present with the same night pain pattern even without a single traumatic event.",
    whatToExpect:
      "We assess strength in key cuff positions, painful arc, night irritability, scapular control, and cervical contribution. Early care calms irritability with pendulum and scapular work, then rebuilds cuff and scapular control below the pinch height rather than forcing overhead range. Hands-on soft-tissue and gentle mobilisation support the plan without stretching into painful arcs. Imaging and surgical talk follow when weakness, trauma history, or stalled function make it clinically useful — we explain that in plain English before you decide. Sleep position, reach-to-shelf tasks, and dressing confidence set weekly goals you can measure at home.",
    recoveryTimeline:
      "Irritable cuff patterns often need 8–16 weeks of graded rehab. Early wins are night sleep and daily reach into a cupboard; later wins are overhead work and sport without the same arc bang. Partial tears frequently regain useful function without surgery when load is rebuilt carefully. Large traumatic tears or progressive weakness move up the referral timeline — we do not stretch conservative care past the point of sense. Review points are built in so you know whether you are tracking toward function or toward a specialist conversation. Keeping a light cuff and scapular routine two to three times weekly after settling usually protects gains better than complete rest followed by a sudden return to overhead pressing.",
    faqs: [
      {
        question: "Does every cuff tear need surgery?",
        answer:
          "No. Many degenerative tears improve with rehab. Acute traumatic tears with weakness need prompt specialist review.",
      },
      {
        question: "Can I still lift my arm if torn?",
        answer:
          "Often yes — other muscles compensate. We train smart patterns and avoid aggravating spikes.",
      },
      {
        question: "Will osteopathy stitch the tendon?",
        answer:
          "No. We improve comfort and function around the injury and guide medical escalation when needed.",
      },
      {
        question: "Why is night pain so bad?",
        answer:
          "Inflamed tendons protest compression in side-lying. Position changes and irritability control help.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "subacromial-pain",
      "frozen-shoulder",
      "shoulder-instability",
      "ac-joint-injury",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "gym-shoulder-injury-osteopath-woolwich",
    keywords: [
      "Rotator cuff tear Woolwich",
      "Rotator cuff tear osteopath SE18",
      "rotator cuff tear Woolwich",
    ],
  },
  {
    slug: "frozen-shoulder",
    title: "Frozen Shoulder Help in Woolwich",
    shortTitle: "Frozen shoulder",
    region: "Shoulder",
    summary:
      "Support for stiff, painful shoulders with reduced reach — careful assessment, graded mobility work, and adjunct options when suitable.",
    heroLine:
      "When the shoulder refuses to lift or rotate, early guidance can make daily tasks feel possible again. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Pain reaching behind your back or overhead",
      "Night pain when lying on the shoulder",
      "Gradual loss of movement over weeks or months",
      "Difficulty dressing, washing hair, or fastening a bra",
    ],
    howWeHelp: [
      "Confirm whether stiffness fits an adhesive capsulitis pattern",
      "Gentle osteopathic techniques within a comfortable range",
      "Home mobility and pacing that respect irritability",
      "Discuss shockwave or referral pathways when appropriate",
    ],
    causes:
      "Frozen shoulder (adhesive capsulitis) involves thickening and contracture of the shoulder capsule, with pain then progressive stiffness through elevation and rotation. It may follow minor trauma, surgery, or appear without a clear trigger. Diabetes and thyroid disease raise risk. Stages typically move from freezing (painful, range starting to fade) to frozen (stiffer, sometimes less irritable) to thawing (gradual return of motion). Protective muscle guarding around the shoulder blade and neck often amplifies day-to-day disability — reaching into a jacket, washing hair, or fastening a bra become the real measures of impact. At Nguyen's Osteopathic Clinic in Woolwich we distinguish frozen-shoulder patterns from rotator-cuff irritability and neck-referred pain so you are not doing the wrong home programme for months.",
    whoAffected:
      "Adults roughly 40–65, especially women and people with diabetes, present commonly across SE18 and nearby Greenwich borough. Attempting aggressive stretching in high-pain freezing phases often backfires and can set recovery back. Desk workers who sleep on the painful side and parents lifting toddlers frequently notice night pain first. Neck pathology can coexist and needs screening so we do not chase the shoulder alone. If you have fever, unexplained weight loss, or rapidly worsening neurological symptoms in the arm, medical review comes before routine osteopathy.",
    whatToExpect:
      "We identify stage, keep mobility work within tolerable ranges, and support sleep and daily function rather than forcing overhead reach. Hands-on care is gentle; home exercises respect irritability and often start with pendulum and short-arc drills. Shockwave or medical pathways (including injection discussion with your GP) are raised when appropriate — never as a sales add-on. Expectations emphasise months, not days. We track external rotation and sleep week by week so you can see real frozen-shoulder change, not just hope. You leave knowing which movements to keep and which to park until the irritable phase eases.",
    recoveryTimeline:
      "Natural history can span 12–36 months; good care improves comfort and function along the way without pretending to compress biology into a two-week miracle. Early-phase pain control and sleep matter more than forcing range. Frozen-shoulder phases move slowly; we celebrate range and sleep wins, not forced stretch milestones. Later thawing stages allow more progressive loading toward dressing, reaching, and sport-specific goals. If progress stalls or red flags appear, we review and refer rather than repeating identical sessions.",
    faqs: [
      {
        question: "Can you manipulate a frozen shoulder free?",
        answer:
          "Forced manipulation in irritable phases can worsen pain. We match technique to stage.",
      },
      {
        question: "Do steroid injections help?",
        answer:
          "Sometimes in painful phases via medical providers. We still guide movement care around them.",
      },
      {
        question: "Should I stretch hard daily?",
        answer:
          "Gentle, frequent mobility usually beats aggressive end-range pushing when pain is high.",
      },
      {
        question: "Will it thaw on its own?",
        answer:
          "Many do over time; guided care aims to reduce disability while that happens.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "subacromial-pain",
      "rotator-cuff-tear",
      "tennis-elbow",
      "shoulder-instability",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "shoulder-pain-frozen-shoulder-woolwich",
    keywords: [
      "frozen shoulder Woolwich",
      "stiff shoulder osteopath SE18",
      "adhesive capsulitis Woolwich",
    ],
    featured: true,
  },
  {
    slug: "shoulder-instability",
    title: "Shoulder instability Treatment in Woolwich",
    shortTitle: "Shoulder instability",
    region: "Shoulder",
    summary:
      "Apprehension or giving-way in overhead or contact positions — stabilising rehab that clears sport with drills, not calendar weeks.",
    heroLine:
      "Support for shoulder instability with osteopathy in Woolwich: assessment first, then tailored hands-on care.",
    symptoms: [
      "Apprehension or giving-way feeling in overhead or contact positions",
      "History of dislocation or repeated subluxation",
      "Guarding at end range and reduced trust in sport drills",
    ],
    howWeHelp: [
      "Assess direction of instability and apprehension carefully",
      "Stabilising soft-tissue care without forcing end-range stretch",
      "Sport and overhead return rules that rebuild confidence",
      "Refer recurrent traumatic dislocations for specialist opinion",
    ],
    causes:
      "Shoulder instability follows ligament or labral injury after trauma, or inherent laxity that lets the ball of the joint feel loose in certain positions. People describe apprehension, giving-way, or frank dislocation with overhead reach, contact, or end-range stretch. After a traumatic dislocation the joint needs proper acute reduction and screening; ongoing problems then come from weak cuff and scapular control plus fear of the next pop. Overhead and contact sports raise recurrence risk if neuromuscular control is not rebuilt. Atraumatic or hypermobility-related instability behaves differently — stretching into end range often makes it worse. At our Woolwich clinic we define the direction of instability and the positions that scare you before choosing any hands-on or rehab step.",
    whoAffected:
      "Young contact and overhead athletes — rugby, climbing, swimming, gymnastic-style training — present most often from Greenwich and surrounding boroughs. Hypermobile patients and people with repeated “partial pops” without a big trauma may have atraumatic instability. Desk workers after an old dislocation sometimes notice apprehension only when reaching for a high shelf or sleeping on that side. Neurological deficit, inability to move the arm after a new dislocation, or suspected fracture needs urgent care pathways — not a same-day osteopathy slot for reduction.",
    whatToExpect:
      "Once acute medical management is complete when required, we assess apprehension carefully and rebuild rotator cuff and scapular control, progressing into sport-specific positions only when control allows. Hands-on care treats secondary stiffness and surrounding soft tissue without stretching into unsafe ranges. You leave with clear rules for gym, contact, and sleep positions that week. Surgical opinion is discussed early for recurrent traumatic dislocations rather than delaying months of failed return-to-sport guesses. Clearance is criteria-based: apprehension tests and drills, not a quiet calendar week on the sofa.",
    recoveryTimeline:
      "First-time dislocations often need months of rehab before return to contact or overhead sport. Early wins are daily reach and sleep without guarding; later wins are sport drills without the same bang of fear. Recurrent traumatic instability may need earlier orthopaedic consideration. Atraumatic patterns improve when strength and position sense improve — not when flexibility increases. We review progress at set points so you are not guessing whether you are “ready.”",
    faqs: [
      {
        question: "Do I need surgery after one dislocation?",
        answer:
          "Not always. Age, sport, and bone/soft-tissue injury guide decisions with orthopaedics.",
      },
      {
        question: "Should I stretch my shoulder more?",
        answer:
          "Usually no — control and strength matter more than flexibility in instability.",
      },
      {
        question: "When can I return to sport?",
        answer:
          "When strength, apprehension, and skill tests allow — criteria-based, not guesswork.",
      },
      {
        question: "Can osteopathy put it back in place?",
        answer:
          "Acute dislocations belong in urgent care. We rehab after reduction and screening.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "rotator-cuff-tear",
      "subacromial-pain",
      "ac-joint-injury",
      "frozen-shoulder",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "gym-shoulder-injury-osteopath-woolwich",
    keywords: [
      "Shoulder instability Woolwich",
      "Shoulder instability osteopath SE18",
      "shoulder instability Woolwich",
    ],
  },
  {
    slug: "ac-joint-injury",
    title: "AC joint sprain / OA Treatment in Woolwich",
    shortTitle: "AC joint sprain / OA",
    region: "Shoulder",
    summary:
      "Pain on top of the shoulder after a fall or with cross-body reach — AC-aware early loading and deformity escalation.",
    heroLine:
      "Practical assessment and a clear plan for ac joint sprain / oa — so you understand the driver and the next steps. Local commuting, standing retail shifts, and desk hours in SE18 often shape how symptoms show up day to day.",
    symptoms: [
      "Pain on top of the shoulder near the AC joint",
      "Discomfort with cross-body reach, press-ups, or carrying straps",
      "Local swelling or a step deformity after a fall onto the shoulder",
    ],
    howWeHelp: [
      "Localise AC joint tenderness versus cuff or cervical referral",
      "Gentle AC and clavicular mobilisation as irritability allows",
      "Press, carry, and strap advice for early weeks",
      "Escalate high-grade separation or persistent deformity concerns",
    ],
    causes:
      "Acromioclavicular (AC) joint injuries occur from falls onto the tip of the shoulder, bike crashes, contact sport knocks, or heavy pressing that loads the joint between collarbone and acromion. Pain sits on top of the shoulder and flares with cross-body reach, press-ups, strap bags, and overhead press. Grades range from sprain to complete separation with a visible step deformity. Most lower-grade injuries settle with sensible protection and progressive loading; higher-grade separations and fractures need medical imaging and sometimes surgical pathways. Degenerative AC change can also ache with the same local tenderness without a fresh fall. We localise AC tenderness versus cuff or neck referral so care matches the true driver.",
    whoAffected:
      "Cyclists after falls, rugby and martial arts athletes, and gym athletes with pressing pain present often across SE London. Commuters who carry a heavy bag on one strap notice the same top-of-shoulder ache with degenerative AC joints. Significant deformity, numbness in the arm, or inability to lift after trauma needs urgent assessment for higher-grade injury or associated fracture — not a wait-and-see foam-roll plan.",
    whatToExpect:
      "Early visits protect irritable tissue, restore scapular and cuff control, and guide which carries and presses to pause. Hands-on care addresses surrounding soft tissue and gentle AC/clavicular mobilisation as irritability allows. We stage return to bench, push-ups, and strap loads rather than rushing aesthetics of the “bump.” Higher-grade separations or persistent deformity concerns are escalated for imaging or orthopaedic opinion. Press and carry tolerance lead the plan; cosmesis alone rarely decides surgery.",
    recoveryTimeline:
      "Mild sprains often improve in 2–6 weeks; higher grades take longer and need clearer staging. Early wins are sleep and daily reach without top-of-shoulder stab; later wins are pressing and contact drills without flare. Return to bench is stepwise — jumping back to previous loads is the classic re-irritation. Visible steps can remain even when function returns; we measure what you can do, not only how the shoulder looks in the mirror.",
    faqs: [
      {
        question: "Is the bump permanent after AC injury?",
        answer:
          "Some separations leave a visible step even when function returns. Function guides decisions more than cosmesis.",
      },
      {
        question: "Can I bench press?",
        answer:
          "Pause or modify early; we reintroduce when pain and control allow.",
      },
      {
        question: "Do I need an X-ray?",
        answer:
          "For significant trauma or deformity, yes. We help you decide based on presentation.",
      },
      {
        question: "Will osteopathy relocate the joint?",
        answer:
          "We treat soft tissue and restore function; higher-grade separations are not \"popped back\" in clinic.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "subacromial-pain",
      "rotator-cuff-tear",
      "shoulder-instability",
      "neck-pain",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "gym-shoulder-injury-osteopath-woolwich",
    keywords: [
      "AC joint sprain / OA Woolwich",
      "AC joint sprain / OA osteopath SE18",
      "ac joint injury Woolwich",
    ],
  },
  {
    slug: "tennis-elbow",
    title: "Tennis Elbow Treatment in Woolwich",
    shortTitle: "Tennis elbow",
    region: "Elbow & Wrist",
    summary:
      "Lateral elbow pain from gripping, lifting, or desk/mouse work — tendon loading advice and osteopathic care for forearm and shoulder drivers.",
    heroLine:
      "Elbow pain from tools, sports, or repetitive grip often needs more than rest alone.",
    symptoms: [
      "Pain on the outer elbow with gripping",
      "Ache lifting a kettle, bag, or tools",
      "Tenderness over the lateral epicondyle",
      "Symptoms linked to mouse use or racquet sports",
    ],
    howWeHelp: [
      "Assess elbow, wrist, and shoulder contribution",
      "Reduce irritable tissue load with graded plans",
      "Hands-on treatment for forearm and related joints",
      "Discuss shockwave for persistent tendinopathy",
    ],
    causes:
      "Tennis elbow (lateral elbow tendinopathy) is load-related tendon pain from gripping, lifting, and repetitive wrist extension — tools, mouse use, DIY, and racket sports included. The common extensor tendon at the outer elbow becomes irritable when volume spikes or recovery is thin. Sudden weekend projects, new gym gripping, or longer days on a mouse often trigger it. Rest alone rarely rebuilds capacity: the tendon needs progressive loading once irritability allows. Shoulder and scapular fatigue can dump extra demand into the elbow, which is why treating only the sore spot often fails. At Nguyen's Osteopathic Clinic in Woolwich we map grip tasks, desk setup, and sport demands so the plan matches your real week rather than a generic stretch sheet.",
    whoAffected:
      "Tradespeople, desk workers, racket athletes, and parents constantly lifting toddlers present frequently across SE18. Neck referral can mimic elbow pain — we screen so you are not loading the wrong region. Constant night pain with marked swelling, fever, or numbness into several fingers may need medical review first. People who have already tried complete rest and felt worse when they returned to tools overnight are classic candidates for a graded approach. NHS staff and students are welcome; say if shifts limit when you can attend.",
    whatToExpect:
      "We assess elbow, wrist, and shoulder contributors, then start progressive tendon loading while adjusting aggravating grips. Hands-on care eases forearm soft tissue and related joint stiffness; focused shockwave can be considered for persistent cases after screening. You leave knowing which daily tasks to modify and which loading drills to keep. Grip tasks and fees are scoped honestly — no endless courses without a review point. If imaging or injection discussion with your GP is more appropriate, we say so plainly.",
    recoveryTimeline:
      "Expect roughly 8–12 weeks for meaningful tendon adaptation in many cases; longer if gripping hours stay high. Early gains are daily kettle and mouse comfort; later gains are tools, training, and sport endurance. Grip strength returns in steps — we continue, space, or refer based on work tasks you still cannot do. A flare after a heavy DIY weekend does not always mean restarting from zero; we adjust load and keep the programme coherent.",
    faqs: [
      {
        question: "Should I wear a brace all day?",
        answer:
          "Counterforce braces can help short term during tasks. Rehab loading matters more long term.",
      },
      {
        question: "Is complete rest best?",
        answer:
          "Relative rest of aggravators plus progressive loading beats total rest.",
      },
      {
        question: "Can shockwave help tennis elbow?",
        answer:
          "Yes for stubborn tendinopathy after screening. We explain suitability and fees.",
      },
      {
        question: "Why does my shoulder get treated too?",
        answer:
          "Shoulder and scapular load sharing often drive elbow overload. We treat the chain.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "medial-epicondylalgia",
      "cubital-tunnel",
      "carpal-tunnel",
      "dequervains",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "tennis-elbow-shockwave-osteopath-woolwich",
    keywords: [
      "tennis elbow Woolwich",
      "lateral epicondylitis osteopath",
      "elbow pain Woolwich",
    ],
    featured: true,
  },
  {
    slug: "medial-epicondylalgia",
    title: "Medial epicondylalgia Treatment in Woolwich",
    shortTitle: "Medial epicondylalgia",
    region: "Elbow & Wrist",
    summary:
      "Inner-elbow pain with gripping, tools, or wrist flexion load — flexor-origin care and technique changes that cut peak strain.",
    heroLine:
      "A structured look at medial epicondylalgia for SE18 patients — history, examination, and a plan you can follow. Local commuting, standing retail shifts, and desk hours in SE18 often shape how symptoms show up day to day.",
    symptoms: [
      "Inner-elbow pain with gripping, lifting, or wrist flexion load",
      "Tenderness over the medial epicondyle after tool or gym days",
      "Morning stiffness that eases then returns with repeated grip work",
    ],
    howWeHelp: [
      "Confirm medial elbow tendon load versus ulnar nerve mimics",
      "Soft-tissue care and graded grip loading for the flexor origin",
      "Tool, mouse, and lift technique changes that cut peak strain",
      "Discuss imaging if medial instability or acute tear is suspected",
    ],
    causes:
      "Medial epicondylalgia — often called golfer’s elbow — is overload of the common flexor-pronator tendon on the inner elbow. Gripping tools, throwing, climbing, wrist-flexion heavy gym work, and sudden spikes in mouse or screwdriver volume commonly tip capacity over the edge. Like tennis elbow on the outside, the tissue needs graded loading rather than endless rest or only massage. Ulnar nerve irritation at the cubital tunnel can sit alongside or mimic medial elbow pain with tingling into the ring and little fingers — so we separate tendon from nerve drivers on assessment. Poor shoulder endurance and gripping with a flexed wrist raise peak strain at the medial epicondyle during real SE18 workdays.",
    whoAffected:
      "Tradespeople, climbers, throwers, racket players, and desk workers with aggressive gripping present often from Woolwich, Plumstead, and Greenwich. DIY weekends after quiet weeks are a classic flare trigger. Ring-and-little-finger tingling, night numbness, or hand clumsiness need ulnar-nerve screening rather than a pure tendon plan. Red, hot elbows or systemic joint pain suggest inflammatory pathways needing medical care.",
    whatToExpect:
      "Assessment confirms medial tendon irritability, screens ulnar nerve and cervical mimics, then sets a progressive grip-loading ladder with task modification for tools, mouse, and lifts. Hands-on forearm and shoulder care supports the reload without pretending soft tissue alone is the cure. When clinically suitable we discuss focused shockwave for stubborn tendon pain and confirm fees first. Grip and tool tasks set the weekly scoreboard; we review rather than grinding the same passive session forever.",
    recoveryTimeline:
      "Most mechanical patterns improve over 8–12 weeks with consistent loading and sensible grip volume. Early wins are morning stiffness easing and fewer after-work flares; later wins are full tool days and training without the same inner-elbow bang. Recurrence drops when work grips, climbing volume, and training spikes are managed. If progress stalls we revisit nerve contribution and referral options instead of adding months of unchanged care. Climbers and racket players who rebuild volume in steps usually return sooner than those who rest completely then jump back to previous grades. We set review points so you know when to progress grips versus when to hold the current level for another week.",
    faqs: [
      {
        question: "Is this the same as tennis elbow?",
        answer:
          "Similar tendon overload process on the inner elbow. Load progressions still apply.",
      },
      {
        question: "Do I need a scan?",
        answer:
          "Rarely first-line. Imaging if atypical nerve signs or stalled recovery.",
      },
      {
        question: "Can I keep lifting?",
        answer:
          "Often with modified grips and volumes while rehab progresses.",
      },
      {
        question: "Why are my ring and little fingers tingling?",
        answer:
          "That can suggest ulnar nerve involvement — we assess and adjust the plan.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "tennis-elbow",
      "cubital-tunnel",
      "carpal-tunnel",
      "dequervains",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "golfers-elbow-osteopath-woolwich",
    keywords: [
      "Medial epicondylalgia Woolwich",
      "Medial epicondylalgia osteopath SE18",
      "medial epicondylalgia Woolwich",
    ],
  },
  {
    slug: "cubital-tunnel",
    title: "Cubital tunnel syndrome Treatment in Woolwich",
    shortTitle: "Cubital tunnel syndrome",
    region: "Elbow & Wrist",
    summary:
      "Ring-and-little-finger tingling from sustained elbow flexion — cubital tunnel ease, night strategies, and hand-strength watch.",
    heroLine:
      "Ring-and-little-finger tingling from the elbow — we ease the cubital tunnel and fix the phone-and-desk flexion habits that feed it.",
    symptoms: [
      "Numbness or tingling into the ring and little fingers",
      "Worse with sustained elbow flexion — phone, driving, or desk lean",
      "Night symptoms or hand clumsiness on heavier weeks",
    ],
    howWeHelp: [
      "Map ulnar nerve irritability at the elbow versus neck referral",
      "Ease cubital tunnel soft tissue and avoid sustained elbow flexion",
      "Night splint and desk-arm position coaching",
      "Escalate progressive hand weakness or wasting promptly",
    ],
    causes:
      "Cubital tunnel syndrome irritates the ulnar nerve as it passes behind the medial elbow — the “funny bone” groove. Prolonged elbow flexion on phones, driving, desk leaning, or sleeping curled narrows the tunnel and sparks tingling into the ring and little fingers. Direct pressure on the groove (elbows on hard desks or car windows) adds to irritability. Cervical nerve-root referral and medial elbow tendinopathy can mimic or coexist, so dual screening matters before you blame “just the elbow.” Fluid retention, prior fractures, and repetitive flexion-extension work also feature in histories we hear at the Woolwich clinic.",
    whoAffected:
      "Desk workers on phones, drivers on the A2/A206 corridors, gamers, and people who lean on elbows during meetings present often. Trades who crawl or brace on elbows notice flares after long days. Progressive hand wasting, clawing, or clear weakness gripping needs timely medical and nerve-study pathways — not months of stretching into deeper flexion.",
    whatToExpect:
      "We map the sensory distribution, reduce sustained flexion and pressure, treat related soft tissue, and screen cervical contributors. Night positioning (soft wrap or towel limiting full bend) and desk-arm coaching are practical early steps. Hands-on care eases surrounding tension without forcing the nerve into irritable ranges. Referral for nerve studies or surgical opinion follows when weakness progresses or sensory symptoms stay severe despite habit change. Night numbness maps and hand strength decide how long to trial conservative care.",
    recoveryTimeline:
      "Mild sensory cases often improve over 3–8 weeks when flexion habits change. Early wins are quieter nights and fewer phone-flare zaps; later wins are full workdays without leaning-off the funny bone. Motor weakness timelines depend on severity and may need specialist care sooner. We do not stretch conservative timelines when strength is falling — numbness maps and grip decide the next step. Drivers and desk workers who change elbow lean and night curl usually keep gains; those who return to window-leaning on the commute often see tingling rebound within a fortnight. Book a review sooner if hand clumsiness appears — that is a different urgency than intermittent pins and needles alone.",
    faqs: [
      {
        question: "Should I wrap my elbow at night?",
        answer:
          "A soft towel wrap limiting full flexion can help some people. We trial simple options first.",
      },
      {
        question: "Is this carpal tunnel?",
        answer:
          "Different nerve and hand distribution. We distinguish on assessment.",
      },
      {
        question: "Can osteopathy cure nerve entrapment?",
        answer:
          "We reduce mechanical contributors; severe entrapment may need medical/surgical pathways.",
      },
      {
        question: "Why does phone use flare it?",
        answer:
          "Sustained elbow flexion narrows the cubital tunnel. Breaks and posture changes help.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "tennis-elbow",
      "carpal-tunnel",
      "medial-epicondylalgia",
      "cervical-radiculopathy",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "wrist-hand-pain-osteopath-se18",
    keywords: [
      "Cubital tunnel syndrome Woolwich",
      "Cubital tunnel syndrome osteopath SE18",
      "cubital tunnel Woolwich",
    ],
  },
  {
    slug: "carpal-tunnel",
    title: "Carpal tunnel syndrome Treatment in Woolwich",
    shortTitle: "Carpal tunnel syndrome",
    region: "Elbow & Wrist",
    summary:
      "Night tingling in thumb, index, and middle fingers — wrist and desk strategies, with nerve-study talk when numbness is constant.",
    heroLine:
      "Carpal tunnel syndrome care at Nguyen's: find the pattern, ease irritation, and rebuild confident movement. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Night tingling in the thumb, index, and middle fingers",
      "Hand numbness with keyboard, phone, or gripping tasks",
      "Shaking the hand for relief — classic early mornings",
    ],
    howWeHelp: [
      "Screen median nerve signs versus cervical radiculopathy mimics",
      "Gentle wrist and forearm soft-tissue care plus nerve glides as tolerated",
      "Keyboard, phone, and night-splint strategies for SE18 desk roles",
      "Refer for nerve studies or injection when numbness is constant",
    ],
    causes:
      "Carpal tunnel syndrome compresses the median nerve under the flexor retinaculum at the wrist. Classic early signs are night tingling in the thumb, index, and middle fingers that eases when you shake the hand. Fluid retention, pregnancy, repetitive wrist extension under load, vibrating tools, and sudden keyboard volume spikes commonly tip a vulnerable tunnel into symptoms. Neck referral (cervical radiculopathy) and proximal median nerve entrapment can mimic the same fingers — assessment separates wrist-dominant from neck-dominant patterns. Diabetes and thyroid disease also feature in histories that need medical partnership alongside mechanical care.",
    whoAffected:
      "Desk workers across Woolwich and Canary Wharf commutes, trades with vibrating tools, cyclists on sustained grips, and pregnant patients present frequently. Musicians and people who sleep with flexed wrists notice early morning numbness. Thenar wasting, constant daytime numbness, or dropping objects needs timely medical review and often nerve studies — osteopathy alone is not a stalling tactic for progressive loss.",
    whatToExpect:
      "We take a night-symptom history, screen cervical and forearm contributors, and examine wrist and median-nerve irritability. Care combines night positioning and splint advice where useful, task modification for keyboard and phone, and hands-on forearm/neck treatment when those drivers matter. Nerve-glide dosing stays within calm ranges. Escalation for nerve studies, injection, or surgical opinion follows severity — we explain that early rather than after months of unchanged tingling. Night symptoms and keyboard endurance guide whether splints and load change are enough.",
    recoveryTimeline:
      "Mild intermittent cases often improve over 4–8 weeks with night care and load changes. Early wins are fewer 3am wake-ups; later wins are full desk days without shaking the hand. Progressive neurological loss is not a wait-and-see osteopathy-only pathway. Constant numbness, weakness, or wasting earns referral talk without delay — we measure function honestly each review. Patients who keep the night-splint habit and keyboard breaks after symptoms settle usually keep gains longer than those who abandon both the week they feel better. If pregnancy-related swelling is part of the story, we plan around trimester demands and revisit after delivery rather than promising a fixed session count.",
    faqs: [
      {
        question: "Do I need surgery?",
        answer:
          "Not for mild intermittent symptoms. Constant numbness or wasting needs specialist review sooner.",
      },
      {
        question: "Will a wrist brace fix it?",
        answer:
          "Night braces help many early cases; daytime rehab and load changes still matter.",
      },
      {
        question: "Can neck treatment help hand tingling?",
        answer:
          "Yes when cervical contribution exists. We assess rather than assume wrist-only causes.",
      },
      {
        question: "Is typing permanently banned?",
        answer:
          "No. Breaks, setup, and symptom-guided volume usually allow continued work.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "dequervains",
      "cubital-tunnel",
      "cmc-oa",
      "neck-pain",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "rsi-wrist-forearm-office-osteopath",
    keywords: [
      "Carpal tunnel syndrome Woolwich",
      "Carpal tunnel syndrome osteopath SE18",
      "carpal tunnel Woolwich",
    ],
  },
  {
    slug: "dequervains",
    title: "De Quervain's tenosynovitis Treatment in Woolwich",
    shortTitle: "De Quervain's tenosynovitis",
    region: "Elbow & Wrist",
    summary:
      "Thumb-side wrist pain from lifting, phones, or new-parent handling — calm the first compartment, then rebuild grip carefully.",
    heroLine:
      "Thumb-side wrist pain from lifting, phones, or new-parent handling — calm the tendon, then rebuild grip without reinflaming it.",
    symptoms: [
      "Thumb-side wrist pain with lifting, wringing, or phone use",
      "Tenderness over the first dorsal compartment",
      "Pain picking up a child, kettle, or shopping bag",
    ],
    howWeHelp: [
      "Confirm first-compartment tendon irritability with Finkelstein-type load",
      "Calm thumb tendons with soft-tissue care and activity modification",
      "Lifting, phone, and new-parent handling tweaks that reduce flares",
      "Discuss injection or imaging if swelling and pain stall",
    ],
    causes:
      "De Quervain’s tenosynovitis irritates the thumb tendons (APL/EPB) in the first dorsal compartment at the wrist. Repetitive lifting with the thumb abducted, phone scrolling, wringing, and new-parent “mummy thumb” postures are classic drivers. The compartment becomes swollen and painful with hitchhiker’s hitch–type load, picking up a child under the arms, or lifting a kettle. Sudden spikes in caring load after quiet months overwhelm tendon capacity; complete rest then a hard return often restarts the cycle. CMC osteoarthritis and intersection syndrome can sit nearby — we localise which structure is irritable rather than treating every radial wrist ache the same way.",
    whoAffected:
      "New parents, grandparents sharing childcare, desk workers on phones, hair and beauty trades, and people using pinch grips all day present often from SE18. Postpartum hormonal and load changes make this especially common in the first year. Hot, swollen multiple joints or systemic inflammatory signs need medical care — De Quervain’s is usually a load story, not an autoimmune one, but mimics exist.",
    whatToExpect:
      "Assessment confirms first-compartment irritability (including Finkelstein-type load) and screens CMC and forearm contributors. We modify aggravating lifts — bring baby close, avoid awkward ulnar deviation — use relative rest of the worst tasks, then progressively reload the tendons. Hands-on forearm care and short-term splinting can calm early irritability while habits change. Phone and lift coaching continues until day-to-day grips no longer spark the same radial sting. Injection or imaging talk comes if swelling and pain stall despite a fair load trial.",
    recoveryTimeline:
      "Many improve over 4–8 weeks with consistent modification and graded reload. Early wins are kettle and phone tolerance; later wins are full childcare and work grips without the same flare. Recurrence drops when lift mechanics stay changed after symptoms quiet. New-parent weeks vary — we adjust load before chasing injections by default, and we revisit the plan if progress plateaus. Grandparents sharing sudden childcare blocks often need a slower ramp than they expect; we pace the first fortnight carefully so enthusiasm does not restart the compartment. If swelling stays marked despite fair load change, we discuss medical options rather than adding another month of the same advice.",
    faqs: [
      {
        question: "Do I need a steroid injection?",
        answer:
          "Sometimes for stubborn cases via medical providers. Many settle with load changes first.",
      },
      {
        question: "Can I still pick up my baby?",
        answer:
          "Yes with technique tweaks (bring baby close, avoid awkward ulnar deviation) while calming irritability.",
      },
      {
        question: "Is complete rest required?",
        answer:
          "Relative rest of aggravators beats total immobilisation for weeks.",
      },
      {
        question: "Why does phone scrolling hurt?",
        answer:
          "Repetitive thumb extension-abduction loads the same tendons. Dose and posture changes help.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "carpal-tunnel",
      "cmc-oa",
      "tennis-elbow",
      "medial-epicondylalgia",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "wrist-hand-pain-osteopath-se18",
    keywords: [
      "De Quervain's tenosynovitis Woolwich",
      "De Quervain's tenosynovitis osteopath SE18",
      "dequervains Woolwich",
    ],
  },
  {
    slug: "cmc-oa",
    title: "Thumb CMC osteoarthritis Treatment in Woolwich",
    shortTitle: "Thumb CMC osteoarthritis",
    region: "Elbow & Wrist",
    summary:
      "Base-of-thumb pain with jars, keys, and pinch — CMC mobilisation and splint advice for daily tasks in SE18.",
    heroLine:
      "A structured look at thumb cmc osteoarthritis for SE18 patients — history, examination, and a plan you can follow. Bring a short note of what eases or aggravates symptoms — that history shortens the first assessment.",
    symptoms: [
      "Pain at the base of the thumb with pinch and twist",
      "Difficulty opening jars, turning keys, or writing for long",
      "Morning ache that eases then returns with fine gripping",
    ],
    howWeHelp: [
      "Assess thumb base grind pain and functional pinch limits",
      "Mobilise stiff CMC joints and ease thenar soft tissue",
      "Jar-open, phone, and splint advice for daily tasks",
      "Coordinate with GP for injection or surgical timing when grip fails",
    ],
    causes:
      "Base-of-thumb (carpometacarpal) osteoarthritis changes the saddle joint that lets the thumb oppose for pinch and twist. Lifetime load, joint geometry, and previous injury contribute; secondary thenar soft-tissue tension and compensatory wrist postures add irritability. Pain shows up opening jars, turning keys, writing, and pinching phone edges — tasks that matter every day in SE London life. X-ray severity often poorly matches disability, so we treat what you cannot do, not only what the film shows. De Quervain’s tenosynovitis and scaphotrapezial joint pain can overlap — assessment localises the grind and pinch pattern carefully.",
    whoAffected:
      "Adults over fifty, especially women, present often from Woolwich and Greenwich. Craft workers, cooks, trades, and people writing or using phones all day notice day-long ache and morning stiffness that eases then returns with fine grip. Hot, swollen multiple joints or rapidly progressive deformity suggest inflammatory disease needing medical care alongside any mechanical plan.",
    whatToExpect:
      "We assess grind pain, functional pinch, and which daily tasks fail first. Care teaches joint-protection strategies, builds supporting muscle endurance, and eases secondary soft tissue around the thenar eminence and forearm. Practical aids for jars, pacing for writing, and splint advice for flare weeks are part of the plan. Medical options — longer-term splints, injection, or surgical timing — are discussed when grip still fails after a fair rehab trial. Jar-open and key-turn tasks define success more than chasing a perfect-looking joint.",
    recoveryTimeline:
      "Comfort and task ease often improve over 4–10 weeks when protection and strength run together. Structural OA remains; skill and pacing change daily disability. Early wins are morning ease and fewer jar flares; later wins are full work or craft days with fewer pinch spikes. We review honestly — if function stays limited, escalation is clearer than endless soft-tissue sessions alone. Flare weeks still happen after heavy cooking or DIY; the aim is shorter recovery between them, not a promise of zero ache forever. When injection or surgical timing becomes the better next step, we say so and help you prepare questions for your GP or hand specialist.",
    faqs: [
      {
        question: "Will my thumb joint disappear on X-ray?",
        answer:
          "Imaging can look dramatic while function still improves with good care. We treat you, not only the film.",
      },
      {
        question: "Are splints useful?",
        answer:
          "For aggravating tasks or nights, yes for many people. They support, not replace, strength work.",
      },
      {
        question: "Can osteopathy reverse CMC OA?",
        answer:
          "No. We reduce pain impact and improve how you use the hand.",
      },
      {
        question: "Should I stop gardening?",
        answer:
          "Modify tools and duration; complete avoidance is rarely needed long term.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "dequervains",
      "carpal-tunnel",
      "tennis-elbow",
      "medial-epicondylalgia",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "wrist-hand-pain-osteopath-se18",
    keywords: [
      "Thumb CMC osteoarthritis Woolwich",
      "Thumb CMC osteoarthritis osteopath SE18",
      "cmc oa Woolwich",
    ],
  },
  {
    slug: "fibromyalgia",
    title: "Fibromyalgia / central sensitisation Treatment in Woolwich",
    shortTitle: "Fibromyalgia / central sensitisation",
    region: "Whole body",
    summary:
      "Widespread aching, fatigue, and non-refreshing sleep — gentle osteopathy focused on pacing and calm, alongside GP pathways.",
    heroLine:
      "A structured look at fibromyalgia / central sensitisation for SE18 patients — history, examination, and a plan you can follow.",
    symptoms: [
      "Widespread aching with fatigue and non-refreshing sleep",
      "Flare days after small increases in activity or stress",
      "Tender regions that shift rather than a single injured joint story",
    ],
    howWeHelp: [
      "Validate widespread pain without chasing every tender point as injury",
      "Gentle osteopathic care focused on comfort and nervous-system calm",
      "Pacing, sleep, and flare-plan coaching rather than aggressive stretch",
      "Work with GP/rheumatology pathways for diagnosis and medication review",
    ],
    causes:
      "Fibromyalgia involves amplified pain processing with widespread tenderness, fatigue, and sleep disturbance — not joint destruction. Flare triggers include stress, poor sleep, and sudden activity spikes. It coexists with other MSK issues; local osteopathy still helps irritable regions within a whole-person plan.",
    whoAffected:
      "Adults with long-standing widespread pain, often women, present for local flares layered on systemic sensitivity. Red-flag neurological or inflammatory signs still need medical exclusion.",
    whatToExpect:
      "Sessions are gentler and shorter when sensitivity is high. We combine calming hands-on care with graded activity, sleep routine advice, and pacing — never pushing into major flares. GP and pain-service coordination remains important. Flare plans and sleep quality matter more than chasing every tender spot.",
    recoveryTimeline:
      "Improvement is measured in months of pacing and sleep gains, with fewer severe flares. Local MSK episodes may settle faster within that broader arc. Flare weeks still happen; pacing and sleep win over aggressive stretch courses.",
    faqs: [
      {
        question: "Is fibromyalgia \"all in my head\"?",
        answer:
          "No. Pain processing changes are real. Psychological stress can amplify symptoms without making them imaginary.",
      },
      {
        question: "Can hard deep tissue massage help?",
        answer:
          "Often too aggressive. Gentler, graded input usually suits higher sensitivity.",
      },
      {
        question: "Should I exercise?",
        answer:
          "Yes — carefully graded. Boom-bust spikes worsen flares.",
      },
      {
        question: "Will osteopathy cure fibromyalgia?",
        answer:
          "It can ease local MSK drivers and support pacing; medical and lifestyle care remain central.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "deconditioning",
      "non-specific-low-back-pain",
      "neck-pain",
      "osteoporosis",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "chronic-pain-osteopath-woolwich",
    keywords: [
      "Fibromyalgia / central sensitisation Woolwich",
      "Fibromyalgia / central sensitisation osteopath SE18",
      "fibromyalgia Woolwich",
    ],
  },
  {
    slug: "deconditioning",
    title: "General deconditioning / sedentary lifestyle Treatment in Woolwich",
    shortTitle: "General deconditioning / sedentary lifestyle",
    region: "Whole body",
    summary:
      "Breathlessness and global stiffness after long sedentary stretches — tiny sustainable activity ladders, not bootcamp shock.",
    heroLine:
      "After months of sitting, restarting movement should feel doable — tiny ladders, not bootcamp shock.",
    symptoms: [
      "Breathlessness or fatigue with modest hills and stairs",
      "Global stiffness after long sedentary stretches",
      "Low confidence restarting walking or light gym work",
    ],
    howWeHelp: [
      "Baseline strength, balance, and confidence after long sedentary periods",
      "Hands-on ease of stiff regions that block early re-entry to movement",
      "Tiny sustainable activity ladders — walks, sit-to-stand, light gym",
      "Screen medical barriers before pushing ambitious training loads",
    ],
    causes:
      "Deconditioning is reduced fitness, strength, and confidence after illness, pain flares, or long inactivity. Everyday tasks then feel harder, feeding a cycle of avoidance. It is reversible with graded exposure and strength — not a fixed identity.",
    whoAffected:
      "People after surgery, long COVID-type fatigue patterns, or chronic pain flare cycles present often. Jumping back into intense gym work too fast commonly rebounds.",
    whatToExpect:
      "We set a baseline you can repeat, then progress walking, strength, and joint mobility without heroic spikes. Hands-on care eases secondary stiffness. Plans respect medical advice from your GP when fatigue syndromes are complex. Sit-to-stand and walk minutes are the wins; we build capacity without bootcamp shock.",
    recoveryTimeline:
      "Noticeable capacity gains often appear over 6–12 weeks of consistency. Setbacks are expected; the skill is returning to the plan without all-or-nothing thinking. Capacity rises in small steps — bootcamp spikes are how people quit.",
    faqs: [
      {
        question: "Is pain during rebuilding dangerous?",
        answer:
          "Mild manageable discomfort can be OK; sharp or lasting flares mean we adjust dose.",
      },
      {
        question: "Do I need a gym membership?",
        answer:
          "No. Walking and simple home strength go far. Gym is optional.",
      },
      {
        question: "Can osteopathy replace exercise?",
        answer:
          "No. Hands-on care helps stiffness; capacity comes from graded activity.",
      },
      {
        question: "Why am I so tired after small efforts?",
        answer:
          "Deconditioning and sometimes post-viral fatigue. We progress in small repeatable steps.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "fibromyalgia",
      "osteoporosis",
      "non-specific-low-back-pain",
      "post-surgical-general",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "osteopathy-for-older-adults-woolwich",
    keywords: [
      "General deconditioning / sedentary lifestyle Woolwich",
      "General deconditioning / sedentary lifestyle osteopath SE18",
      "deconditioning Woolwich",
    ],
  },
  {
    slug: "osteoporosis",
    title: "Osteoporosis / low bone density Treatment in Woolwich",
    shortTitle: "Osteoporosis / low bone density",
    region: "Whole body",
    summary:
      "Low bone density, posture change, or fall fear — safe loading and balance work that respects fracture precautions.",
    heroLine:
      "Practical assessment and a clear plan for osteoporosis / low bone density — so you understand the driver and the next steps.",
    symptoms: [
      "Height loss, posture change, or history of low-trauma fracture",
      "Fear of falls or cautious movement after bone-density news",
      "Thoracic ache after prolonged sitting when bone health is low",
    ],
    howWeHelp: [
      "Review fracture history and safe loading limits with you",
      "Gentle mobilisation that respects bone density precautions",
      "Balance and posture work that reduces fall and crush-risk patterns",
      "Coordinate with GP on DEXA, meds, and when impact exercise is appropriate",
    ],
    causes:
      "Osteoporosis reduces bone density and raises fracture risk. Pain presenting to osteopathy is often from secondary muscle tension, posture change, or fracture aftermath — not \"soft bones hurting\" constantly. Falls risk and spinal fracture history shape how vigorously we mobilise.",
    whoAffected:
      "Post-menopausal adults, people on long-term steroids, and older patients after low-trauma fractures present often. Sudden severe spinal pain after a simple bend needs fracture assessment.",
    whatToExpect:
      "We use fracture-safe techniques, improve comfort and posture-related soft tissue, and encourage medically appropriate strength and balance work. We do not replace DEXA monitoring or GP/endocrinology care. Exercise advice aligns with bone-health guidance. Fall confidence and safe loading rules sit beside any hands-on care.",
    recoveryTimeline:
      "Comfort and confidence often improve over weeks; bone density changes over months to years with medical care. Fall-prevention habits are ongoing. Safe load and fall confidence outrank heroic impact goals.",
    faqs: [
      {
        question: "Is osteopathic manipulation safe with osteoporosis?",
        answer:
          "We adapt force and technique. High-risk thrusting is avoided when fracture risk is significant.",
      },
      {
        question: "Can exercise still help?",
        answer:
          "Yes — appropriate strength and balance reduce falls and support bone health under medical guidance.",
      },
      {
        question: "Will treatment increase bone density?",
        answer:
          "Hands-on care does not replace medical bone therapy. We support safe movement and comfort.",
      },
      {
        question: "Why does my mid-back ache?",
        answer:
          "Postural load and muscle tension are common; sudden severe pain needs fracture exclusion.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "deconditioning",
      "non-specific-low-back-pain",
      "hip-oa",
      "post-surgical-general",
    ],
    relatedServiceSlug: "headaches-joints",
    relatedBlogSlug: "osteopathy-for-older-adults-woolwich",
    keywords: [
      "Osteoporosis / low bone density Woolwich",
      "Osteoporosis / low bone density osteopath SE18",
      "osteoporosis Woolwich",
    ],
  },
  {
    slug: "post-surgical-general",
    title: "Post-surgical rehab Treatment in Woolwich",
    shortTitle: "Post-surgical rehab",
    region: "Whole body",
    summary:
      "Stiffness and guarded movement after an operation — rehab aligned with surgeon protocols and wound status first.",
    heroLine:
      "Support for post-surgical rehab with osteopathy in Woolwich: assessment first, then tailored hands-on care. We connect clinic findings to your real week so advice fits Woolwich life, not a generic leaflet.",
    symptoms: [
      "Stiffness, swelling, or guarded movement after an operation",
      "Difficulty meeting daily tasks within your surgeon's timeline",
      "Scar sensitivity and confidence gaps returning to work or sport",
    ],
    howWeHelp: [
      "Align care with surgeon protocols and healing stage",
      "Restore mobility and soft-tissue comfort around the surgical site",
      "Graded strength and daily-task return with clear stop rules",
      "Escalate infection, DVT, or unexpected neurological change immediately",
    ],
    causes:
      "After surgery, stiffness, protective muscle guarding, scar sensitivity, and deconditioning commonly limit function even when the operation succeeded. Swelling and fear of \"undoing\" the surgery slow movement. Osteopathy supports recovery alongside your surgical protocol — it does not replace consultant advice.",
    whoAffected:
      "Patients after orthopaedic, abdominal, or other operations who feel stuck with stiffness or compensatory pain present often. Signs of infection, DVT, or wound problems need urgent medical care first.",
    whatToExpect:
      "We review your stage and precautions, then restore comfortable mobility and neighbouring joint function while respecting surgical limits. Soft-tissue care and graded strength sit inside your surgeon/physio timeline. Communication is clear about what we will and will not do. Surgeon timelines and wound status always outrank our local preferences.",
    recoveryTimeline:
      "Depends entirely on the procedure — weeks to months. We measure task gains (walking, stairs, sleep) against your protocol milestones. Protocol stages and wound status always override local preference.",
    faqs: [
      {
        question: "When is it safe to see an osteopath after surgery?",
        answer:
          "When your surgical team allows mobilisation and wounds are appropriate. Bring precautions to the first visit.",
      },
      {
        question: "Can you break down scar tissue aggressively?",
        answer:
          "We treat scars gently and progressively. Aggressive early work can irritate healing tissue.",
      },
      {
        question: "Will this replace hospital physiotherapy?",
        answer:
          "No — we complement protocols. Keep surgeon/physio milestones central.",
      },
      {
        question: "Why do other joints hurt after the operation?",
        answer:
          "Compensation patterns are common. We address the chain within your precautions.",
      },
      {
        question: "How do I book for this at Nguyen's in Woolwich?",
        answer:
          "Book online through our booking page, or call the clinic if you are unsure which appointment type fits. We confirm fees before treatment starts.",
      }
    ],
    relatedConditionSlugs: [
      "deconditioning",
      "osteoporosis",
      "knee-oa",
      "hip-oa",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "sports-injury-osteopath-woolwich",
    keywords: [
      "Post-surgical rehab Woolwich",
      "Post-surgical rehab osteopath SE18",
      "post surgical general Woolwich",
    ],
  },
];

export function getCondition(slug: string) {
  return conditions.find((condition) => condition.slug === slug);
}

export function getAllConditionSlugs() {
  return conditions.map((condition) => condition.slug);
}

export function getConditionsByRegion(region: ConditionRegion) {
  return conditions.filter((condition) => condition.region === region);
}

export function getFeaturedConditions() {
  return conditions.filter((condition) => condition.featured);
}

/** Conditions that point at a given service slug — for service-page internal links. */
export function getConditionsForService(serviceSlug: string, limit = 6) {
  return conditions
    .filter((condition) => condition.relatedServiceSlug === serviceSlug)
    .slice(0, limit);
}

export function getRelatedConditions(condition: Condition, limit = 4) {
  if (condition.relatedConditionSlugs?.length) {
    return condition.relatedConditionSlugs
      .map((slug) => getCondition(slug))
      .filter((item): item is Condition => Boolean(item))
      .slice(0, limit);
  }
  return getConditionsByRegion(condition.region)
    .filter((item) => item.slug !== condition.slug)
    .slice(0, limit);
}
