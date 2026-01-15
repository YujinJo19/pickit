import React from "react";
import { AddressType } from "../../types/user";
import AddressItem from "./AddressItem";
import { styled } from "styled-components";

interface Props {
  addressList: AddressType[];
}

const AddressList = ({ addressList }: Props) => {
  return (
    <ListWrapper>
      <ListHeader>
        <span>{addressList.length}개</span>
        <button>새 배송지 등록</button>
      </ListHeader>

      {addressList.map((item) => (
        <AddressItem key={item.id} item={item} />
      ))}
    </ListWrapper>
  );
};

export default AddressList;

const ListWrapper = styled.div`
  border-top: 1px solid #ddd;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;

  button {
    padding: 8px 16px;
    border: 1px solid #999;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;
