"use client";

import { FlipWords } from "./ui/flip-words";
import { ImagesSlider } from "./ui/image-slider";

const LandingCarousel = () => {
  const images = [
    "/banners/Artboard 1.png",
    "/banners/Artboard 2.png",
    "/banners/Artboard 3.png",
    "/banners/Artboard 4.png",
    "/banners/Artboard 5.png",
  ];

  const words = ["better", "quality", "beautiful", "modern"];

  return (
    <ImagesSlider className="h-screen" images={images} overlay={false}>
      {/* <div className="h-[40rem] flex justify-center items-center px-4 z-10">
        <div className="text-6xl mx-auto font-normal text-white dark:text-black">
          Buy
          <FlipWords words={words} /> <br />
          products from hellet
        </div>
      </div> */}
    </ImagesSlider>
  );
};

export default LandingCarousel;
