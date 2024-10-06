"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import {
  categories,
  filterProduct,
  products,
  ProductType,
} from "@/constants/products";

export function FeaturedProducts() {
  const [cardData, setCardData] = useState<ProductType[]>(products);
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    setCardData(filterProduct({ cats: Array.from(selectedTab) }));
  }, [selectedTab]);

  const cards = cardData.map((card, index) => (
    <Card key={card.src} layout card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 max-w-full overflow-hidden">
      <h1 className="text-3xl font-new-york-large py-5 text-center">
        Featured Products
      </h1>

      <Tabs
        className="w-full"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="w-full flex gap-5 justify-center bg-transparent">
          {categories.map((cat, index) => (
            <TabsTrigger key={index} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={""}>
          <Carousel items={cards} />
        </TabsContent>
        {categories.map((cat, index) => (
          <TabsContent key={index} value={cat}>
            <Carousel items={cards} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
