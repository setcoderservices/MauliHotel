import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AuthenticTaste() {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(imageRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(textRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-background text-textDark relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Section */}
                    <div ref={imageRef} className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/images/kundachaimage_about.png"
                                alt="Hotel Mauli Ambiance"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        {/* Decorative Box */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-xl -z-10"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full -z-10 opacity-50"></div>
                    </div>

                    {/* Text Section */}
                    <div ref={textRef} key={i18n.language} className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h4 className="text-accent font-bold tracking-widest uppercase mb-2">{t("guaranteeTitle")}</h4>
                            <h2 className="text-5xl md:text-6xl font-heading text-primary leading-tight">
                                {t("aboutUsTitle")}
                            </h2>
                            <div className="w-20 h-1.5 bg-accent mt-6 rounded-full"></div>
                        </div>

                        <p className="text-xl leading-relaxed text-gray-700 font-light">
                            {t("aboutUsText")}
                        </p>

                        {/* Signature or Brand Mark */}
                        <div className="pt-6">
                            <p className="font-heading text-3xl text-primary/80 italic">Mauli Kunda Chaha</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AuthenticTaste;
