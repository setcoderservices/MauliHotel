import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 320;
const IMAGES_PATH = "/frames/chai/frame_";

export default function HeroChai() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [percentLoaded, setPercentLoaded] = useState(0);

  // 1️⃣ PRELOADER
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];
    const onFinishLoading = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
      setPercentLoaded(percent);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${IMAGES_PATH}${String(i).padStart(4, "0")}.jpg`;
      img.onload = onFinishLoading;
      img.onerror = onFinishLoading;
      imgs.push(img);
    }
    setImages(imgs);
  }, []);

  // 2️⃣ ANIMATION LOGIC
  useEffect(() => {
    if (percentLoaded < 100 || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (images[0]?.width) {
      canvas.width = images[0].width;
      canvas.height = images[0].height;
    }

    const render = (index) => {
      if (images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[index], 0, 0);
      }
    };

    render(0);

    const ctxGsap = gsap.context(() => {
      // Initial States
      gsap.set(".text-layer-1", { opacity: 0, y: 30 });
      gsap.set(".text-layer-2", { opacity: 0, x: 30 });
      gsap.set(".text-layer-3", { opacity: 0, y: 30 });

      const frame = { current: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // 1 Scroll to finish
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
        },
      });

      // Video Scrubber
      tl.to(frame, {
        current: FRAME_COUNT - 1,
        snap: "current",
        ease: "none",
        duration: 5,
        onUpdate: () => render(frame.current),
      }, 0);

      // Text Animations
      tl.to(".text-layer-1", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 0.5);
      tl.to(".text-layer-2", { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 1.5);
      tl.to(".text-layer-3", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 2.5);

    }, sectionRef);

    return () => ctxGsap.revert();
  }, [percentLoaded, images]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-white w-full overflow-hidden">
      
      {/* LOADER */}
      {percentLoaded < 100 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center w-64">
            <h2 className="text-2xl font-serif text-[#C0392B] mb-2 font-bold">Brewing...</h2>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF8C00] transition-all duration-100 ease-out" 
                style={{ width: `${percentLoaded}%` }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 🟢 CANVAS (Bottom Layer - z-0) */}
      {/* Sent to back so text appears in front */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="h-[85vh] md:h-[90vh] w-auto max-w-none object-contain"
        />
      </div>

      {/* 🔴 TEXT LAYERS (Top Layer - z-20) */}
      {/* Brought to front */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
        
        {/* TOP RIGHT TITLE */}
        <div className="text-layer-1 absolute top-[12%] md:top-[18%] right-[5%] md:right-[8%] text-right max-w-[90%] md:max-w-3xl">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-[#C0392B] leading-[1.1] opacity-90 drop-shadow-sm">
            {t("chaiHero.line1", "The Art of Chai")}
          </h1>
          <p className="text-[#FF8C00] text-xl md:text-3xl font-serif font-bold italic mt-2 md:mt-4 drop-shadow-sm">
             #MauliAmruttulya
          </p>
        </div>

        {/* MIDDLE RIGHT LOCATIONS */}
        <div className="text-layer-2 absolute top-[50%] right-[5%] md:right-[8%] text-right space-y-3 md:space-y-4 max-w-[250px] md:max-w-md">
           <p className="text-gray-800 text-sm md:text-xl font-bold leading-snug border-r-4 border-[#C0392B] pr-3 bg-white/30 backdrop-blur-[2px]">
             {t("chaiHero.branch1", "Serving Pune since 1995")}
           </p>
           <p className="text-gray-800 text-sm md:text-xl font-bold leading-snug border-r-4 border-[#FF8C00] pr-3 bg-white/30 backdrop-blur-[2px]">
             {t("chaiHero.branch2", "Over 10 locations across Maharashtra")}
           </p>
        </div>

        {/* BOTTOM LEFT TAGLINE */}
        <div className="text-layer-3 absolute bottom-[8%] left-[5%] md:left-[8%] max-w-[90%] md:max-w-2xl">
          <h3 className="text-4xl md:text-6xl font-extrabold text-[#C0392B] mb-2 md:mb-4 font-serif leading-tight drop-shadow-sm">
            {t("chaiHero.tag", "Mauli Amruttulya")}
          </h3>
          <p className="text-gray-600 text-lg md:text-2xl font-bold leading-relaxed bg-white/50 backdrop-blur-[2px] inline-block pr-4 rounded-r-lg">
            {t("chaiHero.line2", "Experience the warmth of tradition in every sip.")}
          </p>
        </div>

      </div>
    </section>
  );
}
