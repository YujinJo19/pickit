import { styled } from "styled-components";
import { OrderItemResponse } from "../../types/order";
import { toUrl } from "../../utils/image";

interface Props {
  item: OrderItemResponse;
}

const OrderItemRow = ({ item }: Props) => {
  return (
    <ItemBox>
      <Thumbnail src={toUrl(item.thumbnailUrl)} />
      <Info>
        <Name>{item.productName}</Name>
        <Option>
          {item.color} / {item.size}
        </Option>
        <Price>
          {item.unitDiscountPrice.toLocaleString()}원 × {item.quantity}개
        </Price>
      </Info>
      <Total>{item.lineTotal.toLocaleString()}원</Total>
    </ItemBox>
  );
};

export default OrderItemRow;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const Option = styled.div`
  font-size: 13px;
  color: #666;
`;

const Price = styled.div`
  font-size: 14px;
  margin-top: 4px;
`;

const Total = styled.div`
  font-weight: bold;
`;
