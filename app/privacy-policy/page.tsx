import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Database, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { site } from "@/site";
import { PageShell } from "../components";
import { JsonLd } from "../JsonLd";
import { getPublicSettings } from "../lib/server-cms";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Steed Art collects, uses, stores, and protects information submitted through steedart.pk and project enquiries.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Steed Art",
    description:
      "How Steed Art handles website, enquiry, communication, and project information.",
    url: "/privacy-policy",
    images: [{ url: "/images/hero-kitchen.png", width: 1792, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Steed Art",
    description:
      "How Steed Art handles website, enquiry, communication, and project information.",
    images: ["/images/hero-kitchen.png"],
  },
};

const contents = [
  ["overview", "Overview"],
  ["information", "Information we collect"],
  ["use", "How we use it"],
  ["sharing", "When information is shared"],
  ["services", "Technology services"],
  ["choices", "Your choices"],
  ["contact", "Contact us"],
];

export default async function PrivacyPolicyPage() {
  const settings = await getPublicSettings();

  return (
    <PageShell>
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${site.url}/privacy-policy#page`,
            url: `${site.url}/privacy-policy`,
            name: "Steed Art Privacy Policy",
            description: metadata.description,
            isPartOf: { "@id": `${site.url}/#website` },
            about: { "@id": `${site.url}/#business` },
            inLanguage: "en-PK",
          }}
        />

        <section className="mx-auto max-w-[1360px] px-5 pt-6 sm:px-8">
          <div className="grid min-h-[560px] overflow-hidden rounded-[22px] bg-black text-white lg:grid-cols-[1.16fr_0.84fr]">
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-black">
                  <ShieldCheck size={15} /> Privacy at Steed Art
                </p>
                <h1 className="mt-8 max-w-4xl text-[2.75rem] font-extrabold leading-[0.94] tracking-normal sm:text-8xl lg:text-[104px]">
                  Your space. Your information.
                </h1>
              </div>
              <p className="mt-10 max-w-xl text-base font-medium leading-8 text-white/68">
                When you tell us about your home, budget, or design plans, you
                are trusting us with more than a form submission. This policy
                explains what we collect, why we need it, and the choices you
                have.
              </p>
            </div>

            <div className="grid content-end gap-3 bg-[#f4f0ea] p-5 text-black sm:p-8 lg:p-10">
              <PrivacyPrinciple icon={<EyeOff size={20} />} title="No sale of personal information" copy="We do not sell or rent your personal information to advertisers or data brokers." />
              <PrivacyPrinciple icon={<Database size={20} />} title="Purpose-led collection" copy="We ask for information that helps us understand, estimate, and respond to your project." />
              <PrivacyPrinciple icon={<LockKeyhole size={20} />} title="Controlled access" copy="Project and enquiry information is limited to people and providers who need it for legitimate work." />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[280px_1fr] lg:py-24">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">
              In this policy
            </p>
            <nav className="mt-6 grid gap-2" aria-label="Privacy policy sections">
              {contents.map(([href, label], index) => (
                <a key={href} href={`#${href}`} className="group flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-bold text-neutral-600 transition hover:bg-[#f4f0ea] hover:text-black">
                  <span className="text-xs text-neutral-350 group-hover:text-[#76563f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
            <p className="mt-8 text-xs font-semibold leading-6 text-neutral-500">
              Last reviewed 2 August 2026
            </p>
          </aside>

          <article className="min-w-0">
            <PolicySection id="overview" number="01" title="Who this policy covers">
              <p>
                This Privacy Policy applies to steedart.pk and to information
                you give Steed Art when asking about kitchen renovation,
                cabinetry, furniture, shelving, or interior design services.
                It also covers related communication through email, telephone,
                WhatsApp, Facebook, and Instagram when that communication is
                connected to an enquiry or project.
              </p>
              <p>
                Steed Art is a Karachi-based interior design studio. In this
                policy, “Steed Art”, “we”, “us”, and “our” refer to the studio
                operating from {settings.address}.
              </p>
            </PolicySection>

            <PolicySection id="information" number="02" title="Information we collect">
              <h3>Information you choose to provide</h3>
              <ul>
                <li>Your name, phone number, email address, and preferred contact method.</li>
                <li>Your approximate project budget, project notes, measurements, and calculator estimate.</li>
                <li>Photographs, plans, room dimensions, location details, material preferences, and other information you share during consultation or project planning.</li>
                <li>Messages and correspondence sent through email, WhatsApp, telephone, Facebook, or Instagram.</li>
              </ul>
              <h3>Information created through our work</h3>
              <p>
                If you proceed with a project, we may create consultation
                notes, scope records, selections, drawings, estimates,
                approvals, invoices, and communication records needed to plan
                and deliver the work.
              </p>
              <h3>Technical information</h3>
              <p>
                Our hosting and technology providers may receive standard
                technical data such as IP address, browser and device type,
                requested pages, timestamps, and security logs. We do not
                currently use advertising trackers or behavioural advertising
                cookies on this website.
              </p>
            </PolicySection>

            <PolicySection id="use" number="03" title="How we use information">
              <ul>
                <li>To receive, review, calculate, and respond to project enquiries.</li>
                <li>To understand your space, requirements, budget, and design preferences.</li>
                <li>To prepare consultations, estimates, scopes, design work, and project documentation.</li>
                <li>To communicate about decisions, materials, appointments, approvals, payments, and service matters.</li>
                <li>To operate, secure, troubleshoot, and improve the website and our internal systems.</li>
                <li>To maintain business, accounting, dispute, and legal records where reasonably necessary.</li>
                <li>To publish project imagery or a testimonial only where we have an appropriate basis and permission to do so.</li>
              </ul>
              <p>
                We do not use enquiry information to build advertising
                profiles, and submitting a project enquiry does not subscribe
                you to an unrelated marketing list.
              </p>
            </PolicySection>

            <PolicySection id="sharing" number="04" title="When information is shared">
              <p>
                We keep sharing limited to what is reasonably necessary. Your
                information may be available to Steed Art team members,
                contractors, installers, suppliers, professional advisers, or
                technology providers where they need it to evaluate or carry
                out the requested work.
              </p>
              <p>
                We may also disclose information where required by applicable
                law, a lawful authority, or to protect people, property, our
                services, or our legal rights. If the business is reorganised,
                relevant records may transfer as part of that change subject to
                appropriate confidentiality and legal safeguards.
              </p>
              <div className="mt-8 rounded-[14px] bg-black p-6 text-white sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">Our position</p>
                <p className="mt-4 text-2xl font-extrabold leading-tight">
                  We do not sell or rent your personal information.
                </p>
              </div>
            </PolicySection>

            <PolicySection id="services" number="05" title="The technology behind the site">
              <ServiceRow title="Firebase and Google" href="https://firebase.google.com/support/privacy/">
                Enquiries and website content are handled through Firebase
                Realtime Database. Firebase may process technical service data,
                including IP addresses and user-agent information, and provides
                encryption in transit and at rest for Realtime Database.
              </ServiceRow>
              <ServiceRow title="Cloudinary" href="https://cloudinary.com/privacy">
                Cloudinary hosts and delivers portfolio and gallery media. It
                is used for studio-managed visual assets, not as the destination
                for enquiry-form fields. Project imagery selected for public
                display is uploaded only where its use is appropriate.
              </ServiceRow>
              <ServiceRow title="YouTube" href="https://policies.google.com/privacy">
                The cost calculator includes an optional measurement video from
                YouTube using its privacy-enhanced domain. The video frame is
                loaded only after you choose to open it. Google may then receive
                technical information about that interaction.
              </ServiceRow>
              <ServiceRow title="WhatsApp and social platforms">
                If you choose a WhatsApp, Facebook, or Instagram link, the
                destination service handles your activity under its own terms
                and privacy policy. Information you send there is also subject
                to that provider&apos;s practices.
              </ServiceRow>
              <p>
                Some providers process or store information outside Pakistan.
                Their locations, safeguards, and processing practices are
                governed by their respective service terms and privacy
                documentation.
              </p>
            </PolicySection>

            <PolicySection id="choices" number="06" title="Your choices and requests">
              <p>
                You may contact us to ask what personal information we hold
                about you, request a correction, ask for deletion where
                appropriate, withdraw a permission you previously gave, or
                raise a concern about how information has been handled. We may
                need to verify your identity before acting on a request.
              </p>
              <p>
                We retain information only while it remains reasonably needed
                for the enquiry, project, business records, legal obligations,
                security, or dispute handling. When identifiable information is
                no longer needed, we may delete or anonymise it, subject to
                legitimate record-keeping requirements.
              </p>
              <p>
                This website and Steed Art&apos;s services are intended for adults
                arranging work for a home or property. We do not knowingly seek
                project enquiries from children.
              </p>
              <p>
                We may revise this policy when the website, our services, or
                applicable requirements change. The current version will remain
                available on this page with its review date.
              </p>
            </PolicySection>

            <section id="contact" className="scroll-mt-10 rounded-[18px] bg-[#f4f0ea] p-6 sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">Privacy contact</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
                A question about your information should be easy to ask.
              </h2>
              <div className="mt-8 grid gap-5 text-sm font-semibold leading-7 text-neutral-600 sm:grid-cols-2">
                <div>
                  <p className="font-extrabold text-black">Steed Art</p>
                  <p>{settings.address}</p>
                  <p>{settings.phone}</p>
                </div>
                <div>
                  <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 font-extrabold text-black transition hover:text-[#76563f]">
                    <Mail size={17} /> {settings.email}
                  </a>
                  <p className="mt-2">Use “Privacy request” as the email subject so we can identify it correctly.</p>
                </div>
              </div>
              <Link href="/contact" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-extrabold text-white transition hover:bg-[#6d4b34]">
                Contact Steed Art <ArrowUpRight size={16} />
              </Link>
            </section>
          </article>
        </section>
      </main>
    </PageShell>
  );
}

function PrivacyPrinciple({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-[12px] bg-white p-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white">{icon}</span>
      <h2 className="mt-5 text-xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">{copy}</p>
    </div>
  );
}

function PolicySection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-10 pb-16 lg:pb-20">
      <div className="grid gap-5 sm:grid-cols-[56px_1fr]">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-xs font-extrabold text-white">{number}</span>
        <div className="policy-copy min-w-0">
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
          <div className="mt-7 grid gap-5 text-[15px] font-medium leading-8 text-neutral-600">{children}</div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] bg-[#f4f0ea] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold text-black">{title}</h3>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-extrabold text-[#76563f] hover:text-black">
            Provider policy <ArrowUpRight size={14} />
          </a>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-medium leading-7 text-neutral-600">{children}</p>
    </div>
  );
}
