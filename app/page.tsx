
import { WavyBackground } from "@/components/ui/wavy-background";
import { AppleCardsCarouselDemo } from "@/components/carousel";
import { FlipWords } from "@/components/ui/flip-words";
import { ImagesSlider } from "@/components/ui/image-slider";
import { motion } from "framer-motion";
import LandingCarousel from "@/components/ui/landing-carousel";

export default function Home() {
  const words = ["better", "quality", "beautiful", "modern"];


  return (
    <main className="">

      <LandingCarousel />

      {/* <WavyBackground className="max-w-4xl mx-auto pb-40 overflow-hidden">
        <div className="h-[40rem] flex justify-center items-center px-4">
          <div className="text-4xl mx-auto font-normal text-white">
            Buy
            <FlipWords words={words} /> <br />
            products from hellet
          </div>
        </div>
      </WavyBackground> */}

      {/* <AppleCardsCarouselDemo  /> */}


    </main>

  );
}
