export type OrderStatus =
  | "CREATED"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export interface OrderListResponse {
  orderId: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  orderItemId: number;
  color: string;
  size: string;
  unitDiscountPrice: number;
  lineTotal: number;
  thumbnailUrl: string;
}

export interface OrderDetailResponse {
  orderId: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;

  addressId: number;
  items: OrderItemResponse[];
}
