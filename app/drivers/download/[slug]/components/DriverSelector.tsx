"use client";

import type React from "react";
import type { ProductDriver } from "@/api/types";

import { useState } from "react";

import OSDetector, { type OSType } from "./OSDetector";
import DriverList from "./DriverList";

interface DriverSelectorProps {
  drivers: ProductDriver[] | undefined;
}

const DriverSelector: React.FC<DriverSelectorProps> = ({ drivers }) => {
  const [selectedOS, setSelectedOS] = useState<OSType>("Unknown");

  const handleOSChange = (os: OSType) => {
    setSelectedOS(os);
  };

  return (
    <div>
      <OSDetector onOSChange={handleOSChange} />
      <DriverList drivers={drivers} selectedOS={selectedOS} />
    </div>
  );
};

export default DriverSelector;
