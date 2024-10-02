"use client";
import Image from "next/image";
import React from "react";

import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function FeaturedProducts() {
  const cards = data.map((card, index) => (
    <Card key={card.src} layout card={card} index={index} />
  ));

  const categories = [
    {
      label: "Pinter",
      value: "printer",
    },
    {
      label: "Barcode Scanner",
      value: "barcode_scanner",
    },
    {
      label: "Digital Door Lock",
      value: "digital_door_lock",
    },
    {
      label: "Microphone",
      value: "microphone",
    },
    {
      label: "Home & Office Tech",
      value: "home_office_tech",
    },
    {
      label: "Grooming",
      value: "grooming",
    },
    {
      label: "Vehicle Accessories",
      value: "vehicle_accessories",
    },
  ];

  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Product Tab</p>
          <Carousel items={cards} />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Services tab</p>
          <Carousel items={cards} />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
          <Carousel items={cards} />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
          <Carousel items={cards} />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold ">
          <Carousel items={cards} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full py-20 max-w-full overflow-hidden">
      <h1 className="text-3xl font-new-york-large py-5 text-center">
        Featured Products
      </h1>

      <Tabs className="w-full" defaultValue={categories[0].value}>
        <TabsList className="w-full flex gap-5 justify-center bg-transparent">
          {categories.map((cat, index) => (
            <TabsTrigger key={index} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat, index) => (
          <TabsContent key={index} value={cat.value}>
            <Carousel items={cards} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const data = [
  {
    category: "Scanner",
    title: "Wireless Barcode Scanner",
    src: "https://m.media-amazon.com/images/I/51RHBMtPBzL._SX450_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett® HT20 Wireless 2.4GHz 2D & 1D Barcode Scanner(QR Code &
            Barcode)Wireless &Wired(Charging Battery)Connectivity |Induction
            Scanning|Ideal for Retail Shop & Supermarket|Strong ABS (1Year
            Warranty)
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61gDC77DxbL._SX450_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/6129V+OjLtL._SX450_.jpg"
          width="500"
        />
      </div>
    ),
  },
  {
    category: "Printer",
    title: "Shipping Label Printer",
    src: "https://m.media-amazon.com/images/I/612YWtTKgIL._SX466_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett® H30C USB Direct 4×6&quot; Shipping Label Printer
            |Adjustable Label Size| 203DPI Resolution 152mm/s Printing Speed
            Compatible with Windows,Mac,Linux Chrome OS (1Year Warranty) White
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61+Rd8HcK+L._SX466_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61kJZATE28L._SX466_.jpg"
          width="500"
        />
      </div>
    ),
  },
  {
    category: "Printer",
    title: "Thermal Label Printer",
    src: "https://m.media-amazon.com/images/I/51pi4DwBZGL._SY450_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett H65C Portable Bluetooth Thermal Label Printer(2in1)with
            Receipt Printer 58mm(Max Printing Width 2Inch)Connect Android iOS
            Phone&Laptop(USB cable)203DPI Resolution with 250 label(1Year
            Warranty)
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61NbtlOKGoL._SY450_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61J9hOZp3WL._SY450_.jpg"
          width="500"
        />
      </div>
    ),
  },

  {
    category: "Router",
    title: "1200 Mbps 6 Wi-Fi Router ",
    src: "https://m.media-amazon.com/images/I/61y7BzqEnqL._SY450_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett® AC1200 Dual Band (2.4GHz & 5GHz) 1200 Mbps 6 Wi-Fi Router |
            6 High-Gain Antennas(5dBi) 300 Meter Wi-Fi Range | AP, Repeater &
            Mesh Mode with 1 WAN & 4 Ethernet Ports (1 Year Warranty) White
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/71v2CjYtQWL._SY450_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/71fSksdPNIL._SY450_.jpg"
          width="500"
        />
      </div>
    ),
  },
  {
    category: "Hair Dryer",
    title: "Wall Mounted Hair Dryer",
    src: "https://m.media-amazon.com/images/I/31vGwuPLB0L._SX300_SY300_QL70_FMwebp_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett® HL96 Professional 2000 Watts Wall Mounted Hair Dryer For
            Men&Women|Blue Ray Ion Technology|Overheat Protection|Up to 20000
            RPM|Low Noise|Rear Metal Mesh Guard|Strong ABS (1Year Warranty)
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/7114YQJcjFL._SX679_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/71whXfzUwML._SX679_.jpg"
          width="500"
        />
      </div>
    ),
  },
  {
    category: "Lock",
    title: "Fingerprint Lock",
    src: "https://m.media-amazon.com/images/I/51W4Eq-RanL._SX569_.jpg",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 flex flex-col gap-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Helett H65C Portable Bluetooth Thermal Label Printer(2in1)with
            Receipt Printer 58mm(Max Printing Width 2Inch)Connect Android iOS
            Phone&Laptop(USB cable)203DPI Resolution with 250 label(1Year
            Warranty)
          </span>
        </p>
        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61PsQ+KX83L._SX569_.jpg"
          width="500"
        />

        <Image
          alt=" Helett® HT20 Wireless Product Image"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          height="500"
          src="https://m.media-amazon.com/images/I/61g-9fmbcPL._SX569_.jpg"
          width="500"
        />
      </div>
    ),
  },
];
