import React, { useEffect, useState } from "react";
import CartList from "../components/cart/CartList";
import { getToken, getUserIdFromToken } from "../utils/token";
import { useAppDispatch } from "../store/hooks";
import { getCart, updateQuantity } from "../store/thunks/cartThunk";
import Header from "../components/layout/header/Header";
import { styled } from "styled-components";
const SHIPPING_FEE = 3000;

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = getUserIdFromToken(getToken() || "");
  const dispatch = useAppDispatch();

  const fetchCart = async () => {
    const response = await dispatch(getCart(userId));
    if (response.meta.requestStatus === "fulfilled") {
      setCartList(response.payload.items);
      setTotalPrice(response.payload.totalPrice);
      console.log(response.payload);
    }
  };

  const handleQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return alert("최소 수량은 1개 이상입니다");
    const response = await dispatch(
      updateQuantity({ cartItemId, data: { quantity } }),
    );
    if (response.meta.requestStatus === "fulfilled") {
      fetchCart();
    }
  };

  const finalPrice = cartList.length > 0 ? totalPrice + SHIPPING_FEE : 0;

  useEffect(() => {
    if (userId === "") return;

    fetchCart();
  }, [dispatch, userId]);
  return (
    <>
      <Header />
      <Page>
        <Title>장바구니</Title>

        <Content>
          <Left>
            <CartList cartList={cartList} handleQuantity={handleQuantity} />
          </Left>

          <Right>
            <SummaryBox>
              <SummaryRow>
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </SummaryRow>
              <SummaryRow>
                <span>배송비</span>
                <span>
                  {cartList.length > 0 ? SHIPPING_FEE.toLocaleString() : 0}원
                </span>
              </SummaryRow>

              <Divider />

              <TotalRow>
                <span>총 결제 금액</span>
                <strong>{finalPrice.toLocaleString()}원</strong>
              </TotalRow>

              <OrderButton disabled={cartList.length === 0}>
                주문하기
              </OrderButton>
            </SummaryBox>
          </Right>
        </Content>
      </Page>
    </>
  );
};

export default Cart;

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Content = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  width: 320px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SummaryBox = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  position: sticky;
  top: 80px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 16px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background: #111;
  color: #fff;
  font-size: 16px;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
