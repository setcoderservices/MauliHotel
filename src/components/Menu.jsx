import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import menuItems from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Animate Header Fade In
      gsap.fromTo(
        ".menu-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // 2. Animate Cards Stagger In
      gsap.fromTo(
        ".menu-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, 
          scrollTrigger: {
            trigger: ".menu-scroll-container",
            start: "top 80%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="menu" 
      className="bg-[#FBF7F2] py-20 overflow-hidden relative"
    >
      
      {/* HEADER */}
      <div className="menu-header container mx-auto px-6 mb-12 text-center">
        <h2 className="text-5xl md:text-6xl font-heading text-[#C0392B] mb-4">
          {t("menuTitle") || "Our Menu"}
        </h2>
        <p className="text-xl text-gray-600 font-heading text-[#FF8C00]">
          {t("menuSubtitle") || "Authentic tastes, brewed with love."}
        </p>
        
        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-6 opacity-60">
          <div className="h-[1px] w-16 bg-[#C0392B]"></div>
          <svg className="w-6 h-6 text-[#C0392B]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C12,2 4,8 4,14C4,18.42 7.58,22 12,22C16.42,22 20,18.42 20,14C20,8 12,2 12,2M12,20C8.69,20 6,17.31 6,14C6,10 10,5.5 12,3.5C14,5.5 18,10 18,14C18,17.31 15.31,20 12,20Z" />
          </svg>
          <div className="h-[1px] w-16 bg-[#C0392B]"></div>
        </div>
      </div>

      {/* MANUAL SCROLL CONTAINER */}
      <div className="menu-scroll-container w-full overflow-x-auto pb-12 px-6 md:px-12 hide-scrollbar">
        <div className="flex gap-8 w-max">
          
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="menu-card snap-center group bg-white rounded-[20px] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col w-[300px] md:w-[380px] flex-shrink-0"
            >
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name[i18n.language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Overlay on Hover (Optional aesthetic) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* 🟢 REMOVED: Price Tag Badge */}
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col text-center justify-center">
                <h3 className="font-heading text-2xl text-gray-800 mb-3 group-hover:text-[#C0392B] transition-colors">
                  {item.name[i18n.language]}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {item.description[i18n.language]}
                </p>
                
                {/* 🟢 REMOVED: View Details Button */}
              </div>
            </div>
          ))}

          {/* Spacer */}
          <div className="w-6 md:w-12 flex-shrink-0"></div>
        </div>
      </div>

      {/* Manual Scroll Hint */}
      <div className="text-center text-gray-400 text-xs font-heading tracking-widest uppercase opacity-60">
        Swipe or Scroll to Explore &rarr;
      </div>

      {/* Hide Scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
};

export default Menu;
