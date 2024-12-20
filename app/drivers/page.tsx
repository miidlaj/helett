import React from "react";

import DriverTable from "./components/DriverTable";

import { Heading } from "@/components/Heading";
import { products } from "@/constants/products";

function DriverPage() {
  return (
    <div className="mx-20">
      <Heading className="text-center">Drivers</Heading>
      <DriverTable products={products} />
    </div>
  );
}

export default DriverPage;
