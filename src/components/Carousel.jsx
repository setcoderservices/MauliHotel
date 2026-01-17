import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
    {
        src: "/images/indian_tea_service_1768509398048.png",
        alt: "Authentic Masala Chai",
        title: "Masala Chai & Snacks",
        desc: "Authentic spices blended with rich milk, served with hot samosas."
    },
    {
        src: "/images/hotel_ambiance_luxury_1768508979115.png",
        alt: "Royal Ambiance",
        title: "Royal Hospitality",
        desc: "Experience the warmth of Indian hospitality in a luxurious setting."
    },
    {
        src: "/images/tea_leaves_macro_1768508999814.png",
        alt: "Premium Tea Spices",
        title: "Hand-Picked Spices",
        desc: "Fresh cardamom, ginger, and tea leaves from the finest gardens."
    },
];

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        loop: true,
    });

    return (
        <section className="py-20 bg-background text-textDark">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-heading text-center mb-12 text-primary">
                    A Journey for the Senses
                </h2>

                <div className="relative group">
                    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-2xl">
                        {images.map((img, idx) => (
                            <div key={idx} className="keen-slider__slide relative h-[500px]">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                                    <h3 className="text-3xl font-heading mb-2">{img.title}</h3>
                                    <p className="text-lg font-light opacity-90">{img.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {loaded && instanceRef.current && (
                        <>
                            <Arrow
                                left
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.prev()
                                }
                                disabled={currentSlide === 0}
                            />

                            <Arrow
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.next()
                                }
                                disabled={
                                    currentSlide ===
                                    instanceRef.current.track.details.slides.length - 1
                                }
                            />
                        </>
                    )}
                </div>

                {loaded && instanceRef.current && (
                    <div className="flex justify-center mt-6 gap-2">
                        {[
                            ...Array(instanceRef.current.track.details.slides.length).keys(),
                        ].map((idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                    "w-3 h-3 rounded-full transition-all duration-300 " +
                                    (currentSlide === idx ? "bg-primary w-8" : "bg-gray-400")
                                }
                            ></button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function Arrow(props) {
    const disabled = props.disabled ? " fill-gray-400" : " fill-white";
    return (
        <svg
            onClick={props.onClick}
            className={`w-10 h-10 absolute top-1/2 -translate-y-1/2 cursor-pointer z-10 p-2 bg-black/30 hover:bg-primary rounded-full transition-colors duration-300 ${props.left ? "left-4" : "right-4"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" fill="currentColor" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill="currentColor" />
            )}
        </svg>
    );
}

export default Carousel;
