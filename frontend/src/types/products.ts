export interface PageableType {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortType;
}

interface SortType {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ProductListType {
  categoryId: number;
  discountPrice: number;
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string | null;
}

export interface ProductDetailType {
  id: number;
  name: string;
  discountPrice: number;
  description: string;
  categoryId: number;
  images: string[];
  inventory: {
    id: number;
    color: string;
    size: string;
    quantity: number;
  }[];
  price: number;
}

export interface ProductCreateRequest {
  name: string;
  price: number;
  description: string;
  discountPrice: number;
  categoryId: number;
  categoryIdParent?: number;
  images: File[];
  inventory: {
    color: string;
    size: string;
    quantity: number;
  }[];
}
