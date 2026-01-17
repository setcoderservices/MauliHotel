import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Phone, 
  Clock, 
  MapPin, 
  Instagram, 
  ArrowUpRight, 
  MessageCircle,
  Code,
  Navigation 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState("amalner");
  const [isOpen, setIsOpen] = useState(false);

  // 📍 BRANCH DATA (With REAL Google Maps Links)
  const BRANCHES = {
    amalner: {
      name: t("contact.branches.amalner.name", "Amalner Branch"),
      address: t("contact.branches.amalner.address", "Hotel Mauli, Galwade Road, Shirpur Highway, Amalner, Jalgaon"),
      // ✅ FIXED: Real Google Maps Embed
      mapSrc: "https://maps.google.com/maps?q=Hotel+Mauli,+Galwade+Road,+Amalner&t=&z=15&ie=UTF8&iwloc=&output=embed",
      // ✅ FIXED: Real 'Get Directions' Link
      directionLink: "https://www.google.com/maps/dir//Hotel+Mauli,+Galwade+Road,+Amalner"
    },
    shirpur: {
      name: t("contact.branches.shirpur.name", "Shirpur Branch"),
      address: t("contact.branches.shirpur.address", "Karvand Naka, Kusum Plaza, Near Pharmacy College, Shirpur"),
      // ✅ FIXED: Real Google Maps Embed
      mapSrc: "https://maps.google.com/maps?q=Karvand+Naka,+Kusum+Plaza,+Shirpur&t=&z=15&ie=UTF8&iwloc=&output=embed",
      // ✅ FIXED: Real 'Get Directions' Link
      directionLink: "https://www.google.com/maps/dir//Karvand+Naka,+Kusum+Plaza,+Shirpur"
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    setIsOpen(hour >= 6 && hour < 23);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bento-item",
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".bento-grid", start: "top 85%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-[#F9F6F1] text-[#2b2b2b] py-16 px-4 md:px-8 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FF8C00] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="contact-title text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-[#C0392B] mb-3">
            {t("contact.title", "Visit Hotel Mauli")}
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
            {t("contact.subtitle", "Authentic Kunda Chaha Experience")}
          </p>
        </div>

        {/* 🍱 THE BENTO GRID */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          {/* 1. MAP CARD */}
          <div className="bento-item md:col-span-2 bg-white rounded-[24px] p-1.5 h-[320px] relative overflow-hidden group shadow-lg border border-gray-100 flex flex-col">
             
             {/* 🔘 TAB SWITCHER */}
             <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-md border border-gray-200 flex gap-1">
                <button 
                  onClick={() => setActiveBranch('amalner')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeBranch === 'amalner' ? 'bg-[#C0392B] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {t("contact.tabs.amalner", "Amalner")}
                </button>
                <button 
                  onClick={() => setActiveBranch('shirpur')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeBranch === 'shirpur' ? 'bg-[#C0392B] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {t("contact.tabs.shirpur", "Shirpur")}
                </button>
             </div>

             {/* ↗️ GET DIRECTIONS BUTTON */}
             <a 
               href={BRANCHES[activeBranch].directionLink}
               target="_blank"
               rel="noopener noreferrer"
               className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-gray-200 flex items-center gap-2 hover:bg-[#C0392B] hover:text-white transition-colors group/btn"
             >
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("contact.getDirections", "Get Directions")}
                </span>
                <Navigation size={12} className="group-hover/btn:rotate-45 transition-transform" />
             </a>

             {/* 🗺️ MAP IFRAME */}
             <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-gray-100">
               <iframe 
                 key={activeBranch}
                 src={BRANCHES[activeBranch].mapSrc}
                 width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                 className="w-full h-full opacity-0 animate-fade-in" 
                 onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
               ></iframe>
             </div>
             
             {/* 📍 ADDRESS LABEL */}
             <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-md border border-gray-200 transition-all duration-500 max-w-[90%] pointer-events-none">
                <div className="flex items-center gap-2 text-[#C0392B] mb-1">
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{BRANCHES[activeBranch].name}</span>
                </div>
                <p className="text-xs font-bold text-gray-800 leading-tight">{BRANCHES[activeBranch].address}</p>
             </div>
          </div>

          {/* 2. TIMINGS CARD */}
          <div className="bento-item bg-white rounded-[24px] p-6 flex flex-col justify-between group shadow-lg border border-gray-100 hover:border-[#C0392B]/20 transition-colors duration-300 h-[320px]">
            <div>
              <div className="w-12 h-12 bg-[#F9F6F1] rounded-full flex items-center justify-center mb-4 text-[#C0392B] group-hover:scale-110 transition-transform shadow-inner">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-serif mb-1 text-gray-900">
                {t("contact.openingHours", "Opening Hours")}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {t("contact.everyDay", "Every single day.")}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-600">
                  {t("contact.days", "Mon - Sun")}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {t("contact.time", "6 AM - 11 PM")}
                </span>
              </div>
              <div className={`mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></span>
                {isOpen 
                  ? t("contact.openStatus", "We are Open Now") 
                  : t("contact.closedStatus", "Currently Closed")}
              </div>
            </div>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="bento-item bg-[#C0392B] rounded-[24px] p-6 flex flex-col justify-between text-white relative overflow-hidden group shadow-xl shadow-red-900/20 h-[220px]">
            <div className="absolute -bottom-6 -right-6 text-white opacity-10 transform group-hover:scale-110 transition-transform duration-700">
              <Phone size={120} />
            </div>
            <div>
              <h3 className="text-xl font-serif mb-3">{t("contact.contactUs", "Contact Us")}</h3>
              <p className="text-white/80 text-sm mb-0.5 font-medium">{t("contact.phone", "Phone")}</p>
              <a href="tel:+919999999999" className="text-2xl font-bold hover:underline decoration-white/30 decoration-2 underline-offset-4">
                +91 99999 99999
              </a>
            </div>
            <a href="mailto:hello@hotelmauli.com" className="inline-flex items-center gap-2 text-white/90 hover:text-white group relative z-10 text-sm">
              <span className="font-semibold">{t("contact.email", "Email us directly")}</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* 4. WHATSAPP BUTTON */}
          <a href="https://wa.me/919999999999" target="_blank" className="bento-item md:col-span-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-[24px] p-4 flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] group cursor-pointer shadow-lg shadow-green-500/20 h-[220px] md:h-auto">
             <MessageCircle size={28} className="text-white fill-white/20" />
             <span className="text-xl font-bold tracking-tight">{t("contact.whatsapp", "Chat on WhatsApp")}</span>
             <ArrowUpRight size={24} className="bg-white text-[#25D366] rounded-full p-1 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-medium">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© {new Date().getFullYear()} {t("contact.footerName", "Hotel Mauli")}.</p>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-[#C0392B] hover:text-[#C0392B] transition-all shadow-sm">
              <Code size={12} className="text-gray-400 group-hover:text-[#C0392B] transition-colors" />
              <span>{t("contact.developer", "Contact Web Developer")}</span>
            </a>
          </div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/hotel_mauli_amalner?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-[#C0392B] transition-colors flex items-center gap-1.5">
              <Instagram size={14} /> Instagram
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
