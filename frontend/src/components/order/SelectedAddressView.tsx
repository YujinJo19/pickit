import React from "react";
import { styled } from "styled-components";
import { AddressType } from "../../types/user";

type Props = {
  address: AddressType;
  onChange: () => void;
  onEdit?: (addr: AddressType) => void;
  deliveryRequest: string;
  setDeliveryRequest: React.Dispatch<React.SetStateAction<string>>;
};
const SelectedAddressView = ({
  address,
  onChange,
  onEdit,
  deliveryRequest,
  setDeliveryRequest,
}: Props) => {
  return (
    <SummaryBox>
      <SummaryHeader>
        <LeftSide>
          <Badge>{address.label}</Badge>
          {address.isDefault && <DefaultBadge>기본배송지</DefaultBadge>}
        </LeftSide>
        <RightSide>
          <ChangeButton onClick={onChange}>변경</ChangeButton>
          {onEdit && (
            <ChangeButton
              onClick={() => {
                onEdit(address);
              }}
            >
              수정
            </ChangeButton>
          )}
        </RightSide>
      </SummaryHeader>
      <AddressText>{address.recipientName}</AddressText>
      <AddressText>{address.phone}</AddressText>
      <AddressText>
        {address.addressRaw}
        {address.addressDetail}
      </AddressText>
      <label>배송메시지: </label>
      <RequestInput
        value={deliveryRequest}
        onChange={(e) => setDeliveryRequest(e.target.value)}
        placeholder="배송 시 요청사항을 입력하세요"
      />
    </SummaryBox>
  );
};

export default SelectedAddressView;

const SummaryBox = styled.div`
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 16px;
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;
const LeftSide = styled.div``;

const RightSide = styled.div``;

const Badge = styled.span`
  background: #ffcc66;
  padding: 4px 8px;
  margin: 0 5px 0 0;
  border-radius: 6px;
  font-size: 12px;
`;

const DefaultBadge = styled(Badge)`
  background: #f2f2f2;
`;

const ChangeButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 0 5px 0 0;
  padding: 4px 10px;
  cursor: pointer;
`;

const AddressText = styled.p`
  font-size: 14px;
`;

const RequestInput = styled.input`
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
