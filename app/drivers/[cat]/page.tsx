import {
  Printer,
  Laptop,
  Search,
  Projector,
  Network,
  Tv,
  Lock,
  Barcode,
  Mic,
  Car,
  Home,
  ShieldQuestion,
} from "lucide-react";
import Link from "next/link";

import ProgressBar from "../components/ProgressBar";
import NotFoundWhatYouLookingFor from "../components/NotFound";
import ImageCarousel from "../components/ImageCarousel";

import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { filterProduct } from "@/constants/products";

function ProductTypeIcon({ Icon, selected }: { Icon: any; selected: boolean }) {
  return (
    <div
      className={`p-2 rounded-full ${selected ? "bg-blue-500" : "bg-gray-200"}`}
    >
      <Icon
        className={`w-6 h-6 ${selected ? "text-white" : "text-gray-600"}`}
      />
    </div>
  );
}

export default function Component({
  params,
}: {
  params: {
    cat: string;
  };
}) {
  const cat = params.cat;
  const steps = ["Identify", "Download", "Install"];
  const productTypes = [
    { name: "Laptop", icon: Laptop },
    { name: "Projector", icon: Projector },
    { name: "Printers", icon: Printer },
    { name: "Network Device", icon: Network },
    { name: "Android TV Streaming", icon: Tv },
    { name: "Barcode Scanner", icon: Barcode },
    { name: "Digital Door Lock", icon: Lock },
    { name: "Wireless Mic", icon: Mic },
    { name: "Smart Car Accessories", icon: Car },
    { name: "Smart Home", icon: Home },
    { name: "Other", icon: ShieldQuestion },
  ];
  const products = filterProduct({ cats: [cat] });

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
            {productTypes.map((type, index) => (
              <ProductTypeIcon
                key={index}
                Icon={type.icon}
                selected={index === 0}
              />
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
          <div className="relative">
            <Input
              className="pl-10 pr-4 py-2"
              placeholder="Example: Helett H65C"
              type="text"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Examples of where to find your product name
          </h3>
          <ImageCarousel
            images={products.map((x) => x.src + "/" + x.thumbnail)}
          />
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
            {product.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
