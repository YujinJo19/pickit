import { useParams } from "react-router-dom";
import { OrderDetailResponse } from "../../types/order";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getOrderItem } from "../../store/thunks/orderThunk";
import OrderItemRow from "../../components/mypage/OrderItemRow";
import { styled } from "styled-components";

const OrderDetailPage = () => {
  const [orderItem, setOrderItem] = useState<OrderDetailResponse>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetail = async () => {
      const response = await dispatch(getOrderItem({ orderId: Number(id) }));
      if (response.meta.requestStatus === "fulfilled") {
        setOrderItem(response.payload);
      }
    };

    fetchOrderDetail();
  }, [id, dispatch]);
  if (!orderItem) return <Empty>주문 내역을 불러올 수 없습니다.</Empty>;
  return (
    <Container>
      <Title>주문 상세</Title>

      <InfoBox>
        <InfoRow>
          <span>주문번호</span>
          <strong>{orderItem.orderId}</strong>
        </InfoRow>
        <InfoRow>
          <span>상태</span>
          <Status>{orderItem.status}</Status>
        </InfoRow>
        <InfoRow>
          <span>주문일</span>
          <span>{orderItem.createdAt.slice(0, 10)}</span>
        </InfoRow>
      </InfoBox>

      <SectionTitle>주문 상품</SectionTitle>
      <ItemList>
        {orderItem.items.map((item) => (
          <OrderItemRow key={item.orderItemId} item={item} />
        ))}
      </ItemList>

      <TotalBox>
        <span>총 결제 금액</span>
        <strong>{orderItem.totalPrice.toLocaleString()}원</strong>
      </TotalBox>
    </Container>
  );
};

export default OrderDetailPage;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  background: #fafafa;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Status = styled.span`
  font-weight: 600;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    font-size: 20px;
  }
`;

const Empty = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;
`;
