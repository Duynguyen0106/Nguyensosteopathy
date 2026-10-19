/** Curated free Pexels / Wikimedia photos and educational SVG illustrations. */
export type ExerciseImage = {
  src: string;
  alt: string;
  credit?: string;
  /** CSS object-position for better framing in 16:10 crops */
  objectPosition?: string;
};

export const exerciseImages: Record<string, ExerciseImage> = {
  "ankle-alphabet": {
    src: "/images/exercises/ankle-alphabet.webp",
    alt: "Instructional illustration of seated ankle rotation / alphabet mobility",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "band-external-rotation": {
    src: "/images/exercises/band-external-rotation.webp",
    alt: "Educational illustration of band external rotation: elbow at side, forearm rotating out",
    credit: "Free educational illustration",
  },
  "bird-dog": {
    src: "/images/exercises/bird-dog.webp",
    alt: "Person on hands and knees extending opposite arm and leg (bird-dog)",
    credit: "Photo via Wikimedia Commons (PTPioneer, CC BY 2.0)",
  },
  "calf-wall-stretch": {
    src: "/images/exercises/calf-wall-stretch.webp",
    alt: "Athlete stretching the calf with the forefoot against a brick wall",
    credit: "Photo via Pexels (#36429567)",
  },
  "chin-tuck": {
    src: "/images/exercises/chin-tuck.webp",
    alt: "Educational illustration of a seated chin tuck (gentle cervical retraction)",
    credit: "Free educational illustration",
  },
  "diaphragmatic-breathing": {
    src: "/images/exercises/diaphragmatic-breathing.webp",
    alt: "Person lying calmly on a mat with eyes closed practising relaxed breathing",
    credit: "Photo via Pexels (#6958060)",
  },
  "glute-bridge": {
    src: "/images/exercises/glute-bridge.webp",
    alt: "Person performing a glute bridge on a yoga mat with hips lifted",
    credit: "Photo via Pexels (#4534632)",
  },
  "hip-hinge-practice": {
    src: "/images/exercises/hip-hinge-practice.webp",
    alt: "Educational illustration of a hip hinge: torso tips forward with a long spine",
    credit: "Free educational illustration",
  },
  "isometric-heel-raise": {
    src: "/images/exercises/isometric-heel-raise.webp",
    alt: "Bare feet rising onto the balls of the feet in a heel-raise hold",
    credit: "Photo via Pexels (#8436714)",
  },
  "knee-rolls": {
    src: "/images/exercises/knee-rolls.webp",
    alt: "Person lying on their back with knees rolled to one side for gentle lumbar mobility",
    credit: "Photo via Pexels (#6111612)",
  },
  "open-book-rotation": {
    src: "/images/exercises/open-book-rotation.webp",
    alt: "Educational illustration of a side-lying open-book thoracic rotation",
    credit: "Free educational illustration",
  },
  "pelvic-tilts": {
    src: "/images/exercises/pelvic-tilts.webp",
    alt: "Person lying on a yoga mat with knees bent — start position for pelvic tilts",
    credit: "Photo via Pexels (#7592443)",
  },
  "piriformis-figure-four": {
    src: "/images/exercises/piriformis-figure-four.webp",
    alt: "Educational illustration of a supine figure-four hip stretch",
    credit: "Free educational illustration",
  },
  "plantar-fascia-roll": {
    src: "/images/exercises/plantar-fascia-roll.webp",
    alt: "Bare foot resting on a foam roller for plantar fascia / sole mobility",
    credit: "Photo via Pexels (#20890283)",
  },
  "quad-set-short-arc": {
    src: "/images/exercises/quad-set-short-arc.webp",
    alt: "Instructional illustration of a quad set / short-arc knee extension",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "sciatic-nerve-glide": {
    src: "/images/exercises/sciatic-nerve-glide.webp",
    alt: "Educational illustration of a seated sciatic nerve glide / slider",
    credit: "Free educational illustration",
  },
  "seated-scapular-set": {
    src: "/images/exercises/seated-scapular-set.webp",
    alt: "Educational illustration of a seated scapular set: upright posture, arms by sides, shoulder blades drawn back",
    credit: "Free educational illustration",
  },
  "shoulder-pendulum": {
    src: "/images/exercises/shoulder-pendulum.webp",
    alt: "Illustration of a shoulder pendulum: leaning forward with the arm hanging to swing gently",
    credit: "Illustration via Wikimedia Commons (CC licensed)",
  },
  "side-lying-hip-abduction": {
    src: "/images/exercises/side-lying-hip-abduction.webp",
    alt: "Person lying on their side lifting the top leg for hip abduction strength",
    credit: "Photo via Wikimedia Commons (Acetabular Labrum Exercises, CC licensed)",
  },
  "single-leg-balance": {
    src: "/images/exercises/single-leg-balance.webp",
    alt: "Educational illustration of single-leg balance on a stable floor",
    credit: "Free educational illustration",
  },
  "step-down-control": {
    src: "/images/exercises/step-down-control.webp",
    alt: "Person standing on a step box practicing controlled step-down knee control",
    credit: "Photo via Wikimedia Commons (CC licensed)",
  },
  "supine-marching": {
    src: "/images/exercises/supine-marching.webp",
    alt: "Person on their back with one leg raised — similar to a controlled supine march",
    credit: "Photo via Pexels (#5037400)",
  },
  "wall-angels": {
    src: "/images/exercises/wall-angels.webp",
    alt: "Educational illustration of wall angels: back to wall, arms sliding overhead",
    credit: "Free educational illustration",
  },
};

export function getExerciseImage(slug: string): ExerciseImage | undefined {
  return exerciseImages[slug];
}
