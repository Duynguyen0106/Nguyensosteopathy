/**
 * Public rehab exercise library — SSOT for /exercises pages.
 * Educational guides only; not personalised prescriptions.
 * Optional `videoUrl` is reserved for a later video pass.
 */

export type ExerciseRegion =
  | "Lumbar"
  | "Cervical"
  | "Thoracic"
  | "Hip"
  | "Knee"
  | "Ankle & Foot"
  | "Shoulder"
  | "Elbow & Wrist"
  | "Whole body";

export type ExerciseLevel = "early" | "build" | "return";

export type ProgrammePhase = "settle" | "rebuild" | "capacity";

export type IllustrationKey =
  | "supine-knees-bent"
  | "supine-leg-slide"
  | "prone-press"
  | "seated-desk"
  | "standing-hinge"
  | "standing-calf"
  | "side-lying"
  | "quadruped"
  | "wall-slide"
  | "band-row"
  | "step-down"
  | "ankle-alphabet"
  | "nerve-glide"
  | "shoulder-pendulum"
  | "heel-raise"
  | "bridge"
  | "chin-tuck"
  | "open-book"
  | "figure-four"
  | "single-leg-balance"
  | "seated-scapular";

export type Exercise = {
  slug: string;
  title: string;
  summary: string;
  region: ExerciseRegion;
  level: ExerciseLevel;
  equipment: string;
  illustration: IllustrationKey;
  steps: string[];
  cues: string[];
  avoid: string[];
  dosage: string;
  relatedConditionSlugs: string[];
  relatedProgrammeSlugs?: string[];
  /** Reserved for a later video pass — leave unset for now. */
  videoUrl?: string;
};

export type Programme = {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  phase: ProgrammePhase;
  exerciseSlugs: string[];
  relatedConditionSlugs: string[];
  relatedServiceSlug?: string;
  precautions: string[];
};

export const exerciseRegions: ExerciseRegion[] = [
  "Lumbar",
  "Cervical",
  "Thoracic",
  "Hip",
  "Knee",
  "Ankle & Foot",
  "Shoulder",
  "Elbow & Wrist",
  "Whole body",
];

export const levelLabels: Record<ExerciseLevel, string> = {
  early: "Early settle",
  build: "Build strength",
  return: "Return to load",
};

export const phaseLabels: Record<ProgrammePhase, string> = {
  settle: "Settle symptoms",
  rebuild: "Rebuild capacity",
  capacity: "Load tolerance",
};

export const exercises: Exercise[] = [
  {
    slug: "pelvic-tilts",
    title: "Pelvic tilts",
    summary:
      "Gentle low-back rocking on your back to ease stiffness and find a comfortable mid-range.",
    region: "Lumbar",
    level: "early",
    equipment: "Mat or firm bed",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with knees bent and feet flat, hip-width apart.",
      "Gently flatten your lower back into the surface by tipping the pelvis (think “zip the waistband down”).",
      "Then tip the pelvis the other way so a small hollow appears under the low back.",
      "Move slowly between these two positions within a comfortable range.",
    ],
    cues: [
      "Keep the movement small — this is a rock, not a crunch.",
      "Breathe out as you flatten; breathe in as you hollow.",
      "Shoulders and neck stay relaxed.",
    ],
    avoid: [
      "Forcing into pain or breath-holding.",
      "Lifting the hips off the surface (that is a bridge — separate drill).",
    ],
    dosage: "8–12 slow rocks, 1–2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "facet-syndrome",
      "sciatica",
      "coccydynia",
      "lumbar-stenosis",
      "fibromyalgia",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
      "post-visit-gentle-move",
      "pregnancy-pelvic-ease",
      "sciatica-nerve-calm",
      "stenosis-flexion-calm",
    ],
  },
  {
    slug: "knee-rolls",
    title: "Knee rolls",
    summary:
      "Side-to-side knee drops to mobilise the lumbar spine and ease protective tightness.",
    region: "Lumbar",
    level: "early",
    equipment: "Mat or firm bed",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with knees bent and feet together.",
      "Keep shoulders on the surface and let both knees drop a short distance to one side.",
      "Return to centre, then drop to the other side.",
      "Stay within a range that feels easing, not sharp.",
    ],
    cues: [
      "Imagine the knees drawing a small arc — quality over distance.",
      "If one side pinches, reduce the range on that side only.",
    ],
    avoid: [
      "Twisting through pain into the buttock or leg.",
      "Letting the opposite shoulder lift hard off the surface.",
    ],
    dosage: "8–10 each side, 1–2 sets, once or twice daily",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "si-joint-dysfunction",
      "sciatica",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "post-visit-gentle-move",
      "sciatica-nerve-calm",
    ],
  },
  {
    slug: "supine-marching",
    title: "Supine marching",
    summary:
      "Alternating heel lifts to wake deep abdominal control without straining the back.",
    region: "Lumbar",
    level: "build",
    equipment: "Mat",
    illustration: "supine-leg-slide",
    steps: [
      "Lie on your back, knees bent, feet flat.",
      "Find a comfortable mid-range pelvis (neither fully flat nor arched).",
      "Gently lift one foot a few centimetres, pause, then lower.",
      "Alternate sides while keeping the pelvis quiet.",
    ],
    cues: [
      "The goal is a steady pelvis, not a high knee.",
      "Exhale on the lift if that helps you stay steady.",
    ],
    avoid: [
      "Arching or rocking the low back as the foot lifts.",
      "Holding your breath or bracing so hard the neck tenses.",
    ],
    dosage: "8–10 lifts each side, 2 sets, most days",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "deconditioning",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: ["acute-low-back-settle"],
  },
  {
    slug: "glute-bridge",
    title: "Glute bridge",
    summary:
      "Hip lift to strengthen the back of the hips and support everyday lifting posture.",
    region: "Hip",
    level: "build",
    equipment: "Mat",
    illustration: "bridge",
    steps: [
      "Lie on your back, knees bent, feet hip-width apart near the hips.",
      "Press through the heels and lift the hips until your body forms a gentle line from shoulders to knees.",
      "Pause briefly, then lower with control.",
    ],
    cues: [
      "Think “squeeze the cheeks” rather than thrusting the ribs.",
      "Keep knees tracking over mid-foot.",
    ],
    avoid: [
      "Overarching the low back at the top.",
      "Pushing into sharp low-back or groin pain.",
    ],
    dosage: "8–12 reps, 2–3 sets, 3–4 days per week",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "si-joint-dysfunction",
      "greater-trochanteric-pain",
      "patellofemoral-pain",
      "coccydynia",
      "meniscal-injury",
      "osteoporosis",
      "spondylolysis",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
      "hamstring-return",
      "knee-settle-early",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "patellofemoral-build",
      "sciatica-nerve-calm",
    ],
  },
  {
    slug: "hip-hinge-practice",
    title: "Hip hinge practice",
    summary:
      "Standing hinge pattern for safer bending — useful after low-back flares and for desk workers.",
    region: "Lumbar",
    level: "build",
    equipment: "None (optional stick along the spine)",
    illustration: "standing-hinge",
    steps: [
      "Stand with feet hip-width, soft knees.",
      "Push the hips back as if closing a car door with your backside, keeping a long spine.",
      "Feel a stretch in the back of the thighs; then stand tall by driving the hips forward.",
    ],
    cues: [
      "Chest stays proud; weight stays mid-foot to heels.",
      "Stop when the low back wants to round.",
    ],
    avoid: [
      "Squatting down by bending only the knees.",
      "Rounding hard through the low back to reach further.",
    ],
    dosage: "8–10 slow reps, 2 sets, daily while symptoms settle",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "lumbar-disc-radiculopathy",
      "hamstring-strain",
      "coccydynia",
      "lumbar-stenosis",
      "osteoporosis",
      "spondylolysis",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
      "desk-neck-reset",
      "hamstring-return",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "stenosis-flexion-calm",
    ],
  },
  {
    slug: "chin-tuck",
    title: "Chin tuck (cervical retraction)",
    summary:
      "Small neck slide to reverse forward-head posture from screens and phones.",
    region: "Cervical",
    level: "early",
    equipment: "Chair with a backrest (optional wall)",
    illustration: "chin-tuck",
    steps: [
      "Sit tall with the back supported, or stand with the back of the head near a wall.",
      "Gently draw the chin straight back, as if making a soft double chin.",
      "Hold 2–3 seconds, then release to a comfortable neutral — not a forward poke.",
    ],
    cues: [
      "Eyes stay level; do not tip the head up or down.",
      "The movement is small — millimetres, not a stretch contest.",
    ],
    avoid: [
      "Jamming into pain, dizziness, or arm tingling.",
      "Clenching the jaw or shrugging the shoulders.",
    ],
    dosage: "8–10 holds, several short sets through the desk day",
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "cervical-radiculopathy",
      "whiplash",
      "fibromyalgia",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "post-visit-gentle-move",
      "pregnancy-pelvic-ease",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "seated-scapular-set",
    title: "Seated scapular set",
    summary:
      "Gentle shoulder-blade slide to open the chest after long keyboard hours.",
    region: "Thoracic",
    level: "early",
    equipment: "Chair",
    illustration: "seated-scapular",
    steps: [
      "Sit tall with feet flat and arms relaxed by your sides.",
      "Draw the shoulder blades slightly down and together — think “put the blades in back pockets”.",
      "Hold 3–5 seconds, then release without collapsing forward.",
    ],
    cues: [
      "Keep the neck long; do not poke the chin.",
      "Less is more — a quiet set beats a hard squeeze.",
    ],
    avoid: [
      "Shrugging the ears toward the shoulders.",
      "Arching the low back to fake the movement.",
    ],
    dosage: "8–10 holds, hourly during desk work",
    relatedConditionSlugs: [
      "neck-pain",
      "thoracic-joint-dysfunction",
      "subacromial-pain",
      "ac-joint-injury",
      "cubital-tunnel",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "frozen-shoulder-early",
      "pregnancy-pelvic-ease",
      "shoulder-arc-calm",
      "shoulder-stability-build",
      "tennis-elbow-build",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "open-book-rotation",
    title: "Open-book rotation",
    summary:
      "Side-lying thoracic rotation to free a stiff mid-back after desk or driving days.",
    region: "Thoracic",
    level: "early",
    equipment: "Mat",
    illustration: "open-book",
    steps: [
      "Lie on your side with knees bent and stacked, arms stretched forward together.",
      "Slide the top arm across the body and open the chest toward the ceiling, following the hand with your eyes.",
      "Pause where the mid-back feels a comfortable stretch, then return.",
    ],
    cues: [
      "Keep the knees stacked so the twist comes from the ribcage, not the low back.",
      "Exhale as you open.",
    ],
    avoid: [
      "Forcing the hand to the floor.",
      "Pain that shoots into the arm or makes you dizzy.",
    ],
    dosage: "6–8 each side, 1–2 sets, daily",
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "neck-pain",
      "costochondritis",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "frozen-shoulder-early",
      "shoulder-arc-calm",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "sciatic-nerve-glide",
    title: "Sciatic nerve glide (slider)",
    summary:
      "Gentle nerve mobility for buttock-to-leg symptoms when irritability is low to moderate.",
    region: "Lumbar",
    level: "early",
    equipment: "Chair or mat",
    illustration: "nerve-glide",
    steps: [
      "Sit tall on a chair with the symptomatic leg slightly forward.",
      "Straighten the knee a little while looking up (chin gently lifted).",
      "Then bend the knee while tucking the chin slightly — a smooth “see-saw”, not a stretch hold.",
    ],
    cues: [
      "Keep the range small enough that symptoms stay mild and settle quickly after.",
      "Move slowly; this is mobility, not a hamstring stretch competition.",
    ],
    avoid: [
      "Pushing into sharp, escalating, or lingering nerve pain.",
      "Doing this during a severe flare when even sitting aggravates the leg.",
    ],
    dosage: "8–10 slow sliders, 1–2 sets, once or twice daily if calming",
    relatedConditionSlugs: [
      "sciatica",
      "lumbar-disc-radiculopathy",
      "piriformis-syndrome",
    ],
    relatedProgrammeSlugs: ["sciatica-nerve-calm"],
  },
  {
    slug: "piriformis-figure-four",
    title: "Figure-four hip stretch",
    summary:
      "Gentle outer-hip stretch that many people with buttock-referred symptoms find easing.",
    region: "Hip",
    level: "early",
    equipment: "Mat",
    illustration: "figure-four",
    steps: [
      "Lie on your back and cross the ankle of the symptomatic side over the opposite thigh (figure-four).",
      "If comfortable, draw the uncrossed thigh toward you until you feel a mild outer-hip stretch.",
      "Hold briefly, breathe, then release.",
    ],
    cues: [
      "Keep the pelvis level; do not yank the knee across.",
      "Stop if symptoms increase down the leg.",
    ],
    avoid: [
      "Aggressive stretching during an acute nerve flare.",
      "Forcing the knee toward the chest through pinching groin pain.",
    ],
    dosage: "20–30 second holds × 2–3, once or twice daily",
    relatedConditionSlugs: [
      "piriformis-syndrome",
      "sciatica",
      "si-joint-dysfunction",
    ],
    relatedProgrammeSlugs: [
      "lateral-hip-settle",
      "sciatica-nerve-calm",
    ],
  },
  {
    slug: "quad-set-short-arc",
    title: "Quad set / short-arc extension",
    summary:
      "Rebuild front-thigh control for kneecap irritability and return-to-stairs confidence.",
    region: "Knee",
    level: "early",
    equipment: "Rolled towel under the knee (optional)",
    illustration: "supine-leg-slide",
    steps: [
      "Sit or lie with the knee slightly bent over a rolled towel if helpful.",
      "Tighten the front of the thigh to straighten the knee and press the knee down gently.",
      "Hold 3–5 seconds, then relax.",
    ],
    cues: [
      "Feel the muscle above the kneecap firm up.",
      "Keep the movement pain-light — mild effort ache is fine; sharp joint pain is not.",
    ],
    avoid: [
      "Forcing full lock into a painful kneecap.",
      "Holding the breath or gripping the toes hard.",
    ],
    dosage: "10–15 holds, 2–3 sets, daily",
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "knee-oa",
      "patellar-tendinopathy",
      "acl-rehab",
      "meniscal-injury",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "side-lying-hip-abduction",
    title: "Side-lying hip abduction",
    summary:
      "Side-hip strength that helps kneecap tracking and single-leg control.",
    region: "Hip",
    level: "build",
    equipment: "Mat",
    illustration: "side-lying",
    steps: [
      "Lie on your side with the bottom leg bent for balance and the top leg straight.",
      "Lift the top leg slightly behind the midline of the body (not out in front).",
      "Lower with control without letting the pelvis roll back.",
    ],
    cues: [
      "Lead with the heel; toes can point slightly down.",
      "Keep the waist long — avoid hiking the hip toward the ribs.",
    ],
    avoid: [
      "Rolling the pelvis backward so the low back does the work.",
      "Lifting into outer-hip pinching pain.",
    ],
    dosage: "8–12 each side, 2–3 sets, 3–4 days per week",
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "greater-trochanteric-pain",
      "itb-syndrome",
      "meniscal-injury",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "lateral-hip-settle",
      "patellofemoral-build",
    ],
  },
  {
    slug: "step-down-control",
    title: "Step-down control",
    summary:
      "Slow single-leg lower from a low step to build kneecap and hip control.",
    region: "Knee",
    level: "return",
    equipment: "Low step (10–15 cm)",
    illustration: "step-down",
    steps: [
      "Stand on a low step on the working leg, hands free or lightly supported.",
      "Slowly lower the other heel toward the floor by bending the working knee.",
      "Lightly tap the heel, then rise back up with control.",
    ],
    cues: [
      "Keep the knee tracking over the mid-foot — not collapsing inward.",
      "Move slowly on the way down; that is where the training happens.",
    ],
    avoid: [
      "Dropping quickly or letting the knee dive inward.",
      "Using a high step while symptoms are still irritable.",
    ],
    dosage: "6–8 each side, 2 sets, every other day when ready",
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "itb-syndrome",
      "acl-rehab",
    ],
    relatedProgrammeSlugs: ["patellofemoral-build"],
  },
  {
    slug: "plantar-fascia-roll",
    title: "Plantar fascia roll",
    summary:
      "Gentle sole massage with a ball or foam roller to ease morning heel stiffness.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "Firm ball or foam roller",
    illustration: "standing-calf",
    steps: [
      "Sit or stand and place a firm ball or foam roller under the arch of the foot.",
      "Roll slowly from heel toward the ball of the foot for 1–2 minutes.",
      "Pause on tender spots with light pressure — ease, do not crush.",
    ],
    cues: [
      "Pressure should feel “useful sore”, not sharp.",
      "Morning stiffness often responds to short, frequent rolls.",
    ],
    avoid: [
      "Aggressive rolling on a swollen or acutely inflamed heel.",
      "Balancing on the roller if you feel unsteady.",
    ],
    dosage: "1–2 minutes, 1–2 times daily (especially after first steps)",
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "achilles-tendinopathy",
    ],
    relatedProgrammeSlugs: [
      "forefoot-ease",
      "plantar-heel-load",
    ],
  },
  {
    slug: "calf-wall-stretch",
    title: "Calf wall stretch",
    summary:
      "Gastrocnemius stretch to reduce pull through the Achilles and plantar fascia.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "Wall",
    illustration: "standing-calf",
    steps: [
      "Stand facing a wall, hands on the wall, one foot back.",
      "Keep the back heel down and the back knee straight; lean gently forward until you feel a calf stretch.",
      "Hold, then switch sides. For a soleus bias, bend the back knee slightly and repeat.",
    ],
    cues: [
      "Feet point forward; hips square to the wall.",
      "Stretch should be mild and steady — not bouncing.",
    ],
    avoid: [
      "Forcing through sharp Achilles pain.",
      "Letting the back foot turn out.",
    ],
    dosage: "20–30 seconds × 2–3 each side, daily",
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "achilles-tendinopathy",
      "shin-splints",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "isometric-heel-raise",
    title: "Isometric heel raise hold",
    summary:
      "Static calf load that many plantar and Achilles presentations tolerate early.",
    region: "Ankle & Foot",
    level: "build",
    equipment: "Floor or step (optional support)",
    illustration: "heel-raise",
    steps: [
      "Stand with feet hip-width, lightly holding a wall or chair if needed.",
      "Rise onto the balls of the feet to a comfortable height.",
      "Hold 20–30 seconds, then lower slowly.",
    ],
    cues: [
      "Distribute weight across both feet unless advised otherwise.",
      "Keep ankles steady — avoid rolling onto the outer edge.",
    ],
    avoid: [
      "Pushing into sharp heel or Achilles pain.",
      "Bouncing or rushing the hold.",
    ],
    dosage: "3–5 holds of 20–30 seconds, daily when calming",
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "achilles-tendinopathy",
      "lateral-ankle-sprain",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "shoulder-pendulum",
    title: "Shoulder pendulum",
    summary:
      "Gentle unsupported arm circles to keep the shoulder moving when irritable.",
    region: "Shoulder",
    level: "early",
    equipment: "Table or chair back for support",
    illustration: "shoulder-pendulum",
    steps: [
      "Lean forward with the non-working hand on a table, working arm hanging relaxed.",
      "Let the arm swing in small circles or forward–back arcs using body sway, not muscle force.",
      "Reverse direction after a short set.",
    ],
    cues: [
      "The arm should feel heavy and loose.",
      "Keep circles small at first.",
    ],
    avoid: [
      "Actively powering the arm with the shoulder muscles.",
      "Leaning so far that the neck and low back complain.",
    ],
    dosage: "30–60 seconds each direction, 1–2 times daily",
    relatedConditionSlugs: [
      "subacromial-pain",
      "frozen-shoulder",
      "rotator-cuff-tear",
      "ac-joint-injury",
    ],
    relatedProgrammeSlugs: [
      "frozen-shoulder-early",
      "post-visit-gentle-move",
      "shoulder-arc-calm",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "wall-angels",
    title: "Wall angels",
    summary:
      "Wall-supported arm slides to train scapular control through a calm overhead arc.",
    region: "Shoulder",
    level: "build",
    equipment: "Wall",
    illustration: "wall-slide",
    steps: [
      "Stand with back, head, and sacrum lightly against a wall, feet a step forward.",
      "Bring arms to a “goal post” position with elbows and wrists near the wall if comfortable.",
      "Slide the arms upward a short distance, then return — stay within a quiet range.",
    ],
    cues: [
      "Ribcage stays down; do not arch to get higher.",
      "If wrists cannot touch the wall, keep a comfortable float — form over height.",
    ],
    avoid: [
      "Forcing overhead into pinching shoulder pain.",
      "Poking the chin forward off the wall.",
    ],
    dosage: "6–10 slow reps, 2 sets, most days",
    relatedConditionSlugs: [
      "subacromial-pain",
      "frozen-shoulder",
      "thoracic-joint-dysfunction",
      "osteoporosis",
      "spondylolysis",
      "fibromyalgia",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "osteoporosis-safe-load",
      "shoulder-arc-calm",
      "shoulder-stability-build",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "band-external-rotation",
    title: "Band external rotation",
    summary:
      "Light rotator-cuff strength with the elbow by the side — a staple for subacromial calm.",
    region: "Shoulder",
    level: "build",
    equipment: "Light resistance band",
    illustration: "band-row",
    steps: [
      "Anchor a light band at elbow height. Stand side-on with the working elbow bent 90° by your side.",
      "Rotate the forearm outward against the band, keeping the elbow tucked.",
      "Return slowly to the start.",
    ],
    cues: [
      "A small towel under the elbow can remind you to keep it by the ribs.",
      "Use a band you can control for 10–12 smooth reps.",
    ],
    avoid: [
      "Shrugging or letting the elbow drift away from the body.",
      "Heavy bands that change the movement quality.",
    ],
    dosage: "10–12 reps, 2–3 sets, 3–4 days per week",
    relatedConditionSlugs: [
      "subacromial-pain",
      "rotator-cuff-tear",
      "shoulder-instability",
    ],
    relatedProgrammeSlugs: [
      "shoulder-arc-calm",
      "shoulder-stability-build",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "ankle-alphabet",
    title: "Ankle alphabet",
    summary:
      "Write the alphabet with your foot to restore early ankle motion after a sprain.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "Chair",
    illustration: "ankle-alphabet",
    steps: [
      "Sit with the foot free of the floor.",
      "Using the big toe as a “pen”, slowly write the alphabet in the air.",
      "Keep letters large enough to move the ankle, small enough to stay comfortable.",
    ],
    cues: [
      "Move from the ankle, not by swinging the whole leg.",
      "Skip letters that provoke sharp pain; return to them later.",
    ],
    avoid: [
      "Pushing through marked swelling increase or sharp lateral pain.",
      "Weight-bearing versions too early if walking still flares badly.",
    ],
    dosage: "1 alphabet, 1–2 times daily in the early phase",
    relatedConditionSlugs: [
      "lateral-ankle-sprain",
      "achilles-tendinopathy",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "single-leg-balance",
    title: "Single-leg balance",
    summary:
      "Quiet standing balance to retrain ankle reflexes after sprain or for lower-limb rehab.",
    region: "Ankle & Foot",
    level: "build",
    equipment: "Stable floor (near a wall)",
    illustration: "single-leg-balance",
    steps: [
      "Stand near a wall or chair. Shift onto one foot and lift the other slightly.",
      "Hold a steady posture with soft knee and quiet hips.",
      "Progress later by turning the head slowly or closing the eyes briefly if safe.",
    ],
    cues: [
      "Spread the toes and feel the whole foot.",
      "Quality holds beat long wobbly struggles.",
    ],
    avoid: [
      "Practising on uneven ground before indoor control is easy.",
      "Holding the breath or locking the knee hard.",
    ],
    dosage: "20–40 seconds × 3 each side, daily",
    relatedConditionSlugs: [
      "lateral-ankle-sprain",
      "patellofemoral-pain",
      "deconditioning",
      "meniscal-injury",
      "osteoporosis",
      "spondylolysis",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "forefoot-ease",
      "knee-settle-early",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "patellofemoral-build",
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "bird-dog",
    title: "Bird-dog",
    summary:
      "Opposite arm and leg reach on all fours for whole-body control after visits or desk days.",
    region: "Whole body",
    level: "build",
    equipment: "Mat",
    illustration: "quadruped",
    steps: [
      "Start on hands and knees with a long, neutral spine.",
      "Slide one hand forward and the opposite heel back without rotating the pelvis.",
      "Pause, return, then switch sides.",
    ],
    cues: [
      "Imagine a glass of water on your low back — do not spill it.",
      "Reach long rather than lifting high.",
    ],
    avoid: [
      "Arching or sagging through the midsection.",
      "Rushing reps when the pelvis wobbles.",
    ],
    dosage: "6–8 each side, 2 sets, most days",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "deconditioning",
      "thoracic-joint-dysfunction",
      "osteoporosis",
      "spondylolysis",
      "fibromyalgia",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "hamstring-return",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "post-visit-gentle-move",
    ],
  },
  {
    slug: "diaphragmatic-breathing",
    title: "Diaphragmatic breathing",
    summary:
      "Quiet belly–rib breathing to settle the nervous system after treatment or a flare.",
    region: "Whole body",
    level: "early",
    equipment: "None",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back or sit supported with one hand on the belly and one on the chest.",
      "Breathe in through the nose so the belly hand rises more than the chest hand.",
      "Exhale slowly through the mouth or nose, letting the shoulders drop.",
    ],
    cues: [
      "Aim for calm, not huge breaths.",
      "Three to five minutes is enough for most people.",
    ],
    avoid: [
      "Forcing deep breaths that make you light-headed.",
      "Breath-holding or tense jaw.",
    ],
    dosage: "3–5 minutes, 1–2 times daily or after flares",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "neck-pain",
      "fibromyalgia",
      "costochondritis",
      "coccydynia",
      "lumbar-stenosis",
      "osteoporosis",
      "spondylolysis",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
      "desk-neck-reset",
      "frozen-shoulder-early",
      "osteoporosis-safe-load",
      "post-visit-gentle-move",
      "pregnancy-pelvic-ease",
      "sciatica-nerve-calm",
      "stenosis-flexion-calm",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "cat-cow",
    title: "Cat–cow",
    summary:
      "Slow spinal flexion and extension on all fours to ease stiffness after desk days or treatment.",
    region: "Thoracic",
    level: "early",
    equipment: "Mat",
    illustration: "quadruped",
    steps: [
      "Start on hands and knees with hands under shoulders and knees under hips.",
      "Exhale and round the spine toward the ceiling (cat), letting the head drop gently.",
      "Inhale and soften the belly toward the floor while lifting the chest slightly (cow).",
      "Move slowly between the two shapes within a comfortable range.",
    ],
    cues: [
      "Lead with the mid-back, not a big neck whip.",
      "Keep wrists stacked under shoulders; soften the elbows if needed.",
    ],
    avoid: [
      "Forcing end-range if it recreates sharp lumbar or neck pain.",
      "Holding the breath.",
    ],
    dosage: "8–10 slow cycles, 1–2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "non-specific-low-back-pain",
      "neck-pain",
      "scheuermanns",
      "lumbar-stenosis",
      "fibromyalgia",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "post-visit-gentle-move",
      "pregnancy-pelvic-ease",
      "stenosis-flexion-calm",
    ],
  },
  {
    slug: "dead-bug",
    title: "Dead bug",
    summary:
      "Opposite arm and leg reach on your back for deep-core control without loading the spine upright.",
    region: "Lumbar",
    level: "build",
    equipment: "Mat",
    illustration: "supine-leg-slide",
    steps: [
      "Lie on your back with hips and knees bent to about 90° and arms reaching toward the ceiling.",
      "Gently flatten the low back into the mat and keep that contact as you move.",
      "Slowly reach one arm overhead and the opposite heel toward the floor without arching.",
      "Return to the start, then switch sides.",
    ],
    cues: [
      "If the low back lifts, shorten the reach.",
      "Exhale on the reach; keep ribs quiet.",
    ],
    avoid: [
      "Rushing or letting the pelvis rock side to side.",
      "Pushing into pain or breath-holding.",
    ],
    dosage: "6–8 each side, 2 sets, most days",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "deconditioning",
      "si-joint-dysfunction",
    ],
    relatedProgrammeSlugs: ["acute-low-back-settle"],
  },
  {
    slug: "prone-press-up",
    title: "Prone press-up",
    summary:
      "Gentle face-down back extension to ease morning stiffness when extension feels helpful.",
    region: "Lumbar",
    level: "early",
    equipment: "Mat or firm bed",
    illustration: "prone-press",
    steps: [
      "Lie face down with hands under the shoulders, elbows tucked.",
      "Press the chest a short distance off the surface while the hips stay down.",
      "Pause briefly, then lower with control.",
      "Keep the range small at first — think of a gentle press, not a full push-up.",
    ],
    cues: [
      "Shoulders stay away from the ears.",
      "Stop if leg symptoms increase and stay increased.",
    ],
    avoid: [
      "Forcing into sharp lumbar pain or breath-holding.",
      "Using this as a substitute for red-flag assessment.",
    ],
    dosage: "6–10 gentle reps, 1–2 sets, 1–2 times daily if helpful",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "lumbar-disc-radiculopathy",
      "facet-syndrome",
    ],
    relatedProgrammeSlugs: ["acute-low-back-settle"],
  },
  {
    slug: "seated-flexion-fold",
    title: "Seated flexion fold",
    summary:
      "Gentle forward fold in a chair for people who prefer flexion when upright extension feels crowded.",
    region: "Lumbar",
    level: "early",
    equipment: "Chair",
    illustration: "seated-desk",
    steps: [
      "Sit toward the front of a sturdy chair with feet flat and hip-width apart.",
      "Slide your hands down the thighs toward the floor, letting the spine round gently.",
      "Pause in a comfortable fold, breathing easily.",
      "Stack back up slowly, one vertebra at a time.",
    ],
    cues: [
      "Think “ease forward,” not “force your head to your knees.”",
      "Stop short of sharp leg symptoms that linger after you sit up.",
    ],
    avoid: [
      "Bouncing or yanking into end-range.",
      "Using this if you have red-flag neurological change — get assessed.",
    ],
    dosage: "5–8 slow folds, 1–2 sets, 1–2 times daily if helpful",
    relatedConditionSlugs: [
      "lumbar-stenosis",
      "non-specific-low-back-pain",
      "lumbar-disc-radiculopathy",
    ],
    relatedProgrammeSlugs: ["stenosis-flexion-calm"],
  },
  {
    slug: "knee-to-chest",
    title: "Single knee-to-chest",
    summary:
      "Gentle hip and lumbar flexion stretch to ease protective tightness after sitting or a flare.",
    region: "Lumbar",
    level: "early",
    equipment: "Mat or firm bed",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with both knees bent and feet flat.",
      "Draw one knee toward the chest, holding behind the thigh or on the shin.",
      "Keep the other foot on the surface or the opposite knee bent.",
      "Hold a gentle stretch, then switch sides.",
    ],
    cues: [
      "Shoulders stay relaxed on the surface.",
      "A mild stretch is enough — do not yank.",
    ],
    avoid: [
      "Pulling into sharp groin, hip, or radiating leg pain.",
      "Lifting the head forcefully.",
    ],
    dosage: "20–30 second hold each side, 2–3 rounds, 1–2 times daily",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "sciatica",
      "si-joint-dysfunction",
      "piriformis-syndrome",
      "coccydynia",
      "lumbar-stenosis",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
      "post-visit-gentle-move",
      "sciatica-nerve-calm",
      "stenosis-flexion-calm",
    ],
  },
  {
    slug: "clamshell",
    title: "Clamshell",
    summary:
      "Side-lying hip rotation to wake the outer glute for stairs, walking, and lateral hip calm.",
    region: "Hip",
    level: "early",
    equipment: "Mat",
    illustration: "side-lying",
    steps: [
      "Lie on your side with knees bent and heels stacked, hips slightly flexed.",
      "Keep the feet together and lift the top knee like a clam opening.",
      "Pause, then lower with control without rolling the pelvis back.",
      "Complete the set, then switch sides.",
    ],
    cues: [
      "Imagine a wall behind you — do not lean the top hip backward.",
      "Small range with control beats a big cheat.",
    ],
    avoid: [
      "Rolling onto the back to gain height.",
      "Pushing through outer-hip sharp pain.",
    ],
    dosage: "10–12 each side, 2 sets, most days",
    relatedConditionSlugs: [
      "greater-trochanteric-pain",
      "hip-oa",
      "patellofemoral-pain",
      "itb-syndrome",
    ],
    relatedProgrammeSlugs: [
      "lateral-hip-settle",
      "patellofemoral-build",
    ],
  },
  {
    slug: "hip-flexor-stretch",
    title: "Half-kneeling hip-flexor stretch",
    summary:
      "Front-of-hip stretch for desk sitters and people with anterior hip tightness after long sitting.",
    region: "Hip",
    level: "early",
    equipment: "Mat or cushion for the knee",
    illustration: "standing-hinge",
    steps: [
      "Kneel with one knee down and the other foot forward (lunge position).",
      "Tuck the pelvis gently (think “zip the waistband”) so you feel a stretch in the front of the rear hip.",
      "Shift a little forward if comfortable, keeping the torso upright.",
      "Hold, then switch sides.",
    ],
    cues: [
      "Avoid overarching the low back — the tuck is the key.",
      "Use a cushion under the kneeling knee if needed.",
    ],
    avoid: [
      "Forcing into sharp groin pinch.",
      "Leaning the trunk heavily forward.",
    ],
    dosage: "20–30 second hold each side, 2 rounds, most days",
    relatedConditionSlugs: [
      "hip-oa",
      "non-specific-low-back-pain",
      "femoroacetabular-impingement",
      "groin-pain",
    ],
    relatedProgrammeSlugs: ["lateral-hip-settle"],
  },
  {
    slug: "hamstring-slider",
    title: "Supine hamstring slider",
    summary:
      "Gentle posterior-thigh stretch with the hip flexed and knee easing straight on your back.",
    region: "Hip",
    level: "early",
    equipment: "Mat, towel or belt optional",
    illustration: "supine-leg-slide",
    steps: [
      "Lie on your back and hold behind one thigh so the hip is about 90° flexed.",
      "Keeping the thigh still, slowly straighten the knee until you feel a gentle stretch.",
      "Pause briefly, then bend the knee again.",
      "Stay in a range that eases rather than sharp neural pull.",
    ],
    cues: [
      "Ankle can stay relaxed; do not force toes toward you if that flares symptoms.",
      "Compare sides — match the easier range first.",
    ],
    avoid: [
      "Pushing into lasting buttock-to-leg nerve pain.",
      "Lifting the head or rounding the neck hard.",
    ],
    dosage: "8–10 slow reps each side, 1–2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "hamstring-strain",
      "sciatica",
      "piriformis-syndrome",
      "lumbar-disc-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "patellofemoral-build",
      "sciatica-nerve-calm",
    ],
  },
  {
    slug: "sit-to-stand",
    title: "Sit-to-stand",
    summary:
      "Chair squat pattern to rebuild thigh and hip strength for daily life and stairs.",
    region: "Knee",
    level: "build",
    equipment: "Sturdy chair",
    illustration: "standing-hinge",
    steps: [
      "Sit near the front of a sturdy chair with feet flat and hip-width apart.",
      "Lean slightly forward from the hips and stand up without using your hands if able.",
      "Pause tall, then sit down with control — do not drop onto the seat.",
      "Keep knees tracking over mid-foot.",
    ],
    cues: [
      "Push the floor away; think “chest up” rather than diving forward.",
      "Use the hands lightly on the chair only if needed for safety.",
    ],
    avoid: [
      "Letting knees collapse inward hard.",
      "Holding the breath on the stand.",
    ],
    dosage: "8–12 reps, 2 sets, most days",
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "knee-oa",
      "deconditioning",
      "hip-oa",
      "lumbar-stenosis",
      "meniscal-injury",
      "osteoporosis",
      "spondylolysis",
      "post-surgical-general",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "patellofemoral-build",
      "stenosis-flexion-calm",
    ],
  },
  {
    slug: "thoracic-extension-roll",
    title: "Thoracic extension over towel",
    summary:
      "Supported mid-back extension to counter rounded desk posture without forcing the neck.",
    region: "Thoracic",
    level: "early",
    equipment: "Rolled towel or foam roller",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with knees bent and a rolled towel across the mid-back (not the neck).",
      "Support the head with your hands or a small cushion if needed.",
      "Relax over the towel for a few breaths, then roll slightly up or down to the next segment.",
      "Keep the movement gentle and comfortable.",
    ],
    cues: [
      "The stretch should feel like a welcome open through the chest.",
      "If the neck complains, add more head support.",
    ],
    avoid: [
      "Placing the roll under the low back or neck.",
      "Forcing into sharp mid-back pain.",
    ],
    dosage: "3–5 positions, 3–5 breaths each, 1–2 times daily",
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "neck-pain",
      "costochondritis",
      "scheuermanns",
    ],
    relatedProgrammeSlugs: ["desk-neck-reset"],
  },
  {
    slug: "seated-thoracic-rotation",
    title: "Seated thoracic rotation",
    summary:
      "Chair twist for mid-back mobility during work breaks — easy to do between meetings.",
    region: "Thoracic",
    level: "early",
    equipment: "Chair with a back",
    illustration: "seated-desk",
    steps: [
      "Sit tall with feet flat and arms crossed over the chest or hands on opposite shoulders.",
      "Rotate the ribs and chest to one side as if looking over the shoulder.",
      "Pause, return to centre, then rotate the other way.",
      "Keep the pelvis facing forward so the turn comes from the mid-back.",
    ],
    cues: [
      "Grow tall before you turn.",
      "Small, smooth arcs beat aggressive twisting.",
    ],
    avoid: [
      "Yank the neck to gain range.",
      "Twisting into sharp rib or spine pain.",
    ],
    dosage: "8–10 each side, 1–2 sets, several times on desk days",
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "neck-pain",
      "cervicogenic-headache",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "upper-trap-stretch",
    title: "Upper trapezius stretch",
    summary:
      "Gentle side-bend stretch for the top of the shoulder and neck after screen work.",
    region: "Cervical",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Sit tall and gently tip one ear toward the same shoulder.",
      "Optionally rest the same-side hand on the head for a light guide — do not pull hard.",
      "Feel a stretch along the opposite side of the neck and top of the shoulder.",
      "Hold, then switch sides.",
    ],
    cues: [
      "Keep the opposite shoulder heavy and down.",
      "Breathe slowly; ease out of the stretch if tingling into the arm increases.",
    ],
    avoid: [
      "Yank the head forcefully.",
      "Stretching through dizziness or arm numbness that lingers.",
    ],
    dosage: "20–30 second hold each side, 2 rounds, 1–2 times daily",
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "whiplash",
      "cervical-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "post-visit-gentle-move",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "doorway-pec-stretch",
    title: "Doorway pec stretch",
    summary:
      "Chest opener for rounded shoulders and desk posture — pairs well with scapular setting.",
    region: "Shoulder",
    level: "early",
    equipment: "Doorway",
    illustration: "wall-slide",
    steps: [
      "Stand in a doorway with one forearm on the frame, elbow roughly at shoulder height.",
      "Step the same-side foot forward gently until you feel a stretch across the chest.",
      "Keep the neck long and the shoulder blade gently set down the back.",
      "Hold, then switch sides.",
    ],
    cues: [
      "Less is more — a mild stretch is enough.",
      "If the front of the shoulder pinches, lower the elbow slightly.",
    ],
    avoid: [
      "Forcing into anterior shoulder pain or numbness.",
      "Arching the low back to gain stretch.",
    ],
    dosage: "20–30 second hold each side, 2 rounds, most days",
    relatedConditionSlugs: [
      "subacromial-pain",
      "neck-pain",
      "thoracic-joint-dysfunction",
      "frozen-shoulder",
      "ac-joint-injury",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "frozen-shoulder-early",
      "shoulder-arc-calm",
    ],
  },
  {
    slug: "table-slides",
    title: "Table slides",
    summary:
      "Supported forward reach on a table to restore gentle shoulder elevation when the arm is irritable.",
    region: "Shoulder",
    level: "early",
    equipment: "Table and cloth or towel",
    illustration: "shoulder-pendulum",
    steps: [
      "Sit facing a table with a cloth under the hand of the affected side.",
      "Keep the hand on the cloth and slide forward, letting the shoulder blade move freely.",
      "Slide as far as comfortable, then return.",
      "Stay below any sharp pinch; progress range as irritability drops.",
    ],
    cues: [
      "Let the table take the weight of the arm.",
      "Breathe out as you slide forward.",
    ],
    avoid: [
      "Pushing into lasting sharp pain or catching that worsens afterward.",
      "Shrugging the ear into the shoulder.",
    ],
    dosage: "8–12 slow slides, 2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "frozen-shoulder",
      "subacromial-pain",
      "rotator-cuff-tear",
      "ac-joint-injury",
    ],
    relatedProgrammeSlugs: [
      "frozen-shoulder-early",
      "shoulder-arc-calm",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "wrist-extensor-stretch",
    title: "Wrist extensor stretch",
    summary:
      "Forearm stretch for tennis-elbow style load from mouse, tools, or gripping.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Straighten the elbow of the affected arm with the palm facing down.",
      "Use the other hand to gently bend the wrist so the fingers point toward the floor.",
      "Feel a stretch along the top of the forearm.",
      "Hold, then relax and repeat.",
    ],
    cues: [
      "Keep the elbow straight but soft — not locked hard.",
      "Stretch should be mild; stop short of sharp outer-elbow pain.",
    ],
    avoid: [
      "Yank the wrist into end-range.",
      "Stretching through lasting nerve tingling into the hand.",
    ],
    dosage: "20–30 second hold, 3 rounds, 1–2 times daily",
    relatedConditionSlugs: [
      "tennis-elbow",
      "medial-epicondylalgia",
      "dequervains",
      "carpal-tunnel",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-build",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "towel-grip-isometric",
    title: "Towel grip isometric",
    summary:
      "Gentle grip hold to keep the forearm and hand working without aggressive loading.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "Rolled towel or soft ball",
    illustration: "seated-desk",
    steps: [
      "Hold a rolled towel lightly in the hand with the wrist in a comfortable mid-position.",
      "Squeeze to about 30–40% effort — firm but not maximal.",
      "Hold for several seconds, then relax fully.",
      "Keep the shoulder and neck relaxed while you grip.",
    ],
    cues: [
      "Pain during the hold should stay mild and settle quickly after.",
      "Quality of relax between holds matters as much as the squeeze.",
    ],
    avoid: [
      "Maximal gripping that flares elbow or wrist pain for hours.",
      "Holding the breath or shrugging.",
    ],
    dosage: "5–8 second holds × 8–10, 1–2 sets, most days",
    relatedConditionSlugs: [
      "tennis-elbow",
      "medial-epicondylalgia",
      "cmc-oa",
      "dequervains",
      "cubital-tunnel",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-build",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "median-nerve-glide",
    title: "Median nerve glide",
    summary:
      "Gentle nerve slider for wrist–hand symptoms when a clinician has suggested neural mobility work.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "nerve-glide",
    steps: [
      "Stand or sit tall with the affected arm by your side, elbow bent, wrist neutral.",
      "Slowly extend the elbow and wrist while looking slightly away, then reverse as you look toward the hand.",
      "Move in a smooth “see-saw” so tension does not linger at either end.",
      "Keep the range small enough that symptoms settle within seconds after each pass.",
    ],
    cues: [
      "This should feel like a gentle glide, not a stretch hold.",
      "If symptoms linger, shrink the range or pause and get assessed.",
    ],
    avoid: [
      "Aggressive end-range holds that recreate lasting numbness.",
      "Using this instead of medical review for progressive weakness or thenar wasting.",
    ],
    dosage: "8–10 slow passes, 1–2 sets, once or twice daily if helpful",
    relatedConditionSlugs: [
      "carpal-tunnel",
      "cervical-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "ulnar-nerve-glide",
    title: "Ulnar nerve glide",
    summary:
      "Gentle nerve slider for inner-elbow to ring/little-finger irritability when a clinician has suggested ulnar neural mobility.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "nerve-glide",
    steps: [
      "Stand or sit tall with the affected elbow bent and the wrist relaxed.",
      "Slowly open the elbow and wrist while making an “OK” shape, then reverse toward the start.",
      "Move in a smooth see-saw so tension does not linger at either end.",
      "Keep the range small enough that symptoms settle within seconds after each pass.",
    ],
    cues: [
      "This should feel like a gentle glide, not a stretch hold.",
      "If tingling lingers into the ring or little finger, shrink the range.",
    ],
    avoid: [
      "Aggressive end-range holds that recreate lasting numbness.",
      "Using this instead of medical review for progressive hand weakness.",
    ],
    dosage: "8–10 slow passes, 1–2 sets, once or twice daily if helpful",
    relatedConditionSlugs: [
      "cubital-tunnel",
      "cervical-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "wrist-flexor-stretch",
    title: "Wrist flexor stretch",
    summary:
      "Palm-up forearm stretch for inner-elbow and wrist flexor load from gripping or tools.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Straighten the elbow with the palm facing up.",
      "Use the other hand to gently extend the wrist so the fingers point toward the floor.",
      "Feel a stretch along the inner forearm.",
      "Hold, then relax and repeat.",
    ],
    cues: [
      "Keep the elbow soft-straight, not locked hard.",
      "A mild stretch is enough — stop short of sharp inner-elbow pain.",
    ],
    avoid: [
      "Yank the wrist into end-range.",
      "Stretching through lasting nerve tingling into the hand.",
    ],
    dosage: "20–30 second hold, 3 rounds, 1–2 times daily",
    relatedConditionSlugs: [
      "medial-epicondylalgia",
      "tennis-elbow",
      "carpal-tunnel",
      "cubital-tunnel",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-build",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "eccentric-wrist-extension",
    title: "Eccentric wrist extension",
    summary:
      "Slow lowering of the wrist for tennis-elbow style loading once early irritability has settled.",
    region: "Elbow & Wrist",
    level: "build",
    equipment: "Light dumbbell, water bottle, or resistance band",
    illustration: "seated-desk",
    steps: [
      "Sit with the forearm supported on a table, hand over the edge, palm down, holding a light weight.",
      "Use the other hand to help lift the wrist into extension.",
      "Remove the help and slowly lower the wrist over 3–4 seconds.",
      "Reset and repeat — keep the load light enough that next-day pain is not clearly worse.",
    ],
    cues: [
      "The slow lower is the work — do not drop the weight.",
      "Elbow stays quiet on the table; avoid shrugging.",
    ],
    avoid: [
      "Heavy loading while the elbow is still hot and swollen.",
      "Rushing the eccentric phase.",
    ],
    dosage: "8–12 slow lowers, 2 sets, most days once settle phase is easy",
    relatedConditionSlugs: [
      "tennis-elbow",
      "medial-epicondylalgia",
    ],
    relatedProgrammeSlugs: ["tennis-elbow-build"],
  },
  {
    slug: "thumb-cmc-isometric",
    title: "Thumb CMC isometric",
    summary:
      "Gentle thumb-base hold for CMC irritability — keep contact strong without painful pinching.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Rest the hand on a table with the thumb lightly touching the index fingertip (OK shape).",
      "Press the thumb tip gently into the index tip at about 30% effort.",
      "Hold several seconds without collapsing the thumb web space, then relax.",
      "Keep the wrist neutral and the shoulder relaxed.",
    ],
    cues: [
      "Think “stable contact,” not a hard pinch.",
      "Stop if base-of-thumb sharp pain lingers afterward.",
    ],
    avoid: [
      "Maximal pinching or twisting through pain.",
      "Holding the breath or tensing the neck.",
    ],
    dosage: "5–8 second holds × 8–10, 1–2 sets, most days",
    relatedConditionSlugs: [
      "cmc-oa",
      "dequervains",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "levator-stretch",
    title: "Levator scapulae stretch",
    summary:
      "Diagonal neck stretch for the angle between neck and shoulder blade after desk or driving days.",
    region: "Cervical",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Sit tall and gently turn the head about 45° toward one side.",
      "Tip the nose toward the armpit on that same side until you feel a stretch along the opposite neck–shoulder angle.",
      "Optionally rest a hand on the back of the head for a light guide — do not pull hard.",
      "Hold, then switch sides.",
    ],
    cues: [
      "Keep the opposite shoulder heavy and down.",
      "Breathe slowly; ease out if arm tingling increases.",
    ],
    avoid: [
      "Yank the head forcefully.",
      "Stretching through dizziness or lingering arm numbness.",
    ],
    dosage: "20–30 second hold each side, 2 rounds, 1–2 times daily",
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "whiplash",
      "thoracic-joint-dysfunction",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "post-visit-gentle-move",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "isometric-neck-rotation",
    title: "Isometric neck rotation",
    summary:
      "Gentle resisted head-turn holds to rebuild confidence after neck irritability without large range.",
    region: "Cervical",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Sit tall looking straight ahead.",
      "Place a hand on the cheek and gently turn the head into the hand without letting the head move.",
      "Hold a light effort for several seconds, then relax.",
      "Repeat to the other side.",
    ],
    cues: [
      "About 20–30% effort is enough.",
      "Keep the jaw soft and the shoulders down.",
    ],
    avoid: [
      "Pushing into dizziness, visual change, or sharp neural arm pain.",
      "Maximal effort early after a flare.",
    ],
    dosage: "5–8 second holds × 4–6 each side, 1–2 sets daily",
    relatedConditionSlugs: [
      "neck-pain",
      "whiplash",
      "cervicogenic-headache",
      "cervical-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "post-visit-gentle-move",
    ],
  },
  {
    slug: "great-toe-extension",
    title: "Great-toe extension mobilise",
    summary:
      "Gentle big-toe upward mobility for stiff first MTP joints that limit push-off.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "None",
    illustration: "ankle-alphabet",
    steps: [
      "Sit with the foot relaxed or stand with the heel down.",
      "Use your fingers to gently lift the big toe upward while the other toes stay quiet.",
      "Hold a mild stretch, then lower.",
      "Keep the ankle comfortable — do not force into sharp joint pain.",
    ],
    cues: [
      "Small, frequent mobility beats one aggressive yank.",
      "Pair with calm walking once the toe moves more freely.",
    ],
    avoid: [
      "Forcing through inflamed, hot, or recently injured joints.",
      "Twisting the toe sideways.",
    ],
    dosage: "8–10 gentle lifts, 2 sets, most days",
    relatedConditionSlugs: [
      "hallux-rigidus",
      "plantar-fasciitis",
      "morton-neuroma",
    ],
    relatedProgrammeSlugs: [
      "forefoot-ease",
      "plantar-heel-load",
    ],
  },
  {
    slug: "towel-toe-curls",
    title: "Towel toe curls",
    summary:
      "Intrinsic foot activation by scrunching a towel — useful for foot fatigue and forefoot irritability.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "Towel on a smooth floor",
    illustration: "ankle-alphabet",
    steps: [
      "Sit with the bare foot on a towel.",
      "Keep the heel down and scrunch the towel toward you with the toes.",
      "Relax and repeat, gathering more towel each time.",
      "Switch feet after the set.",
    ],
    cues: [
      "Think “short foot,” not clawing hard into cramp.",
      "Stop and shake out if the foot cramps.",
    ],
    avoid: [
      "Aggressive clawing through sharp forefoot neural pain.",
      "Doing this on an acutely swollen foot after injury without advice.",
    ],
    dosage: "8–12 scruches each foot, 1–2 sets, most days",
    relatedConditionSlugs: [
      "morton-neuroma",
      "plantar-fasciitis",
      "hallux-rigidus",
      "shin-splints",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "forefoot-ease",
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "tandem-balance",
    title: "Tandem balance",
    summary:
      "Heel-to-toe standing balance for fall-confidence and bone-safe lower-limb control.",
    region: "Whole body",
    level: "return",
    equipment: "Stable floor; wall or chair nearby",
    illustration: "single-leg-balance",
    steps: [
      "Stand near support and place one foot directly in front of the other (heel to toe).",
      "Stand tall with soft knees and quiet arms.",
      "Hold the position, then switch which foot is in front.",
      "Progress by reducing hand support only when steady.",
    ],
    cues: [
      "Eyes on a fixed point ahead.",
      "Quality stillness beats long wobbly holds.",
    ],
    avoid: [
      "Practising far from support if you are unsteady.",
      "Holding the breath or locking the knees hard.",
    ],
    dosage: "20–40 second holds each way, 2–3 rounds, most days",
    relatedConditionSlugs: [
      "osteoporosis",
      "deconditioning",
      "lateral-ankle-sprain",
      "spondylolysis",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "osteoporosis-safe-load",
    ],
  },
  {
    slug: "wall-push-up-plus",
    title: "Wall push-up plus",
    summary:
      "Wall push-up with a final scapular protraction for shoulder blade control and return-to-load upper body work.",
    region: "Shoulder",
    level: "return",
    equipment: "Wall",
    illustration: "wall-slide",
    steps: [
      "Stand facing a wall with hands at shoulder height, a little wider than shoulders.",
      "Bend the elbows to lower the chest toward the wall, then press away.",
      "At the top, gently push the wall away further so the shoulder blades wrap around the ribs (the “plus”).",
      "Keep the neck long and the low back quiet.",
    ],
    cues: [
      "The plus is small — do not shrug into the ears.",
      "Move the wall farther away to make it easier; step closer to progress.",
    ],
    avoid: [
      "Pinching into the top of the shoulder — raise the hands or reduce depth.",
      "Sagging through the mid-back.",
    ],
    dosage: "8–12 reps, 2 sets, most days once early shoulder drills are easy",
    relatedConditionSlugs: [
      "subacromial-pain",
      "rotator-cuff-tear",
      "deconditioning",
      "shoulder-instability",
      "osteoporosis",
      "spondylolysis",
    ],
    relatedProgrammeSlugs: [
      "frozen-shoulder-early",
      "osteoporosis-safe-load",
      "shoulder-arc-calm",
      "shoulder-stability-build",
      "tennis-elbow-build",
    ],
  },
  {
    slug: "ischial-unweight-sit",
    title: "Ischial unweight sit",
    summary:
      "Short sitting reset to unload the tailbone — lean onto one buttock cheek, then the other, instead of perching on the coccyx.",
    region: "Lumbar",
    level: "early",
    equipment: "Firm chair",
    illustration: "seated-desk",
    steps: [
      "Sit on a firm chair near the front of the seat.",
      "Shift your weight onto the left sitting bone for a few breaths, keeping the tailbone lightly unweighted.",
      "Return to centre, then shift onto the right sitting bone.",
      "Finish sitting tall on both sitting bones, not tucked under the coccyx.",
    ],
    cues: [
      "Think “cheeks, not tip” — the coccyx should feel quieter.",
      "Use a soft wedge or folded towel under the sitting bones if advised in clinic.",
    ],
    avoid: [
      "Perching on the very tip of the tailbone.",
      "Sitting through sharp, worsening coccyx pain — stand and walk briefly instead.",
    ],
    dosage: "5–6 shifts each side, several times on sitting-heavy days",
    relatedConditionSlugs: [
      "coccydynia",
      "si-joint-dysfunction",
      "non-specific-low-back-pain",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "coccydynia-sit-ease",
    ],
  },
  {
    slug: "pelvic-clock",
    title: "Pelvic clock",
    summary:
      "Tiny pelvic tilts in a circle on your back to ease SI and pelvic girdle stiffness without big ranges.",
    region: "Hip",
    level: "early",
    equipment: "Mat or firm bed",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with knees bent and feet flat.",
      "Imagine a clock under your pelvis: tip gently toward 12, then 3, 6, and 9.",
      "Keep the movements small and smooth, breathing easily.",
      "Reverse the circle direction after a few rounds.",
    ],
    cues: [
      "Quality over size — this is a whisper of motion.",
      "Stop if groin or SI pain sharpens and lingers.",
    ],
    avoid: [
      "Big corkscrewing that lifts the ribs hard off the surface.",
      "Pushing into pregnancy-related pelvic pain that worsens afterward.",
    ],
    dosage: "4–6 slow clocks each way, 1–2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "si-joint-dysfunction",
      "coccydynia",
      "non-specific-low-back-pain",
      "groin-pain",
    ],
    relatedProgrammeSlugs: [
      "coccydynia-sit-ease",
      "lateral-hip-settle",
      "pregnancy-pelvic-ease",
    ],
  },
  {
    slug: "adductor-ball-squeeze",
    title: "Adductor ball squeeze",
    summary:
      "Gentle inner-thigh isometric for groin irritability and pelvic control — light squeeze only.",
    region: "Hip",
    level: "early",
    equipment: "Soft ball or rolled towel",
    illustration: "supine-knees-bent",
    steps: [
      "Lie on your back with knees bent and a soft ball or towel between the knees.",
      "Gently squeeze the knees together at about 30% effort for several seconds.",
      "Relax fully, then repeat.",
      "Keep the low back comfortable and the breath easy.",
    ],
    cues: [
      "Mild effort is enough — this is not a max crush.",
      "If the groin pinches, reduce effort or stop.",
    ],
    avoid: [
      "Aggressive squeezing through sharp groin pain.",
      "Holding the breath or bracing the neck.",
    ],
    dosage: "5–8 second holds × 8–10, 1–2 sets, most days",
    relatedConditionSlugs: [
      "groin-pain",
      "femoroacetabular-impingement",
      "si-joint-dysfunction",
      "hip-oa",
    ],
    relatedProgrammeSlugs: [
      "lateral-hip-settle",
      "pregnancy-pelvic-ease",
    ],
  },
  {
    slug: "terminal-knee-extension",
    title: "Terminal knee extension",
    summary:
      "Seated or standing final degrees of knee straighten to wake the quad after knee irritation — keep it pain-light.",
    region: "Knee",
    level: "early",
    equipment: "Chair or wall",
    illustration: "seated-desk",
    steps: [
      "Sit tall with the foot on the floor, or stand with a soft knee bend.",
      "Straighten the knee fully by tightening the front of the thigh, without locking aggressively.",
      "Hold a gentle squeeze, then soften.",
      "Keep the movement in a range that does not recreate sharp joint-line pain.",
    ],
    cues: [
      "Feel the quad above the kneecap switch on.",
      "Pair with short walks once control feels easy.",
    ],
    avoid: [
      "Forcing through true locking or catching.",
      "Deep squatting if the joint is swollen and irritable.",
    ],
    dosage: "8–12 gentle squeezes, 2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "meniscal-injury",
      "knee-oa",
      "patellofemoral-pain",
      "acl-rehab",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "wall-sit-isometric",
    title: "Wall-sit isometric",
    summary:
      "Supported isometric thigh hold for kneecap and patellar-tendon loading without bouncing reps.",
    region: "Knee",
    level: "build",
    equipment: "Wall",
    illustration: "standing-hinge",
    steps: [
      "Stand with your back against a wall and walk the feet forward.",
      "Slide down until the knees bend to a comfortable angle (often ~45–60°).",
      "Hold without letting the knees cave inward, breathing steadily.",
      "Slide back up and rest.",
    ],
    cues: [
      "Knees track over mid-foot.",
      "Shorter holds that feel solid beat long shaky ones.",
    ],
    avoid: [
      "Dropping into a deep painful squat angle.",
      "Holding the breath or pressing the low back flat aggressively if it hurts.",
    ],
    dosage: "20–40 second holds × 3–5, most days once early knee drills are easy",
    relatedConditionSlugs: [
      "patellar-tendinopathy",
      "patellofemoral-pain",
      "knee-oa",
      "deconditioning",
      "meniscal-injury",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "eccentric-heel-drop",
    title: "Eccentric heel drop",
    summary:
      "Slow heel-lowering off a step for Achilles capacity once early walking is comfortable.",
    region: "Ankle & Foot",
    level: "return",
    equipment: "Low step; wall or rail for balance",
    illustration: "heel-raise",
    steps: [
      "Stand on a step with the balls of both feet, heels free, holding support.",
      "Rise up with both feet, then shift to the affected side and lower the heel slowly over 3–4 seconds.",
      "Use both feet to rise again and repeat.",
      "Keep the lowering smooth — that is the work.",
    ],
    cues: [
      "Mild tendon ache during/after can be acceptable if it settles by the next day.",
      "Start with both feet sharing load if single-leg is too irritable.",
    ],
    avoid: [
      "Dropping quickly or bouncing at the bottom.",
      "Pushing through sharp tear-like pain or sudden calf swelling.",
    ],
    dosage: "8–12 slow lowers, 2–3 sets, most days once settle phase is easy",
    relatedConditionSlugs: [
      "achilles-tendinopathy",
      "plantar-fasciitis",
      "shin-splints",
    ],
    relatedProgrammeSlugs: [
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "single-leg-rdl",
    title: "Single-leg RDL pattern",
    summary:
      "Hinge on one leg for return-to-load hip and hamstring control — small range, soft knee.",
    region: "Hip",
    level: "return",
    equipment: "Stable floor; optional light weight",
    illustration: "standing-hinge",
    steps: [
      "Stand on one leg with a soft knee, near support if needed.",
      "Hinge at the hip so the torso tips forward and the free leg reaches back.",
      "Keep the hips square and the spine long, then return to stand.",
      "Switch sides after the set.",
    ],
    cues: [
      "Push the standing heel into the floor.",
      "Think “long spine,” not rounding to touch the floor.",
    ],
    avoid: [
      "Twisting the pelvis open to cheat depth.",
      "Rushing when balance is lost — hold the wall.",
    ],
    dosage: "6–8 each side, 2 sets, most days once early hip drills are easy",
    relatedConditionSlugs: [
      "hamstring-strain",
      "hip-oa",
      "greater-trochanteric-pain",
      "deconditioning",
      "spondylolysis",
      "osteoporosis",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
      "patellofemoral-build",
    ],
  },
  {
    slug: "side-plank-short",
    title: "Short side plank",
    summary:
      "Knees-down side plank for lateral trunk and hip endurance without a long full plank.",
    region: "Whole body",
    level: "build",
    equipment: "Mat",
    illustration: "side-lying",
    steps: [
      "Lie on your side with knees bent and elbow under the shoulder.",
      "Lift the hips so the body forms a short line from knees to shoulder.",
      "Hold without rolling forward or collapsing the under-shoulder.",
      "Lower with control and switch sides.",
    ],
    cues: [
      "Grow tall through the top of the head.",
      "If the shoulder complains, shorten the hold or drop to a shorter lever.",
    ],
    avoid: [
      "Holding through sharp shoulder or SI pain.",
      "Letting the hips sag heavily behind you.",
    ],
    dosage: "15–30 second holds each side × 2–3, most days",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "greater-trochanteric-pain",
      "deconditioning",
      "spondylolysis",
      "osteoporosis",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "lateral-hip-settle",
      "osteoporosis-safe-load",
    ],
  },
  {
    slug: "bridge-march",
    title: "Bridge with march",
    summary:
      "Glute bridge with alternating marches for pelvic control once a plain bridge feels easy.",
    region: "Lumbar",
    level: "build",
    equipment: "Mat",
    illustration: "bridge",
    steps: [
      "Lie on your back, knees bent, and lift into a comfortable bridge.",
      "Keeping the pelvis level, lift one foot a short distance, then replace it.",
      "Alternate sides without letting the hips drop or twist.",
      "Lower the bridge to rest between sets if needed.",
    ],
    cues: [
      "Imagine a cup of tea on the pelvis — do not spill it.",
      "Small marches beat high knees.",
    ],
    avoid: [
      "Arching the ribs hard to hold height.",
      "Continuing if the pelvis tips heavily each march.",
    ],
    dosage: "6–8 marches each side, 2 sets, most days",
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "si-joint-dysfunction",
      "spondylolysis",
      "deconditioning",
      "osteoporosis",
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "hamstring-return",
      "osteoporosis-safe-load",
      "sciatica-nerve-calm",
    ],
  },
  {
    slug: "open-book-pregnancy",
    title: "Side-lying open book (supported)",
    summary:
      "Supported thoracic rotation in side-lying — useful when lying flat is uncomfortable, including later pregnancy with pillows.",
    region: "Thoracic",
    level: "early",
    equipment: "Mat and pillows",
    illustration: "open-book",
    steps: [
      "Lie on your side with knees bent and pillows supporting the belly and head as needed.",
      "Keep the knees stacked and open the top arm toward the ceiling/back like a book.",
      "Follow the hand with your eyes, then return.",
      "Stay in a comfortable mid-range — do not force the twist.",
    ],
    cues: [
      "Breathe out as you open.",
      "If the pelvis wants to roll, reduce the range.",
    ],
    avoid: [
      "Positions your maternity team has asked you to avoid.",
      "Pushing into dizziness or sharp rib pain.",
    ],
    dosage: "6–8 each side, 1–2 sets, most days if comfortable",
    relatedConditionSlugs: [
      "thoracic-joint-dysfunction",
      "neck-pain",
      "costochondritis",
      "si-joint-dysfunction",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "pregnancy-pelvic-ease",
    ],
  },
  {
    slug: "cervical-nod-retraction",
    title: "Chin tuck with nod",
    summary:
      "Gentle upper-neck nod combined with a chin tuck for desk neck and cervicogenic headache patterns.",
    region: "Cervical",
    level: "early",
    equipment: "None",
    illustration: "chin-tuck",
    steps: [
      "Sit tall and draw the chin straight back into a small chin tuck.",
      "From that position, nod the head as if saying a tiny “yes,” keeping the tuck.",
      "Return to the tucked start, then relax to neutral.",
      "Keep the movement small — this is upper-neck control, not a big stretch.",
    ],
    cues: [
      "Imagine sliding the back of your head up a wall.",
      "Shoulders stay heavy; jaw stays soft.",
    ],
    avoid: [
      "Tipping into a big forward head poke between reps.",
      "Pushing through dizziness or lingering arm tingling.",
    ],
    dosage: "8–10 slow nods, 1–2 sets, several times on desk days",
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "whiplash",
      "cervical-radiculopathy",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "post-visit-gentle-move",
    ],
  },
  {
    slug: "isometric-shoulder-er",
    title: "Isometric shoulder external rotation",
    summary:
      "Elbow-at-side outward rotation hold against a wall or doorframe — early cuff activation without large range.",
    region: "Shoulder",
    level: "early",
    equipment: "Wall or doorframe",
    illustration: "band-row",
    steps: [
      "Stand with the elbow bent to 90° and tucked by your side.",
      "Place the back of the hand or wrist against a wall or doorframe.",
      "Gently rotate outward into the wall at about 30% effort without moving the elbow away.",
      "Hold, relax, and repeat.",
    ],
    cues: [
      "Keep the elbow glued to the ribs.",
      "Light effort that you can breathe through is enough.",
    ],
    avoid: [
      "Shrugging or leaning the whole body into the wall.",
      "Pushing through sharp anterior shoulder pain.",
    ],
    dosage: "5–8 second holds × 8–10, 1–2 sets, most days",
    relatedConditionSlugs: [
      "shoulder-instability",
      "subacromial-pain",
      "rotator-cuff-tear",
      "ac-joint-injury",
    ],
    relatedProgrammeSlugs: [
      "frozen-shoulder-early",
      "shoulder-arc-calm",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "prone-t-raise",
    title: "Prone T raise",
    summary:
      "Face-down arm lifts into a T shape for scapular and posterior shoulder control — return-to-load friendly.",
    region: "Shoulder",
    level: "return",
    equipment: "Mat or firm bed",
    illustration: "prone-press",
    steps: [
      "Lie face down with the forehead resting on a towel and arms out to the sides in a T, thumbs up.",
      "Gently lift the arms a short distance, squeezing the shoulder blades lightly.",
      "Pause, then lower with control.",
      "Keep the neck long — do not crane up to watch your hands.",
    ],
    cues: [
      "Think “long arms,” not high lifts.",
      "Stop short of pinching at the top of the shoulder.",
    ],
    avoid: [
      "Arching the low back to gain height.",
      "Holding the breath or yanking the arms.",
    ],
    dosage: "8–12 reps, 2 sets, most days once early shoulder drills are easy",
    relatedConditionSlugs: [
      "shoulder-instability",
      "subacromial-pain",
      "rotator-cuff-tear",
      "thoracic-joint-dysfunction",
    ],
    relatedProgrammeSlugs: [
      "shoulder-arc-calm",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "thumb-opposition-slides",
    title: "Thumb opposition slides",
    summary:
      "Gentle tip-to-tip slides from index to little finger for CMC and fine-motor calm after gripping or phone use.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "None",
    illustration: "seated-desk",
    steps: [
      "Rest the hand comfortably, wrist neutral.",
      "Touch the thumb tip to the index tip, then slide to the middle, ring, and little finger tips.",
      "Return along the same path without forcing the thumb web to collapse.",
      "Keep the motion smooth and pain-light at the thumb base.",
    ],
    cues: [
      "Quality circles of contact beat speed.",
      "Support the hand on a table if control is hard mid-air.",
    ],
    avoid: [
      "Forcing through sharp base-of-thumb pain.",
      "Gripping the phone hard immediately afterward.",
    ],
    dosage: "5–8 full slides, 2 sets, 1–2 times daily",
    relatedConditionSlugs: ["cmc-oa", "dequervains", "carpal-tunnel"],
    relatedProgrammeSlugs: [
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
  {
    slug: "metatarsal-spread",
    title: "Metatarsal spread",
    summary:
      "Active forefoot widening to ease crowded metatarsal heads — useful for Morton-type forefoot irritability.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "None",
    illustration: "ankle-alphabet",
    steps: [
      "Sit barefoot with the foot relaxed on the floor.",
      "Try to spread the toes and widen the forefoot without clawing hard.",
      "Hold a gentle spread, then relax.",
      "Optional: place fingers between toes for a passive assist if active spread is limited.",
    ],
    cues: [
      "Think “wide foot,” not curling toes under.",
      "Stop if neural burning into the toes increases and lingers.",
    ],
    avoid: [
      "Aggressive toe-stretching through inflamed neuromas.",
      "Doing this in tight shoes — barefoot or roomy footwear only.",
    ],
    dosage: "8–10 gentle spreads, 2 sets, most days",
    relatedConditionSlugs: [
      "morton-neuroma",
      "hallux-rigidus",
      "plantar-fasciitis",
    ],
    relatedProgrammeSlugs: [
      "forefoot-ease",
      "plantar-heel-load",
    ],
  },
  {
    slug: "seated-hallux-lift",
    title: "Seated hallux lift",
    summary:
      "Lift only the big toe while the lesser toes stay down — builds control for stiff first MTP joints.",
    region: "Ankle & Foot",
    level: "build",
    equipment: "None",
    illustration: "ankle-alphabet",
    steps: [
      "Sit barefoot with the foot flat.",
      "Keep the four lesser toes down and lift only the big toe.",
      "Pause, lower with control, and repeat.",
      "Then reverse: keep the big toe down and lift the lesser toes if able.",
    ],
    cues: [
      "Small, precise lifts beat big compensations from the ankle.",
      "Place a finger lightly on the lesser toes to remind them to stay down.",
    ],
    avoid: [
      "Forcing through hot, swollen first MTP joints.",
      "Rolling the whole foot onto the outer edge to cheat.",
    ],
    dosage: "8–12 lifts, 2 sets, most days",
    relatedConditionSlugs: [
      "hallux-rigidus",
      "morton-neuroma",
      "plantar-fasciitis",
    ],
    relatedProgrammeSlugs: [
      "forefoot-ease",
      "plantar-heel-load",
    ],
  },
  {
    slug: "hip-figure-four-flex",
    title: "Supine figure-four flex",
    summary:
      "Gentle hip external-rotation stretch in flexion for FAI-type or outer-hip tightness — keep out of the pinch.",
    region: "Hip",
    level: "early",
    equipment: "Mat",
    illustration: "figure-four",
    steps: [
      "Lie on your back and cross the ankle over the opposite thigh (figure-four).",
      "Keep the pelvis level and gently draw the uncrossed thigh toward you until you feel a mild outer-hip stretch.",
      "Hold without forcing into a sharp groin pinch.",
      "Switch sides.",
    ],
    cues: [
      "If the groin pinches, reduce the pull or uncross slightly.",
      "Breathe into the outer hip rather than yanking.",
    ],
    avoid: [
      "Pushing into FAI-type pinching at the front of the hip.",
      "Twisting the low back to gain range.",
    ],
    dosage: "20–30 second hold each side, 2 rounds, most days",
    relatedConditionSlugs: [
      "femoroacetabular-impingement",
      "greater-trochanteric-pain",
      "hip-oa",
      "piriformis-syndrome",
    ],
    relatedProgrammeSlugs: ["lateral-hip-settle"],
  },
  {
    slug: "prone-cobra-short",
    title: "Short prone cobra",
    summary:
      "Small face-down chest lift for thoracic extension — helpful for desk kyphosis patterns when lumbar extension is kept minimal.",
    region: "Thoracic",
    level: "early",
    equipment: "Mat",
    illustration: "prone-press",
    steps: [
      "Lie face down with hands by the shoulders or lightly under the forehead.",
      "Lengthen through the crown and lift the chest a short distance, keeping the lower ribs near the surface.",
      "Pause, then lower with control.",
      "Think mid-back open, not a big lumbar arch.",
    ],
    cues: [
      "Slide the shoulder blades gently down the back.",
      "Keep the neck long — eyes toward the floor a little ahead.",
    ],
    avoid: [
      "Cranking into a high cobra that loads the low back.",
      "Forcing through sharp mid-back pain.",
    ],
    dosage: "6–10 gentle lifts, 1–2 sets, 1–2 times daily",
    relatedConditionSlugs: [
      "scheuermanns",
      "thoracic-joint-dysfunction",
      "neck-pain",
      "costochondritis",
      "facet-syndrome",
    ],
    relatedProgrammeSlugs: ["desk-neck-reset"],
  },
  {
    slug: "spanish-squat-hold",
    title: "Spanish squat hold",
    summary:
      "Band-behind-knees squat isometric for patellar tendon loading — build phase once early knee drills are easy.",
    region: "Knee",
    level: "return",
    equipment: "Heavy resistance band anchored behind you",
    illustration: "standing-hinge",
    steps: [
      "Loop a strong band behind the knees and step forward to create tension (or use a Spanish-squat setup).",
      "Sit back into a comfortable squat angle where the tendon feels loaded but tolerable.",
      "Hold without letting the knees cave inward, then stand to rest.",
      "Keep the trunk fairly upright and the heels down.",
    ],
    cues: [
      "Mild tendon ache that settles by the next day can be acceptable.",
      "Shorter solid holds beat long shaky ones.",
    ],
    avoid: [
      "Deep painful angles while the tendon is hot and swollen.",
      "Letting the band pull you into a forward knee collapse.",
    ],
    dosage: "20–40 second holds × 3–5, most days once settle/build drills are easy",
    relatedConditionSlugs: [
      "patellar-tendinopathy",
      "patellofemoral-pain",
      "knee-oa",
    ],
    relatedProgrammeSlugs: [
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "farmer-carry-walk",
    title: "Farmer carry walk",
    summary:
      "Short loaded walks with even weights for return-to-load grip, trunk, and posture control.",
    region: "Whole body",
    level: "return",
    equipment: "Two even dumbbells, kettlebells, or shopping bags",
    illustration: "standing-hinge",
    steps: [
      "Stand tall holding an even weight in each hand by your sides.",
      "Walk a short distance with quiet shoulders and a steady trunk.",
      "Turn carefully and return.",
      "Set the weights down with a hip hinge rather than a rounded drop.",
    ],
    cues: [
      "Ribs stacked over pelvis; do not lean away from a heavier side.",
      "Choose a load you can carry with good posture — bags count.",
    ],
    avoid: [
      "Uneven heavy loads that twist the trunk hard.",
      "Holding the breath or shrugging into the ears.",
    ],
    dosage: "20–40 metre walks × 3–4, most days once early drills are easy",
    relatedConditionSlugs: [
      "deconditioning",
      "osteoporosis",
      "non-specific-low-back-pain",
      "tennis-elbow",
    ],
    relatedProgrammeSlugs: [
      "osteoporosis-safe-load",
      "tennis-elbow-build",
    ],
  },
  {
    slug: "tibialis-raise",
    title: "Tibialis anterior raise",
    summary:
      "Heel-down, toes-up lifts for shin control — useful when shin-splint patterns flare with running or hills.",
    region: "Ankle & Foot",
    level: "build",
    equipment: "Wall or chair for light support (optional)",
    illustration: "ankle-alphabet",
    steps: [
      "Stand with heels on the floor and lightly hold a wall if needed.",
      "Lift the forefeet and toes toward the shins, keeping heels down.",
      "Pause briefly, then lower with control.",
      "Keep the knees soft — do not lock back.",
    ],
    cues: [
      "Feel the front of the shin working, not the toes clawing hard.",
      "Small range with clean control beats bouncing.",
    ],
    avoid: [
      "Pushing through sharp shin pain that worsens after sessions.",
      "Leaning back so the calves take over.",
    ],
    dosage: "10–15 slow reps, 2–3 sets, most days",
    relatedConditionSlugs: [
      "shin-splints",
      "lateral-ankle-sprain",
      "achilles-tendinopathy",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "knee-to-wall-dorsiflexion",
    title: "Knee-to-wall dorsiflexion",
    summary:
      "Gentle ankle mobility test-and-train: drive the knee toward a wall without lifting the heel.",
    region: "Ankle & Foot",
    level: "early",
    equipment: "Wall",
    illustration: "standing-calf",
    steps: [
      "Stand facing a wall with one foot forward, toes a few centimetres from the wall.",
      "Keeping the heel down, bend the front knee toward the wall.",
      "Ease off before sharp front-of-ankle pinching, then repeat.",
      "Move the foot back slightly as range improves over days.",
    ],
    cues: [
      "Knee tracks over the second toe — avoid collapsing inward.",
      "Compare sides; chase symmetry more than forcing a number.",
    ],
    avoid: [
      "Forcing through a hard bony block or hot swollen ankle.",
      "Lifting the heel to cheat range.",
    ],
    dosage: "8–12 gentle reps each side, 1–2 sets, most days",
    relatedConditionSlugs: [
      "shin-splints",
      "lateral-ankle-sprain",
      "achilles-tendinopathy",
      "plantar-fasciitis",
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "plantar-heel-load",
      "shin-calf-capacity",
    ],
  },
  {
    slug: "nordic-hamstring-assist",
    title: "Assisted Nordic hamstring lower",
    summary:
      "Kneeling slow forward lean with hand assist — return-level hamstring capacity once early drills are easy.",
    region: "Hip",
    level: "return",
    equipment: "Mat; partner, strap, or sturdy furniture to anchor heels",
    illustration: "standing-hinge",
    steps: [
      "Kneel tall with heels anchored and a soft landing zone in front.",
      "Keep hips extended and slowly lean forward from the knees.",
      "Use your hands to catch and assist the lower as soon as control fades.",
      "Push back to the start — do not bounce into a full uncontrolled fall.",
    ],
    cues: [
      "Think “long from knees to shoulders,” not folding at the hips.",
      "Shallow controlled range beats deep failed reps.",
    ],
    avoid: [
      "Max-effort unassisted Nordics while the hamstring is still irritable.",
      "Rounding the low back hard to gain range.",
    ],
    dosage: "4–6 assisted lowers, 2 sets, 2–3 days per week once settle drills are calm",
    relatedConditionSlugs: [
      "hamstring-strain",
      "acl-rehab",
      "non-specific-low-back-pain",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "patellofemoral-build",
    ],
  },
  {
    slug: "reverse-lunge-control",
    title: "Reverse lunge control",
    summary:
      "Step-back lunges for knee and hip control — return-to-load friendly when stairs and squats feel settled.",
    region: "Knee",
    level: "return",
    equipment: "None (light support nearby if balance is unsure)",
    illustration: "step-down",
    steps: [
      "Stand tall, then step one foot back into a shallow lunge.",
      "Lower until the front thigh works without the knee diving inward.",
      "Drive through the front foot to stand, then switch sides.",
      "Keep the trunk fairly upright.",
    ],
    cues: [
      "Front knee soft over mid-foot — not collapsing into a knock-knee.",
      "Shorten the step if the front of the knee pinches.",
    ],
    avoid: [
      "Deep painful lunges while the joint is swollen or locking.",
      "Pushing through giving-way or sharp joint-line pain.",
    ],
    dosage: "6–8 each side, 2 sets, most days once early knee drills are easy",
    relatedConditionSlugs: [
      "acl-rehab",
      "patellofemoral-pain",
      "itb-syndrome",
      "hamstring-strain",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "band-pull-apart",
    title: "Band pull-apart",
    summary:
      "Light band rows with arms long for upper-back endurance — desk and shoulder-stability friendly.",
    region: "Thoracic",
    level: "build",
    equipment: "Light resistance band",
    illustration: "band-row",
    steps: [
      "Hold a light band at shoulder height with arms straight in front.",
      "Pull the band apart by drawing the shoulder blades together.",
      "Pause, then return slowly without shrugging.",
      "Keep ribs quiet — do not lean back to cheat.",
    ],
    cues: [
      "Elbows soft; think “spread the band,” not yanking.",
      "Stop short of pinching at the top of the shoulders.",
    ],
    avoid: [
      "Heavy bands that recreate neck or shoulder-tip pain.",
      "Holding the breath or flaring the ribs hard.",
    ],
    dosage: "10–15 reps, 2 sets, most days",
    relatedConditionSlugs: [
      "scheuermanns",
      "thoracic-joint-dysfunction",
      "shoulder-instability",
      "subacromial-pain",
      "neck-pain",
    ],
    relatedProgrammeSlugs: [
      "desk-neck-reset",
      "osteoporosis-safe-load",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "prone-y-raise",
    title: "Prone Y raise",
    summary:
      "Face-down arms into a Y for lower trapezius and scapular control — progress after T raises feel easy.",
    region: "Shoulder",
    level: "return",
    equipment: "Mat or firm bed",
    illustration: "prone-press",
    steps: [
      "Lie face down with forehead on a towel and arms overhead in a shallow Y, thumbs up.",
      "Lift the arms a short distance without shrugging the ears.",
      "Pause, then lower with control.",
      "Keep the neck long and low back quiet.",
    ],
    cues: [
      "Think long arms and light shoulder-blade slide, not high lifts.",
      "If the top of the shoulder pinches, widen the Y or shorten the lift.",
    ],
    avoid: [
      "Arching the lumbar spine to gain height.",
      "Heavy dumbbells before bodyweight control is solid.",
    ],
    dosage: "8–12 reps, 2 sets, most days once prone T raises are easy",
    relatedConditionSlugs: [
      "shoulder-instability",
      "subacromial-pain",
      "rotator-cuff-tear",
      "scheuermanns",
    ],
    relatedProgrammeSlugs: [
      "shoulder-arc-calm",
      "shoulder-stability-build",
    ],
  },
  {
    slug: "short-copenhagen",
    title: "Short Copenhagen adductor hold",
    summary:
      "Side-lying inner-thigh hold with the top leg supported — early-to-build groin capacity without a full Copenhagen drop.",
    region: "Hip",
    level: "build",
    equipment: "Bench, sofa edge, or sturdy chair",
    illustration: "side-lying",
    steps: [
      "Lie on your side with the top leg resting on a bench at about mid-shin height.",
      "Lift the bottom leg to meet the top, or keep both stacked and press the top inner thigh lightly into the bench.",
      "Hold a gentle isometric, then relax.",
      "Keep the trunk long — avoid collapsing into a side crunch.",
    ],
    cues: [
      "Mild inner-thigh effort you can breathe through is enough.",
      "Shorten the lever (support closer to the knee) if this feels too hard.",
    ],
    avoid: [
      "Pushing through sharp groin pinching or recent acute adductor tear pain.",
      "Twisting the pelvis to cheat height.",
    ],
    dosage: "5–8 second holds × 6–8, 1–2 sets each side, most days",
    relatedConditionSlugs: [
      "groin-pain",
      "femoroacetabular-impingement",
      "hip-oa",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "lateral-hip-settle",
    ],
  },
  {
    slug: "standing-itb-open",
    title: "Standing ITB open",
    summary:
      "Cross-leg side-bend stretch for outer-hip and ITB tightness linked to runner’s knee patterns.",
    region: "Hip",
    level: "early",
    equipment: "Wall for balance (optional)",
    illustration: "standing-hinge",
    steps: [
      "Stand and cross the sore-side leg behind the other.",
      "Gently lean the trunk away from the sore side until you feel an outer-hip / outer-thigh stretch.",
      "Hold without bouncing, then switch if needed.",
      "Keep both feet grounded.",
    ],
    cues: [
      "Lengthen through the outer hip rather than collapsing the low back.",
      "A mild stretch that eases is useful; sharp joint-line knee pain is not.",
    ],
    avoid: [
      "Forcing into irritable lateral knee pain.",
      "Twisting aggressively through the lumbar spine.",
    ],
    dosage: "20–30 second hold, 2 rounds each side, most days",
    relatedConditionSlugs: [
      "itb-syndrome",
      "greater-trochanteric-pain",
      "patellofemoral-pain",
    ],
    relatedProgrammeSlugs: [
      "lateral-hip-settle",
      "patellofemoral-build",
    ],
  },
  {
    slug: "midrange-quad-isometric",
    title: "Mid-range quad isometric",
    summary:
      "Seated or wall-supported knee-bend hold for patellar tendon loading without deep squat irritability.",
    region: "Knee",
    level: "build",
    equipment: "Chair or wall",
    illustration: "step-down",
    steps: [
      "Sit tall or lean lightly on a wall with the knees bent about 30–60°.",
      "Press the feet into the floor and gently tense the quads as if straightening, without fully extending.",
      "Hold, breathe, then relax.",
      "Keep effort around 30–40% — enough to feel the tendon work, not flare for hours.",
    ],
    cues: [
      "Mild tendon ache that settles by next day can be acceptable in build phase.",
      "If swelling rises, shorten holds and return to early settle drills.",
    ],
    avoid: [
      "Deep painful angles while the tendon is hot and puffy.",
      "Breath-holding or hard Valsalva.",
    ],
    dosage: "20–30 second holds × 5–8, most days",
    relatedConditionSlugs: [
      "patellar-tendinopathy",
      "patellofemoral-pain",
      "acl-rehab",
      "knee-oa",
    ],
    relatedProgrammeSlugs: [
      "hamstring-return",
      "knee-settle-early",
      "patellofemoral-build",
    ],
  },
  {
    slug: "wrist-rotation-isometric",
    title: "Wrist rotation isometric",
    summary:
      "Gentle forearm pronation/supination holds against a fist or towel — calm loading for medial and lateral elbow patterns.",
    region: "Elbow & Wrist",
    level: "early",
    equipment: "Rolled towel or soft ball",
    illustration: "seated-desk",
    steps: [
      "Sit with the elbow bent by your side and forearm neutral, holding a rolled towel.",
      "Gently try to rotate the palm down (pronate) against the towel without moving much.",
      "Relax, then gently try to rotate the palm up (supinate) against the towel.",
      "Keep effort light and pain-light at the elbow.",
    ],
    cues: [
      "Think “activate,” not wrench the forearm.",
      "Shoulder stays quiet; movement stays at the forearm.",
    ],
    avoid: [
      "Pushing through sharp outer- or inner-elbow pain that lingers.",
      "Large painful twisting through an irritable wrist.",
    ],
    dosage: "5–8 second holds each direction × 6–8, 1–2 sets, most days",
    relatedConditionSlugs: [
      "medial-epicondylalgia",
      "tennis-elbow",
      "cubital-tunnel",
      "carpal-tunnel",
    ],
    relatedProgrammeSlugs: [
      "tennis-elbow-build",
      "tennis-elbow-settle",
      "upper-limb-desk-calm",
    ],
  },
];

export const programmes: Programme[] = [
  {
    slug: "acute-low-back-settle",
    title: "Acute low-back settle",
    summary:
      "Short, calming sequence for a recent mechanical low-back flare — keep moving without poking the bear.",
    audience:
      "Adults with a recent non-specific low-back flare who can walk and change position without severe night pain or red flags.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "pelvic-tilts",
      "knee-rolls",
      "knee-to-chest",
      "supine-marching",
      "cat-cow",
      "prone-press-up",
      "hip-hinge-practice",
      "glute-bridge",
      "bridge-march",
      "dead-bug",
      "bird-dog",
      "side-plank-short",
      "ischial-unweight-sit",
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "facet-syndrome",
      "lumbar-disc-radiculopathy",
      "si-joint-dysfunction",
      "spondylolysis",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Stop and seek urgent care for new bladder/bowel change, saddle numbness, progressive leg weakness, fever with back pain, or trauma.",
      "If leg pain dominates over back pain, prefer the sciatica programme and get assessed.",
      "Keep sessions short; more frequency beats one long grind.",
      "Known spondylolysis or listhesis: avoid repeated end-range extension drills that recreate sharp lumbar pain.",
      "Skip or shrink prone press-ups if extension increases leg symptoms that linger.",
      "For walking-limited stenosis patterns, prefer the stenosis flexion programme instead of this extension-biased settle.",
    ],
  },
  {
    slug: "desk-neck-reset",
    title: "Desk neck reset",
    summary:
      "Micro-breaks for screen-heavy days around Charlton and nearby SE London — neck, shoulder blades, and mid-back.",
    audience:
      "Desk and hybrid workers with posture-related neck or upper-back stiffness without acute trauma.",
    phase: "rebuild",
    exerciseSlugs: [
      "chin-tuck",
      "cervical-nod-retraction",
      "upper-trap-stretch",
      "levator-stretch",
      "isometric-neck-rotation",
      "seated-scapular-set",
      "seated-thoracic-rotation",
      "open-book-rotation",
      "thoracic-extension-roll",
      "prone-cobra-short",
      "doorway-pec-stretch",
      "wall-angels",
      "band-pull-apart",
      "open-book-pregnancy",
      "hip-hinge-practice",
      "diaphragmatic-breathing",
    ],
    relatedConditionSlugs: [
      "neck-pain",
      "cervicogenic-headache",
      "thoracic-joint-dysfunction",
      "cervical-radiculopathy",
      "costochondritis",
      "whiplash",
      "scheuermanns",
      "facet-syndrome",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Dizziness, arm numbness, or headache after trauma needs clinical assessment first.",
      "Spread drills through the day rather than one long block at 6pm.",
      "Scheuermann-type kyphosis: keep extensions gentle and stop if mid-back pain sharpens.",
    ],
  },
  {
    slug: "sciatica-nerve-calm",
    title: "Sciatica nerve calm",
    summary:
      "Gentle mobility and hip ease when buttock-to-leg symptoms are present but not aggressively flaring.",
    audience:
      "People with buttock or leg symptoms consistent with nerve irritability who can sit and walk short distances.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "knee-rolls",
      "pelvic-tilts",
      "knee-to-chest",
      "sciatic-nerve-glide",
      "hamstring-slider",
      "piriformis-figure-four",
      "glute-bridge",
      "bridge-march",
    ],
    relatedConditionSlugs: [
      "sciatica",
      "lumbar-disc-radiculopathy",
      "piriformis-syndrome",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Cauda equina red flags need emergency care — do not use this programme instead.",
      "If a nerve glide increases lingering leg symptoms, shrink the range or pause and book assessment.",
    ],
  },
  {
    slug: "patellofemoral-build",
    title: "Patellofemoral build",
    summary:
      "Quad and hip control for kneecap irritability — stairs, hills, and return to training around Charlton.",
    audience:
      "Adults with front-of-knee or kneecap pain that settles with load management, without locking or giving-way from instability.",
    phase: "rebuild",
    exerciseSlugs: [
      "quad-set-short-arc",
      "terminal-knee-extension",
      "side-lying-hip-abduction",
      "clamshell",
      "glute-bridge",
      "sit-to-stand",
      "wall-sit-isometric",
      "spanish-squat-hold",
      "midrange-quad-isometric",
      "step-down-control",
      "reverse-lunge-control",
      "standing-itb-open",
      "single-leg-balance",
      "single-leg-rdl",
      "hamstring-slider",
      "nordic-hamstring-assist",
    ],
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "itb-syndrome",
      "patellar-tendinopathy",
      "knee-oa",
      "hamstring-strain",
      "acl-rehab",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "True locking, marked swelling after injury, or giving-way episodes need assessment before progressing step-downs.",
      "Keep step height low until control is easy.",
      "Post-ACL: stay inside surgeon range and swelling rules — this programme supports quad/hip control, not graft clearance.",
    ],
  },
  {
    slug: "plantar-heel-load",
    title: "Plantar heel load",
    summary:
      "Morning-heel friendly loading: roll, calf length, and isometric calf work.",
    audience:
      "People with plantar heel pain worse with first steps, without open wounds or acute infection.",
    phase: "rebuild",
    exerciseSlugs: [
      "plantar-fascia-roll",
      "calf-wall-stretch",
      "isometric-heel-raise",
      "eccentric-heel-drop",
      "great-toe-extension",
      "seated-hallux-lift",
      "metatarsal-spread",
      "towel-toe-curls",
      "knee-to-wall-dorsiflexion",
      "single-leg-balance",
    ],
    relatedConditionSlugs: [
      "plantar-fasciitis",
      "achilles-tendinopathy",
      "hallux-rigidus",
      "morton-neuroma",
      "shin-splints",
    ],
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "Sudden calf swelling or inability to push off may need urgent medical review (e.g. suspected tear or DVT pathway).",
      "Shockwave or hands-on care can sit alongside this — it does not replace assessment when pain is severe.",
      "Shin pain with focal bone tenderness after mileage spikes needs clinical review before pushing impact drills.",
    ],
  },
  {
    slug: "shoulder-arc-calm",
    title: "Shoulder arc calm",
    summary:
      "Pendulum to light cuff work for irritable subacromial or early frozen-shoulder patterns.",
    audience:
      "Adults with shoulder pain on reaching or lying on the side, without acute dislocation or unexplained neurological loss.",
    phase: "settle",
    exerciseSlugs: [
      "shoulder-pendulum",
      "table-slides",
      "seated-scapular-set",
      "isometric-shoulder-er",
      "open-book-rotation",
      "doorway-pec-stretch",
      "wall-angels",
      "band-external-rotation",
      "prone-t-raise",
      "prone-y-raise",
      "wall-push-up-plus",
    ],
    relatedConditionSlugs: [
      "subacromial-pain",
      "frozen-shoulder",
      "rotator-cuff-tear",
      "ac-joint-injury",
      "shoulder-instability",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Post-dislocation, suspected fracture, or night pain with fever needs medical review first.",
      "Stay below the height that pinches; range returns faster when irritability drops.",
      "For instability, prioritise control over stretching into end-range apprehension.",
    ],
  },
  {
    slug: "ankle-sprain-early",
    title: "Ankle sprain early motion",
    summary:
      "Early motion, isometric load, and balance after a typical lateral ankle sprain.",
    audience:
      "People recovering from a mild–moderate lateral ankle sprain once severe swelling is settling and walking is possible with or without support.",
    phase: "settle",
    exerciseSlugs: [
      "ankle-alphabet",
      "knee-to-wall-dorsiflexion",
      "calf-wall-stretch",
      "isometric-heel-raise",
      "tibialis-raise",
      "towel-toe-curls",
      "single-leg-balance",
      "tandem-balance",
    ],
    relatedConditionSlugs: [
      "lateral-ankle-sprain",
      "achilles-tendinopathy",
      "shin-splints",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Inability to weight-bear after injury, deformity, or numbness needs urgent assessment (Ottawa rules / medical review).",
      "Progress balance only when standing feels stable near support.",
    ],
  },
  {
    slug: "post-visit-gentle-move",
    title: "Post-visit gentle move",
    summary:
      "The day-after sequence that pairs with our aftercare guide — calm breathing and easy mobility.",
    audience:
      "Patients in the first 24–48 hours after osteopathy who were advised to keep moving gently.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "pelvic-tilts",
      "knee-rolls",
      "knee-to-chest",
      "cat-cow",
      "chin-tuck",
      "cervical-nod-retraction",
      "upper-trap-stretch",
      "levator-stretch",
      "isometric-neck-rotation",
      "shoulder-pendulum",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "neck-pain",
      "deconditioning",
      "fibromyalgia",
      "post-surgical-general",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Follow any personal plan given in clinic if it differs from this page.",
      "Worsening symptoms after 48 hours, or red-flag neurological change, means contact us or urgent care — not more exercise.",
      "Osteoporosis or recent surgery: keep ranges gentle and honour fracture or wound precautions from your clinician — prefer the osteoporosis-safe programme when bone density is the main concern.",
    ],
  },
  {
    slug: "lateral-hip-settle",
    title: "Lateral hip settle",
    summary:
      "Glute and hip control for outer-hip, groin, and early hip-joint irritability — stairs and side-sleep first.",
    audience:
      "Adults with lateral hip or groin discomfort that settles with load management, without acute fracture or unexplained night fever.",
    phase: "rebuild",
    exerciseSlugs: [
      "side-lying-hip-abduction",
      "clamshell",
      "adductor-ball-squeeze",
      "pelvic-clock",
      "glute-bridge",
      "hip-flexor-stretch",
      "piriformis-figure-four",
      "hip-figure-four-flex",
      "standing-itb-open",
      "short-copenhagen",
      "hip-hinge-practice",
      "sit-to-stand",
      "single-leg-balance",
      "single-leg-rdl",
      "side-plank-short",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "greater-trochanteric-pain",
      "hip-oa",
      "femoroacetabular-impingement",
      "groin-pain",
      "itb-syndrome",
    ],
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "True locking, giving-way, or unexplained night pain with fever needs assessment before progressing single-leg work.",
      "Avoid forcing into the groin pinch of deep flexion — shorten the range instead.",
    ],
  },
  {
    slug: "upper-limb-desk-calm",
    title: "Upper-limb desk calm",
    summary:
      "Neck, scapular, and gentle mobility micro-breaks when wrist, thumb, or elbow load from desk and tools is flaring.",
    audience:
      "Desk, salon, and tool users with wrist, thumb, or elbow irritability without progressive hand wasting or constant numbness.",
    phase: "settle",
    exerciseSlugs: [
      "chin-tuck",
      "upper-trap-stretch",
      "levator-stretch",
      "seated-scapular-set",
      "seated-thoracic-rotation",
      "open-book-rotation",
      "wall-angels",
      "wrist-extensor-stretch",
      "wrist-flexor-stretch",
      "towel-grip-isometric",
      "thumb-cmc-isometric",
      "thumb-opposition-slides",
      "wrist-rotation-isometric",
      "median-nerve-glide",
      "ulnar-nerve-glide",
      "band-external-rotation",
      "diaphragmatic-breathing",
    ],
    relatedConditionSlugs: [
      "carpal-tunnel",
      "dequervains",
      "cmc-oa",
      "cubital-tunnel",
      "medial-epicondylalgia",
      "tennis-elbow",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Constant numbness, thenar wasting, or progressive hand weakness needs medical or nerve-study pathways — not this programme alone.",
      "Keep wrists in mid-range; stop any drill that sparks lingering neural tingling.",
    ],
  },
  {
    slug: "tennis-elbow-settle",
    title: "Tennis elbow settle",
    summary:
      "Forearm calm and gentle loading for outer-elbow irritability from mouse, tools, or gripping — desk and trade friendly.",
    audience:
      "Adults with lateral elbow pain that flares with gripping or wrist extension, without progressive hand weakness or constant night numbness.",
    phase: "settle",
    exerciseSlugs: [
      "wrist-extensor-stretch",
      "wrist-flexor-stretch",
      "towel-grip-isometric",
      "thumb-cmc-isometric",
      "thumb-opposition-slides",
      "wrist-rotation-isometric",
      "median-nerve-glide",
      "ulnar-nerve-glide",
      "seated-scapular-set",
      "chin-tuck",
      "diaphragmatic-breathing",
    ],
    relatedConditionSlugs: [
      "tennis-elbow",
      "medial-epicondylalgia",
      "dequervains",
      "carpal-tunnel",
      "cubital-tunnel",
    ],
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "Sudden trauma, marked swelling, or inability to extend the wrist/fingers needs medical review first.",
      "Keep grip effort submaximal — lingering outer-elbow pain the next day means you did too much.",
      "Constant numbness or hand wasting is not a stretch-and-load problem alone — seek assessment.",
    ],
  },
  {
    slug: "tennis-elbow-build",
    title: "Tennis elbow build",
    summary:
      "Progress from calm stretches into slow eccentric wrist work and grip control once early irritability has settled.",
    audience:
      "Adults whose outer-elbow pain no longer spikes for hours after light daily use and who are ready for graded loading.",
    phase: "rebuild",
    exerciseSlugs: [
      "wrist-extensor-stretch",
      "wrist-flexor-stretch",
      "towel-grip-isometric",
      "wrist-rotation-isometric",
      "eccentric-wrist-extension",
      "seated-scapular-set",
      "wall-push-up-plus",
      "farmer-carry-walk",
    ],
    relatedConditionSlugs: [
      "tennis-elbow",
      "medial-epicondylalgia",
      "dequervains",
    ],
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "If next-day elbow pain is clearly worse, drop load or return to the settle programme for a few days.",
      "Shockwave or hands-on care can sit alongside this — it does not replace assessment when progress stalls.",
    ],
  },
  {
    slug: "frozen-shoulder-early",
    title: "Frozen shoulder early motion",
    summary:
      "Supported, low-irritability motion for a stiff, painful shoulder — pendulum and table slides first.",
    audience:
      "Adults with global shoulder stiffness and night pain suggestive of adhesive capsulitis who can tolerate gentle supported movement.",
    phase: "settle",
    exerciseSlugs: [
      "shoulder-pendulum",
      "table-slides",
      "seated-scapular-set",
      "isometric-shoulder-er",
      "doorway-pec-stretch",
      "open-book-rotation",
      "wall-push-up-plus",
      "diaphragmatic-breathing",
    ],
    relatedConditionSlugs: [
      "frozen-shoulder",
      "subacromial-pain",
      "rotator-cuff-tear",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Unexplained fever with joint pain, recent dislocation, or suspected fracture needs medical review first.",
      "Stay below the height that sharply pinches; irritability drops before range returns.",
      "Diabetes or thyroid history is common with frozen shoulder — keep expectations realistic and get assessed for a plan.",
    ],
  },
  {
    slug: "stenosis-flexion-calm",
    title: "Stenosis flexion calm",
    summary:
      "Flexion-biased, short-session mobility for walking-limited low-back patterns that prefer rounding over extending.",
    audience:
      "Adults with neurogenic claudication–type or extension-sensitive low-back/leg symptoms who feel easier when flexed, without cauda equina red flags.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "pelvic-tilts",
      "knee-to-chest",
      "seated-flexion-fold",
      "hip-hinge-practice",
      "sit-to-stand",
      "cat-cow",
    ],
    relatedConditionSlugs: [
      "lumbar-stenosis",
      "lumbar-disc-radiculopathy",
      "non-specific-low-back-pain",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Cauda equina red flags need emergency care — do not use this programme instead.",
      "Skip prone press-ups and other end-range extension drills if they recreate leg heaviness.",
      "If walking distance is collapsing quickly or weakness is progressive, get assessed promptly.",
    ],
  },
  {
    slug: "osteoporosis-safe-load",
    title: "Osteoporosis-safe load",
    summary:
      "Bone-friendly strength and balance: sit-to-stand, hinge pattern, wall upper-body work, and tandem standing near support.",
    audience:
      "Adults with low bone density or fracture risk who have been cleared for gentle standing exercise, without acute vertebral fracture precautions that ban flexion or loading.",
    phase: "rebuild",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "sit-to-stand",
      "hip-hinge-practice",
      "glute-bridge",
      "bridge-march",
      "wall-angels",
      "wall-push-up-plus",
      "band-pull-apart",
      "single-leg-balance",
      "tandem-balance",
      "single-leg-rdl",
      "side-plank-short",
      "farmer-carry-walk",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "osteoporosis",
      "deconditioning",
      "post-surgical-general",
      "spondylolysis",
      "scheuermanns",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Follow fracture, vertebroplasty, or surgeon rules if they differ — personal clearance beats this page.",
      "Avoid loaded end-range flexion or twisting if your clinician has advised against it.",
      "Practise balance near a wall or sturdy chair; stop if dizziness appears.",
      "Known spondylolysis: keep extension drills gentle and stop if sharp lumbar pain returns.",
    ],
  },
  {
    slug: "coccydynia-sit-ease",
    title: "Coccydynia sit ease",
    summary:
      "Unweight the tailbone, keep the pelvis moving gently, and avoid long perched sitting after coccyx flare-ups.",
    audience:
      "Adults with tailbone pain worse with sitting who can stand and walk without red-flag neurological change.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "ischial-unweight-sit",
      "pelvic-tilts",
      "pelvic-clock",
      "knee-to-chest",
      "glute-bridge",
      "hip-hinge-practice",
    ],
    relatedConditionSlugs: ["coccydynia", "si-joint-dysfunction"],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Trauma with inability to sit or walk, fever, or saddle numbness needs medical review first.",
      "Stand and walk for brief breaks every 20–30 minutes on desk days.",
      "A soft wedge that unweights the coccyx can help — stop if it increases pain.",
    ],
  },
  {
    slug: "knee-settle-early",
    title: "Knee settle early",
    summary:
      "Quad wake-up and easy control after meniscal-type or swollen knee irritability — avoid deep painful squat angles early.",
    audience:
      "Adults with recent knee joint-line irritability or swelling that settles with load management, without locked knee or giving-way from instability.",
    phase: "settle",
    exerciseSlugs: [
      "quad-set-short-arc",
      "terminal-knee-extension",
      "sit-to-stand",
      "side-lying-hip-abduction",
      "glute-bridge",
      "single-leg-balance",
      "wall-sit-isometric",
      "midrange-quad-isometric",
      "spanish-squat-hold",
      "reverse-lunge-control",
    ],
    relatedConditionSlugs: [
      "meniscal-injury",
      "knee-oa",
      "patellofemoral-pain",
      "acl-rehab",
      "patellar-tendinopathy",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "True locking, marked swelling after injury, or giving-way episodes need assessment before progressing wall sits or steps.",
      "Keep squat depth shallow while the joint feels hot or puffy.",
      "Post-op knees: stay inside surgeon range and swelling rules.",
      "Spanish squat holds and reverse lunges are optional progressions — skip while the joint is swollen.",
    ],
  },
  {
    slug: "pregnancy-pelvic-ease",
    title: "Pregnancy pelvic ease",
    summary:
      "Gentle pelvic and mid-back mobility with trimester-aware positioning — support with pillows and stop if anything feels unsafe.",
    audience:
      "Expectant adults with pelvic girdle or postural backache who have been cleared for gentle movement by their maternity team.",
    phase: "settle",
    exerciseSlugs: [
      "diaphragmatic-breathing",
      "pelvic-tilts",
      "pelvic-clock",
      "adductor-ball-squeeze",
      "cat-cow",
      "open-book-pregnancy",
      "seated-scapular-set",
      "chin-tuck",
    ],
    relatedConditionSlugs: [
      "si-joint-dysfunction",
      "non-specific-low-back-pain",
      "thoracic-joint-dysfunction",
      "neck-pain",
    ],
    relatedServiceSlug: "pregnancy-support",
    precautions: [
      "Follow maternity advice on positions (including lying flat) — personal guidance beats this page.",
      "Stop for vaginal bleeding, reduced fetal movements, severe headache, or calf swelling — contact your maternity team or urgent care.",
      "Pelvic girdle pain: keep ranges small and avoid asymmetrical lunges that recreate sharp pubic or SI pain.",
    ],
  },
  {
    slug: "shoulder-stability-build",
    title: "Shoulder stability build",
    summary:
      "Isometric cuff work into scapular T raises for people rebuilding confidence after instability or irritable cuff patterns.",
    audience:
      "Adults with shoulder instability or cuff irritability who can tolerate light isometrics without apprehension or night fever.",
    phase: "rebuild",
    exerciseSlugs: [
      "seated-scapular-set",
      "isometric-shoulder-er",
      "band-external-rotation",
      "shoulder-pendulum",
      "table-slides",
      "prone-t-raise",
      "prone-y-raise",
      "band-pull-apart",
      "wall-push-up-plus",
      "wall-angels",
    ],
    relatedConditionSlugs: [
      "shoulder-instability",
      "subacromial-pain",
      "rotator-cuff-tear",
      "ac-joint-injury",
      "scheuermanns",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Recent dislocation, suspected fracture, or neurological loss needs medical review first.",
      "Stay out of positions that recreate apprehension — shorten range instead.",
      "Progress T and Y raises only when isometrics feel calm.",
    ],
  },
  {
    slug: "forefoot-ease",
    title: "Forefoot ease",
    summary:
      "Toe and metatarsal control for crowded forefeet, stiff big toes, and Morton-type burning — barefoot, short sessions.",
    audience:
      "Adults with forefoot crowding, hallux stiffness, or Morton-type symptoms without open wounds or acute infection.",
    phase: "rebuild",
    exerciseSlugs: [
      "metatarsal-spread",
      "seated-hallux-lift",
      "great-toe-extension",
      "towel-toe-curls",
      "plantar-fascia-roll",
      "single-leg-balance",
    ],
    relatedConditionSlugs: [
      "morton-neuroma",
      "hallux-rigidus",
      "plantar-fasciitis",
    ],
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "Sudden forefoot swelling, open sores, or infection signs need medical review first.",
      "Wear roomy footwear; avoid narrow toe boxes while irritability is high.",
      "Stop drills that recreate lasting neural burning into the toes.",
    ],
  },
  {
    slug: "hamstring-return",
    title: "Hamstring return",
    summary:
      "From easy sliders into assisted Nordics and reverse lunges once a hamstring strain or posterior-chain irritability has settled.",
    audience:
      "Adults returning to running, field sport, or gym hinge work after a hamstring strain or related posterior-chain flare, without red-flag neurological loss.",
    phase: "capacity",
    exerciseSlugs: [
      "hamstring-slider",
      "glute-bridge",
      "bridge-march",
      "hip-hinge-practice",
      "single-leg-rdl",
      "nordic-hamstring-assist",
      "reverse-lunge-control",
      "midrange-quad-isometric",
      "short-copenhagen",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "hamstring-strain",
      "acl-rehab",
      "groin-pain",
      "non-specific-low-back-pain",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Acute tear with clear bruising, inability to walk, or suspected avulsion needs medical review first.",
      "Do not rush unassisted Nordics — assisted control first.",
      "Sharp sudden “pop” or giving-way means stop and get assessed.",
    ],
  },
  {
    slug: "shin-calf-capacity",
    title: "Shin and calf capacity",
    summary:
      "Ankle mobility plus tibialis and calf loading for shin-splint and return-to-run patterns — short sessions, gradual hills.",
    audience:
      "Adults with shin or calf load intolerance from running, walking hills, or recent ankle sprain who can hop lightly without sharp bone pain.",
    phase: "rebuild",
    exerciseSlugs: [
      "ankle-alphabet",
      "knee-to-wall-dorsiflexion",
      "calf-wall-stretch",
      "isometric-heel-raise",
      "tibialis-raise",
      "eccentric-heel-drop",
      "single-leg-balance",
      "towel-toe-curls",
    ],
    relatedConditionSlugs: [
      "shin-splints",
      "achilles-tendinopathy",
      "lateral-ankle-sprain",
      "plantar-fasciitis",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    precautions: [
      "Focal bone tenderness, night pain, or sudden calf swelling/DVT signs needs medical review — not this programme alone.",
      "Keep running volume flat or slightly down while building these drills.",
      "Stop if shin pain rises day-to-day rather than settling within 24 hours.",
    ],
  },
];

export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((item) => item.slug === slug);
}

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((item) => item.slug === slug);
}

export function getAllExerciseSlugs(): string[] {
  return exercises.map((item) => item.slug);
}

export function getAllProgrammeSlugs(): string[] {
  return programmes.map((item) => item.slug);
}

export function getExercisesByRegion(region?: ExerciseRegion): Exercise[] {
  if (!region) return exercises;
  return exercises.filter((item) => item.region === region);
}

export function getProgrammesForCondition(conditionSlug: string): Programme[] {
  return programmes.filter((item) =>
    item.relatedConditionSlugs.includes(conditionSlug),
  );
}

export function getExercisesForProgramme(programme: Programme): Exercise[] {
  return programme.exerciseSlugs
    .map((slug) => getExercise(slug))
    .filter((item): item is Exercise => Boolean(item));
}

/** Programmes that actually include this drill (membership is source of truth). */
export function getProgrammesForExercise(exercise: Exercise): Programme[] {
  return programmes.filter((programme) =>
    programme.exerciseSlugs.includes(exercise.slug),
  );
}

export function getExercisesByLevel(level?: ExerciseLevel): Exercise[] {
  if (!level) return exercises;
  return exercises.filter((item) => item.level === level);
}

/** Same region first, then shared programmes / conditions — excludes self. */
export function getRelatedExercises(exercise: Exercise, limit = 3): Exercise[] {
  const scored = exercises
    .filter((item) => item.slug !== exercise.slug)
    .map((item) => {
      let score = 0;
      if (item.region === exercise.region) score += 3;
      if (item.level === exercise.level) score += 1;
      const sharedConditions = item.relatedConditionSlugs.filter((slug) =>
        exercise.relatedConditionSlugs.includes(slug),
      ).length;
      score += sharedConditions;
      const sharedProgrammes = programmes.filter(
        (programme) =>
          programme.exerciseSlugs.includes(item.slug) &&
          programme.exerciseSlugs.includes(exercise.slug),
      ).length;
      score += sharedProgrammes * 2;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ item }) => item);
}
