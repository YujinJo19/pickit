import React from "react";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>판매자 대시보드</div>
      <div
        onClick={() => {
          navigate("/seller/dashboard/products");
        }}
      >
        내 상품 목록
      </div>
    </>
  );
};

export default SellerDashboard;
