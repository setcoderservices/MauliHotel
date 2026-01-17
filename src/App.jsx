import { useEffect } from "react";

/* =========================
   🌍 GLOBAL / SYSTEM
========================= */
import "./i18n/i18n";
import Navbar from "./components/Navbar";
import WhatsAppFloat from "./components/WhatsAppFloat";

/* =========================
   🦸 HERO SECTIONS
========================= */
import Hero from "./components/Hero";
import HeroChai from "./components/HeroChai";

/* =========================
   🧠 BRAND & STORY
========================= */

import AuthenticTaste from "./components/AuthenticTaste";

/* =========================
   🍽️ FOOD & MENU
========================= */
import Menu from "./components/Menu";

/* =========================
   📸 SOCIAL PROOF
========================= */
import InstagramReels from "./components/InstagramReels";
import Testimonials from "./components/Testimonials";

/* =========================
   📍 CONTACT & LOCATION
========================= */
import ContactSection from "./components/ContactSection";

function App() {
  // 🔒 Critical for GSAP pinned sections
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-body text-textDark bg-background overflow-x-hidden">
      
      {/* NAVIGATION */}
      <Navbar />

      {/* HERO — INTRO */}
      <Hero />

      {/* HERO — CINEMATIC CHAI EXPERIENCE */}
      <HeroChai />

      {/* ABOUT / BRAND STORY */}


      {/* AUTHENTIC TASTE SECTION */}
      <AuthenticTaste />

      {/* MENU — SIMPLE CARDS */}
      <Menu />

      {/* INSTAGRAM REELS (HORIZONTAL SCROLL) */}
      <InstagramReels />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT + MAP */}
      <ContactSection />

      {/* FLOATING CTA */}
      <WhatsAppFloat />

    </div>
  );
}

export default App;
