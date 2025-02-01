import type React from "react";
import type { ProductDriver } from "@/api/types";
import type { OSType } from "./OSDetector";

import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface DriverListProps {
  drivers: ProductDriver[] | undefined;
  selectedOS: OSType;
}

const DriverList: React.FC<DriverListProps> = ({ drivers, selectedOS }) => {
  const getOSKey = (os: OSType): "WINDOWS" | "MAC" | "LINUX" | "UNKNOWN" => {
    switch (os) {
      case "Windows":
        return "WINDOWS";
      case "macOS":
        return "MAC";
      case "Linux":
        return "LINUX";
      default:
        return "UNKNOWN";
    }
  };

  const filteredDrivers = drivers?.filter(
    (driver) => driver.OS === getOSKey(selectedOS),
  );

  const router = useRouter();
  const handleDownload = (link: string) => {
    window.open(link, "_blank");
    router.push("/drivers/download/confirm");
  };

  if (!drivers || drivers.length === 0) {
    return <p>No drivers available for this product.</p>;
  }

  if (!filteredDrivers || filteredDrivers.length === 0) {
    return <p>No drivers available for {selectedOS}.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Available Drivers for {selectedOS}
      </h3>
      <ul className="space-y-4">
        {filteredDrivers.map((driver) => (
          <li
            key={driver.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <span>Driver for {driver.OS}</span>
            <Button
              className="flex items-center"
              onClick={() => handleDownload(driver.link)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
