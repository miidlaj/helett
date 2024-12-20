import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/app/drivers/components/ProgressBar";
import Link from "next/link";

export default function DownloadConfirmation() {
  const steps = ["Identify", "Download", "Install"];

  return (
    <div className="container mx-auto px-4">
      <ProgressBar currentStep={3} steps={steps} />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Congrats! Your download has started in your browser window.
          </h1>
          <p className="mb-4">
            Next, you&apos;ll need to install your downloaded files...
          </p>
          <p className="mb-4">
            Locate the file within your browser window, and double-click to
            begin installing.
          </p>
          <p className="text-sm text-gray-600">
            The file can also be located in the &apos;Downloads&apos; folder on
            your computer. We recommend restarting your computer after
            installation.
          </p>
        </div>
        <div>
          <Card className="bg-gray-100">
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="w-full h-6 bg-gray-200 rounded mb-4" />
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-1/2 h-4 bg-gray-200 rounded" />
              </div>
              <div className="mt-4 flex justify-center">
                <div className="border border-green-500 rounded-full px-4 py-2 text-green-500 text-sm">
                  Click on file to install
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/drivers/choose">
          <Button variant="link">
            Download more Drivers
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
