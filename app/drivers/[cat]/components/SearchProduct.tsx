"use client";

import type React from "react";

import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { SearchResults } from "./SearchResults";

import { Input } from "@/components/ui/input";
import { productsApi } from "@/api/products";
import { Product } from "@/api/types";

function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim() === "") {
        setResults([]);

        return;
      }

      setIsLoading(true);
      try {
        const response = productsApi.fetchProducts({
          filters: { search: searchQuery },
        });
        const data = await (await response).data;

        setResults(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchProducts(query);
  }, [query, fetchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          className="pl-10 pr-4 py-2"
          placeholder="Example: Helett H65C"
          type="text"
          value={query}
          onChange={handleInputChange}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <SearchResults
        isLoading={isLoading}
        results={results.map((x) => {
          return { id: x.id, name: x.name, slug: x.slug };
        })}
      />
    </div>
  );
}

export default SearchProduct;
