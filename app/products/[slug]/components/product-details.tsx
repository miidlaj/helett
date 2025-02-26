"use client";

import { motion } from "framer-motion";
import { Tags, Youtube } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Product } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProductPage({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(product.thumbnail.url);

  const extractYouTubeID = (url: string) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?\/]+)/);

    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden bg-white">
              <motion.img
                key={currentImage}
                alt={product.name}
                animate={{ opacity: 1 }}
                className="w-full h-full object-contain max-h-[400px]"
                initial={{ opacity: 0 }}
                src={currentImage}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.thumbnail, ...product.images].map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden bg-white p-2 cursor-pointer border"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImage(img.url)}
                >
                  <img
                    alt=""
                    className="w-full h-full object-contain"
                    src={img.url}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-xs" variant="secondary">
                  <Tags className="w-3 h-3 mr-1" />
                  {product.category.name}
                </Badge>
                <Badge className="text-xs" variant="default">
                  Featured
                </Badge>
              </div>
              <LinkPreview
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                url={product.external_link}
              >
                <h1 className="text-4xl font-bold text-primary">
                  {product.title}
                </h1>
              </LinkPreview>

              <Image
                alt={product.brand.name}
                height={100}
                src={product.brand.image.url}
                width={100}
              />

              <p>{product.short_description}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 relative">
          <Tabs className="w-full" defaultValue="overview">
            <TabsList className="w-full flex gap-5 justify-center bg-transparent">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent className="mt-6 space-y-10" value="overview">
              <div className="grid gap-6 grid-cols-1">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                        className="text-gray-600"
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6 space-y-5">
                        <Image
                          alt={product.brand.name}
                          height={100}
                          src={product.brand.image?.url}
                          width={100}
                        />

                        <p className="text-gray-600">
                          {product.brand.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6 space-y-5">
                        <Image
                          alt={product.category.name}
                          height={50}
                          src={product.category.image?.url}
                          width={50}
                        />

                        <p className="text-gray-600">
                          {product.category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {product.wide_images.map((img, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-white">
                          <img
                            alt={`${product.name} - View ${idx + 1}`}
                            className="w-full h-full object-contain"
                            src={img.url}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </div>

              <div className="space-y-4 flex justify-center gap-5 items-center">
                {product.apps.map((app, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      className="block"
                      href={app.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={`Download on ${app.OS}`}
                        className="h-16 w-auto"
                        src={
                          app.OS === "ANDROID"
                            ? "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                            : "https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                        }
                      />
                    </a>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent className="mt-6" value="features">
              <div className="">
                <FeaturesSection features={product.features} />
              </div>
            </TabsContent>

            <TabsContent className="mt-6" value="specs">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {product.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          {detail.label}
                        </h3>
                        <div className="space-y-3">
                          <motion.div className="flex flex-col space-y-1 border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                            <span className="font-medium">{detail.value}</span>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent className="space-y-6" value="support">
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
                          title={tutorial.link}
                          width="100%"
                        />
                      </div>
                      <div className="p-4">
                        {/* <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {tutorial.title}
                      </h3> */}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
