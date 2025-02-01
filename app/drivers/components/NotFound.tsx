import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

function NotFoundWhatYouLookingFor() {
  return (
    <div className="bg-muted p-4 rounded-md mb-8">
      <p className="text-sm">
        Not found what you are looking for?
        <Button variant={"link"}>
          <Link
            className="text-primary hover:underline ml-1"
            href="/contact-us"
          >
            Contact Us
          </Link>
        </Button>
      </p>
    </div>
  );
}

export default NotFoundWhatYouLookingFor;
