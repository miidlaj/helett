import { ProductQueryParams, ApiResponse, Product } from "./types";

class ProductsApiService {
  private static instance: ProductsApiService;
  private readonly baseUrl: string;
  private readonly defaultPageSize: number;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://helett-admin.onrender.com";
    this.defaultPageSize =
      Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 25;
  }

  public static getInstance(): ProductsApiService {
    if (!ProductsApiService.instance) {
      ProductsApiService.instance = new ProductsApiService();
    }

    return ProductsApiService.instance;
  }

  async fetchProducts(
    params: ProductQueryParams = {}
  ): Promise<ApiResponse<Product>> {
    try {
      const queryString = this.buildQueryString(params);
      const response = await fetch(
        `${this.baseUrl}/api/products${queryString}`,
        {
          next: {
            revalidate: 3600,
            tags: ["products"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async fetchProductBySlug(slug: string): Promise<Product | null> {
    try {
      const params: ProductQueryParams = {
        filters: {
          slug: slug,
        },
        populate: ["*"],
      };

      const response = await this.fetchProducts(params);

      return response.data[0] || null;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      throw error;
    }
  }

  private buildQueryString(params: ProductQueryParams): string {
    const queryParts: string[] = [];

    queryParts.push("populate[brand][populate]=*");
    queryParts.push("populate[category][populate]=*");
    queryParts.push("populate[drivers][populate]=*");
    queryParts.push("populate[details][populate]=*");
    queryParts.push("populate[apps][populate]=*");
    queryParts.push("populate[tutorials][populate]=*");
    queryParts.push("populate[images][populate]=*");
    queryParts.push("populate[wide_images][populate]=*");
    queryParts.push("populate[thumbnail][populate]=*");
    queryParts.push("populate[features][populate]=*");

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "search") {
            queryParts.push(
              `filters[$or][0][title][$containsi]=${encodeURIComponent(value)}`
            );
            queryParts.push(
              `filters[$or][1][description][$containsi]=${encodeURIComponent(
                value
              )}`
            );
            queryParts.push(
              `filters[$or][2][short_description][$containsi]=${encodeURIComponent(
                value
              )}`
            );
          } else if (Array.isArray(value)) {
            value.forEach((v) => {
              queryParts.push(`filters[${key}]=${encodeURIComponent(v)}`);
            });
          } else {
            queryParts.push(`filters[${key}]=${encodeURIComponent(value)}`);
          }
        }
      });
    }

    if (params.sort) {
      const { field, order } = params.sort;

      queryParts.push(`sort=${order === "desc" ? "-" : ""}${field}`);
    }

    if (params.pagination) {
      const { page, pageSize = this.defaultPageSize } = params.pagination;

      queryParts.push(`pagination[page]=${page}`);
      queryParts.push(`pagination[pageSize]=${pageSize}`);
    }

    return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  }
}

export const productsApi = ProductsApiService.getInstance();
