import React, { useEffect, useRef } from "react";
import gsap from "gsap";

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
  const trackRef = useRef(null);
  const videoRefs = useRef([]);

  // Setup Auto-Scroll Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      
      // Calculate total width to scroll (half the duplicated content)
      // We animate xPercent to -50% because we duplicated the items
      const animation = gsap.to(track, {
        xPercent: -50, 
        repeat: -1,
        duration: 40, // Adjust speed (higher = slower)
        ease: "none",
      });

      // Pause animation on hover
      track.addEventListener("mouseenter", () => animation.pause());
      track.addEventListener("mouseleave", () => animation.play());

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

      {/* MARQUEE TRACK */}
      <div className="w-full overflow-hidden">
        {/* We duplicate the map 2 times to create an infinite loop effect */}
        <div ref={trackRef} className="flex gap-8 w-fit px-4 cursor-grab active:cursor-grabbing">
          {[...reels, ...reels].map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0
                         w-[240px] h-[420px]
                         md:w-[300px] md:h-[520px]
                         rounded-[24px] overflow-hidden
                         shadow-xl bg-black border-[4px] border-white"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted loop playsInline autoPlay
                />
              ) : (
                <iframe
                  src={item.src}
                  className="w-full h-full pointer-events-none" // pointer-events-none ensures scroll isn't blocked by iframe
                  allow="autoplay; fullscreen"
                  loading="lazy"
                />
              )}
              {/* Dark Gradient Overlay for style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}