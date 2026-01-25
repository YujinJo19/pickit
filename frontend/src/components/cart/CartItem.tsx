import React from "react";
import { CartItemType } from "../../types/cart";
import { styled } from "styled-components";
import { toUrl } from "../../utils/image";
import { useNavigate } from "react-router-dom";

type Props = {
  handleQuantity: (cartItemId: number, quantity: number) => void;
  handleDelete: (cartItemId: number) => void;
  cartItemId: number;
  productId: number;
  productName: string;
  thumbnailUrl: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  totalPrice: number;
  maxQuantity: number;
};
const CartItem = ({
  cartItemId,
  color,
  price,
  productId,
  productName,
  quantity,
  size,
  thumbnailUrl,
  totalPrice,
  maxQuantity,
  handleQuantity,
  handleDelete,
}: Props) => {
  const navigate = useNavigate();
  const isMax = quantity >= maxQuantity;
  return (
    <ItemWrapper>
      <Thumbnail src={toUrl(thumbnailUrl || "")} alt={productName} />
      <Content>
        <Top onClick={() => navigate(`/products/${productId}`)}>
          <ProductName>{productName}</ProductName>
          <Option>
            {color} / {size}
          </Option>
        </Top>

        <Bottom>
          <QuantityBox>
            <button onClick={() => handleQuantity(cartItemId, quantity - 1)}>
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantity(cartItemId, quantity + 1)}
              disabled={isMax}
            >
              +
            </button>
          </QuantityBox>

          <PriceBox>
            <UnitPrice>{price.toLocaleString()}원</UnitPrice>
            <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
          </PriceBox>
        </Bottom>

        <DeleteButton onClick={() => handleDelete(cartItemId)}>
          삭제
        </DeleteButton>
      </Content>
    </ItemWrapper>
  );
};

export default CartItem;

const ItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Option = styled.div`
  font-size: 12px;
  color: #777;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 24px;
    height: 24px;
  }
`;

const PriceBox = styled.div`
  text-align: right;
`;

const UnitPrice = styled.div`
  font-size: 12px;
  color: #999;
`;

const TotalPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  margin-top: 8px;
  align-self: flex-end;
  font-size: 12px;
  color: #999;
`;
