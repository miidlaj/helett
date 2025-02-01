"use client";
import { useEffect } from "react";
import Lenis from "lenis";

import Intro from "./Intro";
import Description from "./Description";
import Section from "./Section";

import { ProductType } from "@/constants/products";

export default function ImageScroll({ product }: { product: ProductType }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="min-h-screen mt-20">
      <Intro product={product} />
      <Description product={product} />
      <Section product={product} />
      <div className="h-28" />
    </main>
  );
}
