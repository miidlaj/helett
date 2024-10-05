"use client";

import * as React from "react";
import Image from "next/image";
import { UseEmblaCarouselType } from "embla-carousel-react";

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

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
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
      className="w-full h-screen"
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className={cn("relative h-full", slide.className)}
          >
            <Card className="w-full h-full rounded-none bg-transparent border-none text-white">
              <CardContent className="p-0 h-full">
                <div
                  className={cn(
                    "flex flex-col md:flex-row justify-center items-center h-screen",
                    index % 2 === 0 ? "md:flex-row-reverse" : "",
                  )}
                >
                  <div className="w-full md:w-1/2 flex justify-center items-center h-4/5">
                    <div className="relative w-full h-full">
                      <Image
                        alt="Carousel image"
                        layout="fill"
                        objectFit="contain"
                        src={slide.image}
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
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <Button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className="w-3 h-3 p-0 rounded-full"
                size="sm"
                variant={current === index ? "default" : "outline"}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}
