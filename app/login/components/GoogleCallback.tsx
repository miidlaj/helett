"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ProfileCompletionModal } from "./ProfileCompleteModal";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Get the access_token and any error from URL params
      const accessToken = searchParams.get("access_token");
      const error = searchParams.get("error");

      if (error) {
        toast.error("Authentication failed", {
          description: error,
        });
        router.push("/login");
        return;
      }

      if (!accessToken) {
        toast.error("Authentication failed", {
          description: "No access token received",
        });
        router.push("/login");
        return;
      }

      try {
        // Exchange the access token for a JWT from Strapi
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/google/callback`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (!data.jwt) {
          throw new Error("Failed to get JWT token");
        }

        // Store the JWT in an HTTP-only cookie
        await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.jwt }),
        });

        // Check if this is a new user
        if (data.user && (!data.user.username || !data.user.phone)) {
          setIsNewUser(true);
          setShowProfileModal(true);
        } else {
          toast.success("Login successful!");
          router.push("/drivers");
        }
      } catch (error: any) {
        toast.error("Authentication failed", {
          description:
            error.message || "An error occurred during authentication",
        });
        router.push("/login");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const handleProfileComplete = async (profileData: {
    username: string;
    country?: string;
    phone: string;
  }) => {
    try {
      // Update user profile
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // We need to include the JWT token here, but we don't have direct access to it
            // from the HTTP-only cookie, so we'll need to create a server endpoint for this
          },
          credentials: "include", // This will send the cookies
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setShowProfileModal(false);
      toast.success("Profile updated successfully!");
      router.push("/drivers");
    } catch (error: any) {
      toast.error("Failed to update profile", {
        description: error.message || "An error occurred",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {showProfileModal ? (
        <ProfileCompletionModal
          isOpen={showProfileModal}
          onComplete={handleProfileComplete}
          isNewUser={isNewUser}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Authenticating with Google...</p>
        </div>
      )}
    </div>
  );
}
