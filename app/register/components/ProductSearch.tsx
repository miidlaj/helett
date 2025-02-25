/* eslint-disable no-console */
"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import debounce from "lodash/debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { productsApi } from "@/api/products";

interface ProductSearchProps {
  onValueChange: (value: string) => void;
  value: string;
}

export function ProductSearch({ onValueChange, value }: ProductSearchProps) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(
    debounce(async (searchQuery: string) => {
      setIsLoading(true);
      try {
        const queryParams: any = {
          pagination: { page: 1, pageSize: 5 },
        };

        if (searchQuery.trim() !== "") {
          queryParams.filters = { search: searchQuery };
        }
        const response = await productsApi.fetchProducts(queryParams);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchProducts("");
  }, [fetchProducts]);

  const handleSearch = (query: string) => {
    fetchProducts(query);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between"
          role="combobox"
          variant="outline"
        >
          {value
            ? products.find((product) => product.id === value)?.name
            : "Select product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search product..."
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : "No product found."}
            </CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => {
                    onValueChange(
                      product.id === value ? "" : product.id.toString()
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === product.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
