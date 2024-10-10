import React from "react";

import DriverTable from "./components/DriverTable";

import { Heading } from "@/components/Heading";

function DriverPage() {
  return (
    <div className="my-32 mx-20">
      <Heading className="text-center">Drivers</Heading>
      <DriverTable />
    </div>
  );
}

export default DriverPage;
