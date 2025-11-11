import React from "react";
import { ProductListType } from "../../types/products";
import styled from "styled-components";
import { getFullCategoryPath } from "../../utils/category";
import { useNavigate } from "react-router-dom";

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const Card = styled.div`
  display: block;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 12px;
  margin: 10px 0;

  div {
    margin: 5px 0;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const TableRow = styled.tr`
  @media (max-width: 768px) {
    display: none; // 모바일에서는 테이블 숨김
  }
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0 4px;
  font-size: 16px;

  &.delete {
    color: red;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

interface Props {
  product: ProductListType;
  key: number;
  onDelete: (id: number) => void;
}

const ProductItem = ({ product, key, onDelete }: Props) => {
  const categoryName = getFullCategoryPath(product.categoryId);
  const navigate = useNavigate();
  return (
    <>
      {/* 테이블용 row */}
      <TableRow>
        <td>{categoryName}</td>
        <td
          onClick={() => navigate(`/seller/dashboard/products/${product.id}`)}
        >
          {product.name}
        </td>
        <td>{product.price}</td>
        <td>{product.discountPrice}</td>
        <td>
          {product.thumbnailUrl && <StyledImg src={product.thumbnailUrl} />}
        </td>
        <td>
          <ActionButton
            onClick={() =>
              navigate(`/seller/dashboard/products/${product.id}/edit`)
            }
          >
            ✏️
          </ActionButton>
          <ActionButton onClick={() => onDelete(product.id)} className="delete">
            🗑️
          </ActionButton>
        </td>
      </TableRow>

      {/* 모바일 카드용 */}
      <Card>
        <div>
          <strong>카테고리:</strong> {categoryName}
        </div>
        <div>
          <strong>상품명:</strong> {product.name}
        </div>
        <div>
          <strong>가격:</strong> {product.price}
        </div>
        <div>
          <strong>할인:</strong> {product.discountPrice ?? "-"}
        </div>
        {product.thumbnailUrl && <StyledImg src={product.thumbnailUrl} />}
      </Card>
    </>
  );
};

export default ProductItem;
