import { Metadata } from "next";
import { redirect } from "next/navigation";

import ProductSpecs from "./components/ProductSpecs";

import { products, ProductType } from "@/constants/products";
import FixedBar from "../components/FixedBar";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug) as
    | ProductType
    | undefined;

  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  } else {
    return {
      title: "Projects | John Doe",
      description:
        "John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
    };
  }
}

export default function SingleProductSpecsPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    redirect("/projects");
  }

  return (
    <div className="w-full relative">
      <FixedBar page="specs" product={product} />
      <div className="mx-auto py-14 px-4 md:px-10">
        <ProductSpecs product={product} />
      </div>
    </div>
  );
}
