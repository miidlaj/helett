import ProductPage from "./components/product-details";

import { productsApi } from "@/api/products";

type tParams = Promise<{ slug: string }>;

export default async function Page(props: { params: tParams }) {
  const { slug } = await props.params;

  const product = await productsApi.fetchProductBySlug(slug);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductPage product={product} />;
}
