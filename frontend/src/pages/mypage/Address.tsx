import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getAddressList } from "../../store/thunks/addressThunk";
import { getToken, getUserIdFromToken } from "../../utils/token";
import { AddressType } from "../../types/user";
import AddressList from "../../components/mypage/AddressList";
import { styled } from "styled-components";

const Address = () => {
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<AddressType | null>(
    null
  );

  const dispatch = useAppDispatch();
  const token = getToken();
  const id = token ? getUserIdFromToken(token) : 0;

  const getAddressInfo = async () => {
    const response = await dispatch(getAddressList(id));

    if (response.meta.requestStatus === "fulfilled") {
      setAddressList(response.payload);
      setDefaultAddress(
        response.payload.find((addr: AddressType) => addr.isDefault) ?? null
      );
    }
  };

  useEffect(() => {
    getAddressInfo();
  }, []);

  return (
    <PageWrapper>
      <SectionTitle>등록된 배송지 보기</SectionTitle>

      {defaultAddress && (
        <DefaultAddressCard>
          <div>
            <Badge>기본배송지</Badge>
            <AddressText>
              {defaultAddress.recipientName} / {defaultAddress.phone}
            </AddressText>
            <AddressText>
              [{defaultAddress.zipCode}] {defaultAddress.addressRaw}
            </AddressText>
          </div>
        </DefaultAddressCard>
      )}

      <AddressList addressList={addressList} />
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
  margin-bottom: 8px;
`;

const AddressText = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;
