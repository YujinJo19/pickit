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
  images: [];
  inventory: InventoryType;
}

export interface InventoryType {
  color: string;
  size: string;
  quantity: number;
}
