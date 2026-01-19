import React, { useState } from "react";
import { AddressType } from "../../types/user";
import AddressItem from "./AddressItem";
import { styled } from "styled-components";
import AddressFormModal from "./AddressFormModal";
import { useAppDispatch } from "../../store/hooks";
import { getToken, getUserIdFromToken } from "../../utils/token";
import { createAddress, updateAddress } from "../../store/thunks/addressThunk";

interface Props {
  addressList: AddressType[];
  refreshAddressList: () => Promise<void>;
  selectedIds: number[];
  onToggle: (id: number) => void;
  handleDefaultAddress: (addressId: number) => void;
}

const AddressList = ({
  addressList,
  refreshAddressList,
  selectedIds,
  onToggle,
  handleDefaultAddress,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(
    null,
  );
  const dispatch = useAppDispatch();

  const openCreate = () => {
    setEditingAddress(null);
    setIsOpen(true);
  };

  const openEdit = (address: AddressType) => {
    setEditingAddress(address);
    setIsOpen(true);
  };

  const onComplete = async (data: any) => {
    const id = getUserIdFromToken(getToken() || "");
    if (!id) return;

    let response;
    if (editingAddress) {
      response = await dispatch(
        updateAddress({
          id,
          addressId: editingAddress.id,
          data,
        }),
      );
    } else {
      response = await dispatch(createAddress({ id, data }));
    }
    if (response.meta.requestStatus === "fulfilled") {
      await refreshAddressList();
      setIsOpen(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ListWrapper>
      <ListHeader>
        <span>{addressList.length}개</span>
        <button onClick={openCreate}>주소 추가</button>
      </ListHeader>

      {addressList.map((item) => (
        <AddressItem
          key={item.id}
          item={item}
          onEdit={openEdit}
          onToggle={onToggle}
          checked={selectedIds.includes(item.id)}
          handleDefaultAddress={handleDefaultAddress}
        />
      ))}
      {isOpen && (
        <AddressFormModal
          onClose={onClose}
          onSubmit={onComplete}
          defaultValues={editingAddress}
        />
      )}
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
