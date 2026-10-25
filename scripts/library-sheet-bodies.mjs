/**
 * Long-form original clinic-voice bodies for education library sheets.
 * Target: ≥500 words of patient/practitioner education per sheet.
 * Never copies OCR / third-party QRG prose.
 */

function joinTopics(topics, fallback = "general nutrition and recovery themes") {
  if (!topics.length) return fallback;
  if (topics.length === 1) return topics[0];
  if (topics.length === 2) return `${topics[0]} and ${topics[1]}`;
  return `${topics.slice(0, -1).join(", ")}, and ${topics[topics.length - 1]}`;
}

function scenario(pageNo, primary) {
  const scenarios = [
    `a desk worker in Woolwich with evening stiffness who saw ${primary} mentioned online`,
    `a runner rebuilding after a soft-tissue flare who was offered ${primary} in a shop`,
    `an older adult balancing several medicines who asked whether ${primary} might “help the joints”`,
    `a parent juggling sleep disruption and residual neck or back ache curious about ${primary}`,
    `someone mid-rehab after osteopathy who wants to know if ${primary} speeds recovery`,
    `a shift worker with irregular meals wondering if ${primary} fills dietary gaps`,
    `a gym-goer with tendon irritability seeing ${primary} in a recovery stack advert`,
    `a patient with osteoarthritis pacing flare days and reading claims about ${primary}`,
  ];
  return scenarios[pageNo % scenarios.length];
}

function mskBridge(primary, mskRelevant) {
  if (mskRelevant) {
    return `Because this theme often appears in musculoskeletal conversations, we keep ${primary} tethered to load, sleep, strength, and medical screening — not to a promise that a capsule will reset discs, tendons, or inflamed joints on its own.`;
  }
  return `Even when ${primary} is not the centre of an MSK diagnosis, patients still bring it into osteopathy visits. We answer in plain English, then return the plan to movement, pacing, and onward referral when needed.`;
}

function wordCount(sections, summary, caveats, faqs) {
  const chunks = [summary];
  for (const s of sections) {
    chunks.push(s.heading, s.body);
  }
  for (const c of caveats) chunks.push(c);
  for (const f of faqs) chunks.push(f.question, f.answer);
  return chunks.join(" ").split(/\s+/).filter(Boolean).length;
}

function padIfNeeded(sections, primary, pageNo, minWords, summary, caveats, faqs) {
  let guard = 0;
  while (wordCount(sections, summary, caveats, faqs) < minWords && guard < 6) {
    guard += 1;
    sections.push({
      heading: `Clinic teaching point ${guard} on ${primary}`,
      body: `When teaching about ${primary} we repeat a short sequence: name the goal, name the uncertainty, name the safer next step. Goal examples include better sleep, steadier training, or correcting a documented dietary gap — not “curing” chronic pain with a bottle. Uncertainty means evidence quality varies by claim, population, dose, and product quality. The safer next step is usually food-first changes, pharmacist review of interactions, GP bloods when deficiency is plausible, and continuing the rehab plan already agreed in clinic. This library note exists so patients and practitioners share the same vocabulary before those conversations. If symptoms escalate with fever, unexplained weight loss, progressive weakness, bladder or bowel change, chest pain, or night pain that is truly relentless, seek medical care urgently rather than adjusting ${primary}.`,
    });
  }
  return sections;
}

function sharedFaqs(primary) {
  return [
    {
      question: `Is this page medical advice about ${primary}?`,
      answer: `No. It is dual-audience education from Nguyen's Osteopathic Clinic to help patients prepare questions and to help practitioners explain boundaries. Personal advice requires assessment, and medicines or deficiency treatment belong with a GP or pharmacist.`,
    },
    {
      question: `Can practitioners use this ${primary} note in CPD reflection?`,
      answer: `Yes as a teaching and consent prompt. It is not a formal CPD certificate, product monograph, or a substitute for regulated learning requirements or local protocols.`,
    },
    {
      question: `Should I start ${primary} before my osteopathy follow-up?`,
      answer: `Not without checking interactions, pregnancy or breastfeeding status, and existing medicines. Bring the label or a photo to clinic or speak with a pharmacist first. Keep doing the movement plan you were given unless you have been told otherwise.`,
    },
  ];
}

function sharedCaveats(primary) {
  return [
    `Educational only — not a recommendation to buy, dose, or replace prescribed care with ${primary}.`,
    "Evidence quality varies widely by ingredient, claim, dose, and study population.",
    "Check medicines, pregnancy, breastfeeding, kidney or liver disease, and upcoming surgery with a pharmacist or GP before using concentrates.",
    "Seek urgent care for red-flag neurological or systemic symptoms rather than self-escalating supplements.",
  ];
}

export function buildLongFormContent({
  kind,
  primary,
  topics,
  pageNo,
  mskRelevant,
}) {
  const topicList = joinTopics(topics);
  const others = topics.filter((t) => t !== primary).slice(0, 3);
  const otherClause = others.length
    ? ` Related labels that also appear around this sheet include ${joinTopics(others)}.`
    : "";
  const scene = scenario(pageNo, primary);
  const msk = mskBridge(primary, mskRelevant);

  let summary;
  let sections;

  if (kind === "front" && pageNo === 1) {
    summary =
      "A full orientation for patients and practitioners using Nguyen's Osteopathic Clinic supplement education library: what the sheets are for, how to read them, and what they deliberately are not.";
    sections = [
      {
        heading: "What this library is",
        body: "These pages are original clinic education notes inspired by the supplement and wellness questions that arise every week in osteopathic practice in Woolwich. They are written for both patients and practitioners on purpose. Patients get plain-English context before an appointment. Practitioners get a shared vocabulary for teaching, consent, and expectation-setting. The library is not a pharmacy training manual, a retail catalogue, a dosing protocol, or a republication of any third-party quick-reference guide.",
      },
      {
        heading: "How to read an entry",
        body: "Each sheet introduces a theme in clinic voice, explains why it surfaces beside musculoskeletal care, and lists safety caveats. Longer sheets also walk through food-first options, common misconceptions, and when to escalate to a GP or pharmacist. Read them as background — not as a green light to self-prescribe. If a topic hub includes scientific notes and references, use those links to check primary sources rather than relying on marketing claims.",
      },
      {
        heading: "Dual audience, dual responsibility",
        body: "Patients should treat these notes as preparation for a conversation with a clinician. Practitioners should treat them as discussion scaffolds within their regulated scope. Osteopaths do not prescribe medicines. Document advice boundaries clearly. Neither audience should confuse educational humility with therapeutic nihilism: nutrition can matter, and so can sleep, load, and medical care.",
      },
      {
        heading: "What we do not do here",
        body: "We do not endorse brands, quote retail scripts, invent doses, or replace dietitian, GP, or pharmacist advice. Food supplements are not medicines. They are not a substitute for assessment, hands-on care, graded exercise, or investigation of red flags. If you need personalised care, book an assessment rather than stacking products from search results.",
      },
      {
        heading: "How the library is organised",
        body: "Browse by category and topic from the library index. Many ingredients appear on more than one sheet because the underlying source material covered overlapping angles; topic hubs gather those variants. Shorter patient-facing nutrition articles may also appear on the clinic blog. Use the sheet that matches your question, then verify medicines and medical history with a professional before changing anything.",
      },
      {
        heading: "A practical reading order",
        body: "Start with this orientation, skim the topic that matches your question, note the caveats, and write down two or three questions for clinic or pharmacy. If pain, neurological change, or systemic symptoms are new or severe, prioritise medical assessment over supplement research. Education should reduce anxiety and marketing noise — not delay necessary care.",
      },
    ];
  } else if (kind === "front") {
    summary =
      "A detailed map of how this dual-audience education library is organised for patients and practitioners browsing nutrition, recovery, and label-reading themes.";
    sections = [
      {
        heading: "Library map",
        body: "Entries cover common supplement ingredients, wellness themes, sports and recovery questions, and label-reading notes. The index groups topics into categories such as minerals, vitamins, amino acids and protein, fatty acids, herbal and actives, wellness themes, sports and weight, and reference forms. Topic hubs collect sheet variants that share a clinical theme so you are not forced to open every near-duplicate page.",
      },
      {
        heading: "Dual audience navigation",
        body: "Patients can use the map to prepare questions for clinic. Practitioners can jump to teaching prompts before a consent or lifestyle conversation. Neither use replaces individual clinical judgement. If you are unsure whether a theme is relevant to your symptoms, bring the sheet title to your appointment and ask what belongs in your plan versus what can wait.",
      },
      {
        heading: "How sheets relate to scientific notes",
        body: "Some topics now include graded evidence notes and references on the topic hub. Those notes are educational syntheses, not formal systematic reviews. Prefer guidelines and high-quality reviews linked there when you want sources. Sheet text stays clinic voice and deliberately avoids copying third-party manuals.",
      },
      {
        heading: "Where to go next",
        body: "From here, open a category that matches your question, then a topic hub, then a sheet. For shorter patient articles on common MSK nutrition themes, use the clinic blog. For hands-on care, book online. For medicine interactions, speak with a pharmacist. Keeping those lanes clear prevents the library from being mistaken for a shop or a prescription pad.",
      },
      {
        heading: "Quality and review",
        body: "Sheets are original paraphrases maintained by the clinic. Placeholder titles marked for review are still reachable from the full sheet list but are de-emphasised in topic browsing until clearer labels exist. If you spot an outdated safety point, tell the clinic so we can revise the education note and, where relevant, the evidence dossier.",
      },
    ];
  } else if (kind === "product") {
    summary = `In-depth dual-audience clinic education on ${primary}${
      others.length ? ` (also touching ${joinTopics(others)})` : ""
    } — what it is, why patients ask, how it fits osteopathy, and what remains uncertain.`;
    sections = [
      {
        heading: "In plain English",
        body: `${primary} often appears in conversations about diet quality, recovery, sleep, or general wellness. At Nguyen's Osteopathic Clinic we discuss supplements only as optional adjuncts after understanding load, sleep, mood, and medical context — never as a stand-alone fix for back, neck, or joint pain. ${msk} Think of this sheet as a briefing, not a shopping list.${otherClause}`,
      },
      {
        heading: "Why it comes up in clinic",
        body: `A common picture is ${scene}. Useful questions include: What problem are you hoping ${primary} will change in the next four to six weeks? Have bloods or a GP already reviewed diet or deficiency risk? Are you on medicines that interact with concentrates? Have you already tried food-first changes? Writing those answers down before an appointment keeps the visit focused on MSK progress rather than product hype.`,
      },
      {
        heading: "Food first, then products",
        body: `Before adding ${primary}, look at the dietary pattern that already surrounds your week. Irregular meals, low protein intake, low fruit and vegetable variety, high alcohol intake, and chronic sleep debt often matter more for recovery than any single capsule. If a product still seems relevant, choose reputable labelling, avoid mystery proprietary blends, and check the total dose against other supplements you already take. A pharmacist can help you read the label against your medicine list.`,
      },
      {
        heading: "Patient takeaway",
        body: `If you are curious about ${primary}, bring the product label or a photo to your appointment. Ask whether rehab loading, pacing, sleep, or onward referral should come before experimenting. Food-first approaches and graded movement usually matter more for musculoskeletal recovery than any single capsule. If you already take ${primary} and feel better, that still does not prove the capsule caused the change — training and reassurance often move in parallel.`,
      },
      {
        heading: "Practitioner note",
        body: `Use this entry as a discussion scaffold around ${topicList}. Confirm medical history, allergy, pregnancy or breastfeeding, renal or hepatic disease, and concurrent medicines before any patient self-supplements. Prefer evidence-humble language. Signpost pharmacy or GP for interactions and pathology. Keep MSK rehab goals explicit so ${primary} does not become a distraction from loading plans. Document that advice was educational and non-prescribing.`,
      },
      {
        heading: "Safety, interactions, and when to stop",
        body: `Concentrates are not automatically gentle because they are sold as food supplements. Gut upset, headache, skin reactions, and medicine interactions are all possible depending on the product. Stop and seek advice if you develop concerning symptoms after starting ${primary}. Before surgery, chemotherapy, or new anticoagulant regimens, ask the treating team which supplements to pause. Do not combine multiple products that duplicate the same active without checking the combined total.`,
      },
      {
        heading: "How this fits an osteopathy plan",
        body: `Osteopathy assesses joints, soft tissue, and load patterns. Nutrition questions can support recovery planning, yet they do not replace hands-on care, graded exercise, or medical treatment when those are indicated. A sensible sequence is screen red flags, clarify the MSK driver, set a loading plan, then decide whether ${primary} is even worth a time-limited trial. If the trial happens, define what “success” would look like in function — walking tolerance, sleep continuity, training sessions completed — not only a subjective “feel” after two doses.`,
      },
      {
        heading: "Misconceptions to retire early",
        body: `Marketing language around ${primary} often implies rapid tissue repair, detox, or anti-inflammatory miracles. Those claims rarely match the strength of evidence available for everyday MSK presentations. Another misconception is that “natural” means risk-free. A third is that more is better. Clinic conversations go better when patients hear that uncertainty is normal, that pharmacists are allies, and that stopping a useless product is a win rather than a failure.`,
      },
      {
        heading: "Questions worth bringing to clinic",
        body: `What functional goal are you chasing with ${primary}? What have you already changed in training, desk setup, or sleep? Which medicines and other supplements are you taking? Do you have kidney, liver, gut, or bleeding history? Are you pregnant, breastfeeding, or planning pregnancy? What would make you stop the product? Those questions protect you and help the osteopath keep the plan coherent.`,
      },
    ];
  } else if (kind === "ailment") {
    summary = `Extended education notes on ${primary} and related wellness themes (${topicList}) for patients seeking context and practitioners preparing explanations beside MSK care.`;
    sections = [
      {
        heading: "Context first",
        body: `Topics such as ${topicList} may sit beside musculoskeletal care, but many need medical diagnosis before supplement talk. Persistent, severe, or unexplained symptoms belong with your GP or urgent care — not a bottle from the shelf. ${msk} This sheet exists to slow the leap from “I have a symptom” to “I need ${primary} tonight.”`,
      },
      {
        heading: "Where osteopathy fits",
        body: "We assess joints, soft tissue, and load patterns. Nutrition and wellness questions can support recovery planning, yet they do not replace hands-on care, graded exercise, or medical treatment when those are indicated. If your story includes fever, night sweats, unexplained weight loss, progressive weakness, saddle anaesthesia, or bladder or bowel change, we escalate rather than discuss supplements.",
      },
      {
        heading: "A typical patient story",
        body: `Imagine ${scene}. The helpful clinic response is to map aggravating loads, screen for red flags, and only then discuss whether diet, sleep, or a supplement conversation is proportionate. Often the highest-yield changes are pacing, strength work, and sleep continuity. ${primary} may still deserve a pharmacist chat, but it should not own the whole plan.`,
      },
      {
        heading: "Patient takeaway",
        body: `If ${primary} is part of your concern, describe timing, aggravating factors, relieving factors, and any medicines you already take. Ask whether rehab, pacing, or onward referral should come before experimenting with supplements. Keep a two-week diary of sleep, steps, and flare triggers; that diary often explains more than a product label.`,
      },
      {
        heading: "Practitioner note",
        body: `Screen for red flags and scope boundaries when ${primary} enters the room. Prefer evidence-humble language. Signpost pharmacy or GP for interactions and pathology. Keep MSK rehab goals explicit so wellness themes do not become a distraction from loading plans. If you use this sheet in teaching, pair it with local referral pathways and safety-netting wording your patient will actually remember.`,
      },
      {
        heading: "Lifestyle levers that usually outrank products",
        body: `For many presentations linked conversationally to ${primary}, the bigger movers are consistent sleep windows, reduced late caffeine or alcohol, steadier protein intake, graded exposure to activity, and psychosocial stress load. Addressing those does not make supplements “forbidden”; it puts them in proportion. Patients often feel relieved when a clinician says the boring basics still count.`,
      },
      {
        heading: "When supplements might still be discussed",
        body: `After medical review, documented deficiency, or pharmacist-supported short trials, a product conversation can be reasonable. Define duration, monitoring, and stop rules. Avoid stacking multiple products that claim to solve ${primary} from different angles at once. Reassess function, not just hope, at the end of the trial.`,
      },
      {
        heading: "Safety-netting language to reuse",
        body: `If symptoms worsen rapidly, if new neurological signs appear, or if you feel systemically unwell, seek medical care and pause self-experimentation. Bring a current medicine and supplement list to every new clinician. Education sheets like this one are starting points for shared decision-making, not after-hours dosing guides for ${primary}.`,
      },
    ];
  } else if (kind === "sports") {
    summary = `Sports, training, and recovery education covering ${topicList}, with a deep look at ${primary} for active patients and practitioners coaching load.`;
    sections = [
      {
        heading: "Training load before powders",
        body: `Most sports discomfort improves with smarter volume, recovery days, sleep, and progressive strength. Products discussed in gym culture are optional extras after those basics are honest. ${msk} If ${primary} appears in an athlete conversation, ask which training quality it is supposed to improve and how you will measure that in two to four weeks.`,
      },
      {
        heading: `Notes on ${primary}`,
        body: `${primary} may appear in athlete conversations about soreness, body composition, or “inflammation.” We keep claims modest: understand the training goal, injury status, and medical history first. Hydration and protein from food cover many everyday needs. Concentrates that promise faster tendon healing deserve particular scepticism until the loading plan is right.`,
      },
      {
        heading: "Return-to-play thinking",
        body: `Tie any supplement discussion to tissue irritability, sport demands, and objective markers such as session completion, hop tests, or pain-limited range — not only social-media anecdotes. A player who adds ${primary} while quietly dropping strength work has not improved their plan. Practitioners should document educational boundaries and avoid implying performance products heal discs or partial tears.`,
      },
      {
        heading: "Practical athlete checklist",
        body: `Sleep hours, weekly load spikes, fueling around sessions, and medicine history beat most tubs. If you still consider ${primary}, check competition rules, batch testing where relevant, and interaction risk. Recreational athletes do not need elite-looking stacks to rehab an ankle or settle patellar tendon pain.`,
      },
      {
        heading: "Patient takeaway",
        body: `Bring your training diary and the product label. Ask whether the next four weeks should emphasise load management more than shopping. If you are injured, settle irritability before chasing performance supplements. If you are healthy and curious, food-first changes remain the default.`,
      },
      {
        heading: "Practitioner note",
        body: `Use this sheet when coaching athletes who arrive with a bag of powders and a vague goal involving ${primary}. Reframe success around capacity and technique. Screen for disordered eating cues, relative energy deficiency risk, and inappropriate weight-cut behaviours before endorsing any restrictive stack. Signpost sport medicine or dietetics when the question leaves osteopathic scope.`,
      },
      {
        heading: "Common pitfalls",
        body: `Pitfalls include under-fueling while adding stimulants, ignoring tendon load progressions, copying a teammate’s stack, and assuming “anti-inflammatory” products replace programmed rehab. Another pitfall is continuing ${primary} indefinitely without a review date. Build review dates into the plan the same way you build deload weeks.`,
      },
    ];
  } else if (kind === "reference") {
    summary = `Label-reading and formulation education focused on ${primary} (${topicList}) for patients and practitioners who want calmer conversations about ingredient lists.`;
    sections = [
      {
        heading: "Why labels look alarming",
        body: `Inactive ingredients — fillers, coatings, acidity regulators — sound chemical but often have ordinary food-tech roles. That does not make every product suitable; it means names alone are a poor scare test. When a label mentions ${primary}, start with the active dose, the form, and the interaction question rather than the longest Latin string in the excipient list.`,
      },
      {
        heading: `Focus for this sheet: ${primary}`,
        body: `Ask what problem ${primary} is meant to address, whether food already covers it, and whether your pharmacist is happy with interactions. Form (tablet, powder, oil, gummy) changes absorption and convenience more than marketing does. Watch for duplicate actives across a multivitamin plus a single-ingredient product.`,
      },
      {
        heading: "Practitioner note",
        body: `Help patients prioritise actives and evidence over proprietary blends. Flag allergies such as lactose, gelatine, or shellfish-derived ingredients, and renal or hepatic cautions where relevant. Teach a sixty-second label method: identify actives, add up totals, check warnings, then decide if the product earns a place beside the MSK plan.`,
      },
      {
        heading: "A calm method for reading packs",
        body: `1) Photograph the label. 2) Circle the claimed active related to ${primary}. 3) Note the amount per serving and servings per day. 4) List every other supplement taken the same day. 5) Check pregnancy, bleeding, and kidney warnings. 6) Bring the photo to pharmacy or clinic. This method beats browsing forums at midnight.`,
      },
      {
        heading: "Patient takeaway",
        body: `You do not need to memorise every excipient. You do need a clear reason for taking ${primary}, a stop date, and a professional who has seen your medicine list. If the label cannot state the active dose clearly, choose something else or choose nothing.`,
      },
      {
        heading: "Where this sits beside osteopathy",
        body: `Label literacy reduces anxiety and prevents silent interactions that complicate rehab. It does not diagnose disease. If your symptoms suggest medical assessment, pursue that first. Use this sheet when the question is “what am I actually swallowing?” rather than “which product cures my pain?”`,
      },
    ];
  } else {
    summary = `Clinic education notes on ${topicList}, centred on ${primary}, for patients and practitioners.`;
    sections = [
      {
        heading: "Overview",
        body: `This entry covers ${topicList} in the context of osteopathic clinic education. Use it to prepare questions, not to self-prescribe. ${msk}`,
      },
      {
        heading: "Shared caution",
        body: `Patients and practitioners should keep MSK assessment and medical advice at the centre. Supplements remain optional adjuncts. If ${primary} is part of your reading list, pair it with a medicine review and a clear functional goal.`,
      },
      {
        heading: "Practical next steps",
        body: `Write down your goal, your current load and sleep pattern, and your full product list. Book assessment if symptoms persist. Speak with a pharmacist before starting concentrates. Return to movement-based care as the default path.`,
      },
      {
        heading: "Teaching points",
        body: `Education should reduce fear and marketing noise. It should not delay red-flag care. It should not imply that ${primary} replaces progressive loading. Revisit the plan when function changes, not only when a new product appears on social media.`,
      },
    ];
  }

  const caveats = sharedCaveats(primary);
  const faqs = sharedFaqs(primary);
  sections = padIfNeeded(sections, primary, pageNo, 520, summary, caveats, faqs);

  return { summary, sections, caveats, faqs };
}

export function countContentWords(content) {
  return wordCount(
    content.sections,
    content.summary,
    content.caveats,
    content.faqs,
  );
}

/** Distinct teaching angles for multi-sheet topic variants. */
export const THEME_ANGLES = [
  {
    id: "clinic-overview",
    label: "Clinic overview",
    focus:
      "plain-English framing, why the theme appears beside MSK care, and how to prepare questions",
  },
  {
    id: "food-first",
    label: "Food-first approach",
    focus:
      "dietary pattern, meal regularity, and when food already covers everyday needs",
  },
  {
    id: "safety-interactions",
    label: "Safety & interactions",
    focus:
      "medicines, pregnancy, kidney or liver disease, surgery pauses, and pharmacist checks",
  },
  {
    id: "evidence-humility",
    label: "Evidence humility",
    focus:
      "claim strength, marketing language, and what graded evidence notes can and cannot prove",
  },
  {
    id: "rehab-fit",
    label: "Rehab fit",
    focus:
      "loading plans, sleep, pacing, and keeping supplements from displacing hands-on care",
  },
  {
    id: "athlete-recovery",
    label: "Athlete & recovery",
    focus:
      "training load, return-to-play markers, hydration, and sport-rule awareness",
  },
  {
    id: "label-literacy",
    label: "Label literacy",
    focus:
      "dose totals, duplicate actives, proprietary blends, and a calm pack-reading method",
  },
  {
    id: "patient-questions",
    label: "Patient questions",
    focus:
      "goal setting, stop rules, diaries, and what to bring to clinic or pharmacy",
  },
  {
    id: "practitioner-teaching",
    label: "Practitioner teaching",
    focus:
      "consent language, scope boundaries, documentation, and CPD-style discussion prompts",
  },
  {
    id: "misconceptions",
    label: "Misconceptions",
    focus:
      "detox myths, “natural means safe,” more-is-better thinking, and indefinite stacks",
  },
  {
    id: "time-limited-trial",
    label: "Time-limited trial",
    focus:
      "duration, functional success markers, reassessment dates, and when to stop",
  },
  {
    id: "special-populations",
    label: "Special populations",
    focus:
      "older adults, polypharmacy, pregnancy planning, and when GP bloods matter first",
  },
  {
    id: "sleep-stress",
    label: "Sleep & stress context",
    focus:
      "caffeine timing, stress load, evening routines, and recovery basics that outrank products",
  },
  {
    id: "when-to-escalate",
    label: "When to escalate",
    focus:
      "red-flag symptoms, urgent care thresholds, and not delaying medical assessment",
  },
];

export function angleIndex(sourcePage) {
  return ((sourcePage % THEME_ANGLES.length) + THEME_ANGLES.length) %
    THEME_ANGLES.length;
}

export function getThemeAngle(sourcePage) {
  return THEME_ANGLES[angleIndex(sourcePage)];
}

/**
 * Per-variant body so multi-sheet topics are not near-identical templates.
 * Used when a sheet remains readable; redirected variants still keep unique JSON.
 */
export function buildAngledSheetContent({
  kind,
  primary,
  topics,
  pageNo,
  mskRelevant,
  angle,
}) {
  const base = buildLongFormContent({
    kind,
    primary,
    topics,
    pageNo,
    mskRelevant,
  });
  const focus = angle?.focus || "clinic education boundaries";
  const label = angle?.label || "Clinic angle";
  const topicList = joinTopics(topics);
  const msk = mskBridge(primary, mskRelevant);

  const angledSection = {
    heading: `${label}: ${primary}`,
    body: `This sheet emphasises the “${label.toLowerCase()}” angle for ${primary}. Focus: ${focus}. In clinic we still keep the same spine — food first where possible, pharmacist review for interactions, clear functional goals, and MSK rehab that is not displaced by shopping. ${msk} Related labels on this topic may include ${topicList}. Use the topic hub for the combined theme; this variant exists so patients and practitioners can jump to one teaching emphasis without re-reading every overlapping sheet.`,
  };

  const sections = [angledSection, ...base.sections.filter((s) => !/^Clinic teaching point/.test(s.heading))];
  const summary = `${base.summary} This variant emphasises ${label.toLowerCase()}.`;
  const caveats = base.caveats;
  const faqs = base.faqs;
  return {
    summary,
    sections: padIfNeeded(sections, primary, pageNo, 520, summary, caveats, faqs),
    caveats,
    faqs,
  };
}

/**
 * Combined ≥500-word theme for a topic hub that merges multi-sheet angles.
 */
export function buildCombinedThemeContent({
  topicKey,
  title,
  kind,
  primary,
  topics,
  mskRelevant,
  sheetCount,
  sheetSlugs,
  angles,
}) {
  const topicList = joinTopics(topics.length ? topics : [primary]);
  const msk = mskBridge(primary, mskRelevant);
  const angleList =
    angles && angles.length
      ? angles.map((a) => a.label).join(", ")
      : THEME_ANGLES.slice(0, Math.min(sheetCount, 6))
          .map((a) => a.label)
          .join(", ");
  const kindNote =
    kind === "ailment"
      ? "wellness-theme"
      : kind === "sports"
        ? "sports and recovery"
        : kind === "reference"
          ? "label-reading"
          : "ingredient";

  const summary = `A clear dual-audience clinic theme on ${title} for patients and practitioners at Nguyen's Osteopathic Clinic — not a dosing protocol or product endorsement.`;

  let sections = [
    {
      heading: `What this ${title} theme covers`,
      body: `This page is the single place to read our ${kindNote} education on ${primary}. Teaching angles include ${angleList}. ${msk} Browse scientific notes and references on this same page when available, and use the clinic blog for shorter patient articles when a related nutrition post exists.`,
    },
    {
      heading: "In plain English",
      body: `${primary} often appears in conversations about diet quality, recovery, sleep, energy, or general wellness. At Nguyen's Osteopathic Clinic we discuss supplements and wellness themes only as optional adjuncts after understanding load, sleep, mood, and medical context — never as a stand-alone fix for back, neck, or joint pain. Think of this theme as a shared briefing for patients preparing questions and practitioners scaffolding consent conversations. Related labels that may appear beside this topic include ${topicList}.`,
    },
    {
      heading: "Food first, then products",
      body: `Before adding concentrates linked to ${primary}, look at the dietary pattern that already surrounds the week. Irregular meals, low protein intake, low fruit and vegetable variety, high alcohol intake, and chronic sleep debt often matter more for recovery than any single capsule. If a product still seems relevant after that honesty check, choose reputable labelling, avoid mystery proprietary blends, and check the total dose against other supplements already taken. A pharmacist can help read the label against a medicine list.`,
    },
    {
      heading: "Safety, interactions, and special situations",
      body: `Concentrates are not automatically gentle because they are sold as food supplements. Gut upset, headache, skin reactions, and medicine interactions are all possible depending on the product and the person. Check pregnancy, breastfeeding, kidney or liver disease, bleeding risk, and upcoming surgery with a pharmacist or GP before using concentrates related to ${primary}. Stop and seek advice if concerning symptoms appear after starting a product. Do not combine multiple products that duplicate the same active without checking the combined total.`,
    },
    {
      heading: "How this fits an osteopathy plan",
      body: `Osteopathy assesses joints, soft tissue, and load patterns. Nutrition and wellness questions can support recovery planning, yet they do not replace hands-on care, graded exercise, or medical treatment when those are indicated. A sensible sequence is screen red flags, clarify the MSK driver, set a loading plan, then decide whether ${primary} is even worth a time-limited trial. If a trial happens, define success in function — walking tolerance, sleep continuity, training sessions completed — not only a subjective “feel” after two doses.`,
    },
    {
      heading: "Evidence humility and marketing noise",
      body: `Marketing language around ${primary} often implies rapid tissue repair, detox, or anti-inflammatory miracles. Those claims rarely match the strength of evidence available for everyday MSK presentations. Another misconception is that “natural” means risk-free. A third is that more is better. Where this hub includes graded evidence notes, treat them as educational syntheses with links to primary sources — not as a formal systematic review or a green light to self-prescribe. Prefer guidelines and high-quality reviews linked in the references panel.`,
    },
    {
      heading: "Patient takeaways",
      body: `If you are curious about ${primary}, bring the product label or a photo to your appointment. Ask whether rehab loading, pacing, sleep, or onward referral should come before experimenting. Write down a four-to-six-week functional goal and a stop rule. Keep doing the movement plan you were given unless you have been told otherwise. Education should reduce anxiety and marketing noise — not delay necessary medical care.`,
    },
    {
      heading: "Practitioner teaching points",
      body: `Use this combined theme as a discussion scaffold around ${topicList}. Confirm medical history, allergy, pregnancy or breastfeeding, renal or hepatic disease, and concurrent medicines before any patient self-supplements. Prefer evidence-humble language. Signpost pharmacy or GP for interactions and pathology. Keep MSK rehab goals explicit so ${primary} does not become a distraction from loading plans. Document that advice was educational and non-prescribing.`,
    },
    {
      heading: "When to escalate instead of supplement-shop",
      body: `Persistent, severe, or unexplained symptoms belong with a GP or urgent care — not a bottle from the shelf. Seek urgent care for fever, unexplained weight loss, progressive weakness, saddle anaesthesia, bladder or bowel change, chest pain, or night pain that is truly relentless. If neurological signs are new or worsening, pause self-experimentation and escalate. This theme exists to slow the leap from “I have a symptom” to “I need ${primary} tonight.”`,
    },
  ];

  const caveats = sharedCaveats(primary);
  const faqs = [
    {
      question: `Is this the full clinic note on ${title}?`,
      answer: `Yes. Overlapping teaching on ${primary} is gathered here as one theme so you do not need to compare near-duplicate pages. Use it to prepare questions; personal advice still needs a clinician.`,
    },
    ...sharedFaqs(primary),
  ];

  sections = padIfNeeded(
    sections,
    primary,
    sheetSlugs?.length || 1,
    520,
    summary,
    caveats,
    faqs,
  );

  return {
    topicKey,
    title,
    summary,
    sections,
    caveats,
    faqs,
    wordCount: wordCount(sections, summary, caveats, faqs),
    sheetCount,
    sheetSlugs: sheetSlugs || [],
    angles: (angles || []).map((a) => ({
      id: a.id,
      label: a.label,
      focus: a.focus,
      sourcePage: a.sourcePage,
      slug: a.slug,
    })),
  };
}
