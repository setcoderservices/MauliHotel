import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            // Title Animation
            tl.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Cards Animation
            tl.fromTo(
                cardsRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                "-=0.5"
            );

            // Star Animation (delayed)
            tl.fromTo(
                ".star-icon",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.5"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const testimonials = [
        { name: t("t1Name"), role: t("t1Role"), text: t("t1Text") },
        { name: t("t2Name"), role: t("t2Role"), text: t("t2Text") },
        { name: t("t3Name"), role: t("t3Role"), text: t("t3Text") },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[#FBF7F2] text-textDark relative overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading text-[#C0392B] mb-4 tracking-wide">
                        {t("testimonialsTitle")}
                    </h2>
                    <p className="text-lg text-gray-600 font-light italic font-body">
                        {t("testimonialsSubtitle")}
                    </p>
                    <div className="w-24 h-1 bg-[#C0392B] mx-auto mt-6 rounded-full opacity-20"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between h-full group"
                        >
                            {/* Stars */}
                            <div className="flex space-x-1 mb-6 text-[#F1C40F]">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 star-icon fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="mb-8 flex-grow relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-[#C0392B] opacity-10 font-serif leading-none">
                                    &ldquo;
                                </span>
                                <p className="text-gray-700 text-lg leading-relaxed font-body relative z-10">
                                    {item.text}
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center mt-auto border-t border-gray-100 pt-6">
                                <div className="w-12 h-12 rounded-full bg-[#FBF7F2] flex items-center justify-center text-[#C0392B] font-bold text-xl mr-4 font-heading border border-[#C0392B]/20">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-heading text-lg font-bold text-gray-900">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-[#C0392B] uppercase tracking-wider font-medium">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
