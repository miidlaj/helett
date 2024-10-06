"use client";
import React, { useEffect, useState } from "react";

import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heading } from "./Heading";

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
    if (selectedTab) {
      setCardData(filterProduct({ cats: [selectedTab] }));
    }
  }, [selectedTab]);

  const cards = cardData.map((card, index) => (
    <Card key={card.src} layout card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 max-w-full overflow-hidden">
      <Heading className="text-center py-5  text-3xl">
        Featured Products
      </Heading>

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
