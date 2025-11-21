import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/product/ProductForm";
import {
  productFormSchema,
  ProductFormValues,
} from "../../schemas/productFormSchema";
import {
  getProductDetail,
  updateProduct,
} from "../../store/thunks/productThunk";
import { useAppDispatch } from "../../store/hooks";
const SellerProductUpdate = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [defaultValues, setDefaultValues] = useState<ProductFormValues | null>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const resAction = await dispatch(getProductDetail(productId));
        const resData = (resAction as any).payload;

        setDefaultValues({
          name: resData.name,
          price: resData.price,
          discountPrice: resData.discountPrice,
          description: resData.description,
          categoryIdParent: resData.categoryIdParent || 0,
          categoryId: resData.categoryId,
          images: [], // 기존 이미지 처리 필요
          inventory: resData.inventory.map((item: any) => ({
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          })),
        });
      } catch (err) {
        console.error(err);
        alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchProduct();
  }, [productId, dispatch]);

  const handleSubmit = async (data: ProductFormValues) => {
    if (!productId) return;
    try {
      await updateProduct({ ...data, id: productId });
      alert("상품이 수정되었습니다!");
      navigate("/seller/products");
    } catch (err) {
      console.error(err);
      alert("상품 수정 중 오류가 발생했습니다.");
    }
  };

  if (!defaultValues) return <div>로딩 중...</div>;

  return (
    <ProductForm
      defaultValues={defaultValues}
      schema={productFormSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default SellerProductUpdate;
