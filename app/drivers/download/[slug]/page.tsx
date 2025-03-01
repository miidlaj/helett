import { ChevronRight, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DriverSelector from "./components/DriverSelector";

import ProgressBar from "@/app/drivers/components/ProgressBar";
import { productsApi } from "@/api/products";

type tParams = Promise<{ slug: string }>;

export default async function Page(props: { params: tParams }) {
  const { slug } = await props.params;
  const steps = ["Identify", "Download", "Install"];
  const product = await productsApi.fetchProductBySlug(slug);

  return (
    <div className="container mx-auto px-4">
      <ProgressBar currentStep={2} steps={steps} />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <Image
            alt={product?.name || "Product image"}
            className="w-full"
            height={200}
            src={product?.thumbnail.url || "/placeholder.svg"}
            width={300}
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-2xl font-semibold text-primary mb-2">
            Welcome to Software and Drivers for
          </h1>
          <h2 className="text-3xl font-bold mb-4">{product?.name}</h2>
          <div className="flex gap-4 mb-4">
            <Link
              className="text-blue-600 hover:underline flex items-center"
              href="/contact-us"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Get support for this product
            </Link>
            <Link
              className="text-blue-600 hover:underline flex items-center"
              href="/drivers/choose"
            >
              <ChevronRight className="w-4 h-4 mr-1" />
              Choose a different product
            </Link>
          </div>
          <DriverSelector product={product} />
        </div>
      </div>
    </div>
  );
}
