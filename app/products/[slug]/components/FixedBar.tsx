import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductType } from "@/constants/products";

function FixedBar({
  product,
  page,
}: {
  product: ProductType;
  page: "specs" | "overview";
}) {
  return (
    <div className="fixed w-screen flex justify-between items-center px-5 py-3.5 z-40 bg-white/80 backdrop-blur backdrop-filter border-b">
      <h3 className="font-light">{product.title}</h3>

      <div className="flex gap-2 items-center">
        <Link href={`/products/${product.slug}`}>
          <Button variant={page === "specs" ? "ghost" : "link"}>
            Overview
          </Button>
        </Link>
        <Link href={`/products/${product.slug}/specs`}>
          <Button variant={page === "overview" ? "ghost" : "link"}>
            Specs
          </Button>
        </Link>
        <button className="bg-black hover-scale text-xs text-white py-2 px-5 rounded-full focus:outline-none">
          Buy
        </button>
      </div>
    </div>
  );
}

export default FixedBar;
