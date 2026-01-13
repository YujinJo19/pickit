import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/product/ProductForm";
import { ProductFormValues } from "../../schemas/productFormSchema";
import { updateProduct } from "../../store/thunks/sellerProductThunk";
import { useAppDispatch } from "../../store/hooks";
import { getParentIdFromCategoryId } from "../../utils/category";
import { getProductDetail } from "../../store/thunks/productThunk";
const SellerProductUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [defaultValues, setDefaultValues] = useState<ProductFormValues | null>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const resAction = await dispatch(getProductDetail(id));
        const resData = (resAction as any).payload;

        const parentId = getParentIdFromCategoryId(resData.categoryId);
        setDefaultValues({
          name: resData.name,
          price: resData.price,
          discountPrice: resData.discountPrice,
          description: resData.description,
          categoryIdParent: parentId,
          categoryId: resData.categoryId,
          images: resData.images,
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
  }, [id, dispatch]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    const formData = new FormData();
    const dto = { ...data };
    delete dto.images;
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    // 이미지 파일 추가
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }
    const productId = Number(id);
    const form = { formData, productId };
    const response = await dispatch(updateProduct(form));

    if (response.meta.requestStatus === "fulfilled") {
      navigate(`/seller/dashboard/products/${id}`);
      alert("상품이 수정되었습니다!");
    }
  };

  if (!defaultValues) return <div>로딩 중...</div>;
  return <ProductForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

export default SellerProductUpdate;
