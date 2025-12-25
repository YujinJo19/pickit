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
  const [userInfo, setUserInfo] = useState<string>("");
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [pageable, setPageable] = useState<PageableType>({
    offset: 0,
    pageNumber: 0,
    pageSize: 1,
    paged: true,
    sort: { empty: true, sorted: false, unsorted: true },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await dispatch(getProduct(""));

    if (response.meta.requestStatus === "fulfilled") {
      setProductList(response.payload.content);
    }
  };

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response.meta.requestStatus === "fulfilled") {
      removeToken();
      console.log("로그아웃됨");
      navigate("/");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const info = decodeToken(token);
      setUserInfo(info?.sub ? info.sub : "");
    }
  }, [userInfo]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Page>
      <Header userInfo={userInfo} onLogout={handleLogout} />
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
