/**
 * Inject long-form sections into every condition entry in src/lib/conditions.ts.
 * Sciatica is already expanded; this fills the rest.
 */
import fs from "node:fs";

const path = "src/lib/conditions.ts";
let src = fs.readFileSync(path, "utf8");

/** @type {Record<string, string[]>} */
const relatedBySlug = {
  "neck-pain": [
    "cervical-radiculopathy",
    "cervicogenic-headache",
    "whiplash",
    "thoracic-joint-dysfunction",
  ],
  "cervical-radiculopathy": [
    "neck-pain",
    "cervicogenic-headache",
    "whiplash",
    "cubital-tunnel",
  ],
  "cervicogenic-headache": [
    "neck-pain",
    "cervical-radiculopathy",
    "whiplash",
    "thoracic-joint-dysfunction",
  ],
  whiplash: [
    "neck-pain",
    "cervicogenic-headache",
    "cervical-radiculopathy",
    "thoracic-joint-dysfunction",
  ],
  "thoracic-joint-dysfunction": [
    "neck-pain",
    "costochondritis",
    "scheuermanns",
    "non-specific-low-back-pain",
  ],
  costochondritis: [
    "thoracic-joint-dysfunction",
    "scheuermanns",
    "neck-pain",
    "subacromial-pain",
  ],
  scheuermanns: [
    "thoracic-joint-dysfunction",
    "costochondritis",
    "non-specific-low-back-pain",
    "neck-pain",
  ],
  "non-specific-low-back-pain": [
    "sciatica",
    "facet-syndrome",
    "si-joint-dysfunction",
    "lumbar-disc-radiculopathy",
  ],
  "lumbar-disc-radiculopathy": [
    "sciatica",
    "non-specific-low-back-pain",
    "lumbar-stenosis",
    "piriformis-syndrome",
  ],
  "lumbar-stenosis": [
    "sciatica",
    "lumbar-disc-radiculopathy",
    "facet-syndrome",
    "non-specific-low-back-pain",
  ],
  spondylolysis: [
    "facet-syndrome",
    "non-specific-low-back-pain",
    "si-joint-dysfunction",
    "hamstring-strain",
  ],
  "facet-syndrome": [
    "non-specific-low-back-pain",
    "spondylolysis",
    "si-joint-dysfunction",
    "sciatica",
  ],
  "si-joint-dysfunction": [
    "non-specific-low-back-pain",
    "piriformis-syndrome",
    "coccydynia",
    "sciatica",
  ],
  coccydynia: [
    "si-joint-dysfunction",
    "non-specific-low-back-pain",
    "piriformis-syndrome",
    "facet-syndrome",
  ],
  "hip-oa": [
    "greater-trochanteric-pain",
    "femoroacetabular-impingement",
    "si-joint-dysfunction",
    "knee-oa",
  ],
  "greater-trochanteric-pain": [
    "hip-oa",
    "piriformis-syndrome",
    "itb-syndrome",
    "femoroacetabular-impingement",
  ],
  "femoroacetabular-impingement": [
    "hip-oa",
    "greater-trochanteric-pain",
    "groin-pain",
    "si-joint-dysfunction",
  ],
  "piriformis-syndrome": [
    "sciatica",
    "si-joint-dysfunction",
    "greater-trochanteric-pain",
    "hamstring-strain",
  ],
  "hamstring-strain": [
    "piriformis-syndrome",
    "groin-pain",
    "si-joint-dysfunction",
    "patellofemoral-pain",
  ],
  "groin-pain": [
    "femoroacetabular-impingement",
    "hip-oa",
    "hamstring-strain",
    "si-joint-dysfunction",
  ],
  "knee-oa": [
    "patellofemoral-pain",
    "meniscal-injury",
    "hip-oa",
    "itb-syndrome",
  ],
  "patellofemoral-pain": [
    "patellar-tendinopathy",
    "knee-oa",
    "itb-syndrome",
    "hip-oa",
  ],
  "patellar-tendinopathy": [
    "patellofemoral-pain",
    "osgood" in {} ? "patellofemoral-pain" : "itb-syndrome",
    "knee-oa",
    "achilles-tendinopathy",
  ],
  "acl-rehab": [
    "meniscal-injury",
    "patellofemoral-pain",
    "knee-oa",
    "hamstring-strain",
  ],
  "meniscal-injury": [
    "knee-oa",
    "acl-rehab",
    "patellofemoral-pain",
    "itb-syndrome",
  ],
  "itb-syndrome": [
    "patellofemoral-pain",
    "greater-trochanteric-pain",
    "knee-oa",
    "shin-splints",
  ],
  "lateral-ankle-sprain": [
    "achilles-tendinopathy",
    "shin-splints",
    "plantar-fasciitis",
    "hallux-rigidus",
  ],
  "achilles-tendinopathy": [
    "plantar-fasciitis",
    "shin-splints",
    "lateral-ankle-sprain",
    "patellar-tendinopathy",
  ],
  "plantar-fasciitis": [
    "achilles-tendinopathy",
    "shin-splints",
    "morton-neuroma",
    "hallux-rigidus",
  ],
  "shin-splints": [
    "achilles-tendinopathy",
    "plantar-fasciitis",
    "lateral-ankle-sprain",
    "itb-syndrome",
  ],
  "hallux-rigidus": [
    "plantar-fasciitis",
    "morton-neuroma",
    "achilles-tendinopathy",
    "knee-oa",
  ],
  "morton-neuroma": [
    "plantar-fasciitis",
    "hallux-rigidus",
    "achilles-tendinopathy",
    "shin-splints",
  ],
  "subacromial-pain": [
    "rotator-cuff-tear",
    "frozen-shoulder",
    "ac-joint-injury",
    "neck-pain",
  ],
  "rotator-cuff-tear": [
    "subacromial-pain",
    "frozen-shoulder",
    "shoulder-instability",
    "ac-joint-injury",
  ],
  "frozen-shoulder": [
    "subacromial-pain",
    "rotator-cuff-tear",
    "shoulder-instability",
    "neck-pain",
  ],
  "shoulder-instability": [
    "rotator-cuff-tear",
    "subacromial-pain",
    "ac-joint-injury",
    "frozen-shoulder",
  ],
  "ac-joint-injury": [
    "subacromial-pain",
    "rotator-cuff-tear",
    "shoulder-instability",
    "neck-pain",
  ],
  "tennis-elbow": [
    "medial-epicondylalgia",
    "cubital-tunnel",
    "carpal-tunnel",
    "dequervains",
  ],
  "medial-epicondylalgia": [
    "tennis-elbow",
    "cubital-tunnel",
    "carpal-tunnel",
    "dequervains",
  ],
  "cubital-tunnel": [
    "tennis-elbow",
    "carpal-tunnel",
    "medial-epicondylalgia",
    "cervical-radiculopathy",
  ],
  "carpal-tunnel": [
    "dequervains",
    "cubital-tunnel",
    "cmc-oa",
    "neck-pain",
  ],
  dequervains: [
    "carpal-tunnel",
    "cmc-oa",
    "tennis-elbow",
    "medial-epicondylalgia",
  ],
  "cmc-oa": [
    "dequervains",
    "carpal-tunnel",
    "tennis-elbow",
    "medial-epicondylalgia",
  ],
  fibromyalgia: [
    "deconditioning",
    "non-specific-low-back-pain",
    "neck-pain",
    "osteoporosis",
  ],
  deconditioning: [
    "fibromyalgia",
    "osteoporosis",
    "non-specific-low-back-pain",
    "post-surgical-general",
  ],
  osteoporosis: [
    "deconditioning",
    "non-specific-low-back-pain",
    "hip-oa",
    "post-surgical-general",
  ],
  "post-surgical-general": [
    "deconditioning",
    "osteoporosis",
    "knee-oa",
    "hip-oa",
  ],
};

// Fix patellar-tendinopathy related list (remove broken expression)
relatedBySlug["patellar-tendinopathy"] = [
  "patellofemoral-pain",
  "itb-syndrome",
  "knee-oa",
  "achilles-tendinopathy",
];

/** Clinical copy keyed by slug — prose aims for ~600–800 words with lists + FAQs. */
const expansions = {
  "neck-pain": {
    causes:
      "Neck pain usually builds from sustained postures, protective muscle guarding, and irritated cervical or upper-thoracic joints rather than a single “out of place” bone. Long phone or screen use, nail-desk work, awkward sleep positions, and sudden reaches can all load the same tissues. Disc or facet irritation may refer into the shoulder blade; soft-tissue tension can feed headache patterns. At Nguyen’s Osteopathic Clinic in Woolwich we map how your work, sleep, and training interact with mobility and strength so treatment matches the real driver — not a generic stretch sheet.",
    whoAffected:
      "Office and hybrid workers, nail technicians, drivers, and parents carrying children on one hip are common presentations in SE18. People returning to the gym after time off often flare the neck when pressing or looking up. Mid-life desk workers with previous whiplash or migraine history may notice stiffness returning under stress. Red flags such as progressive arm weakness, unexplained weight loss, or severe unremitting night pain need medical review; we help you spot those early.",
    whatToExpect:
      "We take a focused history, screen neurological signs when needed, and examine cervical and thoracic movement plus shoulder contribution. Hands-on care may include gentle mobilisation, soft-tissue work, and graded mobility — never forced into sharp pain. You leave with desk height, break timing, and sleep-position tips matched to your week. Follow-ups track turning range, headache days, and work tolerance, adjusting load as irritability settles.",
    recoveryTimeline:
      "Many postural neck flares settle over 2–6 weeks with sensible breaks and targeted care. Longer-standing patterns or combined headache may need 6–10 weeks of guided rehab. Early wins are usually easier morning turns and fewer afternoon spikes; later wins are full workdays and training without the same protective stiffness. If progress stalls, we review the plan and refer rather than repeating identical sessions.",
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
          "Pillow “firmness” matters less than height that keeps your neck neutral. We trial simple changes rather than buying expensive gear first.",
      },
    ],
  },
  "cervical-radiculopathy": {
    causes:
      "Cervical radiculopathy means a nerve root in the neck is irritated — often by disc material, foraminal narrowing, or local inflammation. That can send sharp, burning, or electric pain into the arm with pins and needles or numbness in a dermatome. Looking up, looking down for long periods, or sleeping in awkward positions may aggravate it. Not every arm ache is nerve root pain; shoulder and thoracic patterns can mimic it, so assessment comes first at our Woolwich clinic.",
    whoAffected:
      "Adults with desk-heavy roles, trades using overhead tools, and people with previous neck trauma present most often. Mid-life disc changes raise risk, but younger adults can flare after sudden loading. If you develop progressive hand weakness, gait change, or bowel/bladder symptoms, that needs urgent medical pathways rather than routine osteopathy alone.",
    whatToExpect:
      "We screen nerve function, cervical and thoracic mobility, and shoulder contribution, then explain findings before treatment. Care stays within comfortable ranges — gentle mobilisation, soft-tissue work, and nerve-friendly movement rather than aggressive stretches. You get clear guidance on postures to limit short-term and how to keep the arm gently active. We discuss GP or imaging when weakness, night pain, or stalled recovery make it useful.",
    recoveryTimeline:
      "Many cervical radiculopathy patterns improve over 6–12 weeks with conservative care. Early change is often less night disturbance and shorter arm flares; later change is return to lifting and desk endurance. Persistent neurological deficit needs medical review sooner — we do not “wait and see” when safety is unclear.",
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
      },
    ],
  },
  "cervicogenic-headache": {
    causes:
      "Cervicogenic headache is driven by upper cervical joints and soft tissue referring pain into the head — often one-sided and linked to neck posture or movement. Sustained desk flexion, awkward sleep, and previous neck injury are common contributors. It can overlap with migraine or tension-type headache, so we look for neck reproduction of symptoms rather than assuming every headache is “just stress.”",
    whoAffected:
      "Desk workers, drivers, and people with prior whiplash or chronic neck stiffness present frequently in Woolwich. Those who clench at screens or sleep prone may notice morning starts. Sudden severe headache unlike your usual pattern, neurological change, or fever needs urgent medical care — we help you recognise when osteopathy is not the first step.",
    whatToExpect:
      "Assessment includes neck movement, upper cervical palpation, and screening for migraine red flags. Treatment focuses on gentle upper cervical and thoracic work plus soft-tissue release, paired with posture and break advice. We track headache frequency, intensity, and medication use between visits so progress is measurable.",
    recoveryTimeline:
      "Many cervicogenic patterns improve over 3–8 weeks when neck drivers are addressed. Stubborn mixed headache may need longer and sometimes medical co-management. Early wins are shorter morning episodes; later wins are longer screen days without the same build-up.",
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
      },
    ],
  },
  whiplash: {
    causes:
      "Whiplash-associated disorder follows rapid acceleration-deceleration — most often a road traffic collision — that strains cervical joints, ligaments, and soft tissue. Pain, stiffness, and headache can appear immediately or after a delay. Fear of movement and protective guarding then prolong symptoms if early gentle activity is avoided. Imaging rules out fracture when indicated; most soft-tissue patterns are managed conservatively.",
    whoAffected:
      "Drivers, passengers, and cyclists after collisions present commonly. People with previous neck pain or high anxiety about re-injury may recover more slowly without guided reassurance. Severe neurological signs, fracture suspicion, or worsening neurology need urgent pathways — we screen and escalate.",
    whatToExpect:
      "After confirming it is safe to mobilise, we use gentle hands-on care and early active movement rather than collars or prolonged rest. Sessions include education on expected recovery, graded turning and shoulder mobility, and sleep advice. We coordinate with GP or insurers when documentation or further imaging is needed.",
    recoveryTimeline:
      "Many uncomplicated whiplash patterns improve substantially over 4–12 weeks with early active care. Delayed recovery is more likely when pain-related fear or unresolved thoracic stiffness persists — we address those directly. Persistent severe symptoms beyond expected timelines warrant medical review.",
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
      },
    ],
  },
  "thoracic-joint-dysfunction": {
    causes:
      "Mid-back or interscapular ache often comes from stiff thoracic joints, overloaded postural muscles, and prolonged flexed sitting. Rib cage mobility and breathing pattern influence how the area feels with deep breaths or desk work. Disc issues are less common here than in the lumbar spine, but we still screen when symptoms are atypical. Local Woolwich desk and retail roles frequently feed this pattern.",
    whoAffected:
      "Office workers, students, and people who drive long shifts are frequent visitors. Gym-goers who press heavy while lacking thoracic extension may flare between the blades. Chest pain of cardiac concern is never assumed musculoskeletal — sudden severe chest pain, breathlessness, or arm heaviness needs urgent medical care first.",
    whatToExpect:
      "We assess thoracic and rib mobility, cervical and lumbar contribution, and desk demands. Treatment may include mobilisation, soft-tissue work, and extension-biased movement, plus break strategies you can actually keep. Breathing and scapular control cues often reduce end-of-day ache.",
    recoveryTimeline:
      "Postural thoracic pain often eases over 2–6 weeks with mobility and load changes. Structural kyphosis-related discomfort may need longer maintenance habits. Progress is measured by sitting tolerance and training comfort, not by “perfect posture.”",
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
    ],
  },
  costochondritis: {
    causes:
      "Costochondritis and related costovertebral irritation produce sharp, localised chest or rib-angle pain reproduced by palpation, twisting, or deep breath. Viral illness, coughing fits, sudden loading, or repetitive reaching can sensitise the costal cartilages and rib joints. It is usually self-limiting but alarming because chest pain raises cardiac worry — medical clearance comes first when symptoms are unclear.",
    whoAffected:
      "Active adults after coughs, gym presses, or awkward lifts present often. People with anxiety about heart disease may avoid movement and prolong recovery. Any crushing chest pain, fainting, or breathlessness at rest needs emergency care, not osteopathy as first contact.",
    whatToExpect:
      "Once musculoskeletal pattern is clear, we gently treat rib and thoracic joints, ease protective muscle spasm, and guide breathing and load so you stop guarding every inhale. Home advice covers cough management pacing and which gym moves to pause briefly.",
    recoveryTimeline:
      "Many cases settle over 2–8 weeks. Recurrence drops when thoracic mobility and gradual return to pressing are restored. Persistent unexplained chest pain always warrants medical review.",
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
    ],
  },
  scheuermanns: {
    causes:
      "Scheuermann’s kyphosis is a structural increase in thoracic curve that develops in adolescence; postural hyperkyphosis can look similar without the same bony change. Both can leave the mid-back stiff, tire easily in extension, and ache with prolonged sitting. Adult care focuses on mobility, posterior-chain strength, and load tolerance — not “straightening” the spine overnight.",
    whoAffected:
      "Teens, young adults, and adults who were told they have a “rounded back” present for ache or gym limitations. Desk-heavy roles amplify end-of-day fatigue. Neurological change or rapidly progressive deformity needs medical/spinal review.",
    whatToExpect:
      "We assess structural versus postural contributors, thoracic extension, and hip/shoulder mobility that compensate. Treatment includes hands-on mobility within comfort, extension-biased exercise, and desk strategies. Expectations stay realistic: comfort and capacity improve more than cosmetic curve change in adults.",
    recoveryTimeline:
      "Symptom relief often builds over 6–12 weeks of consistent mobility and strength work. Maintenance habits matter more than short bursts of treatment. We review if pain pattern suggests something beyond postural load.",
    faqs: [
      {
        question: "Can osteopathy reverse Scheuermann’s?",
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
    ],
  },
  "non-specific-low-back-pain": {
    causes:
      "Most low back pain has no single catastrophic finding on a scan — it is a sensitive, loaded system of joints, discs, and soft tissue reacting to sudden load, deconditioning, stress, or awkward postures. “Non-specific” does not mean imaginary; it means we treat the pattern in front of us. Prolonged sitting, DIY spikes, and poor sleep commonly feed flares in Woolwich patients.",
    whoAffected:
      "Working-age adults, parents, and people returning to sport after inactivity are frequent visitors. Previous episodes raise recurrence risk if strength and pacing are ignored. Red flags — saddle numbness, progressive weakness, fever, unexplained weight loss — need medical pathways first.",
    whatToExpect:
      "Assessment rules out serious pathology, then maps movement, strength, and aggravators. Hands-on care eases protective spasm; graded walking and loading rebuild confidence. You leave knowing what to keep doing, what to modify briefly, and when to return sooner.",
    recoveryTimeline:
      "Many acute flares improve over 2–6 weeks. Recurrent or persistent pain may need 6–12 weeks of rehab-focused care. Scans rarely dictate the timeline — function does.",
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
    ],
  },
  "lumbar-disc-radiculopathy": {
    causes:
      "Lumbar disc irritation can sensitise a nerve root, producing back pain with or without dermatomal leg symptoms. Flexion-heavy lifting, prolonged sitting, and sudden load spikes are common triggers. Most disc-related patterns improve conservatively; the disc “bulge” on a scan is not always the whole story, which is why we examine function carefully.",
    whoAffected:
      "Adults in physical jobs, gym lifters, and desk workers with episodic back pain present often. True progressive neurological deficit or cauda equina symptoms need urgent care. We help distinguish irritable disc patterns from simple mechanical back pain.",
    whatToExpect:
      "Neurological screen, lumbar and pelvic assessment, and clear explanation come first. Treatment stays nerve-friendly — gentle mobilisation, soft-tissue care, and graded activity rather than aggressive end-range forcing. We plan sitting, driving, and lifting modifications that still keep you moving.",
    recoveryTimeline:
      "Many disc-related radicular patterns improve over 6–12 weeks. Leg symptoms often lag behind back ease. Failure to progress, rising weakness, or new red flags triggers referral.",
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
          "We reduce irritation and improve movement; discs remodel with time and load, not a single “pop.”",
      },
    ],
  },
  "lumbar-stenosis": {
    causes:
      "Lumbar spinal stenosis narrows space for nerves, often from age-related joint and disc change. Classic neurogenic claudication brings leg pain or heaviness with walking or standing that eases with sitting or bending forward. Not all walking leg pain is stenosis — vascular claudication and hip disease can mimic it — so history and exam matter.",
    whoAffected:
      "Adults over 60 are most commonly affected, though younger people with structural change can present. Shop workers and walkers who need frequent sitting breaks often seek help in SE London. Progressive neurological loss needs medical/surgical pathways.",
    whatToExpect:
      "We differentiate stenosis patterns, assess flexion-biased relief strategies, and improve hip and thoracic mobility that reduce demand on the lumbar canal during gait. Hands-on care is gentle; exercise emphasises tolerable walking progression and strength. We coordinate with GP when injection or surgical opinion is appropriate.",
    recoveryTimeline:
      "Symptom management is often measured in months, with gains in walking distance and sit-to-stand ease. Structural narrowing may persist on scans even as function improves. Escalation is considered when community walking remains severely limited.",
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
    ],
  },
  spondylolysis: {
    causes:
      "Spondylolysis is a stress reaction or fracture of the pars interarticularis, sometimes with slip (spondylolisthesis). Extension and rotation sports — cricket bowling, gymnastics, football — raise risk. Pain typically worsens with bending backwards. Early load management protects healing; ignoring it can prolong bone stress.",
    whoAffected:
      "Adolescents and young athletes are classic presentations; adults can have chronic pars defects with mechanical pain. Parents and coaches in Woolwich often bring active teens with extension-related backache. Night pain or neurological change needs broader medical review.",
    whatToExpect:
      "We screen for bone-stress risk, modify extension-heavy training, and build core and hip strength in safer ranges. Hands-on care addresses protective spasm without forcing extension. Referral for imaging occurs when suspicion is high or progress stalls.",
    recoveryTimeline:
      "Bone stress healing may need several months of guided loading. Return-to-sport is staged, not calendar-only. Chronic mechanical pain with old defects can still improve with strength and movement coaching over 8–12 weeks.",
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
    ],
  },
  "facet-syndrome": {
    causes:
      "Facet (zygapophyseal) joints can become irritable with extension and rotation, producing well-localised unilateral low back pain that eases with flexion. Sudden gardening, overhead work, or gym extension moves may trigger flares. Facet patterns often coexist with disc and muscle contributors, so we treat the movement problem, not only the joint name.",
    whoAffected:
      "Active adults and older patients with extension-biased pain present commonly. People who stand long hours or sleep prone may notice morning catch. Progressive neurological symptoms are not typical of simple facet pain and need reassessment.",
    whatToExpect:
      "Assessment reproduces extension-rotation pain carefully, then hands-on techniques reduce joint irritability and soft-tissue guarding. You learn which positions to dose and how to rebuild extension tolerance gradually. Hip mobility work often reduces lumbar demand.",
    recoveryTimeline:
      "Many facet flares settle in 2–6 weeks. Recurrent patterns need strength and habit changes to stick. We escalate if pain becomes constant, night-dominant, or neurologically progressive.",
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
    ],
  },
  "si-joint-dysfunction": {
    causes:
      "Sacroiliac joint pain is often localised near the dimples of Venus and linked to asymmetric load, pregnancy-related ligament change, or force-closure deficits in the pelvic girdle. Stepping off a kerb awkwardly, single-leg sport, or carrying a toddler on one hip can flare it. True inflammatory sacroiliitis needs medical pathways; mechanical SI patterns respond to load and motor control care.",
    whoAffected:
      "Peripartum patients, runners, and people with leg-length or gait asymmetry present often in Woolwich. Desk workers who cross legs habitually may notice one-sided buttock pain. Fever, night sweats, or inflammatory red flags prompt GP referral.",
    whatToExpect:
      "We assess pelvic landmarks carefully without over-claiming “out of place” narratives, then treat soft tissue and joints while rebuilding glute and trunk control. Advice covers sleep positions, walking progression, and temporary load tweaks. Belts are considered selectively, not by default.",
    recoveryTimeline:
      "Mechanical SI pain often improves over 3–8 weeks with consistent rehab. Pregnancy-related patterns may fluctuate until postpartum recovery progresses. Persistent inflammatory suspicion is not managed as simple mechanical pain alone.",
    faqs: [
      {
        question: "Can the SI joint “go out”?",
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
    ],
  },
  coccydynia: {
    causes:
      "Coccydynia is tailbone pain worsened by sitting, often after a fall, childbirth, or prolonged hard seating. Local soft tissue and pelvic floor tension can maintain sensitivity. Rarely, other pelvic pathology mimics it — we take history seriously and refer when atypical.",
    whoAffected:
      "Post-partum patients, cyclists, and people after slips onto ice or stairs present frequently. Desk workers on hard chairs notice end-of-day spikes. Unexplained weight loss, fever, or bowel change needs medical review.",
    whatToExpect:
      "Assessment includes sitting tolerance, pelvic and lumbar contribution, and gentle hands-on care away from aggressive direct trauma to the coccyx unless specifically indicated. Cushion strategies, sit-stand mixing, and graded sitting rebuild tolerance. We discuss GP pathways for persistent post-trauma cases.",
    recoveryTimeline:
      "Many cases ease over 4–12 weeks. Post-partum recovery may track pelvic healing. Chronic sitting pain needs habit change as much as treatment sessions.",
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
    ],
  },
  "hip-oa": {
    causes:
      "Hip osteoarthritis involves joint cartilage change, stiffness, and activity-related groin or lateral hip pain. Morning stiffness that eases, pain with weight-bearing rotation, and reduced walk distance are common. Not every “bone-on-bone” report matches disability — strength and mobility still change how the hip feels day to day.",
    whoAffected:
      "Adults over 50, previous athletes, and people with physically demanding jobs present often. Younger adults with FAI history may develop earlier symptoms. Night pain with systemic features needs medical review beyond simple OA care.",
    whatToExpect:
      "We assess gait, range, and strength, then use hands-on care to ease secondary soft-tissue tension while building hip and trunk capacity. Advice covers walk-sit ratios, stair strategies, and when to discuss injection or surgical opinion with your GP.",
    recoveryTimeline:
      "Meaningful gains in comfort and walking often appear over 6–12 weeks of consistent rehab. OA is long-term; flares are managed rather than “cured” in one course. Escalation is considered when daily function keeps declining.",
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
    ],
  },
  "greater-trochanteric-pain": {
    causes:
      "Greater trochanteric pain syndrome involves the gluteal tendons and bursal tissues on the outside of the hip. Side-lying sleep, sudden walking volume, and weak hip control commonly aggravate it. It is often mislabelled as “hip bursitis” alone; tendon load capacity is usually the bigger story.",
    whoAffected:
      "Runners, walkers increasing distance, and middle-aged adults — especially women — present frequently. Side sleepers notice night pain. Lumbar referral can mimic lateral hip pain, so we screen both.",
    whatToExpect:
      "Assessment tests tendon irritability and kinetic-chain contributors. Treatment combines hands-on soft-tissue care with progressive glute loading — not endless rest or only massage. Sleep position and training load are adjusted in parallel.",
    recoveryTimeline:
      "Tendon-focused plans often need 8–12 weeks. Night pain usually settles before high-speed walking or hills feel easy. Shockwave can be discussed for stubborn cases.",
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
    ],
  },
  "femoroacetabular-impingement": {
    causes:
      "FAI involves cam or pincer morphology that can pinch soft tissue at end-range hip flexion and rotation, producing groin pain with sitting, squatting, or cutting sports. Morphology alone does not equal symptoms — irritability and strength matter. Labral irritation may coexist.",
    whoAffected:
      "Young active adults in football, dance, and gym sports present often. Desk workers with deep hip flexion sitting can flare groin ache. Locking, giving way, or progressive restriction needs careful assessment and sometimes imaging pathways.",
    whatToExpect:
      "We assess range, strength, and aggravating positions, then treat secondary soft tissue while modifying deep flexion loads temporarily. Rehab builds control around the hip rather than forcing end-range. Surgical opinion is discussed when conservative care plateaus in suitable candidates.",
    recoveryTimeline:
      "Symptom improvement often spans 8–12 weeks. Return to cutting sport is staged. Morphology remains; capacity and load management change the day-to-day experience.",
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
    ],
  },
  "piriformis-syndrome": {
    causes:
      "Piriformis-related buttock pain involves deep gluteal soft tissue that can irritate or mimic sciatic nerve symptoms. Prolonged sitting, sudden sprinting, and pelvic asymmetry are common contributors. True isolated piriformis syndrome is less common than advertised — we still assess lumbar nerve roots so we do not miss radiculopathy.",
    whoAffected:
      "Drivers, desk workers, and runners present frequently. People diagnosed online with “piriformis” after googling buttock pain often need a broader lumbar-pelvic screen. Progressive neurological deficit is treated as possible nerve root disease until proven otherwise.",
    whatToExpect:
      "Assessment differentiates local buttock drivers from lumbar referral. Treatment may include soft-tissue work, pelvic and hip mobility, and graded loading rather than aggressive nerve stretches that flare symptoms. Sitting and wallet/phone pocket habits are addressed practically.",
    recoveryTimeline:
      "Many mechanical buttock patterns improve over 3–8 weeks. If leg neurology dominates, timelines follow radiculopathy care and possible medical review.",
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
    ],
  },
  "hamstring-strain": {
    causes:
      "Hamstring strains occur when fibres are overloaded in high-speed running, kicking, or sudden stretch under fatigue. Previous strain is the biggest risk factor. Proximal tendon pain behaves more like tendinopathy and needs different loading than a mid-belly muscle tear.",
    whoAffected:
      "Footballers, sprinters, and weekend athletes in Woolwich present often. Older athletes returning too fast after rest are vulnerable. Complete tears with major bruising and weakness need medical imaging pathways.",
    whatToExpect:
      "We stage healing: protect early irritability, then progressive strength and speed exposure. Hands-on care helps secondary spasm; rehab quality decides return-to-play. Lumbar and pelvic contributors are checked so recurrence risk drops.",
    recoveryTimeline:
      "Mild strains may return in 2–4 weeks; moderate tears often need 6–12 weeks. Proximal tendon pain can take longer. Re-injury risk rises if speed is rushed.",
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
    ],
  },
  "groin-pain": {
    causes:
      "Groin pain in sport can involve adductors, hip joint, pubic symphysis, or referred lumbar-pelvic sources. Sudden change of direction, kicking, and spikes in training load are typical triggers. “Osteitis pubis” labels are overused — precise assessment guides loading.",
    whoAffected:
      "Football and racket-sport athletes, plus people with FAI-type hips, present often. Desk workers can have adductor irritability from sitting and then weekend sport. Systemic inflammatory disease is considered when pain is migratory or accompanied by morning stiffness elsewhere.",
    whatToExpect:
      "We differentiate hip joint versus soft-tissue drivers, then combine hands-on care with progressive adductor and trunk loading. Running and kicking volume are reshaped rather than stopped forever. Imaging is discussed when progress stalls or joint pathology is suspected.",
    recoveryTimeline:
      "Adductor-dominant patterns often need 6–12 weeks. Hip-joint driven groin pain follows joint irritability timelines and may need longer modification of deep flexion.",
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
    ],
  },
  "knee-oa": {
    causes:
      "Knee osteoarthritis brings activity-related joint pain, stiffness, and reduced confidence on stairs or uneven ground. Cartilage change, previous injury, and higher body load contribute, but quadriceps strength and daily walking habit strongly influence symptoms.",
    whoAffected:
      "Adults over 50, previous meniscal or ligament injury patients, and people with physically demanding jobs present often. Night pain with swelling and systemic features needs medical review.",
    whatToExpect:
      "We assess alignment, strength, and aggravators, then use hands-on care for secondary soft tissue while progressing joint-friendly strengthening and walking. Advice covers stair tactics and flare management. Injection or surgical discussions happen with your GP when function stays poor.",
    recoveryTimeline:
      "Comfort and capacity often improve over 6–12 weeks of consistent rehab. OA is long-term; the aim is fewer flares and better daily function, not a perfect X-ray.",
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
    ],
  },
  "patellofemoral-pain": {
    causes:
      "Patellofemoral pain is ache around or behind the kneecap related to how the patella is loaded in squatting, stairs, and running. Hip weakness, sudden training spikes, and prolonged sitting (“movie-goer’s knee”) commonly contribute. Cartilage “damage” language is often unhelpful — load tolerance is the target.",
    whoAffected:
      "Runners, gym newcomers, and adolescents in growth spurts present frequently. Desk workers who then weekend-run are classic. Locking or true instability needs meniscal/ligament reassessment.",
    whatToExpect:
      "We analyse stairs, squat, and running load, then combine soft-tissue care with progressive quad and hip strength. Temporary reductions in deep squat volume are paired with cross-training so fitness stays. Footwear and surface changes are considered practically.",
    recoveryTimeline:
      "Many patterns improve over 6–10 weeks with consistent loading. Returning to hills or speed too early is the usual setback — we stage those exposures.",
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
          "Usually not. We improve how forces are shared rather than “relocating” the patella.",
      },
      {
        question: "Can osteopathy help movie-theatre knee?",
        answer:
          "Yes — we address sitting intolerance and rebuild load capacity for bent-knee positions.",
      },
    ],
  },
  "patellar-tendinopathy": {
    causes:
      "Patellar tendinopathy is load-related pain at the tendon below the kneecap, common in jumping sports. Energy-storage loading (jumping, sudden change of direction) exceeds tendon capacity. Rest alone often fails because tendons need progressive loading to adapt.",
    whoAffected:
      "Basketball, volleyball, and football athletes, plus gym athletes doing heavy plyometrics, present often. Adolescents can have related traction issues that need age-appropriate plans. Morning stiffness after hard sessions is common.",
    whatToExpect:
      "We confirm tendon versus fat-pad or PF joint drivers, then start progressive tendon loading — isometric then heavier strength — while adjusting jump volume. Hands-on care addresses secondary soft tissue; shockwave may be discussed for stubborn cases at our Woolwich clinic.",
    recoveryTimeline:
      "Tendon rehab commonly needs 8–12+ weeks. Pain during loading within agreed limits can be acceptable; sharp after-response guides dosing.",
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
    ],
  },
  "acl-rehab": {
    causes:
      "ACL injuries occur with cutting, landing, or collision mechanisms that stress the ligament. Post-injury or post-reconstruction rehab rebuilds strength, hop capacity, and confidence. Residual stiffness, quad lag, and fear of pivoting are common barriers.",
    whoAffected:
      "Footballers, skiers, and court-sport athletes present across SE London. Desk workers after ACL surgery need graded return to commuting and gym. Red-flag infection or DVT signs after surgery need urgent medical care.",
    whatToExpect:
      "We coordinate with surgical protocols when present, focusing on range, strength, gait, and later plyometric progressions. Hands-on care helps soft-tissue restrictions; gym programming is specific, not generic. Return-to-sport testing is criteria-based.",
    recoveryTimeline:
      "Post-op ACL timelines often span 9–12+ months for pivoting sport. Non-operative management still needs months of strength and neuromuscular work. Rushing cutting drills raises re-injury risk.",
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
    ],
  },
  "meniscal-injury": {
    causes:
      "Meniscal injuries involve the knee’s cartilage shock absorbers, from traumatic twist or degenerative change. Pain along the joint line, swelling after load, and sometimes locking can occur. Not every meniscal tear on MRI needs surgery — many degenerative tears settle with rehab.",
    whoAffected:
      "Twisting-sport athletes and middle-aged adults with degenerative menisci present often. True locked knee with loss of extension needs timely medical assessment.",
    whatToExpect:
      "We assess swelling, range, and strength, then progress joint-friendly loading while calming irritable soft tissue. Advice covers squat depth and impact volume. Orthopaedic review is discussed for persistent locking or failed conservative care.",
    recoveryTimeline:
      "Traumatic tears vary widely; degenerative patterns often improve over 6–12 weeks of rehab. Surgery decisions follow function, not MRI alone.",
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
    ],
  },
  "itb-syndrome": {
    causes:
      "Iliotibial band related pain is typically lateral knee discomfort in runners linked to load, cadence, and hip control rather than the band being “too tight” alone. Sudden mileage jumps, cambered roads, and weak hip abductors commonly contribute.",
    whoAffected:
      "Runners and walkers increasing volume present most often. Cyclists can see related lateral knee irritation. Sharp swelling or true joint locking suggests another diagnosis.",
    whatToExpect:
      "We analyse training load and hip/knee control, then combine soft-tissue care with progressive strength and run-modification (cadence, hills, volume). Endless aggressive ITB rolling is de-emphasised in favour of capacity building.",
    recoveryTimeline:
      "Many runners improve over 4–8 weeks with smart load changes. Returning to long descents too early is a common setback.",
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
    ],
  },
  "lateral-ankle-sprain": {
    causes:
      "Lateral ankle sprains stretch or tear the outer ankle ligaments after inversion on uneven ground or in sport. Swelling and bruising vary with grade. Incomplete rehab — not the initial twist alone — predicts chronic instability.",
    whoAffected:
      "Footballers, netball players, and people who miss a kerb in Woolwich present often. Recurrent rollers need balance and strength work, not only rest and a tubigrip.",
    whatToExpect:
      "Early care manages swelling and protected mobility, then progressive strength, balance, and return-to-run or sport drills. Hands-on treatment helps residual stiffness. We screen for fracture risk when Ottawa rules suggest imaging.",
    recoveryTimeline:
      "Mild sprains may settle in 1–3 weeks; moderate injuries often need 4–8 weeks for sport. Chronic instability rehab can take longer but responds well to neuromuscular training.",
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
    ],
  },
  "achilles-tendinopathy": {
    causes:
      "Achilles tendinopathy is load-related tendon pain from walking, running, or sudden calf demand. Compression from uphill walking and training spikes are common. Morning stiffness that eases then returns with load is typical. Tendons adapt to progressive loading better than to prolonged rest.",
    whoAffected:
      "Runners, walkers, and racquet-sport players present often; desk workers who suddenly start couch-to-5k plans flare frequently. Mid-portion and insertional patterns need slightly different load tweaks.",
    whatToExpect:
      "We confirm tendon diagnosis, start progressive calf loading, and adjust training surfaces and hills. Hands-on care addresses secondary calf tightness; focused shockwave may be considered for stubborn mid-portion cases after screening.",
    recoveryTimeline:
      "Expect 8–12+ weeks for meaningful tendon adaptation. Pain monitoring guides load, not total pain avoidance.",
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
    ],
  },
  "plantar-fasciitis": {
    causes:
      "Plantar fasciitis (plantar heel pain) involves overload of the plantar fascia, often with first-step morning pain. Sudden walking volume, hard floors, unsupportive footwear, and tight calves contribute. Body load and standing occupations in SE18 retail and hospitality are frequent drivers.",
    whoAffected:
      "Teachers, retail staff, runners, and people who switch to flat shoes abruptly present often. Night pain with swelling of the whole foot needs broader medical thought.",
    whatToExpect:
      "We assess foot, calf, and kinetic-chain load, then combine soft-tissue care, footwear advice, and progressive loading. Focused shockwave is considered for stubborn cases after clinical screening at Nguyen’s Osteopathic Clinic.",
    recoveryTimeline:
      "Many improve over 6–12 weeks; chronic cases can take longer. First-step pain usually improves before long standing shifts feel easy.",
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
    ],
  },
  "shin-splints": {
    causes:
      "Medial tibial stress syndrome (“shin splints”) is load-related pain along the shin from running or marching volume that outpaces bone and soft-tissue adaptation. Hard surfaces, sudden mileage jumps, and calf endurance deficits contribute. True stress fracture must be considered when pain becomes focal and progressive.",
    whoAffected:
      "New runners, military-style training, and athletes changing surfaces present often. Adolescents in growth spurts need careful dosing. Night pain and single-point bone tenderness raise stress-fracture suspicion.",
    whatToExpect:
      "We differentiate soft-tissue overload from bone stress risk, adjust running load, and build calf/foot capacity. Hands-on care eases secondary tightness. Imaging referral happens when bone stress is likely.",
    recoveryTimeline:
      "Shin splints often settle in 3–8 weeks with load reshaping. Suspected stress fractures need longer relative rest and medical guidance.",
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
    ],
  },
  "hallux-rigidus": {
    causes:
      "Hallux rigidus is stiffness and osteoarthritis of the big-toe joint that limits push-off. Trauma, repetitive forefoot load, and age-related change contribute. People compensate with outward foot roll, which can irritate the knee or hip.",
    whoAffected:
      "Adults with forefoot pain on walking, especially uphill or in flexible shoes, present often. Dancers and court athletes may notice earlier. Red, hot joints suggest inflammatory disease needing medical care.",
    whatToExpect:
      "We improve available motion gently, address calf and foot mechanics, and advise on stiffer-soled footwear that reduces painful toe bend. Strength and gait cues limit upstream compensation. Surgical opinion is discussed for advanced cases with failed conservative care.",
    recoveryTimeline:
      "Comfort gains often appear over 4–10 weeks. Structural stiffness may remain; function and pain with walking are the targets.",
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
    ],
  },
  "morton-neuroma": {
    causes:
      "Morton’s neuroma-type pain is forefoot neural irritation, often between the third and fourth toes, with burning or pebble-in-shoe sensations. Tight footwear, high forefoot load, and plantar plate stress contribute. Not every interdigital pain is a neuroma — we assess broadly.",
    whoAffected:
      "Adults in narrow fashion shoes, runners, and court athletes present often. Progressive numbness with back pain may suggest higher nerve sources.",
    whatToExpect:
      "We review footwear width and load, treat related foot mechanics, and guide activity modifications. Metatarsal padding strategies may help short term. Medical pathways are discussed for persistent neural pain.",
    recoveryTimeline:
      "Footwear and load changes can help within weeks; stubborn neural pain may need longer and possible specialist input.",
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
    ],
  },
  "subacromial-pain": {
    causes:
      "Subacromial pain involves sensitive tendons and bursal tissues under the acromion, aggravated by overhead reach and loaded elevation. Sudden DIY, swimming volume spikes, or desk-plus-gym combinations commonly flare it. “Impingement” is a description of symptoms, not a single anatomy fault.",
    whoAffected:
      "Adults doing overhead work, racket sports, or gym pressing present often. Night pain lying on the shoulder is common. Neck referral can mimic shoulder pain — we screen both.",
    whatToExpect:
      "Assessment tests tendon irritability and scapular control. Hands-on care reduces secondary spasm while progressive loading rebuilds capacity. Temporary overhead volume cuts are paired with trunk and rotator-cuff strength. Shockwave may be considered for stubborn tendinopathy after screening.",
    recoveryTimeline:
      "Many improve over 6–12 weeks. Early wins are sleep and daily reach; later wins are pressing and swimming endurance.",
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
    ],
  },
  "rotator-cuff-tear": {
    causes:
      "Rotator cuff tears range from small partial tears to larger full-thickness tears after trauma or gradual attrition. Pain with elevation, night pain, and weakness on resisted tests are common. Many degenerative tears are still managed well with rehab; acute traumatic weakness needs timely orthopaedic advice.",
    whoAffected:
      "Adults over 50 with degenerative cuff change, and younger people after falls or heavy pulls, present often. Progressive true weakness after injury is a priority pathway.",
    whatToExpect:
      "We assess tear impact on function, calm irritability, and build deltoid and remaining cuff capacity. Hands-on care addresses stiffness. We coordinate imaging/ortho when strength loss or traumatic onset warrants it.",
    recoveryTimeline:
      "Rehab timelines often span 3–6 months for meaningful strength. Post-op protocols are surgeon-led when surgery occurs.",
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
    ],
  },
  "frozen-shoulder": {
    causes:
      "Frozen shoulder (adhesive capsulitis) involves capsule contracture with pain then progressive stiffness through elevation and rotation. It may follow minor trauma, surgery, or appear idiopathic — diabetes and thyroid disease raise risk. Stages move from freezing (painful) to frozen (stiff) to thawing.",
    whoAffected:
      "Adults 40–65, especially women and people with diabetes, present commonly. Attempting aggressive stretching in high-pain phases often backfires. Neck pathology can coexist and needs screening.",
    whatToExpect:
      "We identify stage, keep mobility work within tolerable ranges, and support sleep and daily function. Hands-on care is gentle; home exercises respect irritability. Shockwave or medical pathways are discussed when appropriate. Expectations emphasise months, not days.",
    recoveryTimeline:
      "Natural history can span 12–36 months; good care improves comfort and function along the way. Early-phase pain control matters more than forcing range.",
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
    ],
  },
  "shoulder-instability": {
    causes:
      "Shoulder instability follows ligament/labral injury or inherent laxity, causing apprehension, subluxation, or dislocation with certain positions. Traumatic dislocations need appropriate acute care; ongoing rehab restores control. Overheads and contact sports raise recurrence risk without neuromuscular work.",
    whoAffected:
      "Young contact and overhead athletes present most. Hypermobile patients may have atraumatic instability. Neurological deficit after dislocation needs urgent pathways.",
    whatToExpect:
      "After acute medical management when required, we rebuild rotator cuff and scapular control, progressing into sport-specific positions carefully. Hands-on care treats secondary stiffness without stretching into unsafe ranges. Surgical opinion is discussed for recurrent traumatic dislocations.",
    recoveryTimeline:
      "First-time dislocations often need months of rehab before return to contact. Recurrent traumatic instability may need earlier surgical consideration.",
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
    ],
  },
  "ac-joint-injury": {
    causes:
      "Acromioclavicular joint injuries occur from falls onto the shoulder tip or heavy pressing. Pain is local to the AC joint with cross-body movement and pressing. Grades vary from sprain to separation; most lower-grade injuries are managed conservatively.",
    whoAffected:
      "Cyclists after falls, contact athletes, and gym athletes with pressing pain present often. Deformity with severe trauma needs medical assessment for higher-grade injury.",
    whatToExpect:
      "We protect early irritability, restore scapular and cuff control, and gradually reintroduce pressing and reaching. Hands-on care addresses surrounding soft tissue. Higher-grade separations may need orthopaedic pathways.",
    recoveryTimeline:
      "Mild sprains often improve in 2–6 weeks; higher grades take longer. Return to pressing is staged to avoid flare.",
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
          "We treat soft tissue and restore function; higher-grade separations are not “popped back” in clinic.",
      },
    ],
  },
  "tennis-elbow": {
    causes:
      "Tennis elbow (lateral elbow tendinopathy) is load-related tendon pain from gripping, lifting, and repetitive wrist extension — tools, mouse use, and racket sports included. Sudden DIY or new gym gripping often triggers it. The tendon needs progressive loading, not endless rest.",
    whoAffected:
      "Tradespeople, desk workers, and racket athletes in Woolwich present frequently. Neck referral can mimic elbow pain — we screen. Constant night pain with swelling may need medical review.",
    whatToExpect:
      "We assess elbow, wrist, and shoulder contributors, then start progressive tendon loading while adjusting aggravating grips. Hands-on care eases forearm soft tissue; focused shockwave can be considered for persistent cases after screening.",
    recoveryTimeline:
      "Expect 8–12 weeks for tendon adaptation. Early gains are daily grip comfort; later gains are tools and sport endurance.",
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
    ],
  },
  "medial-epicondylalgia": {
    causes:
      "Golfer’s elbow (medial elbow tendinopathy) involves the common flexor tendon from gripping, throwing, or repetitive wrist flexion. Tool use and climbing can overload it. As with lateral elbow pain, capacity and load dosing decide recovery.",
    whoAffected:
      "Trades, climbers, throwers, and desk workers with aggressive gripping present often. Ulnar nerve symptoms need differentiation from pure tendon pain.",
    whatToExpect:
      "Assessment separates tendon from nerve contributions, then progressive loading and task modification follow. Hands-on forearm and shoulder care supports the plan. Shockwave may be discussed for persistent tendon pain.",
    recoveryTimeline:
      "Most improve over 8–12 weeks with consistent loading. Recurrence drops when work grips and training spikes are managed.",
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
    ],
  },
  "cubital-tunnel": {
    causes:
      "Cubital tunnel syndrome irritates the ulnar nerve at the elbow, causing tingling in the ring and little fingers, especially with prolonged elbow flexion (phone use, sleeping curled). Direct pressure on the funny-bone groove aggravates it. Neck nerve roots can mimic symptoms — dual screening matters.",
    whoAffected:
      "Desk workers on phones, drivers, and people who lean on elbows present often. Progressive hand wasting needs timely medical/nerve pathways.",
    whatToExpect:
      "We reduce sustained flexion and pressure, treat related soft tissue, and screen cervical contributors. Night positioning advice is practical. Referral for nerve studies occurs when weakness progresses or conservative care fails.",
    recoveryTimeline:
      "Mild sensory cases often improve over weeks with habit change. Motor weakness timelines depend on severity and may need specialist care.",
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
    ],
  },
  "carpal-tunnel": {
    causes:
      "Carpal tunnel syndrome compresses the median nerve at the wrist, causing night tingling in thumb, index, and middle fingers, often eased by shaking the hand. Fluid retention, repetitive wrist load, and pregnancy can contribute. Neck referral and pronator syndrome are differentials.",
    whoAffected:
      "Desk workers, trades with vibrating tools, and pregnant patients present frequently. Thenar wasting or constant numbness needs timely medical review.",
    whatToExpect:
      "We advise night positioning, task modification, and treat related forearm/neck contributors. Splints may help nights. Escalation for nerve studies or injection/surgical opinion follows severity.",
    recoveryTimeline:
      "Mild intermittent cases often improve over weeks with load and night care. Progressive neurological loss is not a “wait and see” osteopathy-only pathway.",
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
    ],
  },
  dequervains: {
    causes:
      "De Quervain’s tenosynovitis irritates the thumb tendons at the wrist from repetitive lifting, phone use, or new parent thumb postures (“mummy thumb”). Swelling and pain with hitchhiker’s hitch motions are typical.",
    whoAffected:
      "New parents, desk workers, and trades using pinch grips present often. Inflammatory arthritis can mimic — atypical systemic signs need medical care.",
    whatToExpect:
      "We modify aggravating lifts, use relative rest strategies, and progressively reload the tendons. Hands-on care addresses forearm contributors. Splinting may help short term.",
    recoveryTimeline:
      "Many improve over 4–8 weeks with consistent modification and reload. Recurrence drops when lift mechanics change.",
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
    ],
  },
  "cmc-oa": {
    causes:
      "Base-of-thumb osteoarthritis (CMC OA) causes pain opening jars, pinching, and daily gripping as the carpometacarpal joint changes. Joint geometry and lifetime load contribute; secondary soft-tissue tension adds to irritability.",
    whoAffected:
      "Adults over 50, especially women, present often. Craft workers and trades notice day-long ache. Hot, swollen multiple joints suggest inflammatory disease needing medical care.",
    whatToExpect:
      "We teach joint-protection strategies, build supporting muscle endurance, and ease secondary soft tissue. Aids for jars and pacing advice are practical. Medical options (splints, injection, surgery) are discussed when function stays limited.",
    recoveryTimeline:
      "Comfort and task ease often improve over 4–10 weeks. Structural OA remains; skill and strength change daily disability.",
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
    ],
  },
  fibromyalgia: {
    causes:
      "Fibromyalgia involves amplified pain processing with widespread tenderness, fatigue, and sleep disturbance — not joint destruction. Flare triggers include stress, poor sleep, and sudden activity spikes. It coexists with other MSK issues; local osteopathy still helps irritable regions within a whole-person plan.",
    whoAffected:
      "Adults with long-standing widespread pain, often women, present for local flares layered on systemic sensitivity. Red-flag neurological or inflammatory signs still need medical exclusion.",
    whatToExpect:
      "Sessions are gentler and shorter when sensitivity is high. We combine calming hands-on care with graded activity, sleep routine advice, and pacing — never pushing into major flares. GP and pain-service coordination remains important.",
    recoveryTimeline:
      "Improvement is measured in months of pacing and sleep gains, with fewer severe flares. Local MSK episodes may settle faster within that broader arc.",
    faqs: [
      {
        question: "Is fibromyalgia “all in my head”?",
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
    ],
  },
  deconditioning: {
    causes:
      "Deconditioning is reduced fitness, strength, and confidence after illness, pain flares, or long inactivity. Everyday tasks then feel harder, feeding a cycle of avoidance. It is reversible with graded exposure and strength — not a fixed identity.",
    whoAffected:
      "People after surgery, long COVID-type fatigue patterns, or chronic pain flare cycles present often. Jumping back into intense gym work too fast commonly rebounds.",
    whatToExpect:
      "We set a baseline you can repeat, then progress walking, strength, and joint mobility without heroic spikes. Hands-on care eases secondary stiffness. Plans respect medical advice from your GP when fatigue syndromes are complex.",
    recoveryTimeline:
      "Noticeable capacity gains often appear over 6–12 weeks of consistency. Setbacks are expected; the skill is returning to the plan without all-or-nothing thinking.",
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
    ],
  },
  osteoporosis: {
    causes:
      "Osteoporosis reduces bone density and raises fracture risk. Pain presenting to osteopathy is often from secondary muscle tension, posture change, or fracture aftermath — not “soft bones hurting” constantly. Falls risk and spinal fracture history shape how vigorously we mobilise.",
    whoAffected:
      "Post-menopausal adults, people on long-term steroids, and older patients after low-trauma fractures present often. Sudden severe spinal pain after a simple bend needs fracture assessment.",
    whatToExpect:
      "We use fracture-safe techniques, improve comfort and posture-related soft tissue, and encourage medically appropriate strength and balance work. We do not replace DEXA monitoring or GP/endocrinology care. Exercise advice aligns with bone-health guidance.",
    recoveryTimeline:
      "Comfort and confidence often improve over weeks; bone density changes over months to years with medical care. Fall-prevention habits are ongoing.",
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
    ],
  },
  "post-surgical-general": {
    causes:
      "After surgery, stiffness, protective muscle guarding, scar sensitivity, and deconditioning commonly limit function even when the operation succeeded. Swelling and fear of “undoing” the surgery slow movement. Osteopathy supports recovery alongside your surgical protocol — it does not replace consultant advice.",
    whoAffected:
      "Patients after orthopaedic, abdominal, or other operations who feel stuck with stiffness or compensatory pain present often. Signs of infection, DVT, or wound problems need urgent medical care first.",
    whatToExpect:
      "We review your stage and precautions, then restore comfortable mobility and neighbouring joint function while respecting surgical limits. Soft-tissue care and graded strength sit inside your surgeon/physio timeline. Communication is clear about what we will and will not do.",
    recoveryTimeline:
      "Depends entirely on the procedure — weeks to months. We measure task gains (walking, stairs, sleep) against your protocol milestones.",
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
    ],
  },
};

function escapeForTs(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '\\"')
    .replace(/\u2014/g, "—");
}

function formatFaqs(faqs) {
  return faqs
    .map(
      (f) => `      {
        question: "${escapeForTs(f.question)}",
        answer:
          "${escapeForTs(f.answer)}",
      }`,
    )
    .join(",\n");
}

function formatExpansion(slug, exp) {
  const related = relatedBySlug[slug] || [];
  const relatedBlock =
    related.length > 0
      ? `    relatedConditionSlugs: [
${related.map((s) => `      "${s}",`).join("\n")}
    ],
`
      : "";
  return `    causes:
      "${escapeForTs(exp.causes)}",
    whoAffected:
      "${escapeForTs(exp.whoAffected)}",
    whatToExpect:
      "${escapeForTs(exp.whatToExpect)}",
    recoveryTimeline:
      "${escapeForTs(exp.recoveryTimeline)}",
    faqs: [
${formatFaqs(exp.faqs)}
    ],
${relatedBlock}`;
}

let injected = 0;
let missing = [];

for (const [slug, exp] of Object.entries(expansions)) {
  // Find the condition block and inject before relatedServiceSlug if causes missing
  const slugMarker = `slug: "${slug}"`;
  const slugIndex = src.indexOf(slugMarker);
  if (slugIndex < 0) {
    missing.push(slug);
    continue;
  }
  // Check if already expanded
  const nextSlug = src.indexOf("\n  {\n    slug:", slugIndex + 1);
  const blockEnd = nextSlug > 0 ? nextSlug : src.indexOf("\n];\n", slugIndex);
  const block = src.slice(slugIndex, blockEnd);
  if (block.includes("causes:")) {
    continue;
  }
  const insertAt = src.indexOf("relatedServiceSlug:", slugIndex);
  if (insertAt < 0 || (blockEnd > 0 && insertAt > blockEnd)) {
    missing.push(slug + ":no-service");
    continue;
  }
  const chunk = formatExpansion(slug, exp);
  src = src.slice(0, insertAt) + chunk + src.slice(insertAt);
  injected++;
}

fs.writeFileSync(path, src);
console.log("Injected", injected, "conditions");
if (missing.length) console.log("Missing/problems", missing);

// verify all have causes
const countCauses = (src.match(/causes:/g) || []).length;
const countSlugs = (src.match(/^\s+slug: "/gm) || []).length;
console.log("causes fields", countCauses, "slugs", countSlugs);