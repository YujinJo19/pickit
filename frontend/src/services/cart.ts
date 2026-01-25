import { axiosDel, axiosGet, axiosPatch, axiosPost, axiosPut } from "./api";

// 전체 장바구니 조회
export const getCart = (args: any) => {
  return axiosGet("/cart");
};

// 장바구니 추가
export const addCart = (args: any) => {
  return axiosPost("/cart/items", args);
};

// 수량 변경
export const updateQuantity = (cartItemId: number, data: any) => {
  return axiosPatch(`/cart/items/${cartItemId}`, data);
};

// 개별 삭제
export const deleteItem = (cartItemId: number) => {
  return axiosDel(`/cart/items/${cartItemId}`);
};

// 장바구니 전체 삭제
export const deleteAll = (args: any) => {
  return axiosDel("/cart");
};
