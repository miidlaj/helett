import Link from "next/link";

import NotFoundWhatYouLookingFor from "./components/NotFound";

import { Card, CardContent } from "@/components/ui/card";
import { categoriesApi } from "@/api/categories";

function ProgressBar({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {index + 1}
          </div>
          <div
            className={`ml-2 ${index + 1 <= currentStep ? "text-primary" : "text-muted-foreground"}`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-px w-16 mx-2 ${index + 1 < currentStep ? "bg-primary" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default async function DriverChoosingPage() {
  const steps = ["Identify", "Download", "Install"];
  const categories = (await categoriesApi.fetchAllCategories()).data;

  return (
    <div className="">
      <ProgressBar currentStep={1} steps={steps} />

      <NotFoundWhatYouLookingFor />
      <h1 className="text-2xl font-semibold text-primary mb-2">
        Welcome to Helett Software and Drivers
      </h1>
      <h2 className="text-3xl font-medium mb-8">
        Select your product type below
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="hover:shadow-md transition-shadow cursor-pointer hover-scale"
          >
            <Link href={`/drivers/${cat.slug}`}>
              <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                <img
                  alt={cat.name}
                  className="w-10 h-10 text-primary mb-3"
                  src={cat.image?.url || ""}
                />
                <h3 className="text-sm font-semibold text-center">
                  {cat.name}
                </h3>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
