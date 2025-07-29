import styled from "styled-components";

const TextButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base}
  cursor: pointer;
  padding: 0;
  width: 100%;
  margin: 0;
  text-align: end;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary}
  }
`;

export default TextButton;
