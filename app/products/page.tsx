import React, { Suspense } from "react";

import ProductList from "./components/ProductList";

function ProductPage() {
  return (
    <Suspense fallback={<>Loading</>}>
      <ProductList />
    </Suspense>
  );
}

export default ProductPage;
