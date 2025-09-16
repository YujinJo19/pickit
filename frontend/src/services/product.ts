import { axiosDel, axiosGet, axiosPatch, axiosPost } from "./api";

// 내 상품 조회
export const getProduct = (sellerId: string) =>
  axiosGet("/seller/products/mine", { sellerId });

// 상품 등록
export const createProduct = (data: any) => axiosPost("/seller/products", data);

// 상품 수정
export const updateProduct = (data: any) =>
  axiosPatch(`/seller/products/${data.id}`, data);

// 상품 삭제
export const deleteProduct = (id: string) => axiosDel(`/seller/products/${id}`);
