import React from "react";
import DaumPostcode from "react-daum-postcode";
import { styled } from "styled-components";

interface Props {
  onComplete: (data: any) => void;
  onClose: () => void;
}

const Postcode = ({ onComplete, onClose }: Props) => {
  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>주소 찾기</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <DaumPostcode onComplete={onComplete} />
      </Modal>
    </Overlay>
  );
};

export default Postcode;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Modal = styled.div`
  width: 480px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
