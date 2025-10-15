import React from "react";
import { ProductListType } from "../../types/products";
import styled from "styled-components";
import { getFullCategoryPath } from "../../utils/category";

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const Card = styled.div`
  display: none; // 기본적으로 모바일에서만 카드형 표시
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 12px;
  margin: 10px 0;

  div {
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const TableRow = styled.tr`
  @media (max-width: 768px) {
    display: none; // 모바일에서는 테이블 숨김
  }
`;

interface Props {
  product: ProductListType;
  key: number;
}

const ProductItem = ({ product, key }: Props) => {
  const categoryName = getFullCategoryPath(product.categoryId);
  return (
    <>
      {/* 테이블용 row */}
      <TableRow>
        <td>{categoryName}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.discountPrice}</td>
        <td>
          {product.thumbnailUrl && <StyledImg src={product.thumbnailUrl} />}
        </td>
      </TableRow>

      {/* 모바일 카드용 */}
      <Card>
        <div>
          <strong>카테고리:</strong> {product.categoryId}
        </div>
        <div>
          <strong>상품명:</strong> {product.name}
        </div>
        <div>
          <strong>가격:</strong> {product.price}
        </div>
        <div>
          <strong>할인:</strong> {product.discountPrice}
        </div>
        {product.thumbnailUrl && <StyledImg src={product.thumbnailUrl} />}
      </Card>
    </>
  );
};

export default ProductItem;
