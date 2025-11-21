import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getProductDetail } from "../../store/thunks/productThunk";
import { ProductDetailType } from "../../types/products";
import { useParams } from "react-router-dom";
import { getFullCategoryPath } from "../../utils/category";
import { styled } from "styled-components";

const SellerProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<ProductDetailType | null>(null);
  const dispatch = useAppDispatch();

  const fetchProductsDetail = async () => {
    const response = await dispatch(getProductDetail(id));

    if (response.meta.requestStatus === "fulfilled") {
      setDetailInfo(response.payload);
      console.log(response.payload);
    }
  };

  useEffect(() => {
    fetchProductsDetail();
  }, [id]);

  if (!detailInfo) return <p>로딩 중...</p>;

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

        <EditableField>
          <Label>가격:</Label>
          <input type="number" defaultValue={detailInfo.discountPrice} />
        </EditableField>

        <EditableField>
          <Label>설명:</Label>
          <textarea defaultValue={detailInfo.description} rows={4}></textarea>
        </EditableField>

        <Inventory>
          {detailInfo.inventory.map((item, index) => (
            <InventoryGroup key={index}>
              <EditableField>
                <Label>색상:</Label>
                <input type="text" defaultValue={item.color} />
              </EditableField>

              <EditableField>
                <Label>사이즈:</Label>
                <input type="text" defaultValue={item.size} />
              </EditableField>

              <EditableField>
                <Label>수량:</Label>
                <input type="number" defaultValue={item.quantity} />
              </EditableField>
            </InventoryGroup>
          ))}
        </Inventory>

        <ButtonWrapper>
          <EditButton>상품 수정</EditButton>
          <DeleteButton>상품 삭제</DeleteButton>
        </ButtonWrapper>
      </InfoWrapper>
    </Container>
  );
};

export default SellerProductDetail;

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

const EditableField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Inventory = styled.div`
  display: flex;
  gap: 20px;
`;

const InventoryGroup = styled.div`
  gap: 15px;
  align-items: flex-end;
  margin-bottom: 10px;
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
