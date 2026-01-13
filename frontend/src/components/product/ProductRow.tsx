import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductListType } from "../../types/products";
import { DEFAULT_PRODUCT_IMAGE, toUrl } from "../../utils/image";
type Props = {
  items: ProductListType[];
  variant?: "row" | "grid";
};

const ProductRow = ({ items, variant = "row" }: Props) => {
  const navigate = useNavigate();
  return (
    <Row $variant={variant}>
      {items.map((p) => (
        <Card
          key={p.id}
          $variant={variant}
          onClick={() => navigate(`/products/${p.id}`)}
        >
          <Thumb
            $src={
              p.thumbnailUrl
                ? toUrl(p.thumbnailUrl as string)
                : DEFAULT_PRODUCT_IMAGE
            }
          />

          <Meta>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              {p.discountPrice ? (
                <>
                  <Discount>{p.discountPrice.toLocaleString()}원</Discount>
                  <OriginPrice>{p.price.toLocaleString()}원</OriginPrice>
                </>
              ) : (
                <Price>{p.price.toLocaleString()}원</Price>
              )}
            </div>

            <Name>{p.name}</Name>
          </Meta>
        </Card>
      ))}
    </Row>
  );
};

export default ProductRow;

const Row = styled.div<{ $variant: "row" | "grid" }>`
  ${(p) =>
    p.$variant === "row"
      ? `display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
`
      : `display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;`}

  @media (max-width: 1024px) {
    ${(p) => p.$variant === "grid" && `grid-template-columns: repeat(3, 1fr);`}
  }
  @media (max-width: 768px) {
    ${(p) => p.$variant === "grid" && `grid-template-columns: repeat(2, 1fr);`}
  }
`;

const Card = styled.button<{ $variant?: "row" | "grid" }>`
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;

  ${(p) => p.$variant === "row" && `min-width: 220px; max-width: 220px;`}
`;

const Thumb = styled.div<{ $src: string }>`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  background-image: url(${(p) => p.$src});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 190px;
  }
`;

const Meta = styled.div`
  padding: 10px 4px 0;
`;

const Discount = styled.span`
  font-weight: 900;
  color: #ff3b30;
  font-size: 16px;
  min-height: 20px;
`;

const Price = styled.span`
  font-weight: 900;
  color: #111;
  font-size: 18px;
`;

const Brand = styled.div`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #2b2b2b;
`;

const Name = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OriginPrice = styled.span`
  font-weight: 700;
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
`;
