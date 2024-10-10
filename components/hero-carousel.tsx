"use client";

import * as React from "react";
import Image from "next/image";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { useTheme } from "next-themes";

import { WavyBackground } from "./ui/wavy-background";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CarouselSlide {
  image: string;
  className: string;
  content: React.ReactNode;
}

interface HeroCarouselProps {
  slides?: CarouselSlide[];
}

export function HeroCarousel({ slides = [] }: HeroCarouselProps) {
  const [api, setApi] = React.useState<UseEmblaCarouselType[1] | null>(null);
  const [current, setCurrent] = React.useState(0);

  const { theme } = useTheme();

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  if (slides.length === 0) {
    return (
      <div
        className={cn(
          "w-full h-screen flex items-center justify-center bg-white dark:bg-black",
        )}
      >
        <p className="text-xl text-muted-foreground">No slides to display</p>
      </div>
    );
  }

  return (
    <Carousel
      className="h-full w-full mx-5 rounded-lg overflow-hidden"
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
    >
      <WavyBackground
        backgroundFill={`${theme === "dark" ? "black" : "white"} `}
        containerClassName="h-auto w-full"
      >
        <CarouselContent className="h-full w-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className={cn("relative pl-0 h-full", slide.className)}
            >
              <Card className="w-full h-full rounded-none bg-transparent border-none dark:text-white text-black">
                <CardContent className="p-0 h-full">
                  <div
                    className={cn(
                      "flex flex-col md:flex-row justify-center items-center h-[70vh]",
                      index % 2 === 0 ? "md:flex-row-reverse" : "",
                    )}
                  >
                    <div className="w-full md:w-1/2 flex justify-center items-center h-full">
                      <div className="relative w-full h-full flex justify-end items-end">
                        <Image
                          alt="Carousel image"
                          height={800}
                          objectFit="cover"
                          src={slide.image}
                          width={800}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-12">
                      {slide.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </WavyBackground>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
          {slides.map((_, index) => (
            <Button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className="px-0 py-0"
              variant="link"
              onClick={() => api?.scrollTo(index)}
            >
              <span
                className={`w-5 h-1 p-0 rounded-lg ${
                  current !== index ? "bg-neutral-500" : "bg-primary"
                }`}
              />
            </Button>
          ))}
        </div>
      )}
    </Carousel>
  );
}
