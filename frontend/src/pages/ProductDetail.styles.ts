import { css, styled } from "styled-components";

export const Page = styled.main`
  width: 100%;

  @media (max-width: 600px) {
    padding-bottom: 140px; /* 스티키 영역 높이만큼 */
  }
`;

export const Container = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 24px 16px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const Left = styled.div``;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 800;

  @media (max-width: 900px) {
    font-size: 28px;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
`;

export const strike = css`
  color: #777;
  text-decoration: line-through;
`;

export const Price = styled.span<{ $variant?: "default" | "strike" }>`
  font-weight: 900;
  font-size: 28px;

  ${({ $variant }) => $variant === "strike" && strike}
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e6e6e6;
  margin: 8px 0;
`;

export const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px;
  align-items: center;
`;

export const Label = styled.div`
  font-weight: 700;
  color: #111;
`;

export const Value = styled.div`
  color: #222;
  font-weight: 600;
`;

export const Required = styled.span`
  color: #666;
  margin-right: 8px;
`;

export const OptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px;
  align-items: center;
`;

export const OptionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const OptionBtn = styled.button<{ $active?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? "#111" : "#cfcfcf")};
  background: ${({ $active }) => ($active ? "#111" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#111")};
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SelectedBox = styled.div`
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  padding: 14px 0;

  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 14px;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const SelectedName = styled.div`
  font-weight: 700;
  color: #222;
`;

export const QtyArea = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  overflow: hidden;
`;

export const QtyBtn = styled.button`
  width: 44px;
  height: 36px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const QtyValue = styled.div`
  width: 52px;
  text-align: center;
  font-weight: 800;
`;

export const SelectedPrice = styled.div`
  font-weight: 900;
  font-size: 18px;
  text-align: right;
`;

export const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const PrimaryBtn = styled.button`
  height: 56px;
  border: none;
  border-radius: 12px;
  background: #ffe4a8;
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;

  @media (max-width: 600px) {
    height: 52px;
    font-size: 18px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SecondaryBtn = styled(PrimaryBtn)`
  background: #d7c18d;
  color: #fff;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const TotalLabel = styled.div`
  color: #555;
  font-weight: 700;
`;

export const TotalValue = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

export const Desc = styled.p`
  margin: 10px 0 0;
  color: #444;
  line-height: 1.6;
`;

export const StickyBottom = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 12px;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    background: #fff;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    border-top: 1px solid #e6e6e6;
    z-index: 20;
  }
`;
