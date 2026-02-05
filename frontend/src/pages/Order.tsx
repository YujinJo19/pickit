import React, { useEffect, useMemo, useState } from "react";
import { getToken, getUserIdFromToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { getCart } from "../store/thunks/cartThunk";
import {
  createAddress,
  getAddressList,
  updateAddress,
} from "../store/thunks/addressThunk";
import { AddressType } from "../types/user";
import OneTimeAddressSection from "../components/order/OneTimeAddressSection";
import SelectedAddressView from "../components/order/SelectedAddressView";
import { toUrl } from "../utils/image";
import { CartItemType } from "../types/cart";
import AddressModal from "../components/order/AddressModal";
import { makeOrder } from "../store/thunks/orderThunk";

type AddressFlow =
  | "summary" // 선택된 배송지 요약
  | "select" // 배송지 목록에서 선택
  | "oneTime"; // 배송지 없거나 직접 입력

const Order = () => {
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [addressFlow, setAddressFlow] = useState<AddressFlow>("summary");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(
    null,
  );
  const cartItems = useSelector((state: any) => state.cart.items);
  const addresses = useSelector((state: any) => state.address.list);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 기본 배송지 설정
  const selectedAddress = useMemo(() => {
    return (
      addresses.find((a: AddressType) => a.id === selectedAddressId) || null
    );
  }, [addresses, selectedAddressId]);

  // 장바구니 리스트 불러오기
  const getAllCart = async () => {
    try {
      await dispatch(getCart());
    } catch (e) {
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

  // 주소 저장
  const createAddressFromOrder = async (addr: AddressType) => {
    const id = getUserIdFromToken(getToken() || "");
    if (!id) throw new Error("no user");

    const res = await dispatch(createAddress({ id, data: addr }));
    if (res.meta.requestStatus !== "fulfilled") {
      throw new Error("create failed");
    }
    return res.payload;
  };

  const handleOrder = async () => {
    if (!selectedAddressId) return;
    const data = { addressId: selectedAddressId };
    const response = await dispatch(makeOrder(data));

    if (response.meta.requestStatus === "fulfilled") {
      alert("주문이 성공했습니다.");
      navigate("/");
    } else {
      alert("주문이 실패했습니다. 다시 시도해주세요");
      navigate("/cart");
    }
  };

  // 초기 렌더링 (유저 정보, 장바구니, 주소)
  useEffect(() => {
    if (!getToken()) {
      navigate("/login", { state: { redirectTo: "/cart" } });
    }
    getAllCart();
    getAllAddress();
  }, [id]);

  // 기본 배송지 여부 확인 후 설정
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const defaultAddr =
        addresses.find((a: AddressType) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  // 총 가격 계산
  const finalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: CartItemType) => sum + item.totalPrice,
      0,
    );
  }, [cartItems]);

  useEffect(() => {
    if (addresses.length === 0) {
      setAddressFlow("oneTime");
      return;
    }
    if (selectedAddressId) {
      setAddressFlow("summary");
    }
  }, [addresses, selectedAddressId]);

  return (
    <>
      <Container>
        <Title>주문/결제</Title>
        <Content>
          <Left>
            <Section>
              <SectionTitle>배송지 정보</SectionTitle>
              {/* 요약 */}
              {addressFlow === "summary" && selectedAddress && (
                <SelectedAddressView
                  address={selectedAddress}
                  onChange={() => setAddressFlow("select")}
                  onEdit={(addr) => {
                    setEditingAddress(addr);
                    setAddressFlow("oneTime");
                  }}
                  deliveryRequest={deliveryRequest}
                  setDeliveryRequest={setDeliveryRequest}
                />
              )}

              {/* 배송지 선택 */}
              {addressFlow === "select" && addresses.length > 0 && (
                <AddressModal
                  addressList={addresses}
                  selectedId={selectedAddressId!}
                  onConfirm={(addr: AddressType) => {
                    setSelectedAddressId(addr.id);
                    setAddressFlow("summary");
                  }}
                  onClose={() => setAddressFlow("summary")}
                  onAdd={() => {
                    setEditingAddress(null);
                    setAddressFlow("oneTime");
                  }}
                />
              )}

              {/* 배송지 직접 입력 */}
              {addressFlow === "oneTime" && (
                <OneTimeAddressSection
                  defaultValues={editingAddress}
                  mode={editingAddress ? "edit" : "create"}
                  onApply={async (addr, save) => {
                    if (editingAddress) {
                      await dispatch(
                        updateAddress({
                          id,
                          addressId: editingAddress.id,
                          data: addr,
                        }),
                      );
                      setSelectedAddressId(editingAddress.id);
                    } else if (save) {
                      const saved = await createAddressFromOrder(addr);
                      setSelectedAddressId(saved.id);
                    }

                    await dispatch(getAddressList(id));
                    setEditingAddress(null);
                    setAddressFlow("summary");
                  }}
                />
              )}
            </Section>

            <Section>
              <SectionTitle>주문상품</SectionTitle>
              {cartItems.map((item: CartItemType) => (
                <ProductItem>
                  <Thumbnail src={toUrl(item.thumbnailUrl || "")} />
                  <ProductInfo>
                    <ProductName>{item.productName}</ProductName>
                    <OptionText>
                      옵션: {item.color} / {item.size}
                    </OptionText>
                  </ProductInfo>
                  <Quantity>x {item.quantity}</Quantity>
                  <Price>
                    <CurrentPrice>{item.price.toLocaleString()}원</CurrentPrice>
                    <TotalPrice>
                      {item.totalPrice.toLocaleString()}원
                    </TotalPrice>
                  </Price>
                </ProductItem>
              ))}
            </Section>
          </Left>

          <Right>
            <SummaryBox>
              <SummaryTitle>총결제금액</SummaryTitle>
              <SummaryRow>
                <span>상품금액</span>
                <span>+{finalPrice.toLocaleString()}</span>
              </SummaryRow>
              <SummaryRow></SummaryRow>
              <SummaryRow>
                <span>배송비</span>
                <span>+3000</span>
              </SummaryRow>
              <Divider />
              <TotalRow>
                <span>합계</span>
                <strong>{(finalPrice + 3000).toLocaleString()}원</strong>
              </TotalRow>
              <OrderButton onClick={handleOrder}>결제하기</OrderButton>
            </SummaryBox>
          </Right>
        </Content>
      </Container>
    </>
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
  transition: all 0.2s ease;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Badge = styled.span`
  background: #ffcc66;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  align-items: center;
  gap: 16px;
  margin: 10px 0;
`;

const Thumbnail = styled.img`
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
  font-size: 13px;
  color: #999;
`;

const TotalPrice = styled.p`
  font-weight: 600;
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
