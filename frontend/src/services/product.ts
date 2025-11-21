import { axiosDel, axiosGet, axiosPatch, axiosPost } from "./api";

// 내 상품 조회
export const getProduct = (args: {
  sellerId?: string;
  page?: number;
  size?: number;
}) => {
  const { page = 0, size = 10 } = args;
  return axiosGet("/seller/products/mine", { page, size });
};

// 상품 상세 조회
export const getProductDetail = (id: string) => axiosGet(`/products/${id}`);

// 상품 등록
export const createProduct = (data: any) =>
  axiosPost("/seller/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 상품 수정
export const updateProduct = (data: any) =>
  axiosPatch(`/seller/products/${data.id}`, data);

// 상품 삭제
export const deleteProduct = (id: string) => axiosDel(`/seller/products/${id}`);
