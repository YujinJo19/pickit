import React, { useState } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { styled, css } from "styled-components";
import { ErrorMessage } from "../auth/EmailVerification";

interface Props {
  label?: string;
  type?: string;
  field?: UseFormRegisterReturn;
  error?: string;
  name: string;
  readOnly?: boolean;
}

interface StyledInputProps {
  type?: string;
}

export const StyledInput = styled.div<StyledInputProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 4px;
  flex: 1;

  // type이 'checkbox'일 경우
  ${(props) =>
    props.type === "checkbox" &&
    css`
      display: flex;
      align-items: center;
      flex-direction: row;
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
    width: 100%;

    // type이 'checkbox'일 경우
    ${(props) =>
      props.type === "checkbox" &&
      css`
        width: auto;
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

const Input = ({ label, type, field, error, name, readOnly }: Props) => {
  return (
    <StyledInput type={type}>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} type={type} {...field} readOnly={readOnly} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledInput>
  );
};

export default Input;
