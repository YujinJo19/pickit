import React from "react";
import { styled, css } from "styled-components";

interface Props {
  label?: string;
  type?: string;
}

interface StyledInputProps {
  type?: string;
}

const StyledInput = styled.div<StyledInputProps>`
  display: grid;
  width: 100%;
  border-radius: 4px;
  // type이 'checkbox'일 경우
  ${(props) =>
    props.type === "checkbox" &&
    css`
      display: flex;
      align-items: center;
    `}

  label {
    font-weight: bold;
    color: #333;
    margin: 10px 0;
    flex-shrink: 0;
  }

  input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    // type이 'checkbox'일 경우
    ${(props) =>
      props.type === "checkbox" &&
      css`
        width: auto;
        flex-grow: 0;
        margin: 0 10px;
        padding: 0;
        transform: scale(1.2);
      `}

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
`;

const Input = ({ label, type }: Props) => {
  return (
    <StyledInput type={type}>
      {label && <label>{label}</label>}
      <input type={type} />
    </StyledInput>
  );
};

export default Input;
