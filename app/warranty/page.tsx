"use client";
import React from "react";
import Image from "next/image";

export default function WarrantyPage() {
  return (
    <main className="max-w-2xl mx-auto antialiased pt-4 relative">
      {dummyContent.map((item, index) => (
        <div key={`content-${index}`} className="mb-10">
          <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
            {item.badge}
          </h2>

          <p className={"text-xl mb-4"}>{item.title}</p>

          <div className="text-sm  prose prose-sm dark:prose-invert">
            {item?.image && (
              <Image
                alt="blog thumbnail"
                className="rounded-lg mb-10 object-cover dark:hidden"
                height="500"
                src={item.image}
                width="500"
              />
            )}

            {item?.darkImage && (
              <Image
                alt="blog thumbnail"
                className="rounded-lg mb-10 object-cover dark:flex hidden"
                height="500"
                src={item.darkImage}
                width="500"
              />
            )}
            {item.description}
          </div>
        </div>
      ))}
    </main>
  );
}

const dummyContent = [
  {
    title: "About Warranty",
    description: (
      <>
        <h1 className="text-2xl font-bold mb-4">Helett Product Warranty</h1>
        <p>
          <strong>Warranty Duration:</strong> All Helett products come with a
          standard one-year warranty from the date of purchase.
        </p>
        <h2 className="text-xl font-semibold mt-4">Coverage:</h2>
        <p>
          This warranty covers defects in materials and workmanship under normal
          use and service. It applies to the original purchaser and is
          non-transferable.
        </p>
        <h2 className="text-xl font-semibold mt-4">Exclusions:</h2>
        <ul className="list-disc list-inside">
          <li>Misuse or abuse of the product</li>
          <li>Unauthorized repairs or modifications</li>
          <li>Accidental damage or natural disasters</li>
          <li>Normal wear and tear</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4">Claim Process:</h2>
        <ol className="list-decimal list-inside">
          <li>
            Contact Helett Customer Support at{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:support@helett.com"
            >
              support@helett.com
            </a>{" "}
            or call us at [Customer Service Phone Number].
          </li>
          <li>
            Provide proof of purchase, including the purchase date and location.
          </li>
          <li>Describe the issue with the product and any relevant details.</li>
        </ol>
        <h2 className="text-xl font-semibold mt-4">Repair or Replacement:</h2>
        <p>
          Upon approval of the warranty claim, Helett will either repair or
          replace the defective product at its discretion. The customer will be
          responsible for shipping costs to return the product to our facility.
        </p>
        <h2 className="text-xl font-semibold mt-4">Limitation of Liability:</h2>
        <p>
          Helett’s liability is limited to the cost of the product. In no event
          shall Helett be liable for any incidental or consequential damages
          arising from the use of this product.
        </p>
        <h2 className="text-xl font-semibold mt-4">Contact Information:</h2>
        <p>
          For further questions or assistance, please reach out to our Customer
          Support Team:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:support@helett.com"
            >
              support@helett.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> [Customer Service Phone Number]
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a className="text-blue-600 underline" href="http://www.helett.com">
              www.helett.com
            </a>
          </li>
        </ul>
        <p className="mt-4">
          Thank you for choosing Helett! We are committed to providing you with
          high-quality products and excellent customer service.
        </p>
      </>
    ),
    badge: "helett",
    image: "/helett-logo-black.svg",
    darkImage: "/helett-logo-white.svg",
  },
];
