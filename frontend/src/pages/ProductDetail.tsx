import React, { useEffect, useMemo, useState } from "react";
import * as S from "./ProductDetail.styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductDetailType } from "../types/products";
import { useAppDispatch } from "../store/hooks";
import { getProductDetail } from "../store/thunks/productThunk";
import { getFullCategoryPath } from "../utils/category";
import ImageCarousel from "../components/product/ImageCarousel";
import { addCartItem } from "../store/thunks/cartThunk";
import Header from "../components/layout/header/Header";
import { getToken } from "../utils/token";

type SelectedOption = {
  inventoryId: number;
  color: string;
  size: string;
  quantity: number;
  stock: number;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<ProductDetailType | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [detailInfo?.id]);

  // 색상 리스트 (중복 제거, false 값 제외)
  const colors = useMemo(() => {
    if (!detailInfo?.inventory) return [];
    return Array.from(new Set(detailInfo.inventory.map((i) => i.color))).filter(
      Boolean,
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
          .map((i) => i.size),
      ),
    ).filter(Boolean);
  }, [detailInfo?.inventory, selectedColor]);

  // 사용자가 선택한 색상, 사이즈의 재고 확인
  const selectedStock = useMemo(() => {
    if (!detailInfo?.inventory) return 0;
    if (!selectedColor || !selectedSize) return 0;
    const checkQuantity = detailInfo.inventory.find(
      (i) => i.color === selectedColor && i.size === selectedSize,
    );
    return checkQuantity?.quantity ?? 0;
  }, [detailInfo?.inventory, selectedColor, selectedSize]);

  const unitPrice = detailInfo?.discountPrice ?? detailInfo?.price ?? 0;

  const addOption = (color: string, size: string) => {
    if (!detailInfo) return;
    const inventory = detailInfo.inventory.find(
      (i) => i.color === color && i.size === size,
    );

    if (!inventory || inventory.quantity <= 0) return;
    const { id: inventoryId, quantity: stock } = inventory;
    if (stock <= 0) return;
    setSelectedOptions((prev) => {
      const exists = prev.find((o) => o.inventoryId === inventoryId);

      if (exists) {
        return prev.map((o) =>
          o.inventoryId === inventoryId
            ? { ...o, quantity: Math.min(o.stock, o.quantity + 1) }
            : o,
        );
      }

      return [
        ...prev,
        {
          inventoryId,
          color,
          size,
          quantity: 1,
          stock,
        },
      ];
    });
  };

  const canBuy = selectedOptions.length > 0;
  const totalPrice = selectedOptions.reduce(
    (sum, o) => sum + o.quantity * unitPrice,
    0,
  );
  const addToCart = async () => {
    if (!canBuy) return;
    if (!getToken()) {
      if (
        window.confirm(
          "로그인 후 장바구니에 추가할 수 있습니다. \n로그인 페이지로 이동하시겠습니까?",
        )
      ) {
        navigate("/login", { state: { redirectTo: location.pathname } });
      }
      return;
    }

    const payload = selectedOptions.map((opt) => ({
      productId: detailInfo!.id,
      inventoryId: opt.inventoryId,
      quantity: opt.quantity,
    }));

    try {
      await Promise.all(
        payload.map((item: any) => dispatch(addCartItem(item)).unwrap()),
      );
      alert("장바구니에 추가되었습니다");
      if (window.confirm("장바구니로 이동하시겠습니까?")) {
        navigate("/cart");
      }
    } catch (e: any) {
      if (e?.data.error === "EXCEEDS_STOCK") {
        alert("재고를 초과했습니다");
      } else {
        alert("장바구니 추가에 실패했습니다");
      }
    }
  };

  if (!detailInfo) return <p>로딩 중...</p>;
  return (
    <S.Page>
      <Header />
      <S.Container>
        <S.Left>
          <ImageCarousel
            images={detailInfo.images}
            autoPlay={false}
            aspectRatio="1 / 1"
          />
        </S.Left>

        <S.Right>
          <S.TitleRow>
            <S.Title>{detailInfo.name}</S.Title>
          </S.TitleRow>
          <S.PriceRow>
            {detailInfo.price > 0 && unitPrice < detailInfo.price && (
              <S.Price>
                {Math.round(
                  ((detailInfo.price - unitPrice) / detailInfo.price) * 100,
                )}
                %
              </S.Price>
            )}
            <S.Price>{unitPrice.toLocaleString()}원</S.Price>
            <S.Price $variant="strike">
              {detailInfo.price.toLocaleString()}원
            </S.Price>
          </S.PriceRow>
          <S.Divider />
          <S.MetaRow>
            <S.Label>카테고리</S.Label>
            <S.Value>{getFullCategoryPath(detailInfo.categoryId)}</S.Value>
          </S.MetaRow>
          <S.OptionBlock>
            <S.OptionRow>
              <S.Label>색상</S.Label>
              <S.Value>
                <S.Required>[필수]</S.Required> {selectedColor || "선택"}
              </S.Value>
            </S.OptionRow>
            <S.OptionButtons>
              {colors.map((c) => (
                <S.OptionBtn
                  key={c}
                  type="button"
                  $active={selectedColor === c}
                  onClick={() => {
                    setSelectedColor(c);
                    const firstAvailable =
                      detailInfo.inventory
                        .filter((i) => i.color === c && i.quantity > 0)
                        .map((i) => i.size)[0] ?? "";

                    setSelectedSize(firstAvailable);
                  }}
                >
                  {c}
                </S.OptionBtn>
              ))}
            </S.OptionButtons>
          </S.OptionBlock>
          <S.OptionBlock>
            <S.OptionRow>
              <S.Label>사이즈</S.Label>
              <S.Value>
                <S.Required>[필수]</S.Required> {selectedSize || "선택"}
              </S.Value>
            </S.OptionRow>
            <S.OptionButtons>
              {sizesByColor.map((s) => {
                const stock =
                  detailInfo.inventory.find(
                    (i) => i.color === selectedColor && i.size === s,
                  )?.quantity ?? 0;
                return (
                  <S.OptionBtn
                    key={s}
                    type="button"
                    disabled={!selectedColor || stock === 0}
                    $active={selectedSize === s}
                    onClick={() => {
                      setSelectedSize(s);
                      if (!selectedColor) return;
                      addOption(selectedColor, s);
                    }}
                  >
                    {s}
                  </S.OptionBtn>
                );
              })}
            </S.OptionButtons>
            <span>
              {selectedColor && selectedSize ? (
                selectedStock > 0 ? (
                  <>재고 {selectedStock}개</>
                ) : (
                  <>품절</>
                )
              ) : (
                <>옵션을 선택하세요</>
              )}
            </span>
          </S.OptionBlock>
          <S.MetaRow>
            <S.Label>배송비</S.Label>
            <S.Value>3000원</S.Value>
          </S.MetaRow>
          {selectedOptions.map((opt) => (
            <S.SelectedBox key={`${opt.color}_${opt.size}`}>
              <S.SelectedName>
                {detailInfo.name} · {opt.color} / {opt.size}
              </S.SelectedName>
              <S.QtyArea>
                <S.QtyBtn
                  onClick={() =>
                    setSelectedOptions((prev) =>
                      prev.map((o) =>
                        o.color === opt.color && o.size === opt.size
                          ? { ...o, quantity: Math.max(1, o.quantity - 1) }
                          : o,
                      ),
                    )
                  }
                >
                  −
                </S.QtyBtn>
                <S.QtyValue>{opt.quantity}</S.QtyValue>
                <S.QtyBtn
                  onClick={() =>
                    setSelectedOptions((prev) =>
                      prev.map((o) =>
                        o.color === opt.color && o.size === opt.size
                          ? {
                              ...o,
                              quantity: Math.min(o.stock, o.quantity + 1),
                            }
                          : o,
                      ),
                    )
                  }
                >
                  +
                </S.QtyBtn>
              </S.QtyArea>
              <S.SelectedPrice>
                {(opt.quantity * unitPrice).toLocaleString()}원
              </S.SelectedPrice>
              <button
                onClick={() =>
                  setSelectedOptions((prev) =>
                    prev.filter(
                      (o) => !(o.color === opt.color && o.size === opt.size),
                    ),
                  )
                }
              >
                ✕
              </button>
            </S.SelectedBox>
          ))}
          <S.ButtonRow>
            <S.PrimaryBtn type="button" disabled={!canBuy} onClick={addToCart}>
              장바구니
            </S.PrimaryBtn>
            <S.SecondaryBtn type="button" disabled={!canBuy}>
              구매하기
            </S.SecondaryBtn>
          </S.ButtonRow>
          <S.Desc>{detailInfo.description}</S.Desc>
          <S.StickyBottom>
            {selectedOptions.map((opt) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <S.Value key={`${opt.color}_${opt.size}`}>
                  {opt.color} / {opt.size} · {opt.quantity}개
                </S.Value>
                <button
                  onClick={() =>
                    setSelectedOptions((prev) =>
                      prev.filter(
                        (o) => !(o.color === opt.color && o.size === opt.size),
                      ),
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <S.TotalRow>
              <S.TotalLabel>총 결제</S.TotalLabel>
              <S.TotalValue>{totalPrice.toLocaleString()}원</S.TotalValue>
            </S.TotalRow>
            <S.ButtonRow style={{ display: "grid" }}>
              <S.PrimaryBtn disabled={!canBuy} onClick={addToCart}>
                장바구니
              </S.PrimaryBtn>
              <S.SecondaryBtn disabled={!canBuy}>구매하기</S.SecondaryBtn>
            </S.ButtonRow>
          </S.StickyBottom>
        </S.Right>
      </S.Container>
    </S.Page>
  );
};
export default ProductDetail;
