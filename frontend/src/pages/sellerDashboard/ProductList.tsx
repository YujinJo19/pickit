import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getProduct } from "../../store/thunks/productThunk";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialize = async () => {
      const sellerId = 0;
      const response = await dispatch(getProduct(sellerId));
      if (response.meta.requestStatus === "fulfilled") {
        setProductList(response.payload);
        console.log(response.payload);
      }
    };
    initialize();
  }, []);
  return <div>상품 리스트</div>;
};

export default ProductList;
