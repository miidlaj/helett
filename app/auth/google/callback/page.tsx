import { Suspense } from "react";

import GoogleCallback from "./components/GoogleCallback";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}
