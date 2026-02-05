import React, { useState } from "react";
import { AddressType } from "../../types/user";
import { styled } from "styled-components";

type Props = {
  addressList: AddressType[];
  selectedId: number;
  onConfirm: (addr: AddressType) => void;
  onClose: () => void;
  onAdd: () => void;
};
const AddressModal = ({
  addressList,
  selectedId,
  onConfirm,
  onClose,
  onAdd,
}: Props) => {
  const [tempId, setTempId] = useState(selectedId);

  return (
    <Overlay>
      <ModalBox>
        <Header>
          <h3>배송지 선택</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <List>
          {addressList.map((addr) => (
            <Label key={addr.id}>
              <input
                type="radio"
                checked={tempId === addr.id}
                onChange={() => setTempId(addr.id)}
              />
              <Info>
                <strong>{addr.label}</strong>
                <span>
                  {addr.addressRaw} {addr.addressDetail}
                </span>
              </Info>
            </Label>
          ))}
        </List>

        <Footer>
          <AddButton onClick={onAdd}>+ 새 배송지 추가</AddButton>
          <RightButtons>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                const selected = addressList.find((a) => a.id === tempId);
                if (selected) onConfirm(selected);
              }}
            >
              변경
            </ConfirmButton>
          </RightButtons>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default AddressModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 420px;
  max-height: 70vh;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
`;

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  display: flex;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;

  input {
    margin-top: 4px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 14px;
  }

  span {
    font-size: 13px;
    color: #666;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const AddButton = styled.button`
  margin-right: auto;
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  padding: 8px 14px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;
