"use client";

import { HeroCarousel } from "./hero-carousel";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const LandingCarousel = () => {
  const carouselSlides = [
    {
      image: "/banners/Artboard 1.png",
      className: "bg-transparent",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              H30C
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl mb-4">
              Thermal Label Printer
            </h3>
          </div>

          <p className="text-xl font-bold md:text-2xl lg:text-3xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
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
      image: "/banners/Artboard 3.png",
      className: "bg-transparent",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              HT20
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl mb-4">
              Wireless Barcode Scanner
            </h3>
          </div>

          <p className="text-xl font-bold md:text-2xl lg:text-3xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
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
      image: "/banners/Artboard 2.png",
      className: "bg-transparent",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              H65C
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl mb-4">
              Thermal Label Printer
            </h3>
          </div>

          <p className="text-xl font-bold md:text-2xl lg:text-3xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
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
      image: "/banners/Artboard 4.png",
      className: "bg-transparent",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              HL96
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl mb-4">Hair Dryer</h3>
          </div>

          <p className="text-xl font-bold md:text-2xl lg:text-3xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
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
      className: "bg-transparent",
      content: (
        <div className="z-10 relative">
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              HT15
            </h2>
            <h3 className="text-lg md:text-xl lg:text-2xl mb-4">
              Desktop Barcode Reader
            </h3>
          </div>

          <p className="text-xl font-bold md:text-2xl lg:text-3xl max-w-md md:max-w-lg lg:max-w-xl leading-tight mb-6">
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
