import { useState } from "react";
import {
  Download,
  FileWarning,
  Youtube,
  FileCog,
  ClipboardCheck,
  Contact,
  PlayCircle,
  ArrowRight,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@/api/types";
import { Badge } from "@/components/ui/badge";

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const hasDrivers = product.drivers && product.drivers.length > 0;
  const hasTutorials = product.tutorials && product.tutorials.length > 0;

  const handleDriversRedirect = () => {
    if (hasDrivers) {
      router.push(`/drivers/download/${product.slug}`);
    }
  };

  const handleWarrantyRedirect = () => {
    router.push("/warranty");
  };

  const handleContactRedirect = () => {
    router.push("/contact-us");
  };

  const handleRegisterRedirect = () => {
    router.push("/contact-us");
  };

  return (
    <Tabs
      className="w-full bg-none space-y-10"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="flex w-full bg-transparent">
        <TabsTrigger
          className="flex items-center gap-2 px-6 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary font-medium"
          value="downloads"
        >
          <Download className="h-4 w-4" />
          Downloads
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center gap-2 px-6 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary font-medium"
          value="warranty"
        >
          <FileWarning className="h-4 w-4" />
          Warranty
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center gap-2 px-6 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary font-medium"
          value="tutorials"
        >
          <Youtube className="h-4 w-4" />
          Tutorials
        </TabsTrigger>
      </TabsList>

      <div>
        <TabsContent className="space-y-6" value="downloads">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <FileCog className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-medium">Drivers & Software</h3>
                <p className="text-muted-foreground">
                  Download the latest drivers and software for your{" "}
                  {product.name}
                </p>
                <Button
                  className="w-full mt-2 max-w-md"
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
        </TabsContent>

        <TabsContent className="space-y-6" value="warranty">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Warranty Information
                  </h3>
                  <p>
                    All {product.brand.name} products come with a standard
                    warranty to protect against manufacturing defects. Please
                    refer to your product documentation for specific warranty
                    terms.
                  </p>

                  <Alert className="my-4 border-amber-200 bg-amber-50">
                    <FileWarning className="h-4 w-4 text-amber-500" />
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      Warranty claims require proof of purchase and product
                      registration. Make sure to keep your receipt and register
                      your product within 30 days of purchase.
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

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <ClipboardCheck className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-medium">Register & Claim</h3>
                  <p className="text-muted-foreground">
                    Register your product and manage warranty claims
                  </p>
                  <Button
                    className="w-full mt-2"
                    onClick={handleRegisterRedirect}
                  >
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Register Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent className="space-y-10" value="tutorials">
          <div className="flex flex-col items-center justify-center mb-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Setup and Guide
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Follow our step-by-step tutorials to get the most out of your{" "}
              {product.name}
            </p>
          </div>

          {hasTutorials ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {product.tutorials.map((tutorial, idx) => (
                <Card
                  key={idx}
                  className={`overflow-hidden w-full max-w-2xl transform transition-all duration-300 ${
                    hoveredCard === idx ? "scale-102 shadow-lg" : "shadow-sm"
                  }`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative">
                    <div className="aspect-video">
                      <iframe
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="border-0"
                        height="100%"
                        src={`https://www.youtube.com/embed/${extractYouTubeID(
                          tutorial.link
                        )}`}
                        title={tutorial.description}
                        width="100%"
                      />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-black/70 hover:bg-black/70">
                      <Info className="h-3 w-3 mr-1" /> Tutorial
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2">
                      {tutorial.description}
                    </h3>
                    {/* <p className="text-muted-foreground text-sm">
                      Learn how to set up and use this feature of your{" "}
                      {product.name}
                    </p> */}
                  </CardContent>
                  <CardFooter className="px-5 pb-5 pt-0">
                    <a
                      className="text-primary font-medium text-sm flex items-center hover:underline"
                      href={tutorial.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <PlayCircle className="h-4 w-4 mr-1" /> Watch on YouTube
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center py-16">
                <Youtube className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-medium mb-2">
                  No Tutorials Available
                </h3>
                <p className="text-muted-foreground mt-2 max-w-lg">
                  There are currently no setup guides or tutorials available for
                  this product. Our team is working on creating helpful content.
                </p>
                <Button
                  className="mt-8"
                  size="lg"
                  variant="outline"
                  onClick={handleContactRedirect}
                >
                  <Contact className="mr-2 h-4 w-4" />
                  Contact Support for Help
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
