import type React from "react";

import { PackageX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No products found",
  description = "There are no featured products in this category at the moment.",
  icon = <PackageX className="h-12 w-12 text-muted-foreground/50" />,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="rounded-full bg-muted p-6 mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-center mt-4">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mt-2">
        {description}
      </p>
    </div>
  );
}
