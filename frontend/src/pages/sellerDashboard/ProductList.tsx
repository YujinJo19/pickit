import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getProduct } from "../../store/thunks/productThunk";
import { getSellerIdFromToken, getToken } from "../../utils/token";
import { useSelector } from "react-redux";
import { PageableType, ProductListType } from "../../types/products";
import ProductItem from "../../components/product/ProductItem";
import { styled } from "styled-components";

const ProductList = () => {
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [pageable, setPageable] = useState<PageableType>({
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    sort: { empty: true, sorted: false, unsorted: true },
  });
  const dispatch = useAppDispatch();
  const sellerId = useSelector((state: any) => state.authApi.sellerId);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async (page: number) => {
    const response = await dispatch(
      getProduct({ sellerId, page, size: pageable.pageSize })
    );

    if (response.meta.requestStatus === "fulfilled") {
      setProductList(response.payload.content);
      setPageable(response.payload.pageable);
      setTotalProducts(response.payload.totalElements);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProducts / pageable.pageSize);
  return (
    <>
      <h2>상품 목록 ({totalProducts}개)</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>상품명</th>
            <th>가격</th>
            <th>할인 가격</th>
            <th>썸네일</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item) => (
            <ProductItem product={item} key={item.id} />
          ))}
        </tbody>
      </StyledTable>

      {/* 페이지네이션 */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <PaginationButton
            key={idx}
            active={idx === currentPage}
            onClick={() => handlePageChange(idx)}
          >
            {idx + 1}
          </PaginationButton>
        ))}
      </div>
    </>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    display: none; // 모바일에서는 테이블 숨김
  }
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  margin: 0 4px;
  padding: 6px 12px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ProductList;
