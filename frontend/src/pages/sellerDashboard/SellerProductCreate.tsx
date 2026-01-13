import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/product/ProductForm";
import { ProductFormValues } from "../../schemas/productFormSchema";
import { createProduct } from "../../store/thunks/sellerProductThunk";
import { useAppDispatch } from "../../store/hooks";
const SellerProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    const dto = { ...data };
    delete dto.images;
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await dispatch(createProduct(formData));

    if (response.meta.requestStatus === "fulfilled") {
      const newProductId = response.payload.id;
      navigate(`/seller/dashboard/products/${newProductId}`);
    }
  };

  return <ProductForm onSubmit={handleSubmit} />;
};

export default SellerProductCreate;
