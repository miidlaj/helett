/* eslint-disable no-console */
"use client";
import type { Category, Product } from "@/api/types";

import { useEffect, useState } from "react";

import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heading } from "./Heading";
import { EmptyState } from "./empty-state";

import { productsApi } from "@/api/products";
import { categoriesApi } from "@/api/categories";


export function FeaturedProducts() {
  const [cardData, setCardData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(
    categories[0]?.id.toString() || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setIsLoading(true);
    try {
      let response;

      if (selectedTab) {
        response = await productsApi.fetchProducts({
          filters: { category: selectedTab, featured: true },
        });
      } else {
        response = await productsApi.fetchProducts();
      }
      setCardData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCardData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const cards = cardData.map((card, index) => (
    <Card key={card.id} layout card={card} index={index} />
  ));

  const renderContent = () => {
    if (isLoading) {
      return <div className="py-20 text-center">Loading products...</div>;
    }

    if (cardData.length === 0) {
      return <EmptyState />;
    }

    return <Carousel items={cards} />;
  };

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

        <TabsContent value={""}>{renderContent()}</TabsContent>
        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id.toString()}>
            {renderContent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
