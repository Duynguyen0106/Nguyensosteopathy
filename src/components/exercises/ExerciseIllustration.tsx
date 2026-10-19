import type { ReactNode } from "react";
import type { IllustrationKey } from "@/lib/exercises";

const titles: Record<IllustrationKey, string> = {
  "supine-knees-bent": "Person lying on back with knees bent",
  "supine-leg-slide": "Person lying on back preparing a leg lift",
  "prone-press": "Person lying face down",
  "seated-desk": "Person seated upright at a desk",
  "standing-hinge": "Person hinging at the hips",
  "standing-calf": "Person standing near a wall for calf work",
  "side-lying": "Person lying on their side",
  quadruped: "Person on hands and knees",
  "wall-slide": "Person performing wall arm slides",
  "band-row": "Person rotating the forearm against a light band",
  "step-down": "Person stepping down from a low step",
  "ankle-alphabet": "Seated person moving the ankle",
  "nerve-glide": "Seated person performing a gentle nerve glide",
  "shoulder-pendulum": "Person leaning forward for pendulum swings",
  "heel-raise": "Person rising onto the balls of the feet",
  bridge: "Person performing a glute bridge",
  "chin-tuck": "Person performing a chin tuck",
  "open-book": "Person in side-lying open-book rotation",
  "figure-four": "Person lying on back in a figure-four hip stretch",
};

function Frame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label={title}
      className="h-auto w-full max-w-md"
    >
      <rect width="320" height="220" rx="16" fill="#f1f5f9" />
      <rect
        x="12"
        y="12"
        width="296"
        height="196"
        rx="12"
        fill="#ffffff"
        stroke="#0f766e"
        strokeOpacity="0.25"
      />
      {children}
    </svg>
  );
}

const navy = "#0b2c45";
const teal = "#0f766e";

function figureSupineKnees() {
  return (
    <>
      <ellipse cx="160" cy="150" rx="78" ry="12" fill="#e2e8f0" />
      <path
        d="M70 140 C90 110, 120 100, 150 102 C180 104, 210 112, 240 130"
        fill="none"
        stroke={navy}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="78" cy="118" r="14" fill={navy} />
      <path
        d="M150 102 L150 148 M150 148 L125 175 M150 148 L175 175"
        fill="none"
        stroke={teal}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function figureStanding() {
  return (
    <>
      <line
        x1="40"
        y1="190"
        x2="280"
        y2="190"
        stroke="#cbd5e1"
        strokeWidth="4"
      />
      <circle cx="160" cy="48" r="14" fill={navy} />
      <path
        d="M160 62 L160 120 M160 80 L125 105 M160 80 L195 105 M160 120 L135 175 M160 120 L185 175"
        fill="none"
        stroke={navy}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

export function ExerciseIllustration({
  name,
  className = "",
}: {
  name: IllustrationKey;
  className?: string;
}) {
  const title = titles[name];

  let body: ReactNode;
  switch (name) {
    case "supine-knees-bent":
    case "supine-leg-slide":
      body = figureSupineKnees();
      break;
    case "bridge":
      body = (
        <>
          <ellipse cx="160" cy="165" rx="90" ry="10" fill="#e2e8f0" />
          <path
            d="M70 150 C100 90, 140 70, 170 78 C200 86, 230 110, 250 145"
            fill="none"
            stroke={navy}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="78" cy="130" r="13" fill={navy} />
          <path
            d="M170 78 L170 120 L145 155 M170 120 L200 155"
            fill="none"
            stroke={teal}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
      break;
    case "standing-hinge":
      body = (
        <>
          <line
            x1="40"
            y1="190"
            x2="280"
            y2="190"
            stroke="#cbd5e1"
            strokeWidth="4"
          />
          <circle cx="145" cy="55" r="13" fill={navy} />
          <path
            d="M145 68 L175 115 M175 115 L155 175 M175 115 L210 165 M145 85 L120 110 M175 100 L205 95"
            fill="none"
            stroke={navy}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M210 70 L230 150"
            stroke={teal}
            strokeWidth="3"
            strokeDasharray="6 6"
            opacity="0.7"
          />
        </>
      );
      break;
    case "standing-calf":
    case "heel-raise":
      body = (
        <>
          {figureStanding()}
          <rect
            x="250"
            y="40"
            width="14"
            height="150"
            rx="3"
            fill={teal}
            opacity="0.35"
          />
          {name === "heel-raise" ? (
            <path
              d="M135 175 L160 155 L185 175"
              fill="none"
              stroke={teal}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : null}
        </>
      );
      break;
    case "seated-desk":
    case "chin-tuck":
    case "nerve-glide":
    case "ankle-alphabet":
      body = (
        <>
          <rect
            x="95"
            y="120"
            width="130"
            height="18"
            rx="4"
            fill="#cbd5e1"
          />
          <rect
            x="115"
            y="138"
            width="18"
            height="45"
            rx="3"
            fill="#94a3b8"
          />
          <rect
            x="187"
            y="138"
            width="18"
            height="45"
            rx="3"
            fill="#94a3b8"
          />
          <circle cx="160" cy="58" r="13" fill={navy} />
          <path
            d="M160 72 L160 120 M160 88 L125 115 M160 88 L210 100 M160 120 L140 120 M160 120 L180 120"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {name === "chin-tuck" ? (
            <path
              d="M175 55 H195"
              stroke={teal}
              strokeWidth="3"
              markerEnd={`url(#ex-arrow-${name})`}
            />
          ) : null}
          {name === "ankle-alphabet" ? (
            <path
              d="M210 100 Q230 90 235 115 Q240 140 220 145"
              fill="none"
              stroke={teal}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ) : null}
          <defs>
            <marker
              id={`ex-arrow-${name}`}
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={teal} />
            </marker>
          </defs>
        </>
      );
      break;
    case "side-lying":
    case "open-book":
      body = (
        <>
          <ellipse cx="160" cy="165" rx="100" ry="10" fill="#e2e8f0" />
          <circle cx="70" cy="115" r="13" fill={navy} />
          <path
            d="M82 118 L150 125 L220 140 M150 125 L165 165 M150 125 L190 160"
            fill="none"
            stroke={navy}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {name === "open-book" ? (
            <path
              d="M150 125 L230 85"
              fill="none"
              stroke={teal}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M150 125 L230 100"
              fill="none"
              stroke={teal}
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}
        </>
      );
      break;
    case "quadruped":
      body = (
        <>
          <ellipse cx="160" cy="175" rx="90" ry="10" fill="#e2e8f0" />
          <circle cx="95" cy="95" r="12" fill={navy} />
          <path
            d="M105 100 L160 105 L215 100 M130 105 L120 160 M190 105 L200 160 M105 100 L70 85 M215 100 L255 85"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70 85 L50 70 M255 85 L275 70"
            stroke={teal}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case "wall-slide":
      body = (
        <>
          <rect
            x="40"
            y="30"
            width="14"
            height="160"
            rx="3"
            fill={teal}
            opacity="0.35"
          />
          <circle cx="95" cy="55" r="13" fill={navy} />
          <path
            d="M95 68 L95 130 M95 85 L60 70 M95 85 L130 70 M95 130 L80 175 M95 130 L115 175"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60 70 L55 45 M130 70 L135 45"
            stroke={teal}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case "band-row":
      // Elbow-at-side external rotation (cuff), not a standing row.
      body = (
        <>
          {figureStanding()}
          <path
            d="M145 100 L175 100 L175 130"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M175 130 Q200 145 185 160"
            fill="none"
            stroke={teal}
            strokeWidth="4"
            strokeDasharray="4 3"
          />
          <circle cx="40" cy="110" r="6" fill={teal} />
          <path
            d="M46 110 C90 110, 130 115, 170 128"
            fill="none"
            stroke={teal}
            strokeWidth="3"
            strokeDasharray="4 4"
          />
        </>
      );
      break;
    case "step-down":
      body = (
        <>
          <rect x="60" y="150" width="100" height="40" fill="#cbd5e1" />
          <circle cx="130" cy="55" r="13" fill={navy} />
          <path
            d="M130 68 L130 115 M130 85 L100 105 M130 85 L160 100 M130 115 L115 150 M130 115 L155 175"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
      break;
    case "shoulder-pendulum":
      body = (
        <>
          <rect
            x="60"
            y="90"
            width="70"
            height="12"
            rx="3"
            fill="#94a3b8"
          />
          <circle cx="150" cy="70" r="13" fill={navy} />
          <path
            d="M150 83 L150 120 L120 95 M150 100 L185 160"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M175 155 Q200 170 185 185"
            fill="none"
            stroke={teal}
            strokeWidth="3"
            strokeDasharray="4 3"
          />
        </>
      );
      break;
    case "figure-four":
      body = (
        <>
          <ellipse cx="160" cy="175" rx="95" ry="10" fill="#e2e8f0" />
          {/* torso */}
          <path
            d="M70 155 C95 115, 125 100, 160 100 C195 100, 225 115, 250 155"
            fill="none"
            stroke={navy}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="78" cy="130" r="13" fill={navy} />
          {/* base thigh (uncrossed) */}
          <path
            d="M155 115 L155 145 L120 175"
            fill="none"
            stroke={navy}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* crossed ankle over thigh (figure-four) */}
          <path
            d="M155 145 L200 130 L215 155"
            fill="none"
            stroke={teal}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="215" cy="155" r="5" fill={teal} />
        </>
      );
      break;
    case "prone-press":
    default:
      body = figureSupineKnees();
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 ${className}`}
    >
      <Frame title={title}>{body}</Frame>
    </div>
  );
}
