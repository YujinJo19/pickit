import { useEffect } from "react";
import { OrderListResponse } from "../../types/order";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getOrders } from "../../store/thunks/orderThunk";
import OrderListItem from "../../components/mypage/OrderListItem";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (orders.length === 0) return <p>주문 내역이 없습니다.</p>;

  return (
    <div>
      <h2>주문 내역</h2>
      {orders.map((order) => (
        <OrderListItem key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
