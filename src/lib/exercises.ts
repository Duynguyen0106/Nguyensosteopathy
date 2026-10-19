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
  | "figure-four";

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
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "post-visit-gentle-move",
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
      "sciatica-nerve-calm",
      "post-visit-gentle-move",
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
    ],
    relatedProgrammeSlugs: [
      "acute-low-back-settle",
      "patellofemoral-build",
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
    ],
    relatedProgrammeSlugs: ["acute-low-back-settle", "desk-neck-reset"],
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
    ],
    relatedProgrammeSlugs: ["desk-neck-reset", "post-visit-gentle-move"],
  },
  {
    slug: "seated-scapular-set",
    title: "Seated scapular set",
    summary:
      "Gentle shoulder-blade slide to open the chest after long keyboard hours.",
    region: "Thoracic",
    level: "early",
    equipment: "Chair",
    illustration: "seated-desk",
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
    ],
    relatedProgrammeSlugs: ["desk-neck-reset", "shoulder-arc-calm"],
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
    relatedProgrammeSlugs: ["desk-neck-reset", "shoulder-arc-calm"],
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
    relatedProgrammeSlugs: ["sciatica-nerve-calm"],
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
    ],
    relatedProgrammeSlugs: ["patellofemoral-build"],
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
    ],
    relatedProgrammeSlugs: ["patellofemoral-build"],
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
    relatedConditionSlugs: ["plantar-fasciitis", "achilles-tendinopathy"],
    relatedProgrammeSlugs: ["plantar-heel-load"],
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
    relatedProgrammeSlugs: ["plantar-heel-load", "ankle-sprain-early"],
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
    relatedProgrammeSlugs: ["plantar-heel-load", "ankle-sprain-early"],
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
    ],
    relatedProgrammeSlugs: ["shoulder-arc-calm", "post-visit-gentle-move"],
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
    ],
    relatedProgrammeSlugs: ["shoulder-arc-calm", "desk-neck-reset"],
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
    relatedProgrammeSlugs: ["shoulder-arc-calm"],
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
    relatedProgrammeSlugs: ["ankle-sprain-early"],
  },
  {
    slug: "single-leg-balance",
    title: "Single-leg balance",
    summary:
      "Quiet standing balance to retrain ankle reflexes after sprain or for lower-limb rehab.",
    region: "Ankle & Foot",
    level: "build",
    equipment: "Stable floor (near a wall)",
    illustration: "standing-calf",
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
    ],
    relatedProgrammeSlugs: [
      "ankle-sprain-early",
      "patellofemoral-build",
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
    ],
    relatedProgrammeSlugs: [
      "post-visit-gentle-move",
      "acute-low-back-settle",
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
    ],
    relatedProgrammeSlugs: [
      "post-visit-gentle-move",
      "acute-low-back-settle",
      "desk-neck-reset",
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
      "supine-marching",
      "hip-hinge-practice",
      "glute-bridge",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "facet-syndrome",
      "lumbar-disc-radiculopathy",
      "coccydynia",
      "si-joint-dysfunction",
      "lumbar-stenosis",
      "spondylolysis",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Stop and seek urgent care for new bladder/bowel change, saddle numbness, progressive leg weakness, fever with back pain, or trauma.",
      "If leg pain dominates over back pain, prefer the sciatica programme and get assessed.",
      "Keep sessions short; more frequency beats one long grind.",
      "Known spondylolysis or listhesis: avoid repeated end-range extension drills that recreate sharp lumbar pain.",
    ],
  },
  {
    slug: "desk-neck-reset",
    title: "Desk neck reset",
    summary:
      "Micro-breaks for screen-heavy days around Woolwich and SE18 — neck, shoulder blades, and mid-back.",
    audience:
      "Desk and hybrid workers with posture-related neck or upper-back stiffness without acute trauma.",
    phase: "rebuild",
    exerciseSlugs: [
      "chin-tuck",
      "seated-scapular-set",
      "open-book-rotation",
      "wall-angels",
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
      "sciatic-nerve-glide",
      "piriformis-figure-four",
      "glute-bridge",
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
      "Quad and hip control for kneecap irritability — stairs, hills, and return to training around SE18.",
    audience:
      "Adults with front-of-knee or kneecap pain that settles with load management, without locking or giving-way from instability.",
    phase: "rebuild",
    exerciseSlugs: [
      "quad-set-short-arc",
      "side-lying-hip-abduction",
      "glute-bridge",
      "step-down-control",
      "single-leg-balance",
    ],
    relatedConditionSlugs: [
      "patellofemoral-pain",
      "itb-syndrome",
      "patellar-tendinopathy",
      "knee-oa",
      "meniscal-injury",
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
      "seated-scapular-set",
      "open-book-rotation",
      "wall-angels",
      "band-external-rotation",
    ],
    relatedConditionSlugs: [
      "subacromial-pain",
      "frozen-shoulder",
      "rotator-cuff-tear",
      "ac-joint-injury",
      "shoulder-instability",
    ],
    relatedServiceSlug: "headaches-joints",
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
      "calf-wall-stretch",
      "isometric-heel-raise",
      "single-leg-balance",
    ],
    relatedConditionSlugs: ["lateral-ankle-sprain", "achilles-tendinopathy"],
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
      "chin-tuck",
      "shoulder-pendulum",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "neck-pain",
      "deconditioning",
      "fibromyalgia",
      "osteoporosis",
      "post-surgical-general",
    ],
    relatedServiceSlug: "back-neck-pain",
    precautions: [
      "Follow any personal plan given in clinic if it differs from this page.",
      "Worsening symptoms after 48 hours, or red-flag neurological change, means contact us or urgent care — not more exercise.",
      "Osteoporosis or recent surgery: keep ranges gentle and honour fracture or wound precautions from your clinician.",
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
      "glute-bridge",
      "piriformis-figure-four",
      "hip-hinge-practice",
      "single-leg-balance",
      "bird-dog",
    ],
    relatedConditionSlugs: [
      "greater-trochanteric-pain",
      "hip-oa",
      "femoroacetabular-impingement",
      "groin-pain",
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
      "seated-scapular-set",
      "open-book-rotation",
      "wall-angels",
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
    relatedServiceSlug: "focused-shockwave",
    precautions: [
      "Constant numbness, thenar wasting, or progressive hand weakness needs medical or nerve-study pathways — not this programme alone.",
      "Keep wrists in mid-range; stop any drill that sparks lingering neural tingling.",
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

export function getProgrammesForExercise(exercise: Exercise): Programme[] {
  const byMembership = programmes.filter((programme) =>
    programme.exerciseSlugs.includes(exercise.slug),
  );
  const byField = (exercise.relatedProgrammeSlugs ?? [])
    .map((slug) => getProgramme(slug))
    .filter((item): item is Programme => Boolean(item));
  const merged = new Map<string, Programme>();
  for (const programme of [...byMembership, ...byField]) {
    merged.set(programme.slug, programme);
  }
  return [...merged.values()];
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
