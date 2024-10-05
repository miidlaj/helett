"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { FeaturesSectionDemo } from "./ui/bento-grid";
import { ProductType } from "@/constants/products";
import { IconBrandAmazon } from "@tabler/icons-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export const SingleProduct = ({ product }: { product: ProductType }) => {
  const [activeImage, setActiveImage] = useState<StaticImageData | string>(
    product.thumbnail
  );

  return (
    <div className="py-10">
      <motion.div
        key={product.slug}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative shadow-lg"
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
          src={activeImage}
          width="1000"
        />
        <div className="absolute bottom-0 bg-white h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      </motion.div>
      <div className="flex flex-row justify-center my-8 gap-2 flex-wrap">
        {product.images.map((image, idx) => (
          <button
            key={`image-thumbnail-${idx}`}
            onClick={() => setActiveImage(image)}
          >
            <Image
              alt="product thumbnail"
              className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-r border rounded-lg border-neutral-100 shadow-lg"
              height="1000"
              src={image}
              width="1000"
            />
          </button>
        ))}
      </div>
      <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
        <Heading className="font-black mb-2 pb-1 text-primary-600">
          {" "}
          {product.title}
        </Heading>
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
        <Paragraph className="max-w-full my-4 text-primary-200">
          {product.description}
        </Paragraph>
      </div>
      <div className="prose prose-sm md:prose-base max-w-none text-neutral-600">
        {product?.content}
      </div>

      <FeaturesSectionDemo />

      <div className="w-full flex justify-center items-center">
        <HoverBorderGradient
          as="a"
          href={product.href}
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 gap-1"
          containerClassName="rounded-full"
        >
          View Product on Amazon
          <IconBrandAmazon className="size-7 text-black dark:text-white" />
        </HoverBorderGradient>
      </div>
    </div>
  );
};
