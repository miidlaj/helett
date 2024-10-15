"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import Card from "./Card";

export default function ImageStack({ images }: { images: string[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main ref={container} className="relative">
      {images.map((image, i) => {
        const targetScale = 1 - (images.length - i) * 0.05;

        return (
          <Card
            key={`p_${i}`}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            src={image}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
