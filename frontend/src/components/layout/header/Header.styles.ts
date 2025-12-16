import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.white ?? "white"};
`;

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoContainer = styled.div`
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const PopoverAnchor = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;
