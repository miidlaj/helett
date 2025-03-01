import { Suspense } from "react";

import LoginForm from "./components/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    email_verification?: string;
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const { email_verification } = resolvedSearchParams;
  const emailVerified = email_verification === "true";

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm emailVerified={emailVerified} />
      </Suspense>
    </div>
  );
}
