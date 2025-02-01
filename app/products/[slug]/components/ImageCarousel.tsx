"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/api/types";
import { cn } from "@/lib/utils";

export function ImageCarousel({
  images,
  className,
}: {
  images: Image[];
  className?: string;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      className={cn("w-full max-w-sm", className)}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <motion.img
                    key={image.url + index}
                    alt={image.name}
                    animate={{ opacity: 1 }}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    src={image.url}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
