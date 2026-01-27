import React, { useEffect, useState } from "react";
import { getToken, getUserIdFromToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { getCart } from "../store/thunks/cartThunk";
import { getAddressList } from "../store/thunks/addressThunk";

const Order = () => {
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const cartItems = useSelector((state: any) => state.cart.items);
  const addresses = useSelector((state: any) => state.address.list);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getAllCart = async () => {
    try {
      await dispatch(getCart());
    } catch (e) {
      console.log(e);
      navigate("/login", { state: { redirectTo: "/cart" } });
    }
  };

  const id = getUserIdFromToken(getToken() || "");
  const getAllAddress = async () => {
    if (!id) return null;
    try {
      await dispatch(getAddressList(id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/login", { state: { redirectTo: "/cart" } });
    }
    getAllCart();
    getAllAddress();
  }, [id]);
  console.log(cartItems, addresses);

  return (
    <Container>
      <Title>주문/결제</Title>

      <Content>
        <Left>
          <Section>
            <SectionTitle>배송지 정보</SectionTitle>
            <AddressBox>
              <AddressRow>
                <Badge>집</Badge>
                <DefaultBadge>기본배송지</DefaultBadge>
                <ChangeButton>변경</ChangeButton>
              </AddressRow>
              <AddressText>홍길동 / 010-1111-2222</AddressText>
              <AddressText>
                [12345] 서울특별시 강남구 테헤란로 123-45, 301
              </AddressText>
              <RequestInput placeholder="배송요청사항을 입력해주세요" />
            </AddressBox>
          </Section>

          <Section>
            <SectionTitle>주문상품</SectionTitle>
            <ProductItem>
              <Thumbnail />
              <ProductInfo>
                <ProductName>여성용 기능성 티셔츠</ProductName>
                <OptionText>[옵션: BLACK / L]</OptionText>
              </ProductInfo>
              <Quantity>2개</Quantity>
              <Price>
                <CurrentPrice>27,000원</CurrentPrice>
                <OriginalPrice>30,000원</OriginalPrice>
              </Price>
            </ProductItem>
          </Section>
        </Left>

        <Right>
          <SummaryBox>
            <SummaryTitle>총결제금액</SummaryTitle>
            <SummaryRow>
              <span>상품금액</span>
              <span>+30,000</span>
            </SummaryRow>
            <SummaryRow>
              <span>할인금액</span>
              <span>-3,000</span>
            </SummaryRow>
            <SummaryRow>
              <span>배송비</span>
              <span>+2,500</span>
            </SummaryRow>
            <Divider />
            <TotalRow>
              <span>합계</span>
              <strong>29,500원</strong>
            </TotalRow>
            <OrderButton>결제하기</OrderButton>
          </SummaryBox>
        </Right>
      </Content>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Right = styled.div``;

const Section = styled.section`
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  background: #ffcc66;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;

const DefaultBadge = styled(Badge)`
  background: #f2f2f2;
`;

const ChangeButton = styled.button`
  margin-left: auto;
  background: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
`;

const AddressText = styled.p`
  font-size: 14px;
`;

const RequestInput = styled.input`
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  align-items: center;
  gap: 16px;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background: #eee;
  border-radius: 8px;
`;

const ProductInfo = styled.div``;

const ProductName = styled.p`
  font-weight: 600;
`;

const OptionText = styled.p`
  font-size: 13px;
  color: #777;
`;

const Quantity = styled.span`
  font-size: 14px;
`;

const Price = styled.div`
  text-align: right;
`;

const CurrentPrice = styled.p`
  font-weight: 600;
`;

const OriginalPrice = styled.p`
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
`;

const SummaryBox = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #ddd;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
`;

const OrderButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: #ffe1a6;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
