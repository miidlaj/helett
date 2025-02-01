"use client";
import React, { useEffect, useState } from "react";

import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heading } from "./Heading";

import { Category, Product } from "@/api/types";
import { productsApi } from "@/api/products";
import { categoriesApi } from "@/api/categories";

export function FeaturedProducts() {
  const [cardData, setCardData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(
    categories[0]?.id.toString() || ""
  );

  useEffect(() => {
    if (selectedTab) {
      fetchProducts();
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.fetchAllCategories();
      setCategories(response.data);
      setSelectedTab(response.data[0]?.id.toString());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      let response;
      if (selectedTab) {
        response = await productsApi.fetchProducts({
          filters: { category: selectedTab },
        });
      } else {
        response = await productsApi.fetchProducts();
      }
      setCardData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const cards = cardData.map((card, index) => (
    <Card key={card.id} layout card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 max-w-full overflow-hidden">
      <Heading className="text-center py-5 font-medium text-3xl">
        Featured Products
      </Heading>

      <Tabs
        className="w-full"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="w-full flex gap-5 justify-center bg-transparent">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={""}>
          <Carousel items={cards} />
        </TabsContent>
        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id.toString()}>
            <Carousel items={cards} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
