import React from "react";
import { styled } from "styled-components";

interface Props {
  contents: string;
}

const StyledButton = styled.button`
  padding: 12px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin: 10px 0;
  width: 100%;

  &:hover {
    background-color: #333;
  }
`;

const Button = ({ contents }: Props) => {
  return (
    <div>
      <StyledButton>{contents}</StyledButton>
    </div>
  );
};

export default Button;
