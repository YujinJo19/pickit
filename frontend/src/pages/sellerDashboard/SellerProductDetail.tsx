import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  getProductDetail,
  deleteProduct,
} from "../../store/thunks/productThunk";
import { ProductDetailType } from "../../types/products";
import { useParams, useNavigate } from "react-router-dom";
import { getFullCategoryPath } from "../../utils/category";
import { styled } from "styled-components";

const SellerProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<ProductDetailType | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchProductsDetail = async () => {
    const response = await dispatch(getProductDetail(id));

    if (response.meta.requestStatus === "fulfilled") {
      setDetailInfo(response.payload);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (!window.confirm("정말 이 상품을 삭제하시겠습니까?")) return;

    const res = await dispatch(deleteProduct(Number(id)));
    if (res.meta.requestStatus === "fulfilled") {
      alert("상품이 삭제되었습니다.");
      navigate("/seller/dashboard/products");
    }
  };

  if (!detailInfo) return <p>로딩 중...</p>;

  useEffect(() => {
    fetchProductsDetail();
  }, [id]);

  return (
    <Container>
      <ImagesWrapper>
        {detailInfo.images.map((item, index) => (
          <Image
            key={index}
            src={item.startsWith("http") ? item : `https://${item}`}
            alt={`상품 이미지 ${index + 1}`}
          />
        ))}
      </ImagesWrapper>

      <InfoWrapper>
        <Title>{detailInfo.name}</Title>
        <Category>
          카테고리: {getFullCategoryPath(detailInfo.categoryId)}
        </Category>
        <Field>
          <Label>할인 가격:</Label>
          <Value>{detailInfo.discountPrice.toLocaleString()}원</Value>
        </Field>

        <Field>
          <Label>설명:</Label>
          <Description>{detailInfo.description}</Description>
        </Field>

        <Inventory>
          <Label>재고 정보:</Label>
          {detailInfo.inventory.map((item, index) => (
            <InventoryGroup key={index}>
              <Value>색상: {item.color}</Value>
              <Value>사이즈: {item.size}</Value>
              <Value>수량: {item.quantity}</Value>
            </InventoryGroup>
          ))}
        </Inventory>

        <ButtonWrapper>
          <EditButton
            onClick={() => navigate(`/seller/dashboard/products/update/${id}`)}
          >
            상품 수정
          </EditButton>
          <DeleteButton onClick={handleDelete}>상품 삭제</DeleteButton>
        </ButtonWrapper>
      </InfoWrapper>
    </Container>
  );
};

export default SellerProductDetail;

/* 스타일 */

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 20px;
`;

const ImagesWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const InfoWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
`;

const Category = styled.p`
  color: #555;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const Value = styled.span`
  font-size: 16px;
  color: #333;
`;

const Description = styled.p`
  white-space: pre-line;
`;

const Inventory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InventoryGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 12px 24px;
  background-color: #457b9d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1d3557;
  }
`;

const DeleteButton = styled.button`
  padding: 12px 24px;
  background-color: #e63946;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d62828;
  }
`;
