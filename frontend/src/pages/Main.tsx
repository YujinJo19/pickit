import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { decodeToken, getToken, removeToken } from "../utils/token";
import Header from "../components/layout/header/Header";
import Carousel from "../components/layout/Carousel";
import ProductRow from "../components/product/ProductRow";
import Footer from "../components/layout/Footer";
import { styled } from "styled-components";
import { PageableType, ProductListType } from "../types/products";
import { getProduct } from "../store/thunks/productThunk";
import { homeBanners } from "../data/mainMock";

const Main = () => {
  const [productList, setProductList] = useState<ProductListType[]>([]);

  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    const response = await dispatch(getProduct(""));

    if (response.meta.requestStatus === "fulfilled") {
      setProductList(response.payload.content);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Page>
      <Header />
      <Carousel items={homeBanners} />
      <h2>회원님을 위한 추천 상품</h2>
      <ProductGrid>
        <ProductRow items={productList} />
      </ProductGrid>
      <Footer />
    </Page>
  );
};

export default Main;

const Page = styled.div`
  width: 100%;
  padding: 20px;
`;

const ProductGrid = styled.section`
  display: grid;
  gap: 20px;
`;
