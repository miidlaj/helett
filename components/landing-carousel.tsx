"use client";

import Link from "next/link";

import Logo from "./common/logo";
import { HeroCarousel } from "./hero-carousel";

const LandingCarousel = () => {
  const carouselSlides = [
    {
      image: "/banners/Artboard 1.png",
      className: "bg-transparent",
      content: (
        <CarouselSlideContent subtitle="Thermal Label Printer" title="H30C" />
      ),
    },
    {
      image: "/banners/Artboard 3.png",
      className: "bg-transparent",
      content: (
        <CarouselSlideContent
          subtitle="Wireless Barcode Scanner"
          title="HT20"
        />
      ),
    },
    {
      image: "/banners/Artboard 2.png",
      className: "bg-transparent",
      content: (
        <CarouselSlideContent subtitle="Thermal Label Printer" title="H65C" />
      ),
    },
    {
      image: "/banners/Artboard 4.png",
      className: "bg-transparent",
      content: <CarouselSlideContent subtitle="Hair Dryer" title="HL96" />,
    },
    {
      image: "/banners/Artboard 5.png",
      className: "bg-transparent",
      content: (
        <CarouselSlideContent subtitle="Desktop Barcode Reader" title="HT15" />
      ),
    },
  ];

  return <HeroCarousel slides={carouselSlides} />;
};

export default LandingCarousel;

const CarouselSlideContent = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="z-10 relative">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-2 flex items-center gap-5">
          <Logo height={120} width={120} /> {title}
        </h2>
        <h3 className="text-lg md:text-xl lg:text-2xl mb-4 text-neutral-500">
          {subtitle}
        </h3>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/products">
          <button className="bg-black hover-scale text-white py-2 px-4 rounded-full focus:outline-none">
            Buy
          </button>
        </Link>

        <Link href="/products">
          <div className="flex items-center text-gray-800 transition-transform duration-200 group cursor-pointer">
            Learn More
            <svg
              className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1"
              fill="none"
              height="1em"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};
