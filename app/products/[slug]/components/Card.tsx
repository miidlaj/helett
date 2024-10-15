"use client";
import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Card = ({ i, src, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        className="flex flex-col relative -top-1/4 h-[600px] w-[1000px] shadow-2xl shadow-primary/20"
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            className="w-full h-full rounded-xl"
            style={{ scale: imageScale }}
          >
            <Image
              fill
              alt="image"
              className="rounded-xl"
              objectFit="cover"
              src={src}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
