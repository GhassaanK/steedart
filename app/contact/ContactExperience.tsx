import { ContactDetails } from "../PublicSettings";
import { ContactForm } from "./ContactForm";
import Image from "next/image";
import { profileImages } from "../profile-data";
import { Reveal } from "../Reveal";

export function ContactExperience() {
  return (
    <>
      <section className="studio-wrap interior-heading contact-heading"><Reveal><p className="eyebrow">Start a conversation</p><h1 className="interior-title">Your space.<br /><em>Our next conversation.</em></h1></Reveal><Reveal delay={100}><p>Tell us about your property, the work you have in mind and what you want the space to become.</p></Reveal></section>
      <section className="studio-wrap contact-layout">
        <div className="contact-information">
          <div className="contact-photo"><Image src={profileImages.living} alt="Steed Art residential living and dining interior" fill sizes="(max-width: 700px) 100vw, 40vw" /></div>
          <div>
            <p className="eyebrow">Based in Karachi</p>
            <h2>Let&apos;s bring it together.</h2>
            <ContactDetails />
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
