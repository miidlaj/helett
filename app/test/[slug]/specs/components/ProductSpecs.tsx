"use client";

import { IconBrandAmazon } from "@tabler/icons-react";
import React from "react";

import ProductDetails from "@/components/details-table";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { FeaturesSection } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import { ProductType } from "@/constants/products";

function ProductSpecs({ product }: { product: ProductType }) {
  return (
    <>
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
          <LinkPreview
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
            url={product.href}
          >
            <Heading className="font-light mb-2 pb-1">{product.title}</Heading>
          </LinkPreview>
          <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
            {product.stack?.map((stack: string) => (
              <span
                key={stack}
                className="text-xs  md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-primary border-primary-100 border"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Paragraph className="max-w-full my-4 text-primary/65">
            {product.description}
          </Paragraph>
        </div>

        <div className="prose prose-sm md:prose-base text-neutral-600 max-w-4xl mx-auto">
          {product?.content}
        </div>
      </div>

      <div className="flex flex-col gap-5 py-20 lg:py-40">
        <Heading as="h3" className="text-center text-3xl">
          Features
        </Heading>

        {/* <FeaturesSection features={product.features} /> */}
      </div>

      <div className="h-max w-full bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden rounded-md gap-0.5">
        <HoverBorderGradient
          as="a"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 gap-1"
          containerClassName="rounded-full"
          href={product.href}
        >
          View Product on Amazon
          <IconBrandAmazon className="size-7 text-black dark:text-white" />
        </HoverBorderGradient>
        <div className="w-[40rem] h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            className="w-full h-full"
            maxSize={1}
            minSize={0.4}
            particleColor="#7c3aed"
            particleDensity={1200}
          />

          <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <Heading as="h3" className="text-center text-3xl">
          Technical Details
        </Heading>
        <ProductDetails details={product.details} />
      </div>
    </>
  );
}

export default ProductSpecs;
