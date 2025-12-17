import React, { useEffect, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import { useParams } from "react-router-dom";
import { ProductDetailType } from "../types/products";
import { useAppDispatch } from "../store/hooks";
import { getProductDetail } from "../store/thunks/productThunk";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<ProductDetailType | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getProductDetail(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setDetailInfo(response.payload);
      }
    });
  }, [id]);

  // 옵션 초기화
  useEffect(() => {
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
  }, [detailInfo?.id]);

  // 색상 리스트 (중복 제거, false 값 제외)
  const colors = useMemo(() => {
    if (!detailInfo?.inventory) return [];
    return Array.from(new Set(detailInfo.inventory.map((i) => i.color))).filter(
      Boolean
    );
  }, [detailInfo?.inventory]);

  // 색상별 사이즈 리스트 (선택한 색상에 존재하는 사이즈들 리스트로 생성)
  const sizesByColor = useMemo(() => {
    if (!detailInfo?.inventory) return [];
    if (!selectedColor) return [];
    return Array.from(
      new Set(
        detailInfo.inventory
          .filter((i) => i.color === selectedColor)
          .map((i) => i.size)
      )
    ).filter(Boolean);
  }, [detailInfo?.inventory, selectedColor]);

  // 사용자가 선택한 색상, 사이즈의 재고 확인
  const selectedStock = useMemo(() => {
    if (!detailInfo?.inventory) return 0;
    if (!selectedColor || !selectedSize) return 0;
    const checkQuantity = detailInfo.inventory.find(
      (i) => i.color === selectedColor && i.size === selectedSize
    );
    return checkQuantity?.quantity ?? 0;
  }, [detailInfo, selectedColor, selectedSize]);

  // 색상, 사이즈 선택, 재고 1개 이상 시 장바구니 추가 가능
  const canAddToCart = Boolean(
    selectedColor && selectedSize && selectedStock > 0
  );

  const unitPrice = detailInfo?.discountPrice ?? detailInfo?.price ?? 0;

  const onChangeColor = (value: string) => {
    setSelectedColor(value);
    setSelectedSize("");
    setQuantity(1);
  };

  const onChangeSize = (value: string) => {
    setSelectedSize(value);
    setQuantity(1);
  };

  const onDecQty = () => setQuantity((p) => Math.max(1, p - 1));
  const onIncQty = () =>
    setQuantity((p) => Math.min(selectedStock || 1, p + 1));

  const addToCart = () => {
    if (!canAddToCart) return;
    console.log("장바구니 추가 로직", {
      id: detailInfo?.id,
      selectedColor,
      selectedSize,
      quantity,
    });
  };
  if (!detailInfo) return <p>로딩 중...</p>;
  return (
    <Page>
      <Container>
        <Left>
          {detailInfo.images.map((item, index) => (
            <MainImage
              key={index}
              src={item.startsWith("http") ? item : `https://${item}`}
              alt={`상품 이미지 ${index + 1}`}
            />
          ))}
        </Left>

        <Right>
          <TitleRow>
            <Title>{detailInfo.name}</Title>
          </TitleRow>
          <PriceRow>
            {detailInfo.price > 0 && unitPrice < detailInfo.price && (
              <Price>
                {Math.round(
                  ((detailInfo.price - unitPrice) / detailInfo.price) * 100
                )}
                %
              </Price>
            )}
            <Price>{unitPrice.toLocaleString()}원</Price>
            <Price $variant="strike">
              {detailInfo.price.toLocaleString()}원
            </Price>
          </PriceRow>
        </Right>
        <Divider />
        <MobileCard>
          <div>
            <Select
              value={selectedColor}
              onChange={(e) => onChangeColor(e.target.value)}
            >
              <option value="">색상 선택</option>
              {colors.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              value={selectedSize}
              onChange={(e) => onChangeSize(e.target.value)}
              disabled={!selectedColor}
            >
              <option value="">사이즈 선택</option>
              {sizesByColor.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </div>
          {selectedColor && selectedSize && (
            <div>
              <div>
                <span>
                  {detailInfo.name} · {selectedColor}/{selectedSize}
                </span>
                <button
                  onClick={() => {
                    setSelectedColor("");
                    setSelectedSize("");
                    setQuantity(1);
                  }}
                  type="button"
                >
                  X
                </button>
              </div>
              <div>
                <button onClick={onDecQty} disabled={quantity <= 1}>
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={onIncQty}
                  disabled={!selectedStock || quantity >= selectedStock}
                >
                  +
                </button>
              </div>
              <p>{(quantity * unitPrice).toLocaleString()}원</p>
              {selectedStock === 0 && <p>재고가 없습니다. </p>}
            </div>
          )}
        </MobileCard>
      </Container>
    </Page>
  );
};
export default ProductDetail;

const Page = styled.main`
  width: 100%;
`;

const Container = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 24px 16px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Left = styled.div``;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  display: block;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 800;

  @media (max-width: 900px) {
    font-size: 28px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
`;

const strike = css`
  color: #777;
  text-decoration: line-through;
`;

const Price = styled.span<{ $variant?: "default" | "strike" }>`
  font-weight: 900;
  font-size: 28px;

  ${({ $variant }) => $variant === "strike" && strike}
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e6e6e6;
  margin: 8px 0;
`;

const MobileCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 12px;
  }
`;
const Select = styled.select`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 0 12px;
  font-size: 14px;
  background: #fff;
`;
