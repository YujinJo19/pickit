import React from "react";
import { AddressType } from "../../types/user";
import { styled } from "styled-components";

interface Props {
  item: AddressType;
}

const AddressItem = ({ item }: Props) => {
  return (
    <ItemWrapper>
      <Left>
        <input type="checkbox" />
        <div>
          <div>
            {item.label}
            {item.isDefault && <Badge>기본배송지</Badge>}
          </div>
          <AddressLine>
            {item.recipientName} / {item.phone}
          </AddressLine>
          <AddressLine>
            [{item.zipCode}] {item.addressRaw}
          </AddressLine>
        </div>
      </Left>

      <Right>
        <button>수정</button>
      </Right>
    </ItemWrapper>
  );
};

export default AddressItem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
`;

const Right = styled.div`
  button {
    padding: 6px 14px;
    border: 1px solid #999;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const Badge = styled.span`
  font-size: 12px;
  margin-left: 8px;
  color: #ff9800;
  border: 1px solid #ff9800;
  border-radius: 12px;
  padding: 2px 8px;
`;

const AddressLine = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;
