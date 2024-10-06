import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SingleProduct } from "@/components/SingleProduct";
import { products, ProductType } from "@/constants/products";

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

export default function SingleProjectPage({
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
    <main className={`w-full mx-auto py-20 px-4 md:px-10`}>
      <SingleProduct product={product} />
    </main>
  );
}
