/* eslint-disable no-console */
import { ApiResponse, Brand } from "./types";

class BrandsApiService {
  private static instance: BrandsApiService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL!;
  }

  public static getInstance(): BrandsApiService {
    if (!BrandsApiService.instance) {
      BrandsApiService.instance = new BrandsApiService();
    }

    return BrandsApiService.instance;
  }

  async fetchAllBrands(): Promise<ApiResponse<Brand>> {
    try {
      const queryString = this.buildQueryString();
      const response = await fetch(`${this.baseUrl}/api/brands${queryString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  private buildQueryString(): string {
    const queryParts: string[] = [
      "?populate=*",
      "sort=name:asc",
      "pagination[pageSize]=1000",
    ];

    return queryParts.join("&");
  }
}

export const brandsApi = BrandsApiService.getInstance();
