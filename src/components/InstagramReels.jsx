import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  { type: "iframe", src: "https://player.cloudinary.com/embed/?cloud_name=do0rlgy7c&public_id=reel2_oi4wei" },
  { type: "video", src: "https://res.cloudinary.com/do0rlgy7c/video/upload/v1768583313/reel1_am9uo7.mp4" },
  { type: "iframe", src: "https://player.cloudinary.com/embed/?cloud_name=do0rlgy7c&public_id=reel4_nvplnc" },
  { type: "iframe", src: "https://player.cloudinary.com/embed/?cloud_name=do0rlgy7c&public_id=reel5_sgryyr" },
  { type: "iframe", src: "https://player.cloudinary.com/embed/?cloud_name=do0rlgy7c&public_id=reel3_fxwlaz" },
  { type: "iframe", src: "https://player.cloudinary.com/embed/?cloud_name=do0rlgy7c&public_id=reel7_rrzebm" },
];

export default function InstagramReels() {
  const containerRef = useRef(null);

  // Optional: Simple Fade-In Entry Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reel-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".reels-scroll-container",
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 bg-[#F9F6F1] overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#2b2b2b]">
          From Our Kitchen
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          @HotelMauli • Live Updates
        </p>
      </div>

      {/* MANUAL SCROLL CONTAINER */}
      {/* overflow-x-auto enables manual scrolling */}
      <div className="reels-scroll-container w-full overflow-x-auto pb-12 px-6 md:px-12 hide-scrollbar">
        <div className="flex gap-8 w-max">
          
          {/* Loop through single list (No Duplication) */}
          {reels.map((item, i) => (
            <div
              key={i}
              className="reel-card snap-center relative flex-shrink-0
                         w-[240px] h-[420px]
                         md:w-[300px] md:h-[520px]
                         rounded-[24px] overflow-hidden
                         shadow-xl bg-black border-[4px] border-white group transition-transform duration-300 hover:scale-[1.02]"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted 
                  loop 
                  playsInline 
                  autoPlay
                  controls // Allows manual control
                />
              ) : (
                <iframe
                  src={item.src}
                  className="w-full h-full" 
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  loading="lazy"
                />
              )}
              
              {/* Subtle Gradient at bottom (doesn't block clicks) */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Spacer to allow scrolling past the last item */}
          <div className="w-6 md:w-12 flex-shrink-0"></div>
        </div>
      </div>

      {/* Manual Scroll Hint */}
      <div className="text-center text-gray-400 text-xs font-heading tracking-widest uppercase opacity-60">
        Swipe or Scroll to Watch &rarr;
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
}
