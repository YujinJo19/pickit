import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getProduct } from "../../store/thunks/productThunk";
import { useSelector } from "react-redux";
import { PageableType, ProductListType } from "../../types/products";
import ProductItem from "../../components/product/ProductItem";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SellerProductList = () => {
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [pageable, setPageable] = useState<PageableType>({
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    sort: { empty: true, sorted: false, unsorted: true },
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const sellerId = useSelector((state: any) => state.authApi.sellerId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToDetail = (id: number) => {
    navigate(`${id}`);
  };

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

  const handleDeleteProduct = (id: number) => {
    console.log("삭제 요청");
  };

  const totalPages = Math.ceil(totalProducts / pageable.pageSize);
  return (
    <>
      <h2>상품 목록 ({totalProducts}개)</h2>
      <button onClick={() => navigate("create")}>상품 추가</button>
      <StyledTable>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>상품명</th>
            <th>가격</th>
            <th>할인 가격</th>
            <th>썸네일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item) => (
            <ProductItem
              product={item}
              key={item.id}
              goToDetail={goToDetail}
              onDelete={handleDeleteProduct}
            />
          ))}
        </tbody>
      </StyledTable>

      {/* 모바일: 카드 리스트 */}
      <MobileList>
        {productList.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            goToDetail={goToDetail}
            onDelete={handleDeleteProduct}
          />
        ))}
      </MobileList>

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

const MobileList = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default SellerProductList;
