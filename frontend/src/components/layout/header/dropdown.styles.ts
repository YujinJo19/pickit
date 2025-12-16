import { styled } from "styled-components";

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.white ?? "white"};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  overflow: hidden;
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 10px 14px;
  font-size: 0.9rem;
  cursor: pointer;

  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.error : theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray};
  margin: 6px 0;
`;
