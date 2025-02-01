import { productsApi } from "@/api/products";
import ProductPage from "./components/product-details";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const product = await productsApi.fetchProductBySlug(slug);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductPage product={product} />;
};

export default Page;
