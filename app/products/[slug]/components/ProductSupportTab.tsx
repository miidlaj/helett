import { useState } from "react";
import {
  Download,
  FileWarning,
  Youtube,
  FileCog,
  ClipboardCheck,
  Contact,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@/api/types";

const extractYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : "";
};

interface ProductSupportTabsProps {
  product: Product;
}

export function ProductSupportTabs({ product }: ProductSupportTabsProps) {
  const [activeTab, setActiveTab] = useState("downloads");
  const router = useRouter();

  const hasDrivers = product.drivers && product.drivers.length > 0;
  const hasTutorials = product.tutorials && product.tutorials.length > 0;

  const handleDriversRedirect = () => {
    if (hasDrivers) {
      router.push(`/drivers/download/${product.slug}`,);
    }
  };

  const handleWarrantyRedirect = () => {
    router.push("/warranty");
  };

  const handleContactRedirect = () => {
    router.push("/contact-us");
  };

  return (
    <Tabs
      className="w-full bg-none"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="flex w-full bg-transparent">
        <TabsTrigger
          className="flex items-center gap-2 px-4 py-2 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          value="downloads"
        >
          <Download className="h-4 w-4" />
          Downloads
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center gap-2 px-4 py-2 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          value="warranty"
        >
          <FileWarning className="h-4 w-4" />
          Warranty
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center gap-2 px-4 py-2 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          value="tutorials"
        >
          <Youtube className="h-4 w-4" />
          Tutorials
        </TabsTrigger>
      </TabsList>

      <TabsContent className="space-y-6" value="downloads">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <FileCog className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-medium">Drivers & Software</h3>
                <p className="text-muted-foreground">
                  Download the latest drivers and software for your{" "}
                  {product.name}
                </p>
                <Button
                  className="w-full mt-2"
                  disabled={!hasDrivers}
                  variant={hasDrivers ? "default" : "outline"}
                  onClick={handleDriversRedirect}
                >
                  {hasDrivers ? (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      View Available Drivers
                    </>
                  ) : (
                    <>
                      <FileWarning className="mr-2 h-4 w-4" />
                      No Drivers Available
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <ClipboardCheck className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-medium">Register & Claim</h3>
                <p className="text-muted-foreground">
                  Register your product and manage warranty claims
                </p>
                <Button
                  className="w-full mt-2"
                  onClick={handleContactRedirect}
                >
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Register Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Warranty Tab */}
      <TabsContent className="space-y-6" value="warranty">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Warranty Information
              </h3>
              <p>
                All {product.brand.name} products come with a standard warranty
                to protect against manufacturing defects. Please refer to your
                product documentation for specific warranty terms.
              </p>

              <Alert className="my-4">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Warranty claims require proof of purchase and product
                  registration. Make sure to keep your receipt and register your
                  product within 30 days of purchase.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <Button onClick={handleWarrantyRedirect}>
                  <FileWarning className="mr-2 h-4 w-4" />
                  Warranty Policy
                </Button>
                <Button variant="outline" onClick={handleContactRedirect}>
                  <Contact className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent className="space-y-6" value="tutorials">
        {hasTutorials ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.tutorials.map((tutorial, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="border-0"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractYouTubeID(
                        tutorial.link
                      )}`}
                      title={`Tutorial ${idx + 1}`}
                      width="100%"
                    />
                  </div>
                  <div className="p-4">
                    <Button asChild className="w-full" variant="outline">
                      <a
                        className="flex items-center justify-center"
                        href={tutorial.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Youtube className="mr-2 h-4 w-4" />
                        Watch on YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center py-12">
              <Youtube className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No Tutorials Available</h3>
              <p className="text-muted-foreground mt-2">
                There are currently no setup guides or tutorials available for
                this product.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={handleContactRedirect}
              >
                <Contact className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
