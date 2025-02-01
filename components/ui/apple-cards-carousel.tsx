"use client";
import React, { useEffect, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Product } from "@/api/types";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        />

        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={"card" + index}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                  once: true,
                },
              }}
              className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              initial={{
                opacity: 0,
                y: 20,
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          disabled={!canScrollLeft}
          onClick={scrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          disabled={!canScrollRight}
          onClick={scrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  layout = false,
}: {
  card: Product;
  index: number;
  layout?: boolean;
}) => {
  return (
    <>
      <AnimatePresence key={card.slug}>
        <Link key={card.slug} href={`/products/${card.slug}`}>
          <motion.button
            key={card.slug}
            className="rounded-[22px] max-w-sm w-max p-4 sm:p-10 bg-white dark:bg-black  text-left border dark:border-none dark:shadow-sm dark:shadow-white"
            layoutId={layout ? `card-${card.name}` : undefined}
          >
            <Image
              alt={card.name}
              className="object-contain rounded-[22px] shadow-md hover:scale-105 transform transition duration-200 ease-in-out"
              height="400"
              loading="lazy"
              src={card.thumbnail.url}
              width="400"
            />
            <p className="text-base sm:text-xl mt-4 mb-2 card-foreground">
              {card.name}
            </p>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {card.description}
            </p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 mt-4 text-xs font-bold bg-primary">
              <span>Details </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white" />
            </button>
          </motion.button>
        </Link>
      </AnimatePresence>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt ? alt : "Background of a beautiful view"}
      blurDataURL={typeof src === "string" ? src : undefined}
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      decoding="async"
      height={height}
      loading="lazy"
      src={src}
      width={width}
      onLoad={() => setLoading(false)}
      {...rest}
    />
  );
};
