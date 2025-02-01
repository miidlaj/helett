import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import InstallationSteps from "./components/InstallationSteps";
import TutorialVideos from "./components/TutorialVideos";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/app/drivers/components/ProgressBar";
import { productsApi } from "@/api/products";

export default async function DownloadConfirmation({
  params,
}: {
  params: { product_slug: string; os: string };
}) {
  const steps = ["Identify", "Download", "Install"];
  const { product_slug, os } = params;

  const product = await productsApi.fetchProductBySlug(product_slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <ProgressBar currentStep={3} steps={steps} />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Congrats! Your download for {product.name} has started.
          </h1>
          <p className="mb-4">
            Next, you&apos;ll need to install your downloaded files for {os}...
          </p>
          <InstallationSteps os={os} />
          <p className="text-sm text-gray-600 mt-4">
            We recommend restarting your computer after installation.
          </p>
        </div>
        <div>
          <Card className="bg-gray-100">
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="w-full h-6 bg-gray-200 rounded mb-4" />
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-1/2 h-4 bg-gray-200 rounded" />
              </div>
              <div className="mt-4 flex justify-center">
                <div className="border border-green-500 rounded-full px-4 py-2 text-green-500 text-sm">
                  Click on file to install
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TutorialVideos tutorials={product.tutorials} />

      <div className="mt-8">
        <Link href="/drivers">
          <Button variant="link">
            Download more Drivers
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
