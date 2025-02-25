/* eslint-disable no-console */
import {
  ApiResponse,
  User,
  RegisterUserPayload,
  LoginUserPayload,
} from "./types/index";

class UserApiService {
  private static instance: UserApiService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://helett-admin.onrender.com";
  }

  public static getInstance(): UserApiService {
    if (!UserApiService.instance) {
      UserApiService.instance = new UserApiService();
    }

    return UserApiService.instance;
  }

  async registerUser(payload: RegisterUserPayload): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.message?.[0]?.messages?.[0]?.message ||
            "Registration failed"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async loginUser(payload: LoginUserPayload): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.message?.[0]?.messages?.[0]?.message || "Login failed"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  async updateUserProfile(
    userId: number,
    profileData: Partial<RegisterUserPayload>,
    jwt: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Profile update failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      if (!token) {
        return false;
      }
      const response = await fetch(`${this.baseUrl}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error verifying token:", error);

      return false;
    }
  }
}

export const userApi = UserApiService.getInstance();
