export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUri?: string;
  publishTime?: string;
};

export type GooglePlaceSummary = {
  placeId: string;
  name: string;
  rating: number | null;
  userRatingCount: number | null;
  mapsUri: string;
  reviews: GoogleReview[];
};

export type GoogleReviewsResult =
  | { ok: true; place: GooglePlaceSummary }
  | { ok: false; reason: string };

type PlacesSearchResponse = {
  places?: Array<{ id?: string; displayName?: { text?: string } }>;
  error?: { message?: string; status?: string };
};

type PlacesDetailsResponse = {
  id?: string;
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: {
      displayName?: string;
      photoUri?: string;
      uri?: string;
    };
  }>;
  error?: { message?: string; status?: string };
};

function apiKey() {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || "";
}

/** Public Place ID for Nguyen's Osteopathic Clinic (St James Pharmacy, Woolwich). */
export const NGUYENS_PLACE_ID = "ChIJG4dhhJip2EcRVmEEenyYD8E";

function configuredPlaceId() {
  const raw =
    process.env.GOOGLE_PLACE_ID?.trim() || NGUYENS_PLACE_ID;
  return raw.replace(/^places\//, "");
}

function placeQuery() {
  return (
    process.env.GOOGLE_PLACE_QUERY?.trim() ||
    "Nguyen's Osteopathic Clinic 52 Powis Street Woolwich SE18"
  );
}

async function resolvePlaceId(key: string): Promise<string | null> {
  const configured = configuredPlaceId();
  if (configured) return configured;

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
      body: JSON.stringify({ textQuery: placeQuery() }),
      next: { revalidate: 86400 },
    },
  );

  const data = (await response.json()) as PlacesSearchResponse;
  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        `Places search failed (${response.status}). Enable Places API (New) for this key.`,
    );
  }

  const id = data.places?.[0]?.id?.replace(/^places\//, "");
  return id || null;
}

export async function getGooglePlaceReviews(): Promise<GoogleReviewsResult> {
  const key = apiKey();
  if (!key) {
    return {
      ok: false,
      reason: "GOOGLE_PLACES_API_KEY is not configured on the server.",
    };
  }

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) {
      return {
        ok: false,
        reason:
          "Could not resolve a Google Place ID. Set GOOGLE_PLACE_ID after enabling Places API (New).",
      };
    }

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 3600 },
      },
    );

    const data = (await response.json()) as PlacesDetailsResponse;
    if (!response.ok) {
      return {
        ok: false,
        reason:
          data.error?.message ||
          `Place Details failed (${response.status}). Check API enablement and key restrictions.`,
      };
    }

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((review) => (review.text?.text || "").trim().length > 0)
      .map((review) => ({
        authorName: review.authorAttribution?.displayName || "Google user",
        rating: review.rating ?? 0,
        text: (review.text?.text || "").trim(),
        relativeTime: review.relativePublishTimeDescription || "",
        profilePhotoUri: review.authorAttribution?.photoUri,
        publishTime: review.publishTime,
      }));

    return {
      ok: true,
      place: {
        placeId: (data.id || placeId).replace(/^places\//, ""),
        name: data.displayName?.text || "Nguyen's Osteopathic Clinic",
        rating: typeof data.rating === "number" ? data.rating : null,
        userRatingCount:
          typeof data.userRatingCount === "number"
            ? data.userRatingCount
            : null,
        mapsUri:
          data.googleMapsUri ||
          "https://maps.app.goo.gl/XgHpsXAy1FmZKibn9",
        reviews,
      },
    };
  } catch (error) {
    return {
      ok: false,
      reason:
        error instanceof Error
          ? error.message
          : "Unexpected error loading Google reviews.",
    };
  }
}
