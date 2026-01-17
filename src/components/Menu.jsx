import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import menuItems from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // 1. Initial Fade In (Title)
      gsap.fromTo(
        ".menu-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%", // Starts animation when section is 70% in view
          },
        }
      );

      // 2. Infinite Marquee Animation
      // We animate xPercent to -50 because we duplicated the items list
      const marquee = gsap.to(track, {
        xPercent: -50, 
        repeat: -1,
        duration: 30, // Adjust speed (Higher = Slower)
        ease: "none",
      });

      // 3. Interactive Pause (User Friendly)
      // Pauses the menu when user hovers so they can read
      track.addEventListener("mouseenter", () => marquee.pause());
      track.addEventListener("mouseleave", () => marquee.play());

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
      <div className="menu-header container mx-auto px-6 mb-16 text-center">
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

      {/* MARQUEE CONTAINER */}
      <div className="w-full">
        <div 
          ref={trackRef} 
          className="flex gap-8 w-fit px-4 cursor-grab active:cursor-grabbing"
        >
          {/* We duplicate the menu items 2 times to create a seamless infinite loop */}
          {[...menuItems, ...menuItems].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group bg-white rounded-[20px] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col w-[320px] md:w-[380px] flex-shrink-0"
            >
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name[i18n.language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Price Tag Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#C0392B] font-bold shadow-sm">
                  {item.price || "₹20"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col text-center">
                <h3 className="font-heading text-2xl text-gray-800 mb-2 group-hover:text-[#C0392B] transition-colors">
                  {item.name[i18n.language]}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {item.description[i18n.language]}
                </p>
                
                {/* Order Button (Optional visual cue) */}
                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                   <span className="text-xs font-bold text-[#FF8C00] uppercase tracking-wider">
                     View Details
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-12 text-gray-400 text-xs font-heading tracking-widest uppercase opacity-60">
        Hover to Pause
      </div>

    </section>
  );
};

export default Menu;