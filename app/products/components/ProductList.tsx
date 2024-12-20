"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { ProductsFilter } from "./FilterItem";

import {
  brands,
  categories,
  filterProduct,
  getSubCategories,
  products,
  ProductType,
} from "@/constants/products";
import { Card } from "@/components/ui/apple-cards-carousel";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

function ProductList() {
  const params = useSearchParams();
  const param_cat = params.get("cat");
  const param_brand = params.get("brand");
  const defaultCats: string[] = param_cat != null ? [param_cat] : [];
  const defaultBrands: string[] = param_brand != null ? [param_brand] : [];

  const [productData, setProductData] = useState<ProductType[]>(products);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(defaultCats);
  const [selectedBrand, setSelectedBrand] = useState<string[]>(defaultBrands);
  const [subCats, setSubCats] = useState<string[]>([]);
  const [selectedSubCat, setSelectedSubCat] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = filterProduct({
      cats: selectedCategory,
      brands: selectedBrand,
      subCats: selectedSubCat,
      search: searchValue,
    });

    setIsFiltered(
      selectedCategory.length !== 0 ||
        selectedSubCat.length !== 0 ||
        selectedBrand.length !== 0 ||
        searchValue.length > 0,
    );
    setProductData(filteredData);
  }, [selectedBrand, selectedCategory, selectedSubCat, searchValue]);

  useEffect(() => {
    const subCategories = selectedCategory.flatMap(getSubCategories);

    setSubCats(subCategories);
  }, [selectedCategory]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedSubCat([]);
    setSearchValue("");
    setIsFiltered(false);
  };

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
                    label: cat,
                    value: cat,
                  }))}
                  selectedValues={selectedCategory}
                  setSelectedValues={setSelectedCategory}
                  title="Category"
                />
              )}

              {subCats.length > 0 && (
                <ProductsFilter
                  options={subCats.map((cat) => ({ label: cat, value: cat }))}
                  selectedValues={selectedSubCat}
                  setSelectedValues={setSelectedSubCat}
                  title="Sub Category"
                />
              )}

              {brands.length > 0 && (
                <ProductsFilter
                  options={brands.map((brand) => ({
                    label: brand,
                    value: brand,
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
          </div>
        </div>
      </main>
    </Suspense>
  );
}

export default ProductList;
