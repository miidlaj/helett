"use client";

import { HeroCarousel } from "./hero-carousel";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const LandingCarousel = () => {
  const carouselSlides = [
    {
      image: "/banners/Artboard 1.png",
      className: "bg-gradient-to-r from-emerald-500 to-emerald-900",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              H30C
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4">
              Thermal Label Printer
            </h3>
          </div>

          <p className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
            Hassle Free Printing for unwavering productivity
          </p>
          <HoverBorderGradient
            as="button"
            className="bg-black text-white flex items-center space-x-2"
            containerClassName="rounded-full"
          >
            View More
          </HoverBorderGradient>
        </div>
      ),
    },
    {
      image: "/banners/Artboard 2.png",
      className: "bg-gradient-to-r from-teal-200 to-teal-500",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              H65C
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4">
              Thermal Label Printer
            </h3>
          </div>

          <p className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
            Print It Right, Fast, Efficient
          </p>
          <HoverBorderGradient
            as="button"
            className="bg-black text-white flex items-center space-x-2"
            containerClassName="rounded-full"
          >
            View More
          </HoverBorderGradient>
        </div>
      ),
    },

    {
      image: "/banners/Artboard 3.png",
      className: "bg-gradient-to-r from-violet-200 to-pink-200",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              HT20
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4">
              Wireless Barcode Scanner
            </h3>
          </div>

          <p className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
            Efficiency in Your Hands Wireless, Fast, Flawless!
          </p>
          <HoverBorderGradient
            as="button"
            className="bg-black text-white flex items-center space-x-2"
            containerClassName="rounded-full"
          >
            View More
          </HoverBorderGradient>
        </div>
      ),
    },
    {
      image: "/banners/Artboard 4.png",
      className: "bg-gradient-to-r from-teal-200 to-teal-500",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              HL96
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4">Hair Dryer</h3>
          </div>

          <p className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
            Hair Perfection in a Handheld
          </p>
          <HoverBorderGradient
            as="button"
            className="bg-black text-white flex items-center space-x-2"
            containerClassName="rounded-full"
          >
            View More
          </HoverBorderGradient>
        </div>
      ),
    },
    {
      image: "/banners/Artboard 5.png",
      className: "bg-gradient-to-r from-rose-400 to-red-500",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              HT15
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4">
              Desktop Barcode Reader
            </h3>
          </div>

          <p className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
            Effortless Scanning Enhanced Workflows
          </p>
          <HoverBorderGradient
            as="button"
            className="bg-black text-white flex items-center space-x-2"
            containerClassName="rounded-full"
          >
            View More
          </HoverBorderGradient>
        </div>
      ),
    },
  ];

  return <HeroCarousel slides={carouselSlides} />;
};

export default LandingCarousel;
