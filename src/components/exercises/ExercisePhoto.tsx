import Image from "next/image";
import { getExerciseImage } from "@/lib/exercise-images";
import { ExerciseIllustration } from "@/components/exercises/ExerciseIllustration";
import type { IllustrationKey } from "@/lib/exercises";

type Props = {
  slug: string;
  illustration: IllustrationKey;
  title: string;
  priority?: boolean;
  className?: string;
  /** Larger crop for detail pages */
  size?: "card" | "detail";
};

export function ExercisePhoto({
  slug,
  illustration,
  title,
  priority = false,
  className = "",
  size = "card",
}: Props) {
  const image = getExerciseImage(slug);

  if (!image) {
    return (
      <ExerciseIllustration name={illustration} className={className} />
    );
  }

  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className}`}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={image.src}
          alt={image.alt || title}
          fill
          priority={priority}
          sizes={
            size === "detail"
              ? "(max-width: 1024px) 100vw, 42vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
          quality={70}
        />
      </div>
      {image.credit && size === "detail" ? (
        <figcaption className="border-t border-slate-100 bg-white px-3 py-2 text-[11px] text-slate-500">
          {image.credit.startsWith("Free educational")
            ? `${image.credit} — not a clinic photo.`
            : `${image.credit}. Free stock for educational use — not a clinic photo.`}
        </figcaption>
      ) : null}
    </figure>
  );
}
