import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  deleteAddresses,
  getAddressList,
  updateAddressDefault,
} from "../../store/thunks/addressThunk";
import { getToken, getUserIdFromToken } from "../../utils/token";
import { AddressType } from "../../types/user";
import AddressList from "../../components/mypage/AddressList";
import { styled } from "styled-components";

const Address = () => {
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<AddressType | null>(
    null,
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const id = getUserIdFromToken(getToken() || "");

  const fetchAddressList = async () => {
    if (!id) return;

    const response = await dispatch(getAddressList(id));
    if (response.meta.requestStatus === "fulfilled") {
      setAddressList(response.payload);
      setDefaultAddress(
        response.payload.find((addr: any) => addr.isDefault) ?? null,
      );
      setSelectedIds([]);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0 || !id) return;

    const result = window.confirm("배송지를 삭제하시겠습니까?");
    if (!result) return;

    const response = await dispatch(
      deleteAddresses({ id, addressIds: selectedIds }),
    );
    if (response.meta.requestStatus === "fulfilled") {
      await fetchAddressList();
    }
  };

  const handleDefaultAddress = async (addressId: number) => {
    if (!addressId || !id) return;
    const result = window.confirm(
      "선택한 배송지를 기본 배송지로 선택하시겠습니까?",
    );
    if (!result) return;

    const response = await dispatch(updateAddressDefault({ id, addressId }));
    if (response.meta.requestStatus === "fulfilled") {
      await fetchAddressList();
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    fetchAddressList();
  }, []);
  return (
    <PageWrapper>
      <SectionTitle>등록된 배송지 보기</SectionTitle>
      {defaultAddress && (
        <DefaultAddressCard>
          <div>
            <div>
              {defaultAddress.label}
              <Badge>기본배송지</Badge>
            </div>
            <AddressText>
              {defaultAddress.recipientName} / {defaultAddress.phone}
            </AddressText>
            <AddressText>
              [{defaultAddress.zipCode}] {defaultAddress.addressRaw}
            </AddressText>
          </div>
        </DefaultAddressCard>
      )}
      {addressList && (
        <div style={{ display: "flex", justifyContent: "right" }}>
          <DeleteButton
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
          >
            선택 삭제하기
          </DeleteButton>
        </div>
      )}
      <AddressList
        addressList={addressList}
        refreshAddressList={fetchAddressList}
        selectedIds={selectedIds}
        onToggle={toggleSelect}
        handleDefaultAddress={handleDefaultAddress}
      />
    </PageWrapper>
  );
};

export default Address;

const PageWrapper = styled.div`
  padding: 24px 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const DefaultAddressCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 32px;
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #ff9800;
  border: 1px solid #ff9800;
  border-radius: 12px;
  padding: 4px 10px;
  margin: 0 0 8px 8px;
`;

const AddressText = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: end;
  padding: 8px 16px;
  border: 1px solid #999;
  background: #fff;
  color: black;
  border-radius: 6px;
  cursor: pointer;
  margin: 5px 0;
  &:hover {
    background: red;
    color: white;
  }
`;
