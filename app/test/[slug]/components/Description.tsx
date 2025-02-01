import React from "react";

import { ProductType } from "@/constants/products";
import Logo from "@/components/common/logo";

export default function Description({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-col items-center justify-center my-40">
      {product.brand === "helett" && <Logo height={400} width={400} />}
      <p className="text-[7.5vw] uppercase text-center max-w-[50vw] leading-none">
        {product.title.replace("Helett", "")}
      </p>
    </div>
  );
}
