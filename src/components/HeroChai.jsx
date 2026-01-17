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

  // 1️⃣ ROBUST PRELOADER
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
      img.onerror = () => {
        console.warn(`⚠️ Frame ${i} failed to load. Skipping.`);
        onFinishLoading(); 
      };
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
      // Setup initial states
      gsap.set(".netflix-line-1", { opacity: 0, y: 30 }); // Animate whole line now
      gsap.set(".netflix-line-2 p", { opacity: 0, x: 20 });
      gsap.set(".netflix-line-3", { opacity: 0, scale: 0.9 });

      const frame = { current: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", 
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
        duration: 10,
        onUpdate: () => render(frame.current),
      }, 0);

      // Text Sync (Now animating the whole block, not letters)
      tl.to(".netflix-line-1", { opacity: 1, y: 0, duration: 1.5 }, 0.5);
      tl.to(".netflix-line-1", { opacity: 0.3, duration: 1 }, 3);
      tl.to(".netflix-line-2 p", { opacity: 1, x: 0, stagger: 0.2, duration: 1.5 }, 3.5);
      tl.to(".netflix-line-3", { opacity: 1, scale: 1, duration: 1.5 }, 7.5);

    }, sectionRef);

    return () => ctxGsap.revert();
  }, [percentLoaded, images]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-white w-full overflow-hidden">
      
      {/* LOADER */}
      {percentLoaded < 100 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center w-64">
            <h2 className="text-2xl font-serif text-mauli-red mb-2">Brewing...</h2>
            <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
              <div 
                className="h-full bg-mauli-orange transition-all duration-100" 
                style={{ width: `${percentLoaded}%` }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* CANVAS */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <canvas ref={canvasRef} className="h-[85vh] w-auto max-w-[90vw] object-contain" />
      </div>

      {/* TEXT LAYERS */}
      <div className="pointer-events-none select-none z-20 absolute inset-0">
        
        {/* LINE 1 - FIXED: Removed .split("") */}
        <div className="netflix-line-1 absolute top-[25%] right-8 md:right-24 max-w-xl text-right">
          <h1 className="text-3xl md:text-5xl font-serif text-[#2b2b2b] tracking-wide leading-tight">
            {t("chaiHero.line1", "The Art of Chai")}
          </h1>
        </div>

        {/* LINE 2 */}
        <div className="netflix-line-2 absolute top-[50%] right-8 md:right-24 max-w-md text-right text-sm md:text-lg text-[#4a4a4a] leading-loose font-medium">
          <p>{t("chaiHero.branch1", "Serving Pune since 1995")}</p>
          <p>{t("chaiHero.branch2", "Over 10 locations across Maharashtra")}</p>
        </div>

        {/* LINE 3 */}
        <div className="netflix-line-3 absolute bottom-16 left-8 md:left-24 max-w-md text-left bg-white/80 backdrop-blur-sm p-4 rounded-lg md:bg-transparent md:backdrop-blur-none md:p-0">
          <h3 className="text-2xl md:text-3xl font-serif text-[#c56a2b] mb-2">{t("chaiHero.tag", "Mauli Amruttulya")}</h3>
          <p className="text-[#3a3a3a] text-sm md:text-base leading-relaxed">
            {t("chaiHero.line2", "Experience the warmth of tradition in every sip.")}
          </p>
        </div>
      </div>
    </section>
  );
}