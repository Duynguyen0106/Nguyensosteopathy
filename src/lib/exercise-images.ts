/** Curated free Pexels / Wikimedia photos for the exercise library. */
export type ExerciseImage = {
  src: string;
  alt: string;
  credit?: string;
  /** CSS object-position for better framing in 16:10 crops */
  objectPosition?: string;
};

export const exerciseImages: Record<string, ExerciseImage> = {
  "pelvic-tilts": {
    src: "/images/exercises/pelvic-tilts.webp",
    alt: "Person lying on a yoga mat with knees bent — start position for pelvic tilts",
    credit: "Photo via Pexels (#7592443)",
  },
  "knee-rolls": {
    src: "/images/exercises/knee-rolls.webp",
    alt: "Person lying on their back with knees rolled to one side for gentle lumbar mobility",
    credit: "Photo via Pexels (#6111612)",
  },
  "supine-marching": {
    src: "/images/exercises/supine-marching.webp",
    alt: "Person on their back with one leg raised — similar to a controlled supine march",
    credit: "Photo via Pexels (#5037400)",
  },
  "glute-bridge": {
    src: "/images/exercises/glute-bridge.webp",
    alt: "Person performing a glute bridge on a yoga mat with hips lifted",
    credit: "Photo via Pexels (#4534632)",
  },
  "chin-tuck": {
    src: "/images/exercises/chin-tuck.webp",
    alt: "Person performing gentle neck mobility with light hand support at the jaw",
    credit: "Photo via Pexels (#7900670)",
    objectPosition: "center 30%",
  },
  "seated-scapular-set": {
    src: "/images/exercises/seated-scapular-set.webp",
    alt: "Person seated at a desk reaching the arms overhead to reset upper-back posture",
    credit: "Photo via Pexels (#7888730)",
    objectPosition: "center 25%",
  },
  "sciatic-nerve-glide": {
    src: "/images/exercises/sciatic-nerve-glide.webp",
    alt: "Seated person reaching toward the feet in a hamstring / nerve-mobility stretch",
    credit: "Photo via Pexels (#373891)",
  },
  "piriformis-figure-four": {
    src: "/images/exercises/piriformis-figure-four.webp",
    alt: "Person in a pigeon-style hip stretch on a yoga mat for outer-hip mobility",
    credit: "Photo via Pexels (#4534662)",
  },
  "quad-set-short-arc": {
    src: "/images/exercises/quad-set-short-arc.webp",
    alt: "Instructional illustration of a quad set / short-arc knee extension",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "side-lying-hip-abduction": {
    src: "/images/exercises/side-lying-hip-abduction.webp",
    alt: "Person lying on their side lifting the top leg for hip abduction strength",
    credit: "Photo via Wikimedia Commons (Acetabular Labrum Exercises, CC licensed)",
  },
  "step-down-control": {
    src: "/images/exercises/step-down-control.webp",
    alt: "Person standing on a step box practicing controlled step-down knee control",
    credit: "Photo via Wikimedia Commons (CC licensed)",
  },
  "plantar-fascia-roll": {
    src: "/images/exercises/plantar-fascia-roll.webp",
    alt: "Bare foot resting on a foam roller for plantar fascia / sole mobility",
    credit: "Photo via Pexels (#20890283)",
  },
  "calf-wall-stretch": {
    src: "/images/exercises/calf-wall-stretch.webp",
    alt: "Athlete stretching the calf with the forefoot against a brick wall",
    credit: "Photo via Pexels (#36429567)",
  },
  "isometric-heel-raise": {
    src: "/images/exercises/isometric-heel-raise.webp",
    alt: "Bare feet rising onto the balls of the feet in a heel-raise hold",
    credit: "Photo via Pexels (#8436714)",
  },
  "diaphragmatic-breathing": {
    src: "/images/exercises/diaphragmatic-breathing.webp",
    alt: "Person lying calmly on a mat with eyes closed practising relaxed breathing",
    credit: "Photo via Pexels (#6958060)",
  },
  "shoulder-pendulum": {
    src: "/images/exercises/shoulder-pendulum.webp",
    alt: "Illustration of a shoulder pendulum: leaning forward with the arm hanging to swing gently",
    credit: "Illustration via Wikimedia Commons (CC licensed)",
  },
  "ankle-alphabet": {
    src: "/images/exercises/ankle-alphabet.webp",
    alt: "Instructional illustration of seated ankle rotation / alphabet mobility",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "single-leg-balance": {
    src: "/images/exercises/single-leg-balance.webp",
    alt: "Person balancing on one leg on a balance disc for stability training",
    credit: "Photo via Wikimedia Commons (CC licensed)",
  },
  "bird-dog": {
    src: "/images/exercises/bird-dog.webp",
    alt: "Person on hands and knees extending opposite arm and leg (bird-dog)",
    credit: "Photo via Wikimedia Commons (PTPioneer, CC BY 2.0)",
  },
};

export function getExerciseImage(slug: string): ExerciseImage | undefined {
  return exerciseImages[slug];
}
