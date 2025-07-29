import React, { useState } from "react";
import { styled, css } from "styled-components";

interface Props {
  label?: string;
  type?: string;
  name: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  setAutoLoginFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  setAuthCode?: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  setPassword2?: React.Dispatch<React.SetStateAction<string>>;
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

const Input = ({
  label,
  type,
  name,
  setEmail,
  setAuthCode,
  setPassword,
  setPassword2,
  setName,
  setPhoneNumber,
  setAutoLoginFlag,
}: Props) => {
  const [text, setText] = useState("");
  const setters: any = {
    email: setEmail,
    authCode: setAuthCode,
    password: setPassword,
    password2: setPassword2,
    name: setName,
    phoneNumber: setPhoneNumber,
    autoLoginFlag: setAutoLoginFlag,
  };

  const onChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const setter = setters[name];

    if (setter) {
      setter(type === "checkbox" ? checked : value);
    }

    setText(value);
  };

  return (
    <StyledInput type={type}>
      {label && <label>{label}</label>}
      <input type={type} onChange={onChange} value={text} name={name} />
    </StyledInput>
  );
};

export default Input;
