export interface Image {
  id: number;
  name: string;
  url: string;
}

export interface ProductFeature {
  id: number;
  label: string;
  value: string;
}

export interface ProductDriver {
  id: number;
  OS: "WINDOWS" | "MAC" | "LINUX";
  link: string;
}

export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  title: string;
  description: string;
  slug: string;
  external_link: string;
  short_description: string;
  featured: boolean;
  brand: Brand;
  category: Category;
  thumbnail: Image;
  images: Image[];
  wide_images: Image[];
  features: ProductFeature[];
  details: ProductFeature[];
  apps: ProductApps[];
  tutorials: ProductTutorials[];
  drivers: ProductDriver[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductTutorials {
  id: number;
  link: string;
}

export interface ProductApps {
  id: number;
  OS: "ANDROID" | "IOS";
  link: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ProductQueryParams {
  filters?: {
    brand?: number | string | number[];
    category?: number | string | number[];
    featured?: boolean;
    search?: string;
    [key: string]: any;
  };
  sort?: {
    field: keyof Product;
    order: "asc" | "desc";
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
  populate?: string[];
}

// /types/user.ts
export interface ApiResponse<T> {
  jwt?: string;
  user?: T;
  message?: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
  country?: string;
  name?: string;
  mobile?: string;
  product?: string;
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
  country?: string;
  name?: string;
  mobile?: string;
  product?: string;
}

export interface LoginUserPayload {
  identifier: string;
  password: string;
}
