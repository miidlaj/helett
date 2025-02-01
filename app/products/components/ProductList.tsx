"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { Trash } from "lucide-react";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Components for filtering UI
import { ProductsFilter } from "./FilterItem";

import { Card } from "@/components/ui/apple-cards-carousel";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

// API service and types
import {
  ApiResponse,
  Brand,
  Category,
  Product,
  ProductQueryParams,
} from "@/api/types";
import { productsApi } from "@/api/products";
import { categoriesApi } from "@/api/categories";
import { brandsApi } from "@/api/brands";

// Custom hook for debouncing
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function ProductList() {
  const params = useSearchParams();
  const param_cat = params.get("cat");
  const param_brand = params.get("brand");
  const defaultCats: string[] = param_cat != null ? [param_cat] : [];
  const defaultBrands: string[] = param_brand != null ? [param_brand] : [];

  const [productData, setProductData] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(defaultCats);
  const [selectedBrand, setSelectedBrand] = useState<string[]>(defaultBrands);
  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Use the custom debounce hook
  const debouncedSearch = useDebounce(searchValue, 300);

  // Memoize the fetch function with useCallback
  const fetchProducts = useCallback(async (filters: Record<string, any>) => {
    setLoading(true);
    try {
      const queryParams: ProductQueryParams = { filters };
      const response: ApiResponse<Product> =
        await productsApi.fetchProducts(queryParams);

      setProductData(response.data || []);
    } catch (error) {
      console.error("Error fetching products", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize the search handler
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  // Effect for fetching products based on filters
  useEffect(() => {
    const filters: Record<string, any> = {};

    if (debouncedSearch.trim().length > 0) {
      filters.search = debouncedSearch.trim();
    }

    if (selectedCategory.length > 0) {
      filters.category = selectedCategory;
    }

    if (selectedBrand.length > 0) {
      filters.brand = selectedBrand;
    }

    setIsFiltered(
      selectedCategory.length !== 0 ||
        selectedBrand.length !== 0 ||
        debouncedSearch.length > 0
    );

    fetchProducts(filters);
  }, [selectedCategory, selectedBrand, debouncedSearch, fetchProducts]);

  // Fetch categories and brands on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          categoriesApi.fetchAllCategories(),
          brandsApi.fetchAllBrands(),
        ]);

        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };

    fetchInitialData();
  }, []);

  // Memoize reset filters handler
  const handleResetFilters = useCallback(() => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSearchValue("");
    setIsFiltered(false);
  }, []);

  return (
    <Suspense fallback={<>Loading...</>}>
      <main className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-4 w-full flex flex-col gap-5">
          <Heading as="h1" className="text-center">
            Products
          </Heading>

          <div className="flex items-center justify-between flex-col gap-10">
            <div className="flex flex-1 items-center space-x-2 w-max">
              <Input
                className="w-[150px] lg:w-[250px]"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
              />

              {categories.length > 0 && (
                <ProductsFilter
                  options={categories.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }))}
                  selectedValues={selectedCategory}
                  setSelectedValues={setSelectedCategory}
                  title="Category"
                />
              )}

              {brands.length > 0 && (
                <ProductsFilter
                  options={brands.map((brand) => ({
                    label: brand.name,
                    value: brand.id,
                  }))}
                  selectedValues={selectedBrand}
                  setSelectedValues={setSelectedBrand}
                  title="Brand"
                />
              )}

              {isFiltered && (
                <Button
                  className="h-8 px-2 lg:px-3"
                  variant="ghost"
                  onClick={handleResetFilters}
                >
                  Clear Filters
                  <Trash className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {loading ? (
              <div>Loading products...</div>
            ) : (
              <div className="grid w-full sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {productData.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                    }}
                  >
                    <Card card={item} index={index} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </Suspense>
  );
}

export default ProductList;
