import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  contents: string;
  type?: "button" | "submit";
  onClick?: (e: any) => void;
}

export const StyledButton = styled.button`
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

const Button = ({ contents, type, onClick }: Props) => {
  return (
    <div>
      <StyledButton type={type} onClick={onClick}>
        {contents}
      </StyledButton>
    </div>
  );
};

export default Button;
