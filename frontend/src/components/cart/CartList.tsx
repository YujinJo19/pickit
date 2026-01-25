import React from "react";
import CartItem from "./CartItem";
import { CartItemType } from "../../types/cart";
import { styled } from "styled-components";

type Props = {
  cartList: CartItemType[];
  handleQuantity: (cartItemId: number, quantity: number) => void;
  handleDelete: (cartItemId: number) => void;
};
const CartList = ({ cartList, handleQuantity, handleDelete }: Props) => {
  if (!cartList || cartList.length === 0) {
    return (
      <EmptyWrapper>
        <EmptyTitle>장바구니가 비어 있어요</EmptyTitle>
        <EmptyDesc>마음에 드는 상품을 담아보세요</EmptyDesc>
      </EmptyWrapper>
    );
  }

  return (
    <ListWrapper>
      {cartList.map((item) => (
        <CartItem
          key={item.cartItemId}
          cartItemId={item.cartItemId}
          color={item.color}
          price={item.price}
          productId={item.productId}
          productName={item.productName}
          quantity={item.quantity}
          size={item.size}
          thumbnailUrl={item.thumbnailUrl}
          totalPrice={item.totalPrice}
          maxQuantity={item.maxQuantity}
          handleQuantity={handleQuantity}
          handleDelete={handleDelete}
        />
      ))}
    </ListWrapper>
  );
};

export default CartList;

const ListWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const EmptyWrapper = styled.div`
  max-width: 900px;
  margin: 80px auto;
  text-align: center;
  color: #777;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const EmptyDesc = styled.div`
  font-size: 14px;
`;
