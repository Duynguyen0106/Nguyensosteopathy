import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Austin Duy Nguyen | Vietnamese Osteopath in the UK",
  description:
    "Meet Austin Duy Nguyen — Master of Osteopathy graduate of the British College of Osteopathic Medicine, GOsC-registered, and the only Vietnamese osteopath practising in the UK. His mission: spine and bone health for children in Vietnam, and clear MSK care for the Vietnamese community across Britain.",
  alternates: { canonical: "/about" },
  keywords: [
    "Vietnamese osteopath UK",
    "Austin Duy Nguyen",
    "British College of Osteopathic Medicine",
    "osteopath Woolwich Vietnamese",
    "Nguyen's Osteopathic Clinic story",
    "Vietnamese community osteopathy London",
  ],
  openGraph: {
    title: "About Austin Duy Nguyen | Nguyen's Osteopathic Clinic",
    description:
      "From BCOM Master of Osteopathy to a mission that spans Vietnam’s children and Britain’s Vietnamese community — the story behind the name Nguyen’s.",
    url: "/about",
    images: [
      {
        url: "/images/austin-nguyen.jpg",
        width: 1200,
        height: 1500,
        alt: "Austin Duy Nguyen, GOsC-registered osteopath",
      },
    ],
  },
};

const communityJobs = [
  {
    role: "Nail technicians & beauty therapists",
    body: "Hours bent over a desk, eyes down, wrists and thumbs locked in fine work. The neck, upper back, and hands pay the price — often long before anyone seeks help.",
  },
  {
    role: "Restaurant, takeaway & kitchen teams",
    body: "Long shifts on hard floors, lifting stock, repetitive chopping, heat and hurry. Hips, knees, shoulders, and the lower back carry the shift home.",
  },
  {
    role: "Warehouse, factory & packing work",
    body: "Bending, twisting, and repeating the same lift thousands of times. Small strains become stubborn pain when language and time make early care feel out of reach.",
  },
  {
    role: "Care workers & cleaning roles",
    body: "Awkward postures, heavy assisting, and early starts. The body absorbs what the heart gives — and deserves a clinician who listens without barriers.",
  },
] as const;

export default function AboutPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.practitioner.name,
    jobTitle: site.practitioner.title,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "British College of Osteopathic Medicine",
    },
    worksFor: {
      "@type": "MedicalBusiness",
      name: site.name,
      url: site.websiteUrl,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    telephone: site.phone,
    email: site.email,
    url: `${site.websiteUrl}/about`,
    image: `${site.websiteUrl}/images/austin-nguyen.jpg`,
    description:
      "GOsC-registered osteopath, Master of Osteopathy graduate of the British College of Osteopathic Medicine, and the only Vietnamese osteopath practising in the UK.",
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      {/* Hero — brand + story in one composition */}
      <section className="relative min-h-[88vh] overflow-hidden text-white">
        <Image
          src="/images/austin-nguyen.jpg"
          alt="Austin Duy Nguyen, GOsC-registered osteopath"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy/78 to-navy/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy/30"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <p className="about-rise text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="about-rise about-rise-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            {site.practitioner.name}
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Master of Osteopathy. The only Vietnamese osteopath practising in
            the UK. A name chosen so our community can find care — and feel
            understood.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book with Austin</ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href="/vi"
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Đọc bằng tiếng Việt
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Opening mission */}
      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            The mission behind the name
          </p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
            I did not open a clinic only to treat pain. I opened it so my people
            would not have to face pain alone.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              When Vietnamese families in Britain search for help with a sore
              back, a stiff neck, or hands that ache after another long shift,
              language often stands between them and proper musculoskeletal
              care. Forms feel foreign. Explanations feel rushed. Symptoms get
              minimised — until they cannot be ignored.
            </p>
            <p>
              I named this practice{" "}
              <strong className="font-semibold text-navy">
                Nguyen&apos;s Osteopathic Clinic
              </strong>{" "}
              so that name would be a beacon: familiar, proud, and easy to
              recognise. Nguyen is not just my surname. It is a reminder of who
              I serve — and why I trained so hard to stand here.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Training
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              British College of Osteopathic Medicine
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              I graduated from the{" "}
              <strong className="font-semibold text-navy">
                British College of Osteopathic Medicine (BCOM)
              </strong>{" "}
              in the UK with a{" "}
              <strong className="font-semibold text-navy">
                Master of Osteopathy
              </strong>
              . That education gave me the science, the clinical discipline, and
              the professional standards to practise as a{" "}
              {site.practitioner.title} (Reg. No. {site.practitioner.regNo}).
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              But the degree was never the destination. It was the bridge —
              between what I could learn in Britain and what I owed to the
              communities that shaped me in Vietnam and here in the UK.
            </p>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-4 bg-gradient-to-br from-teal/15 to-navy/10 blur-2xl"
              aria-hidden
            />
            <Image
              src="/images/clinic-promo.jpg"
              alt="Austin Duy Nguyen in clinic"
              width={900}
              height={700}
              className="relative w-full object-cover shadow-[0_24px_60px_rgba(11,44,69,0.12)]"
            />
          </div>
        </div>
      </section>

      {/* Vietnam children */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-navy px-5 py-16 text-white md:px-8 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 10% 20%, rgba(45,212,191,0.22), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(13,148,136,0.12), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-mist uppercase">
            Vietnam · Children first
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Spine and bone health for children who rarely get a second chance
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/88">
            <p>
              Far from Woolwich, I remain deeply committed to{" "}
              <strong className="font-semibold text-white">
                supporting spine and bone health in children in Vietnam
              </strong>
              . Strong bones and healthy growth are not luxuries — they are the
              foundation of a child&apos;s future strength, confidence, and
              independence.
            </p>
            <p>
              Through volunteer work, I help Vietnamese children facing{" "}
              <strong className="font-semibold text-white">malnutrition</strong>{" "}
              — and work to prevent it before damage takes hold. Nutrition,
              movement, and early musculoskeletal awareness belong together.
              When a child is underfed, their skeleton and posture tell that
              story. I want that story to change.
            </p>
            <p>
              Every clinic day in Britain, I carry that same urgency: protect
              the body early, listen carefully, and never treat a person as a
              number on a waiting list.
            </p>
          </div>
        </div>
      </section>

      {/* Only Vietnamese osteopath + community */}
      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            For our community in Britain
          </p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
            The only Vietnamese osteopath practising in the UK — so you can be
            heard in your own language of life
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              I am proud to be{" "}
              <strong className="font-semibold text-navy">
                the only Vietnamese osteopath practising in the United Kingdom
              </strong>
              . That is not a trophy. It is a responsibility.
            </p>
            <p>
              Across nail salons, kitchens, warehouses, care homes, and shops,
              Vietnamese people build Britain with their hands — often quietly,
              often through pain they postpone. When English is a second
              language, explaining night pain, numbness, or fear of losing work
              can feel impossible. Too many settle for painkillers, silence, or
              giving up the activities that feed their family.
            </p>
            <p>
              At Nguyen&apos;s, you do not have to translate your whole life
              before someone understands your body. You can speak plainly. You
              can ask the questions you have been holding. You can receive
              drug-free, registered osteopathic care designed around how you
              actually work and live.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs & body */}
      <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Work that builds Britain — and loads the body
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              The jobs our community does — and what they ask of the spine,
              hands, and joints
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              These roles deserve respect — and clinicians who recognise the
              patterns they create. If this is your work, your pain is not
              “just tiredness”. It is a signal worth assessing properly.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {communityJobs.map((job, index) => (
              <li
                key={job.role}
                className="border-t border-navy/15 pt-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="font-display text-2xl text-navy">{job.role}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {job.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Nguyen's */}
      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Why “Nguyen&apos;s”
          </p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
            A name you can recognise. A mission I will not forget.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            I chose{" "}
            <strong className="font-semibold text-navy">
              Nguyen&apos;s Osteopathic Clinic
            </strong>{" "}
            so Vietnamese patients searching for help would see a familiar name
            and know: this place was built with you in mind. It reminds me —
            every morning I unlock the door in Woolwich — that my education in
            Britain, my volunteer heart in Vietnam, and my duty to our UK
            community are one continuous path.
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-display text-2xl leading-snug text-navy md:text-3xl">
            Recover. Realign. Restore your vitality — in a clinic that knows
            your name, your work, and your language of care.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy-deep via-navy to-[#0a3a4a] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">
            Walk in as a patient. Leave knowing you were understood.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Inside {site.address.venue}, {site.address.line1}, Woolwich. Book
            online or call — no GP referral needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Call {site.phone}
            </ButtonLink>
            <Link
              href="/services"
              className="inline-flex items-center px-4 text-sm font-semibold text-teal-mist hover:text-white"
            >
              View services →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
