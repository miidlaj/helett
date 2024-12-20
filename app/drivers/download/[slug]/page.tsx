import { ChevronDown, ChevronRight, Download, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandWindows } from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/app/drivers/components/ProgressBar";
import { products, ProductType } from "@/constants/products";
import DriverTable from "../../components/DriverTable";

export default function SoftwareDriversDownload({
  params,
}: {
  params: { slug: string };
}) {
  const steps = ["Identify", "Download", "Install"];
  const { slug } = params;
  const product = products.find((x) => x.slug === slug);

  return (
    <div className="container mx-auto px-4">
      <ProgressBar currentStep={2} steps={steps} />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <Image
            alt="HP LaserJet 1020 Printer series"
            className="w-full"
            height={200}
            src={`${product?.src}/${product?.thumbnail}`}
            width={300}
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-2xl font-semibold text-primary mb-2">
            Welcome to Software and Drivers for
          </h1>
          <h2 className="text-3xl font-bold mb-4">{product?.title}</h2>
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
          <div className="flex items-center gap-2">
            <span>Detected operating system:</span>
            <IconBrandWindows className="w-4 h-4" />
            <span>Windows 10 (64-bit)</span>
            <Link className="text-blue-600 hover:underline ml-2" href="#">
              Choose a different OS
            </Link>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">
        Select your software and drivers below:
      </h3>

      <DriverTable products={[product]} />

    </div>
  );
}
