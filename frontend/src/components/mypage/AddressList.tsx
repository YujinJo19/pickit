import React, { useState } from "react";
import { AddressType } from "../../types/user";
import AddressItem from "./AddressItem";
import { styled } from "styled-components";
import AddressFormModal from "./AddressFormModal";

interface Props {
  addressList: AddressType[];
}

const AddressList = ({ addressList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onComplete = (data: any) => {
    console.log(data);
  };

  const onClose = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <ListWrapper>
      <ListHeader>
        <span>{addressList.length}개</span>
        <button onClick={onClose}>주소 추가</button>
        {isOpen && <AddressFormModal onClose={onClose} onSubmit={onComplete} />}
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
