import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import Carousel from "../components/layout/Carousel";
import ProductRow from "../components/product/ProductRow";
import Footer from "../components/layout/Footer";
import { styled } from "styled-components";
import { ProductListType } from "../types/products";
import { homeBanners } from "../data/mainMock";
import { getProduct } from "../store/thunks/productThunk";

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
