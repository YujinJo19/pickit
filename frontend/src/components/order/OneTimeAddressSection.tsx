import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddressType } from "../../types/user";
import { styled } from "styled-components";
import DaumPostcode from "react-daum-postcode";

type OneTimeAddressForm = AddressType & {
  saveToList: boolean;
};

type Props = {
  onApply: (addr: AddressType, saveToList: boolean) => void;
  defaultValues?: AddressType | null;
  mode?: "create" | "edit";
};

const OneTimeAddressSection = ({
  onApply,
  defaultValues,
  mode = "create",
}: Props) => {
  const { register, handleSubmit, setValue } = useForm<OneTimeAddressForm>({
    defaultValues: {
      ...defaultValues,
      saveToList: mode === "create",
    },
  });
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const onSubmit = (data: OneTimeAddressForm) => {
    const { saveToList, ...address } = data;
    onApply(address, saveToList);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("label", { required: true })}
          placeholder="배송지 이름"
        />
        <Input
          {...register("recipientName", { required: true })}
          placeholder="받는 사람"
        />
        <Input
          {...register("phone", { required: true })}
          placeholder="연락처"
        />

        <AddressRow>
          <Input
            {...register("addressRaw", { required: true })}
            placeholder="주소"
            readOnly
          />
          <SearchButton type="button" onClick={() => setIsPostcodeOpen(true)}>
            주소 찾기
          </SearchButton>
        </AddressRow>

        <Input
          {...register("addressDetail", { required: true })}
          placeholder="상세 주소"
        />
        <Input
          type="hidden"
          {...register("zipCode", {
            required: true,
          })}
        />
        {mode === "create" && (
          <CheckboxLabel>
            <input type="checkbox" {...register("saveToList")} />내 배송지
            목록에 저장
          </CheckboxLabel>
        )}

        <SubmitButton type="submit">배송지 적용</SubmitButton>
      </Form>

      {isPostcodeOpen && (
        <PostcodeOverlay>
          <PostcodeBox>
            <DaumPostcode
              onComplete={(data) => {
                setValue("addressRaw", data.address, { shouldValidate: true });
                setValue("zipCode", data.zonecode, { shouldValidate: true });

                setIsPostcodeOpen(false);
              }}
            />
            <CloseButton onClick={() => setIsPostcodeOpen(false)}>
              닫기
            </CloseButton>
          </PostcodeBox>
        </PostcodeOverlay>
      )}
    </Wrapper>
  );
};

export default OneTimeAddressSection;

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const AddressRow = styled.div`
  display: flex;
  gap: 8px;
`;

const SearchButton = styled.button`
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const PostcodeOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostcodeBox = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
`;

const CloseButton = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
`;
