import { axiosDel, axiosGet, axiosPost, axiosPut } from "./api";

// 내 상품 조회
export const getProductMine = (args: { page?: number; size?: number }) => {
  const { page = 0, size = 10 } = args;
  return axiosGet("/seller/products/mine", { page, size });
};

// 상품 등록
export const createProduct = (data: any) => {
  return axiosPost("/seller/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 상품 수정
export const updateProduct = (formData: any, productId: any) => {
  return axiosPut(`/seller/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 상품 삭제
export const deleteProduct = (id: string) => {
  return axiosDel(`/seller/products/${id}`);
};
