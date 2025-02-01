"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    handleTransition(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    handleTransition(newIndex);
  };

  return (
    <div className="relative">
      <div
        className={`transition-opacity w-[400px] h-[300px] p-10 duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          fill
          alt={`Image ${currentIndex + 1}`}
          className="rounded-lg"
          objectFit="contain"
          src={images[currentIndex]}
        />
      </div>
      <Button
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        size="icon"
        variant="outline"
        onClick={prevImage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        size="icon"
        variant="outline"
        onClick={nextImage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ImageCarousel;
