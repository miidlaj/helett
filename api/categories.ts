import { ApiResponse, Category } from "./types";

class CategoriesApiService {
  private static instance: CategoriesApiService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://helett-admin.onrender.com";
  }

  public static getInstance(): CategoriesApiService {
    if (!CategoriesApiService.instance) {
      CategoriesApiService.instance = new CategoriesApiService();
    }
    return CategoriesApiService.instance;
  }

  async fetchAllCategories(): Promise<ApiResponse<Category>> {
    try {
      const queryString = this.buildQueryString();
      const response = await fetch(
        `${this.baseUrl}/api/categories${queryString}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  private buildQueryString(): string {
    const queryParts: string[] = ["?populate=*"];

    // Ensure sorting in ascending order
    queryParts.push("sort=name:asc");

    // Set a higher pagination limit
    queryParts.push("pagination[pageSize]=1000");

    return queryParts.join("&");
  }
}

export const categoriesApi = CategoriesApiService.getInstance();