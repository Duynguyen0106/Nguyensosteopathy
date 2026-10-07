type IconName =
  | "spine"
  | "spark"
  | "wave"
  | "shield"
  | "needle"
  | "hand"
  | "bone"
  | "pregnancy"
  | "cranial"
  | "child";

export function ServiceIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "h-6 w-6",
  };

  switch (name) {
    case "spine":
      return (
        <svg {...common}>
          <path d="M12 3c1.2 1.4 1.2 3.1 0 4.5-1.2 1.4-1.2 3.1 0 4.5 1.2 1.4 1.2 3.1 0 4.5-1.2 1.4-1.2 3.1 0 4.5" />
          <path d="M9.5 5.2h5M9 9.7h6M9.5 14.2h5M9 18.7h6" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M4 12c2.5-3 5-3 7.5 0s5 3 7.5 0" />
          <path d="M4 16c2.5-3 5-3 7.5 0s5 3 7.5 0" />
          <path d="M4 8c2.5-3 5-3 7.5 0s5 3 7.5 0" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    case "needle":
      return (
        <svg {...common}>
          <path d="M12 3v15" />
          <path d="M9 7h6M9.5 11h5M10 15h4" />
          <path d="M12 18v3" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path d="M8 11V7.5a1.5 1.5 0 0 1 3 0V11" />
          <path d="M11 10.5V6.2a1.5 1.5 0 0 1 3 0V12" />
          <path d="M14 11V7.8a1.5 1.5 0 0 1 3 0V14c0 3-1.8 5-5 5H11c-2.8 0-4-1.7-4.5-3.5L5 12.5a1.4 1.4 0 0 1 2.5-1.2L8 13" />
        </svg>
      );
    case "bone":
      return (
        <svg {...common}>
          <path d="M7.5 7.5c-1.3-1.3-1.3-3.4 0-4.7s3.4-1.3 4.7 0L16.5 7.1c1.3 1.3 1.3 3.4 0 4.7" />
          <path d="M16.5 16.5c1.3 1.3 1.3 3.4 0 4.7s-3.4 1.3-4.7 0L7.5 16.9c-1.3-1.3-1.3-3.4 0-4.7" />
          <path d="M9.2 9.2 14.8 14.8" />
        </svg>
      );
    case "pregnancy":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <path d="M10 8.5c-1.5 1-2.5 2.8-2.5 5 0 3 2 5.5 4.5 5.5s4.5-2.5 4.5-5.5c0-1.4-.5-2.7-1.3-3.7" />
          <path d="M9.5 13.5c1.2 1.2 3.8 1.2 5 0" />
        </svg>
      );
    case "cranial":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M8 10.5c1.2-1.4 2.5-2 4-2s2.8.6 4 2" />
          <path d="M9.5 14.5h5" />
        </svg>
      );
    case "child":
      return (
        <svg {...common}>
          <circle cx="12" cy="6" r="2.2" />
          <path d="M8.5 20v-4.5C8.5 13 10 11.5 12 11.5s3.5 1.5 3.5 4V20" />
          <path d="M8.5 15.5 6.5 14M15.5 15.5l2-1.5" />
        </svg>
      );
  }
}
