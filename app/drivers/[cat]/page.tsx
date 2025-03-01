import Link from "next/link";

import ProgressBar from "../components/ProgressBar";
import NotFoundWhatYouLookingFor from "../components/NotFound";
import ImageCarousel from "../components/ImageCarousel";

import SearchProduct from "./components/SearchProduct";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { productsApi } from "@/api/products";
import { categoriesApi } from "@/api/categories";

type tParams = Promise<{ cat: string }>;

export default async function Page(props: { params: tParams }) {
  const { cat } = await props.params;

  const steps = ["Identify", "Download", "Install"];

  const categories = (await categoriesApi.fetchAllCategories()).data;
  const products = (
    await productsApi.fetchProducts({
      filters: { category: categories.find((x) => x.slug === cat)?.id },
    })
  ).data;

  return (
    <div className="container mx-auto px-4">
      <ProgressBar currentStep={1} steps={steps} />

      <NotFoundWhatYouLookingFor />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-primary mb-2">
          Welcome to Helett Software and Drivers
        </h1>

        <span className="text-sm text-gray-500">
          Select a different product type:
        </span>
        <ScrollArea className="w-96 py-5">
          <div className="space-x-4 flex">
            {categories.map((catergoy) => (
              <Link key={catergoy.id} href={`/drivers/${catergoy.slug}`}>
                <ProductTypeIcon
                  key={catergoy.id}
                  img={catergoy.image?.url}
                  selected={catergoy.slug === cat}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Let&apos;s identify your printer
          </h2>
          <p className="mb-4">
            Enter your serial number, product number or product name
          </p>
          <SearchProduct />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Examples of where to find your product name
          </h3>
          <ImageCarousel images={products.map((x) => x.thumbnail.url)} />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Or select your product from popular {cat}
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <Link
            key={index}
            className="text-blue-600 hover:underline"
            href={`/drivers/download/${product.slug}`}
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductTypeIcon({
  img,
  selected,
}: {
  img: string;
  selected: boolean;
}) {
  return (
    <div
      className={`p-2 rounded-full ${selected ? "bg-blue-500" : "bg-gray-200"}`}
    >
      <img
        alt="Cateogry Icon"
        className={`w-6 h-6 ${selected ? "text-white" : "text-gray-600"}`}
        src={img}
      />
    </div>
  );
}
