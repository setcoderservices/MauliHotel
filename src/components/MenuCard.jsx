import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

function MenuCard({ item }) {
  const cardRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name[i18n.language]}
          className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="font-heading text-xl text-primary mb-2">
          {item.name[i18n.language]}
        </h3>
        <p className="text-sm opacity-80">
          {item.description[i18n.language]}
        </p>
      </div>
    </div>
  );
}

export default MenuCard;
