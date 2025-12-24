import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/header/Header";
import ProductRow from "../components/product/ProductRow";
import { useAppDispatch } from "../store/hooks";
import { getSearchedProduct } from "../store/thunks/productThunk";
import { ProductListType } from "../types/products";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

const SORT_OPTIONS = [
  { label: "최신순", value: "id,desc" },
  { label: "오래된순", value: "id,asc" },
  { label: "가격 낮은순", value: "price,asc" },
  { label: "가격 높은순", value: "price,desc" },
] as const;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const page = Number(searchParams.get("page") ?? 0);
  const size = Number(searchParams.get("size") ?? 10);
  const sort = searchParams.get("sort") ?? "id,desc";

  const [products, setProducts] = useState<ProductListType[]>([]);
  const dispatch = useAppDispatch();

  const handleSort = (nextSort: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", nextSort);
    next.set("page", "0");
    setSearchParams(next);
  };

  useEffect(() => {
    if (!keyword) {
      setProducts([]);
      return;
    }
    dispatch(getSearchedProduct({ keyword, page, size, sort })).then(
      (response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setProducts(response.payload.content);
        } else {
          console.log("rejected:", response);
        }
      }
    );
  }, [dispatch, keyword, page, size, sort]);

  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <MainContent>
          <TopBar>
            <Title>
              {keyword ? (
                <>
                  <b>'{keyword}'</b> 검색 결과
                </>
              ) : (
                "검색어를 입력하세요"
              )}
            </Title>
            <SortSelect
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              aria-label="sort"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SortSelect>
          </TopBar>
          {!keyword ? (
            <Empty>검색어를 입력하세요</Empty>
          ) : products.length === 0 ? (
            <Empty>상품이 없습니다.</Empty>
          ) : (
            <ProductRow items={products} variant="grid" />
          )}
        </MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default Search;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  min-height: 60px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f9fafb;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 16px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  color: #111;
`;

const SortSelect = styled.select`
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 14px;
`;

const Empty = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #666;
`;
