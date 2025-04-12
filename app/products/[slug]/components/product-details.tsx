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
  const [currentImage, setCurrentImage] = useState(product.thumbnail?.url);

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
                  {product?.category?.name}
                </Badge>
                {product?.featured && (
                  <Badge className="text-xs" variant="default">
                    Featured
                  </Badge>
                )}
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
                alt={product.brand?.name}
                height={100}
                src={product.brand?.image.url}
                width={100}
              />

              <p>{product.short_description}</p>

              <div className="grid grid-cols-4 gap-4">
                {[
                  ...(product?.thumbnail ? [product.thumbnail] : []),
                  ...(Array.isArray(product?.images) ? product.images : []),
                ].map((img, idx) => (
                  <motion.div
                    key={idx}
                    className={`aspect-square rounded-lg overflow-hidden bg-white p-2 cursor-pointer border ${
                      currentImage === img?.url ? "ring-primary ring-2" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImage(img?.url)}
                  >
                    <img
                      alt=""
                      className="w-full h-full object-contain"
                      src={img?.url}
                    />
                  </motion.div>
                ))}
              </div>
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

                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <Image
                            alt={product.brand?.name}
                            height={60}
                            src={product.brand?.image.url}
                            width={60}
                          />
                        </div>
                        <p className="text-gray-600 flex-grow">
                          {product.brand?.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <Image
                            alt={product.category?.name}
                            height={40}
                            src={
                              product.category?.image.url || "/placeholder.svg"
                            }
                            width={40}
                          />
                          <h3 className="text-xl font-semibold ml-4">
                            {product.category?.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 flex-grow">
                          {product.category?.description}
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
                  {product.wide_images?.map((img, idx) => (
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

              <div className="flex flex-wrap justify-center items-center gap-4">
                {product.apps && product.apps.length > 0 ? (
                  product.apps.map((app, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        aria-label={
                          app.OS === "ANDROID"
                            ? "Get it on Google Play"
                            : "Download on the App Store"
                        }
                        className="flex items-center px-5 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                        href={app.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="mr-3 text-black">
                          {app.OS === "ANDROID" ? (
                            <svg
                              fill="none"
                              height={24}
                              viewBox="0 0 24 24"
                              width={24}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                d="M2.4707 2.80249C2.4707 2.6567 2.48231 2.52027 2.50449 2.39375L11.5857 11.9809L2.48993 21.5833C2.47725 21.4845 2.4707 21.3802 2.4707 21.2706V2.80249ZM3.47154 22.7597C3.80573 22.8136 4.20192 22.7323 4.62581 22.4956L15.6848 16.3083L12.6337 13.0871L3.47154 22.7597ZM13.6815 11.9809L17.0551 15.5423L21.1651 13.2432C22.35 12.5794 22.35 11.4938 21.1651 10.8316L16.9853 8.49308L13.6815 11.9809ZM15.6154 7.72664L4.62581 1.57828C4.28486 1.38706 3.96173 1.29688 3.67506 1.29688C3.63795 1.29688 3.60144 1.29837 3.56557 1.30136L12.6337 10.8746L15.6154 7.72664Z"
                                fill="black"
                                fillRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              fill="none"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>App Store</title>
                              <path
                                d="M17.0516 12.5C17.0705 11.0054 17.8576 9.61865 19.1667 8.83335C18.3484 7.67885 17.0455 6.9635 15.6667 6.91668C14.1667 6.75001 12.6667 7.83335 11.9167 7.83335C11.1667 7.83335 9.83334 6.93335 8.58334 6.96668C6.91668 7.03335 5.41668 8.00001 4.58334 9.50001C2.83334 12.5667 4.16668 17.2167 5.83334 19.8333C6.66668 21.1 7.66668 22.5333 9.00001 22.4833C10.2833 22.4333 10.75 21.6667 12.3333 21.6667C13.9167 21.6667 14.3333 22.4833 15.6667 22.45C17.0516 22.4167 17.8667 21.1 18.6667 19.8333C19.25 18.9833 19.6898 18.0318 19.9667 17.0333C18.2167 16.3333 17.0516 14.5333 17.0516 12.5Z"
                                fill="currentColor"
                              />
                              <path
                                d="M14.8333 4.83335C15.5833 3.95001 15.9608 2.81815 15.8667 1.66668C14.7546 1.80212 13.7384 2.36306 13 3.20001C12.2547 4.02637 11.8656 5.12044 11.95 6.25001C13.088 6.25895 14.1334 5.73705 14.8333 4.83335Z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs text-gray-600">
                            {app.OS === "ANDROID"
                              ? "Get it on"
                              : "Download on the"}
                          </span>
                          <span className="text-sm font-semibold">
                            {app.OS === "ANDROID" ? "Google Play" : "App Store"}
                          </span>
                        </span>
                      </a>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">No download options available</p>
                )}
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
