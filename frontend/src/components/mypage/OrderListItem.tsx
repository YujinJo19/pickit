import { useNavigate } from "react-router-dom";
import { OrderListResponse } from "../../types/order";
import { styled } from "styled-components";

interface Props {
  order: OrderListResponse;
}

const OrderListItem = ({ order }: Props) => {
  const navigate = useNavigate();
  return (
    <ItemBox onClick={() => navigate(`/mypage/orders/${order.orderId}`)}>
      <Row>
        <OrderId>주문번호 {order.orderId}</OrderId>
        <Status>{order.status}</Status>
      </Row>
      <Price>{order.totalPrice.toLocaleString()}원</Price>
      <OrderDate>
        {new Date(order.createdAt).toLocaleDateString("ko-KR")}
      </OrderDate>
    </ItemBox>
  );
};

export default OrderListItem;

const ItemBox = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 16px;
  margin: 12px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const OrderId = styled.span`
  font-weight: 600;
`;

const Status = styled.span`
  font-size: 14px;
  color: #666;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const OrderDate = styled.p`
  font-size: 13px;
  color: #999;
`;
