export const products = [
  {
    category: "Printer",
    subCategory: "Label Printers",
    thumbnail: "/product/thumbnail.png",
    images: [
      "/product/1.png",
      "/product/2.png",
      "/product/3.png",
      "/product/4.png",
      "/product/5.png",
      "/product/6.png",
    ],
    stack: ["Printer", "Label Printer"],
    slug: "helette-h65c",

    href: "https://www.amazon.in/H65C-Portable-Bluetooth-Printing-Resolution/dp/B0D1P7SC46/ref=sr_1_5?sr=8-5",
    title: "Helett H65C",
    description:
      "Helett H65C Portable Bluetooth Thermal Label Printer(2in1)with Receipt Printer 58mm(Max Printing Width 2Inch)Connect Android iOS Phone&Laptop(USB cable)203DPI Resolution with 250 label(1Year Warranty)",
    content: (
      <div className="flex flex-col gap-1">
        <p>
          Versatile Printing: Print labels, price tags with ease, utilizing the
          printer{"'"}s 2-inch maximum printing width and 203 DPI resolution,
          ensuring crisp and professional-quality results.
        </p>
        <p>
          Wireless Connectivity: Seamlessly connect to your Android or iOS
          smartphone or tablet via Bluetooth for wireless printing convenience,
          or use the included USB cable to connect directly to your laptop or
          desktop computer.
        </p>

        <p>
          Thermal Printing Technology: Experience lightning-fast printing speeds
          and exceptional print quality with the printer{"'"}s advanced thermal
          printing technology, eliminating the need for messy ink cartridges and
          toners.
        </p>
        <p>
          Ready-to-Use: Start printing right out of the box with 250 labels
          included, allowing you to kickstart your printing tasks immediately
          without the need for additional supplies, saving you time and money.
        </p>
        <p>
          Exceptional Customer Support: Access prompt assistance for any
          installation or troubleshooting needs with the Helett H65C Portable
          Bluetooth Thermal Label Printer. Customer care number provided on the
          product ensures quick resolution of queries or issues, offering peace
          of mind and ensuring a smooth user experience from setup to ongoing
          use.
        </p>
      </div>
    ),
  },

  // {
  //   category: "Printer",
  //   subCategory: "Label Printers",
  //   productName: "Helett HE24",
  // },
  // {
  //   category: "Printer",
  //   subCategory: "Label Printers",
  //   productName: "Helett H30C",
  // },
  // {
  //   category: "Printer",
  //   subCategory: "Receipt Printers",
  //   productName: "Helett H58i",
  // },
  // {
  //   category: "Printer",
  //   subCategory: "Receipt Printers",
  //   productName: "Helett H80i",
  // },
  // {
  //   category: "Printer",
  //   subCategory: "Receipt Printers",
  //   productName: "Helett HE760",
  // },
  // {
  //   category: "Barcode Scanner",
  //   subCategory: "",
  //   productName: "Helett HT20",
  // },
  // {
  //   category: "Barcode Scanner",
  //   subCategory: "",
  //   productName: "Helett HT410",
  // },
  // {
  //   category: "Barcode Scanner",
  //   subCategory: "",
  //   productName: "Helett HT15",
  // },
  // {
  //   category: "Digital Door Lock",
  //   subCategory: "",
  //   productName: "Uniy UY610",
  // },
  // {
  //   category: "Digital Door Lock",
  //   subCategory: "",
  //   productName: "Uniy UY810",
  // },
  // {
  //   category: "Digital Door Lock",
  //   subCategory: "",
  //   productName: "Uniy UY720",
  // },
  // {
  //   category: "Digital Door Lock",
  //   subCategory: "",
  //   productName: "Helett HT210",
  // },
  // {
  //   category: "Digital Door Lock",
  //   subCategory: "",
  //   productName: "Helett HT320",
  // },
  // { category: "Microphone", subCategory: "", productName: "Uniy U19" },
  // { category: "Microphone", subCategory: "", productName: "Uniy UY16" },
  // {
  //   category: "Home&Office Tech",
  //   subCategory: "",
  //   productName: "Helett AC1200",
  // },
  // { category: "Grooming", subCategory: "", productName: "Helett HL96" },
  // {
  //   category: "Vehicle Accessories",
  //   subCategory: "",
  //   productName: "Helett Z567",
  // },
];

export type ProductType = (typeof products)[0];
