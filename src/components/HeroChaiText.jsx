import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroChaiText() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef(null);

  useEffect(() => {
    // 🔥 KILL OLD ANIMATIONS ON LANGUAGE CHANGE
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.killTweensOf("*");

    const ctx = gsap.context(() => {
      // LINE 1
      gsap.fromTo(
        ".netflix-line-1 span",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".netflix-line-1",
            start: "top 65%",
          },
        }
      );

      // BRANCHES
      gsap.fromTo(
        ".netflix-line-2 p",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".netflix-line-2",
            start: "top 70%",
          },
        }
      );

      // FINAL STATEMENT
      gsap.fromTo(
        ".netflix-line-3",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".netflix-line-3",
            start: "top 75%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [i18n.language]); // ✅ THIS IS THE KEY FIX

  return (
    <div ref={rootRef} className="pointer-events-none select-none">

      {/* LINE 1 */}
      <div className="netflix-line-1 absolute top-[30%] right-10 md:right-24 z-20 max-w-xl text-right">
        <h1 className="text-2xl md:text-4xl font-serif text-[#2b2b2b] tracking-wide">
          {t("chaiHero.line1").split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      {/* BRANCH ADDRESSES */}
      <div className="netflix-line-2 absolute top-[50%] right-10 md:right-24 z-20 max-w-md text-right text-sm md:text-base text-[#4a4a4a] leading-loose">
        <p>{t("chaiHero.branch1")}</p>
        <p>{t("chaiHero.branch2")}</p>
      </div>

      {/* FINAL BRAND STATEMENT */}
      <div className="netflix-line-3 absolute bottom-24 left-10 md:left-24 z-20 max-w-md text-left">
        <h3 className="text-xl md:text-2xl font-serif text-[#c56a2b] mb-3">
          {t("chaiHero.tag")}
        </h3>
        <p className="text-[#3a3a3a] text-sm md:text-base leading-relaxed">
          {t("chaiHero.line2")}
          <br /><br />
          <span className="italic opacity-80">
            {t("chaiHero.line3")}
          </span>
        </p>
      </div>

    </div>
  );
}
