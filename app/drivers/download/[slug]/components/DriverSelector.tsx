"use client";

import type React from "react";
import type { Product } from "@/api/types";

import { useState } from "react";

import OSDetector, { type OSType } from "./OSDetector";
import DriverList from "./DriverList";

interface DriverSelectorProps {
  product: Product | null;
}

const DriverSelector: React.FC<DriverSelectorProps> = ({ product }) => {
  const [selectedOS, setSelectedOS] = useState<OSType>("Unknown");

  const handleOSChange = (os: OSType) => {
    setSelectedOS(os);
  };

  return (
    <div>
      <OSDetector onOSChange={handleOSChange} />
      <DriverList product={product} selectedOS={selectedOS} />
    </div>
  );
};

export default DriverSelector;
