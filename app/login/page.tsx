import { Suspense } from "react";

import LoginForm from "./components/LoginForm";

type LoginPageProps = {
  searchParams: {
    email_verification?: string;
    [key: string]: string | string[] | undefined;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { email_verification } = await searchParams;
  const emailVerified = email_verification === "true";
  
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm emailVerified={emailVerified} />
      </Suspense>
    </div>
  );
}
