import { axiosDel, axiosGet, axiosPost, axiosPut } from "./api";

// 전체 상품 조회
export const getProduct = (args: { page?: number; size?: number }) => {
  const { page = 0, size = 10 } = args;
  return axiosGet("/products", { page, size });
};

// 상품 상세 조회
export const getProductDetail = (id: string) => axiosGet(`/products/${id}`);

// 카테고리별 상품 조회
export const productByCategory = (id: string) =>
  axiosGet(`/products/category/${id}`);

// 상품 검색
export const searchedProduct = (args: {
  page?: number;
  size?: number;
  keyword?: string;
}) => {
  const { page = 0, size = 10, keyword } = args;

  return axiosGet("/products/search", { keyword, page, size });
};
