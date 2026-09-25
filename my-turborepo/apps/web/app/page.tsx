import { About } from "@repo/ui/about";
import { AuthControls } from "@repo/ui/auth-controls";
import { Contact } from "@repo/ui/contact";
import { Footer } from "@repo/ui/footer";
import { Gallery, type Photo } from "@repo/ui/gallery";
import { Hero } from "@repo/ui/hero";
import { Navbar } from "@repo/ui/navbar";
import { Services, type Service } from "@repo/ui/services";
import { Testimonial } from "@repo/ui/testimonial";
import { auth } from "../auth";
import { signInAction, signOutAction, signUpAction } from "./actions";

const photos: Photo[] = [
  { title: "Golden Hour", size: "tall", background: "linear-gradient(160deg,#c98b3c,#3a2414)" },
  { title: "Wedding, Tuscany", size: "wide", background: "linear-gradient(120deg,#e4d4c0,#6d5a48)" },
  { title: "Urban Nights", background: "linear-gradient(160deg,#243b55,#0d1420)" },
  { title: "Portraits", background: "linear-gradient(160deg,#8a5a5a,#2a1a1e)" },
  { title: "Wild Coast", size: "tall", background: "linear-gradient(160deg,#2f6f73,#0f2427)" },
  { title: "Editorial", size: "wide", background: "linear-gradient(120deg,#5b4b8a,#1a1530)" },
  { title: "Quiet Mornings", background: "linear-gradient(160deg,#9aa7a0,#2b3330)" },
];

const services: Service[] = [
  { name: "Weddings", description: "Full-day coverage, told as a story: from the first look to the last dance.", price: "From $2,400" },
  { name: "Portraits", description: "Relaxed, natural sessions for individuals, couples and families.", price: "From $350" },
  { name: "Commercial", description: "Brand, product and editorial imagery that gives your work a voice.", price: "Custom quote" },
];

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar
        brand="Aria Vance"
        links={[
          { label: "Work", href: "#work" },
          { label: "Services", href: "#services" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        actions={
          <AuthControls
            userName={session?.user?.name ?? null}
            signUpAction={signUpAction}
            signInAction={signInAction}
            signOutAction={signOutAction}
          />
        }
      />
      <main id="top">
        <Hero
          eyebrow="Photographer · Weddings · Portraits"
          title="Moments worth"
          highlight="keeping"
          subtitle="Honest, cinematic photography that captures how it felt, not just how it looked."
          primaryCta={{ label: "Book a session", href: "#contact" }}
          secondaryCta={{ label: "View portfolio", href: "#work" }}
        />
        <Gallery
          id="work"
          eyebrow="Selected work"
          title="A look through the lens"
          photos={photos}
        />
        <Services
          id="services"
          eyebrow="Services"
          title="How we can work together"
          services={services}
        />
        <About
          id="about"
          eyebrow="About"
          title="Hi, I'm Aria."
          paragraphs={[
            "I'm a photographer based in Portland, chasing soft light and unscripted moments. For over a decade I've photographed weddings, people and brands across the world.",
            "My approach is simple: make you comfortable, stay out of the way, and let the real moments happen.",
          ]}
          stats={[
            { value: "10+", label: "Years" },
            { value: "350", label: "Weddings" },
            { value: "40", label: "Countries" },
          ]}
        />
        <Testimonial
          quote="Aria made us forget the camera was even there. Our photos feel like our wedding day felt."
          author="Maya & Daniel, married in Tuscany"
        />
        <Contact
          id="contact"
          eyebrow="Contact"
          title="Let's create something beautiful"
          subtitle="Tell me about your day, shoot or project and I'll reply within 24 hours."
          action="mailto:hello@example.com"
          projectTypes={["Wedding", "Portrait", "Commercial", "Other"]}
        />
      </main>
      <Footer
        left={`© ${new Date().getFullYear()} Aria Vance Photography`}
        right="Instagram · Pinterest · hello@example.com"
      />
    </>
  );
}
