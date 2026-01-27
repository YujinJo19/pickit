import { axiosGet, axiosPost } from "./api";

// 주문 생성
export const makeOrder = (args: any) => {
  return axiosPost("/orders", args);
};

// 주문 조회
export const getOrders = (args: any) => {
  return axiosGet("/orders");
};

// 개별 주문 조회
export const getOrderItem = (args: any) => {
  return axiosGet(`/orders/${args.orderId}`);
};
