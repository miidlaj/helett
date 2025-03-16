"use client";

import type { LoginUserPayload } from "@/api/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { userApi } from "@/api/user";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  identifier: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

interface LoginFormProps {
  emailVerified: boolean;
}
export default function LoginForm({ emailVerified }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    if (emailVerified) {
      toast.success("Email verified successfully!", {
        description: "Please login to continue.",
      });
    }
  }, [emailVerified]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = await userApi.loginUser(values as LoginUserPayload);

      if (data.jwt) {
        await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.jwt }),
        });

        toast.success("Login successful!", {
          description: "You will be redirected to the drivers page.",
        });
        router.push("/drivers");
      } else {
        throw new Error("Login failed: missing token.");
      }
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    try {
      // Redirect to Strapi Google auth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`;
    } catch (error: any) {
      toast.error("Google authentication failed", {
        description:
          error.message || "An error occurred during Google authentication.",
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-medium text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Log in or sign up to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full mb-4 flex items-center justify-center gap-2"
            variant="outline"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              "Connecting..."
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button variant="link" onClick={() => router.push("/register")}>
            Don&apos;t have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
