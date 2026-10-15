#!/usr/bin/env python3
"""Generate unique topic-specific expanded bodies for remaining boilerplate posts."""

from __future__ import annotations

import json
import re
from pathlib import Path

POSTS = json.loads(Path("/tmp/remaining-posts.json").read_text())
OUT = Path("/workspace/src/lib/blog-expanded-bodies.ts")

# Prefer .jpg in bodies to match prior expanded-bodies convention when both exist.
PUBLIC = Path("/workspace/public")


def image_for(post: dict) -> tuple[str, str]:
    src = post["imageSrc"]
    alt = post["imageAlt"]
    jpg = src.replace(".webp", ".jpg")
    if (PUBLIC / jpg.lstrip("/")).exists():
        return jpg, alt
    if (PUBLIC / src.lstrip("/")).exists():
        return src, alt
    return src.replace(".webp", ".jpg"), alt


def esc(s: str) -> str:
    return (
        s.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace("\n", "\\n")
    )


def topic_bits(slug: str, title: str, keywords: list[str]) -> dict:
    """Derive audience, load, and advice cues from slug/title."""
    blob = f"{slug} {title} {' '.join(keywords)}".lower()
    bits = {
        "audience": "people in Woolwich and SE18",
        "load": "daily work and commuting load",
        "setup": "small changes to how you sit, stand, and recover",
        "ex1_name": "gentle mobility drill",
        "ex1": "Sit or stand tall, gently move the affected area through a comfortable mid-range for 8–10 slow repetitions, twice daily. Stop if symptoms sharpen or travel into numbness.",
        "ex2_name": "position reset",
        "ex2": "Every 30–45 minutes, change position for 60–90 seconds — stand, walk a short corridor, or open the chest. Short resets beat one heroic stretch you skip when tired.",
        "condition_links": [],
    }

    # Occupational / audience patterns
    if any(k in blob for k in ["desk", "office", "laptop", "text-neck", "smartphone", "rsi", "wrist-forearm"]):
        bits.update(
            audience="desk and hybrid workers around Woolwich",
            load="laptop posture, mouse reach, and long sits on the Elizabeth line or DLR",
            setup="screen height, keyboard position, and movement snacks between calls",
            ex1_name="chin-nod neck reset",
            ex1="Sit tall and make tiny “yes” nods that lengthen the back of the neck without tipping the head back. Do 5 slow nods, then gentle turns left and right within comfort.",
            ex2_name="shoulder-blade slide",
            ex2="Gently draw the shoulder blades down and slightly together without puffing the chest. Hold 5 seconds, repeat 8–10 times after long screen blocks.",
            condition_links=[
                ("neck pain treatment in Woolwich", "neck-pain"),
                ("upper-back postural strain", "thoracic-joint-dysfunction"),
            ],
        )
    if any(k in blob for k in ["kitchen", "warehouse", "lifting", "trades", "football"]):
        bits.update(
            audience="people in physically demanding roles across SE London",
            load="repeated lifts, twists, and hard-floor standing",
            setup="hip-hinge lifting, footwear, and recovery between shifts",
            ex1_name="hip-hinge practice",
            ex1="With soft knees, push the hips back as if closing a car door with your hip, keeping a long spine. Do 8 slow hinges without a load, then add light objects when form is steady.",
            ex2_name="standing extension snack",
            ex2="Hands on the belt line, gently lean back 5–8 times within comfort after a heavy lift block. Stop if leg pain or pins and needles appear.",
            condition_links=[
                ("lower back pain treatment in Woolwich", "non-specific-low-back-pain"),
                ("sciatica", "sciatica"),
            ],
        )
    if any(k in blob for k in ["run", "gym", "sport", "achilles", "ankle", "shin", "patellar", "cycling", "yoga", "pilates"]):
        bits.update(
            audience="runners, gym-goers, and weekend athletes in Woolwich",
            load="training spikes, hard surfaces, and incomplete recovery between sessions",
            setup="graded return to load, footwear checks, and session spacing",
            ex1_name="isometric hold",
            ex1="Find a mid-range position of the sore tissue and hold a gentle isometric contraction 20–30 seconds, 3–4 times. Strength before aggressive stretching often settles tendon irritability better.",
            ex2_name="walk-jog or range snack",
            ex2="On easy days, use a short walk or controlled range-of-motion set instead of complete rest — tissues usually recover faster with graded load than total shutdown.",
            condition_links=[
                ("plantar fasciitis", "plantar-fasciitis"),
                ("Achilles tendinopathy", "achilles-tendinopathy"),
            ],
        )
    if any(k in blob for k in ["pregnan", "pelvic", "postpartum", "sciatica"]):
        bits.update(
            audience="expectant and postpartum patients in Woolwich",
            load="changing pelvic mechanics, sleep position, and caring for a baby",
            setup="side-lying support, pacing around feeds, and safe mobility",
            ex1_name="pelvic tilt in side-lying",
            ex1="Lie on your side with a pillow between the knees. Gently rock the pelvis a few degrees forward and back within comfort for 8–10 reps. Stop if you feel sharp front-pelvic pain.",
            ex2_name="supported sit-to-stand",
            ex2="From a firm chair, hinge at the hips and push through the feet to stand without twisting. Use the chair arms if needed. Practice 5–8 smooth stands when stiffness is worst in the morning.",
            condition_links=[
                ("pelvic / SI joint pain", "si-joint-dysfunction"),
                ("pregnancy-related back pain patterns", "non-specific-low-back-pain"),
            ],
        )
    if any(k in blob for k in ["headache", "migraine", "tmj", "jaw", "cranial", "whiplash", "neck"]):
        bits.update(
            audience="people with neck-driven headache or jaw tension in SE18",
            load="screen posture, clenching, and stress-held upper neck muscles",
            setup="screen height, jaw relaxation, and short neck resets",
            ex1_name="tongue-up jaw rest",
            ex1="Rest the tongue gently on the roof of the mouth behind the front teeth, teeth slightly apart, lips closed. Hold for 30–60 seconds during stressful desk blocks to reduce clench-driven temple and jaw load.",
            ex2_name="upper-neck nod",
            ex2="Tiny chin nods (not big tip-backs) for 5 reps, then slow turns within a comfortable range. Pair with looking at eye-level across the room for 20 seconds every half hour.",
            condition_links=[
                ("cervicogenic headaches", "cervicogenic-headache"),
                ("neck pain treatment in Woolwich", "neck-pain"),
            ],
        )
    if any(k in blob for k in ["shockwave", "tennis", "golfer", "plantar", "calcific", "elbow"]):
        bits.update(
            audience="people with stubborn tendon or soft-tissue pain",
            load="grip, impact, or repetitive strain that has not settled with rest alone",
            setup="load management plus progressive strengthening alongside any adjunct care",
            ex1_name="pain-free isometric",
            ex1="Hold a gentle contraction of the affected tendon region for 30–45 seconds without sharp pain, 3–5 times daily. Isometrics often calm irritable tendons before heavier concentric work.",
            ex2_name="graded functional task",
            ex2="Rebuild the aggravating task (grip, push, or step) at half volume for several days before returning to full loads. Sudden “test days” are a classic re-flare.",
            condition_links=[
                ("tennis elbow", "tennis-elbow"),
                ("plantar fasciitis", "plantar-fasciitis"),
            ],
        )
    if any(k in blob for k in ["hip", "knee", "bursitis", "osteoarthritis", "coccyx", "rib", "shoulder"]):
        bits.update(
            audience="adults with joint-related aches around Woolwich",
            load="stairs, walking distance, sleep position, and sitting blocks",
            setup="activity pacing and joint-friendly movement rather than forced end-range stretching",
            ex1_name="short-arc mobility",
            ex1="Move the joint through a comfortable mid-range for 10 slow repetitions, 2–3 times daily. Warmth and easy motion usually beat aggressive end-range pushing when joints are irritable.",
            ex2_name="sit-stand pacing",
            ex2="Change position before pain peaks — stand for a minute after 25–30 minutes of sitting. Preventing the spike is easier than settling it once tissues are angry.",
            condition_links=[
                ("hip osteoarthritis", "hip-oa"),
                ("kneecap / anterior knee pain", "patellofemoral-pain"),
            ],
        )
    if any(k in blob for k in ["baby", "infant", "paediatric", "child", "growing", "preferential"]):
        bits.update(
            audience="parents seeking gentle musculoskeletal care for children in Woolwich",
            load="growth, posture habits, backpacks, and preferred head or limb positions",
            setup="simple home positioning advice and when to seek assessment",
            ex1_name="play-position variety",
            ex1="Alternate carry and play sides through the day so one neck or hip pattern is not reinforced for hours. Short floor-time variety often helps more than passive stretching in infants and toddlers.",
            ex2_name="backpack fit check",
            ex2="For school-age children: both straps on, pack close to the back, and heaviest items closest to the spine. If one shoulder sits permanently hiked, book assessment rather than buying another bag first.",
            condition_links=[
                ("neck comfort and posture", "neck-pain"),
                ("growing musculoskeletal aches", "non-specific-low-back-pain"),
            ],
        )
    if any(k in blob for k in ["mens", "ed", "erectile", "pelvic-health", "li-eswt"]):
        bits.update(
            audience="men seeking discreet, drug-free options in Woolwich",
            load="vascular, pelvic-floor, and lifestyle contributors discussed privately",
            setup="clear screening, realistic session planning, and privacy at every step",
            ex1_name="breathing down into the pelvis",
            ex1="Sit comfortably, inhale so the lower belly and pelvic floor gently soften, then exhale without forcing. 1–2 minutes of quiet breathing can reduce protective pelvic tension before or after sessions.",
            ex2_name="walk after sedentary blocks",
            ex2="A 10–15 minute brisk walk after long sits supports circulation and mood — useful alongside any clinical protocol, not a substitute for medical review when needed.",
            condition_links=[],
        )
    if any(k in blob for k in ["acupuncture", "cupping", "massage", "deep-tissue"]):
        bits.update(
            audience="patients considering hands-on adjuncts or soft-tissue care",
            load="muscle guarding, desk tension, and post-training tightness",
            setup="matching technique intensity to irritability — not “the deeper the better”",
            ex1_name="heat and easy range",
            ex1="After soft-tissue care, use gentle warmth and easy mid-range movement for a few minutes rather than jumping straight into maximal stretching or a hard gym session.",
            ex2_name="hydration and next-day pacing",
            ex2="Mild post-treatment ache can last 24–48 hours. Keep walking and light tasks, and avoid testing the old personal-best lift the next morning.",
            condition_links=[
                ("neck and shoulder tightness", "neck-pain"),
                ("lower back muscle tension", "non-specific-low-back-pain"),
            ],
        )
    if any(k in blob for k in ["book", "fees", "pharmacy", "parking", "vietnamese", "plumstead", "referral", "sessions", "wear", "nhs", "student", "vs-physio", "what-to-expect"]):
        bits.update(
            audience="people planning a first or follow-up visit in Woolwich",
            load="uncertainty about referrals, fees, arrival, and what happens in clinic",
            setup="practical booking and visit prep so the first hour is useful",
            ex1_name="symptom timeline note",
            ex1="Before you arrive, jot three lines: when it started, what aggravates it, and what you need to get back to (work, sport, sleep). That note speeds assessment more than any stretch.",
            ex2_name="clothing check",
            ex2="Wear loose layers you can move in. For lower-limb or back issues, shorts or loose trousers help examination without awkward undressing.",
            condition_links=[
                ("common lower back pain", "non-specific-low-back-pain"),
                ("neck pain", "neck-pain"),
            ],
        )

    # Slug-specific refinements (highest priority)
    specific = {
        "nail-technician-neck-wrist-pain-osteopath": None,  # in priority
        "text-neck-smartphone-osteopath-woolwich": {
            "audience": "people who scroll and message for hours on phones and tablets",
            "load": "sustained phone flexion and one-thumb typing",
            "setup": "eye-level phone holds, voice notes, and micro-breaks from the lock screen",
            "ex1_name": "phone-at-eye-level drill",
            "ex1": "For the next message block, raise the phone toward eye level instead of dropping your chin. Even 5 minutes changes how hard the upper neck works.",
            "ex2_name": "thumb and forearm shake-out",
            "ex2": "Open and close the fists 10 times, then gently shake the hands out after long scrolling. Add a 20-second look across the room at eye level.",
            "condition_links": [
                ("neck pain treatment in Woolwich", "neck-pain"),
                ("cervicogenic headaches", "cervicogenic-headache"),
            ],
        },
        "rsi-wrist-forearm-office-osteopath": {
            "audience": "office workers and creatives with grip-heavy mouse or tablet days",
            "load": "sustained wrist extension, pinch grip, and forearm fatigue",
            "setup": "mouse height, shortcut use, and forearm support",
            "ex1_name": "wrist extensor stretch",
            "ex1": "Elbow straight, palm down, gently draw the hand toward you for 20–30 seconds. Repeat each side twice between email blocks. Stop if fingers tingle sharply.",
            "ex2_name": "tendon glide snack",
            "ex2": "Slowly make a full fist, then straighten the fingers and thumb wide. 8–10 smooth reps after long typing sessions to keep tendons sliding.",
            "condition_links": [
                ("wrist and hand pain such as carpal tunnel", "carpal-tunnel"),
                ("tennis elbow", "tennis-elbow"),
            ],
        },
        "lifting-back-pain-warehouse-trades-woolwich": {
            "audience": "warehouse, delivery, and trades workers across SE18",
            "load": "floor-to-waist lifts, awkward reaches, and long shifts on concrete",
            "setup": "team lifts, hip-hinge habit, and footwear that still has cushioning",
            "ex1_name": "empty hip-hinge",
            "ex1": "Practice 8 hip-hinges with no load: soft knees, hips back, spine long. Then apply the same pattern to the next light crate before heavy stock runs.",
            "ex2_name": "calf and hip unload",
            "ex2": "After a shift, 20–30 seconds per side in a gentle half-kneeling hip-flexor position (pad under the knee) often undoes the forward-lean fatigue better than toe-touches.",
            "condition_links": [
                ("lower back pain treatment in Woolwich", "non-specific-low-back-pain"),
                ("sciatica", "sciatica"),
            ],
        },
        "massage-for-desk-workers-woolwich": {
            "audience": "desk workers who want soft-tissue relief between osteopathy sessions",
            "load": "upper trap guarding and forearm tightness from mouse and keyboard work",
            "setup": "matching massage intensity to how irritable you are that week",
            "ex1_name": "desk trap reset",
            "ex1": "Sit tall, gently drop one ear toward the shoulder until you feel a mild stretch — no yanking. Hold 20 seconds each side after long call blocks.",
            "ex2_name": "forearm open-close",
            "ex2": "Open and close the fists 10 times, then shake the hands out before you leave the desk. Simple, but it prevents the “locked” forearm feeling the next morning.",
            "condition_links": [
                ("neck and shoulder tightness", "neck-pain"),
                ("upper-back postural strain", "thoracic-joint-dysfunction"),
            ],
        },
        "morning-back-stiffness-osteopath": {
            "audience": "people who wake stiff and take 20–40 minutes to loosen",
            "load": "overnight stillness, mattress/pillow setup, and first movements of the day",
            "setup": "a gentle morning sequence before commuting or lifting",
            "ex1_name": "supine knee-rocks",
            "ex1": "On your back, knees bent, gently rock the knees side to side within comfort for 30–45 seconds before getting out of bed.",
            "ex2_name": "walk before stretch",
            "ex2": "Take a 3–5 minute easy walk indoors before aggressive toe-touches. Warm tissues stretch more kindly than cold ones.",
            "condition_links": [
                ("lower back pain treatment in Woolwich", "non-specific-low-back-pain"),
                ("facet-related back pain", "facet-syndrome"),
            ],
        },
        "back-pain-woolwich-osteopathy": {
            "audience": "Woolwich residents dealing with recurring or new back pain",
            "load": "commuting sits, work demands, and weekend DIY or sport spikes",
            "setup": "early assessment, sensible pacing, and graded return to activity",
            "ex1_name": "walk breaks",
            "ex1": "Stand and walk 1–2 minutes each half hour of sitting. Stillness often aggravates mechanical back pain more than gentle movement.",
            "ex2_name": "hip-hinge for daily tasks",
            "ex2": "When picking washing or bags off the floor, push the hips back with soft knees rather than rounding through the lower back. Practice with a light object first.",
            "condition_links": [
                ("lower back pain treatment in Woolwich", "non-specific-low-back-pain"),
                ("sciatica", "sciatica"),
            ],
        },
    }

    if slug in specific and specific[slug]:
        bits.update(specific[slug])
    return bits


def link_sentence(links: list[tuple[str, str]]) -> str:
    if not links:
        return (
            "If symptoms overlap more than one area, our "
            "[conditions index](/conditions) is a useful place to compare guides before you book."
        )
    if len(links) == 1:
        a, s = links[0]
        return f"Related reading: [{a}](/conditions/{s})."
    a0, s0 = links[0]
    a1, s1 = links[1]
    return f"Related reading: [{a0}](/conditions/{s0}) and [{a1}](/conditions/{s1})."


def topic_phrase(post: dict) -> str:
    """Readable lowercase topic for headings — avoid breaking acronyms like RSI."""
    title = post["title"]
    short = re.sub(r"\s*\|\s*.*$", "", title)
    short = re.sub(r":.*$", "", short).strip()
    # Drop trailing location fluff for cleaner headings
    short = re.sub(
        r"\s+(in|for|at|from)\s+Woolwich.*$",
        "",
        short,
        flags=re.I,
    ).strip()
    short = re.sub(r"\s+Woolwich.*$", "", short, flags=re.I).strip()
    short = re.sub(r"\s+SE18.*$", "", short, flags=re.I).strip()
    if not short:
        return "this issue"
    # Lowercase only the first character when it is a normal word, not an acronym
    if short[:2].isupper() or short.split()[0].isupper():
        return short[0].lower() + short[1:] if short[0].isupper() and not short[:3].isupper() else short
    return short[0].lower() + short[1:]


def build_body(post: dict) -> dict:
    slug = post["slug"]
    title = post["title"]
    bits = topic_bits(slug, title, post["keywords"])
    img, alt = image_for(post)
    topic = topic_phrase(post)

    intro = [
        f"{post['description'].rstrip('.')}.",
        f"At Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street, we assess {bits['audience']} with a focus on {bits['load']}, then match hands-on care to what is actually irritable — not a generic stretch sheet. You do not need a GP referral to book.",
    ]

    why = [
        f"Symptoms linked to {topic} usually build when tissue capacity sits below the load you ask of it. For {bits['audience']}, that often means {bits['load']}.",
        f"Useful change starts with {bits['setup']}. Complete rest alone rarely solves the week you actually live — commuting, shifts, caring responsibilities, and training all count.",
        link_sentence(bits["condition_links"]),
    ]

    practical = [
        f"Focus on {bits['setup']}. Small, repeatable changes beat a perfect plan you abandon by Thursday.",
        "Track two simple markers for a week — morning stiffness minutes, sitting tolerance, walking distance, or grip tasks — so you know whether the plan is working.",
    ]

    exercises = [
        f"{bits['ex1_name'].capitalize()}: {bits['ex1']}",
        f"{bits['ex2_name'].capitalize()}: {bits['ex2']}",
    ]

    how_we_help = [
        f"Assessment for {bits['audience']} covers joint mobility, soft-tissue tone, and how neighbouring regions share load under {bits['load']}. Findings are explained in plain English before treatment begins.",
        f"Care may include gentle mobilisation and soft-tissue work matched to irritability, plus advice on {bits['setup']}. If medical review or imaging is the safer next step, we say so plainly rather than selling a long course you do not need.",
    ]

    when = [
        "Book sooner if sleep, work, or walking is clearly limited, or if the same flare keeps returning every week despite sensible pacing.",
        "Wear clothes you can move in. Bring a short symptom timeline and any recent letters or scans if you have them. Online booking is on our [book page](/book); fees and NHS/student discount details are listed separately.",
    ]

    return {
        "updated": "2026-10-15",
        "readingMinutes": 8,
        "sections": [
            {"paragraphs": intro},
            {"heading": f"What drives {topic}?", "paragraphs": why},
            {
                "heading": "Practical changes that fit real life",
                "paragraphs": practical,
            },
            {
                "heading": "Two self-care drills",
                "level": 3,
                "paragraphs": exercises,
            },
            {
                "heading": "How osteopathy helps",
                "image": {"src": img, "alt": alt},
                "paragraphs": how_we_help,
            },
            {"heading": "When to book", "paragraphs": when},
        ],
        "cta": "If this sounds familiar, book an assessment — or explore related condition guides first if you want more clinical detail.",
        "ctaHref": "/book",
        "ctaLabel": "Book online",
    }


def emit_ts_object(body: dict, indent: int = 4) -> str:
    sp = " " * indent

    def dump(val, level: int) -> str:
        pad = " " * level
        pad2 = " " * (level + 2)
        if isinstance(val, dict):
            lines = ["{"]
            items = list(val.items())
            for i, (k, v) in enumerate(items):
                comma = "," if i < len(items) - 1 else ""
                lines.append(f'{pad2}"{k}": {dump(v, level + 2)}{comma}')
            lines.append(f"{pad}}}")
            return "\n".join(lines)
        if isinstance(val, list):
            if not val:
                return "[]"
            lines = ["["]
            for i, item in enumerate(val):
                comma = "," if i < len(val) - 1 else ""
                lines.append(f"{pad2}{dump(item, level + 2)}{comma}")
            lines.append(f"{pad}]")
            return "\n".join(lines)
        if isinstance(val, str):
            return f'"{esc(val)}"'
        if isinstance(val, bool):
            return "true" if val else "false"
        if isinstance(val, (int, float)):
            return str(val)
        raise TypeError(type(val))

    return dump(body, indent)


def main() -> None:
    # Keep existing expanded bodies for priority-covered slugs if present,
    # but regenerate all remaining posts uniquely.
    existing_text = OUT.read_text()
    # Extract type preamble
    preamble_match = re.match(
        r"(?s).*?/\*\* Long-form bodies merged onto short posts — keyed by slug\. \*/\n",
        existing_text,
    )
    type_header = '''import type { BlogPostSection } from "@/lib/blog";

export type ExpandedBlogBody = {
  updated: string;
  readingMinutes: number;
  sections: BlogPostSection[];
  cta?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/** Long-form bodies merged onto short posts — keyed by slug.
 *  Handcrafted priority overrides live in blog-expanded-priority.ts.
 */
'''

    # Load priority keys to optionally omit duplicates (keep stubs unused is fine —
    # regenerate ONLY remaining posts, and preserve other keys from old file if needed).
    pri_text = Path("/workspace/src/lib/blog-expanded-priority.ts").read_text()
    pri_keys = set(re.findall(r'^  "([a-z0-9-]+)": \{', pri_text, re.M))

    # Parse old bodies as JSON-ish: easier to keep priority-covered entries from old file
    # by regenerating everything for remaining only and copying priority slugs from old.

    def extract_entry(text: str, key: str) -> str | None:
        token = f'  "{key}": '
        start = text.find(token)
        if start < 0:
            return None
        brace = text.find("{", start)
        depth = 0
        for j in range(brace, len(text)):
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    return text[start : j + 1]
        return None

    entries: list[str] = []

    # Remaining unique bodies
    for post in POSTS:
        body = build_body(post)
        entries.append(f'  "{post["slug"]}": {emit_ts_object(body, 2)}')

    # Preserve priority-covered expanded entries from old file (unused at runtime but
    # keeps file complete if something falls through).
    old_keys = re.findall(r'^  "([a-z0-9-]+)": \{', existing_text, re.M)
    for key in old_keys:
        if key in pri_keys:
            chunk = extract_entry(existing_text, key)
            if chunk:
                entries.append(chunk)

    # Also ensure any priority keys missing from old file are skipped (priority file owns them)

    content = (
        type_header
        + "export const blogExpandedBodies: Record<string, ExpandedBlogBody> = {\n"
        + ",\n".join(entries)
        + "\n};\n"
    )
    OUT.write_text(content)
    print(f"Wrote {len(POSTS)} unique remaining bodies (+ {sum(1 for k in old_keys if k in pri_keys)} priority stubs)")


if __name__ == "__main__":
    main()
