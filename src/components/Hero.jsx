import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

function Hero() {
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      // Initial overlay fade
      tl.fromTo(".hero-overlay", { opacity: 0 }, { opacity: 1, duration: 1.5 });

      // Line 1: HOTEL
      tl.fromTo(
        ".line-hotel",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      );

      // Line 2: MAULI
      tl.fromTo(
        ".line-mauli",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.8"
      );

      // Line 3: Badge
      tl.fromTo(
        ".line-badge",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1 },
        "-=0.8"
      );

      // Line 4: Quote
      tl.fromTo(
        ".line-quote",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/proxy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Warm Gradient Overlay */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-orange-900/20 z-10 mix-blend-overlay"></div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto space-y-4 md:space-y-6">

        {/* Line 1: HOTEL */}
        <h2 className="line-hotel font-heading text-2xl md:text-4xl lg:text-5xl tracking-[0.3em] text-[#FF9933] uppercase font-bold drop-shadow-lg">
          {t("heroTitle").split(" ")[0] || "HOTEL"}
        </h2>

        {/* Line 2: MAULI */}
        <h1 className="line-mauli font-heading text-6xl md:text-8xl lg:text-9xl text-white font-black tracking-wider drop-shadow-2xl leading-none">
          {t("heroTitle").split(" ").slice(1).join(" ") || "MAULI"}
        </h1>

        {/* Line 3: Badge */}
        <div className="line-badge mt-4">
          <span className="inline-block bg-black/60 backdrop-blur-md border border-white/20 text-white/90 px-6 py-2 rounded-full text-sm md:text-lg font-heading tracking-widest uppercase shadow-xl">
            {t("heroSubtitle") || "Kunda Chaha"}
          </span>
        </div>

        {/* Line 4: Quote */}
        <div className="line-quote mt-12 pt-8 border-t border-white/10 w-full max-w-lg mx-auto">
          <p className="font-heading italic text-lg md:text-2xl text-white/80 font-light leading-relaxed">
            "{t("feelingText")}"
          </p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-70">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
