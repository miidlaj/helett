"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconBrandAmazon } from "@tabler/icons-react";

import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { FeaturesSection } from "./ui/bento-grid";
import { LinkPreview } from "./ui/link-preview";
import ProductDetails from "./details-table";
import { SparklesCore } from "./ui/sparkles";

import { ProductType } from "@/constants/products";

export const SingleProduct = ({ product }: { product: ProductType }) => {
  const [activeImage, setActiveImage] = useState<StaticImageData | string>(
    product.thumbnail,
  );



  const details = [
    { label: "Product Dimensions", value: "12D x 15W x 16H Centimeters" },
    { label: "Controller Type", value: "Android" },
    { label: "Printer Media Size Maximum", value: "2 x 126" },
    {
      label: "Included Components",
      value:
        "1x Power Adaptor, 1x H65C Label, 1x Label roll(250 sticker), 1x USB Cable, 1x User Manual",
    },
    { label: "Print Media", value: "Labels" },
    { label: "Scanner Type", value: "Portable" },
    {
      label: "Compatible Devices",
      value: "Smartphones, Laptops پدید",
    },
    { label: "Sheet Size", value: "58 Millimeters" },
    {
      label: "Maximum Black and White Print Resolution",
      value: "203Dpi",
    },
    { label: "Duplex", value: "Manual" },
    { label: "Hardware Interface", value: "USB" },
    { label: "Resolution", value: "203" },
    { label: "Control Method", value: "App" },
    { label: "Is Electric", value: "Yes" },
    { label: "Manufacturer", value: "Helett, +91 95137 84194" },
    { label: "Model", value: "H65C" },
    {
      label: "Batteries",
      value: "1 Lithium Ion batteries required (included)",
    },
    { label: "Item Model Number", value: "H65C" },
    {
      label: "Operating System",
      value: "Linux, Windows, iOS, Android",
    },
    {
      label: "Printing Technology",
      value: "Thermal label printer",
    },
    { label: "Special Features", value: "Portable" },
    { label: "Number of Items", value: "5" },
    { label: "Colour Screen", value: "No" },
    { label: "Batteries Included", value: "Yes" },
    { label: "Batteries Required", value: "Yes" },
    { label: "Battery Cell Composition", value: "Lithium Ion" },
    { label: "Form Factor", value: "Print Only" },
    { label: "Manufacturer", value: "Helett" },
    { label: "Country of Origin", value: "China" },
    { label: "Item Weight", value: "235 g" },
  ];

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={product.slug}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative shadow-lg shadow-white rounded-md"
          initial={{
            opacity: 0,
            y: 30,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Image
            alt="thumbnail"
            className="rounded-md object-contain"
            height="1000"
            src={`${product.src}/${activeImage}`}
            width="1000"
          />
          <div className="absolute bottom-0 bg-white rounded-md h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </motion.div>
        <div className="flex flex-row justify-center my-8 gap-2 flex-wrap">
          {product.images.map((image, idx) => (
            <button
              key={`image-thumbnail-${idx}`}
              className="hover-scale overflow-hidden"
              onClick={() => setActiveImage(image)}
            >
              <Image
                alt="product thumbnail"
                className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-r border rounded-lg border-neutral-100 shadow-lg"
                height="1000"
                src={`${product.src}/${image}`}
                width="1000"
              />
            </button>
          ))}
        </div>

        <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
          <LinkPreview
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
            url={product.href}
          >
            <Heading className="font-black mb-2 pb-1">{product.title}</Heading>
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
      </div>

      <div className="prose prose-sm md:prose-base text-neutral-600 max-w-4xl mx-auto">
        {product?.content}
      </div>

      <div className="flex flex-col gap-5 py-20 lg:py-40">
        <Heading as="h3" className="text-center text-3xl">
          Features
        </Heading>

        <FeaturesSection features={product.features} />
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
        <ProductDetails details={details} />
      </div>
    </div>
  );
};
