"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { ProfileCompletionModal } from "../../../../login/components/ProfileCompleteModal";

import { userApi } from "@/api/user";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get("access_token");
      const idToken = searchParams.get("id_token");
      const error = searchParams.get("error");

      if (error) {
        toast.error("Authentication failed", {
          description: error,
        });
        router.push("/login");

        return;
      }

      if (!accessToken || !idToken) {
        toast.error("Authentication failed", {
          description: "No access token received",
        });
        router.push("/login");

        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/google/callback${location.search}`
        );

        const data = await response.json();

        if (!data.jwt) {
          throw new Error("Failed to get JWT token");
        }

        await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.jwt }),
        });

        localStorage.setItem("user", JSON.stringify(data));
        if (data.user && !data.user.phone) {
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
    product: string;
    country?: string;
    phone: string;
  }) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user") || "")?.user.id;
      const profileUpdatePayload = {
        country: profileData.country,
        mobile: profileData.phone,
        product: parseInt(profileData.product),
      };

      await userApi.updateUserProfile(userId, profileUpdatePayload);

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
          isNewUser={isNewUser}
          isOpen={showProfileModal}
          onComplete={handleProfileComplete}
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
