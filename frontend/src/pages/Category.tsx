import React, { useEffect, useState } from "react";
import Header from "../components/layout/header/Header";
import CategorySidebar from "../components/category/CategorySidebar";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getProductByCategory } from "../store/thunks/productThunk";
import ProductRow from "../components/product/ProductRow";
import { styled } from "styled-components";
import { Menu } from "lucide-react";
import { ProductListType } from "../types/products";

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<ProductListType[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getProductByCategory(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setProducts(response.payload.content);
        console.log(response.payload.content);
      }
    });
  }, [id, dispatch]);

  return (
    <Container>
      <HeaderWrapper>
        <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </MobileMenuButton>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <SidebarWrapper $open={sidebarOpen}>
          <CategorySidebar onSelect={() => setSidebarOpen(false)} />
        </SidebarWrapper>
        {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}
        <MainContent>
          {products.length === 0 ? (
            <div>상품이 없습니다.</div>
          ) : (
            <ProductRow items={products} variant="grid" />
          )}
        </MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  height: 60px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;

  @media (max-width: 768px) {
    display: block;
    margin-right: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f9fafb;
  position: relative;
`;

const SidebarWrapper = styled.div<{ $open: boolean }>`
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100% - 60px);
    z-index: 1000;
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background: rgba(0, 0, 0, 0.3);
    z-index: 500;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
