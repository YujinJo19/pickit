import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductListType } from "../../types/products";

type Props = {
  items: ProductListType[];
};

const ProductRow = ({ items }: Props) => {
  const navigate = useNavigate();
  return (
    <Row>
      {items.map((p) => (
        <Card key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
          <Thumb
            $src={
              (p.thumbnailUrl as string)?.startsWith("http")
                ? (p.thumbnailUrl as string)
                : `https://${p.thumbnailUrl}`
            }
          />
          <Meta>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Discount>{p.discountPrice ? `${p.discountPrice}` : ""}</Discount>
              <Price>{p.price.toLocaleString()}</Price>
            </div>
            <Name>{p.name}</Name>
          </Meta>
        </Card>
      ))}
    </Row>
  );
};

export default ProductRow;

const Row = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;

  scrollbar-width: thin;

  @media (max-width: 768px) {
    grid-auto-columns: 180px;
    gap: 12px;
  }
`;

const Card = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
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
