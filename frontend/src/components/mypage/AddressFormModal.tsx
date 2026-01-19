import React, { useState } from "react";
import Postcode from "./Postcode";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddressFormModal = ({ onClose, onSubmit }: Props) => {
  const { register, handleSubmit, setValue } = useForm();
  const [openPostcode, setOpenPostcode] = useState(false);

  const handleComplete = (data: any) => {
    setValue("zipcode", data.zonecode);
    setValue("addressRaw", data.address);
    setOpenPostcode(false);
  };

  return (
    <>
      <Overlay>
        <Modal>
          <Header>
            <Title>배송지 추가</Title>
            <CloseButton
              onClick={() => {
                onClose();
              }}
            >
              ✕
            </CloseButton>
          </Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Section>
              <Label>배송지명</Label>
              <Input
                placeholder="최대 7글자까지 자유롭게 수정가능"
                {...register("label")}
              />
            </Section>

            <Section>
              <Label>받는 분</Label>
              <Input
                placeholder="이름을 입력해 주세요."
                {...register("recipientName")}
              />
              <SubInput
                placeholder="휴대폰번호를 - 없이 입력해 주세요."
                {...register("phone")}
              />
            </Section>

            <Section>
              <Label>주소</Label>
              <AddressRow>
                <Input readOnly {...register("addressRaw")} />
                <AddressButton
                  type="button"
                  onClick={() => setOpenPostcode(true)}
                >
                  주소 찾기
                </AddressButton>
              </AddressRow>
              <SubInput
                placeholder="상세 주소"
                {...register("addressDetail")}
              />
            </Section>

            <CheckboxRow>
              <input type="checkbox" {...register("isDefault")} />
              기본배송지로 설정
            </CheckboxRow>

            <SubmitButton>저장</SubmitButton>
          </form>
        </Modal>
      </Overlay>

      {openPostcode && (
        <Postcode
          onClose={() => setOpenPostcode(false)}
          onComplete={handleComplete}
        />
      )}
    </>
  );
};

export default AddressFormModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SubInput = styled(Input)`
  margin-top: 8px;
`;

const AddressRow = styled.div`
  display: flex;
  gap: 8px;
`;

const AddressButton = styled.button`
  width: 96px;
  height: 44px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 24px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  background: #b6b8e2;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
