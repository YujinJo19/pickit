import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import {
  productFormSchema,
  ProductFormValues,
} from "../../schemas/productFormSchema";
import { getParentCategories, getChildCategories } from "../../utils/category";
import { Category } from "../../data/categories";
import Input from "../ui/Input";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  existingImages?: string[];
  onSubmit: SubmitHandler<ProductFormValues>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  existingImages,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...defaultValues,
      categoryIdParent: defaultValues?.categoryIdParent || 0,
      inventory: defaultValues?.inventory || [
        { color: "", size: "", quantity: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventory",
  });
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const parentId = watch("categoryIdParent");

  const handleAddImageClick = () => {
    if (previewImages.length >= 3) {
      alert("이미지는 최대 3개까지 업로드 가능합니다.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const currentImages = watch("images") ?? [];
    if (currentImages.length >= 3) {
      alert("이미지는 최대 3개까지 업로드 가능합니다.");
      return;
    }

    const newImages = [...currentImages, file];
    setValue("images", newImages);
    setPreviewImages(newImages.map((f) => URL.createObjectURL(f)));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (idx: number) => {
    const images = watch("images") ?? [];
    const newImages = images.filter((_, i) => i !== idx);

    setValue("images", newImages);
    setPreviewImages(newImages.map((f) => URL.createObjectURL(f)));
  };

  useEffect(() => {
    if (parentId !== undefined) {
      setChildCategories(getChildCategories(Number(parentId)));
    }
  }, [parentId, setValue]);

  useEffect(() => {
    if (defaultValues?.categoryIdParent !== undefined) {
      const parent = defaultValues.categoryIdParent;
      setChildCategories(getChildCategories(Number(parent)));
    }
  }, [defaultValues]);

  useEffect(() => {
    if (!existingImages) return;
    setPreviewImages(existingImages);
  }, [existingImages]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이름"
        field={register("name")}
        error={errors.name?.message}
      />
      <Label>상품 이미지 (최대 3개)</Label>
      <button type="button" onClick={handleAddImageClick}>
        이미지 추가
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <PreviewContainer>
        {previewImages.map((src, idx) => (
          <PreviewWrapper key={idx}>
            <PreviewImage src={src} alt={`image-${idx}`} />
            <button type="button" onClick={() => handleRemoveImage(idx)}>
              삭제
            </button>
          </PreviewWrapper>
        ))}
      </PreviewContainer>
      <Input
        label="가격"
        type="number"
        field={register("price", { valueAsNumber: true })}
        error={errors.price?.message}
      />
      <Input
        label="할인 가격"
        type="number"
        field={register("discountPrice", { valueAsNumber: true })}
        error={errors.discountPrice?.message}
      />

      <Label>설명</Label>
      <Textarea {...register("description")} />
      {errors.description && <Error>{errors.description.message}</Error>}

      <Label>상위 카테고리</Label>
      <Select {...register("categoryIdParent", { valueAsNumber: true })}>
        <option value="">선택</option>
        {getParentCategories().map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
      {childCategories.length > 0 && (
        <>
          <Label>하위 카테고리</Label>
          <Select {...register("categoryId", { valueAsNumber: true })}>
            <option value="">선택</option>
            {childCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          {errors.categoryId && <Error>{errors.categoryId.message}</Error>}
        </>
      )}

      <Label>재고</Label>
      {fields.map((item, index) => (
        <InventoryRow key={item.id}>
          <Input
            placeholder="색상"
            field={register(`inventory.${index}.color`)}
          />
          <Input
            placeholder="사이즈"
            field={register(`inventory.${index}.size`)}
          />
          <Input
            placeholder="수량"
            type="number"
            field={register(`inventory.${index}.quantity`, {
              valueAsNumber: true,
            })}
          />
          <InventoryDeleteButton type="button" onClick={() => remove(index)}>
            삭제
          </InventoryDeleteButton>
        </InventoryRow>
      ))}
      <InventoryAddButton
        type="button"
        onClick={() => append({ color: "", size: "", quantity: 0 })}
      >
        재고 추가
      </InventoryAddButton>
      <SubmitButton type="submit">저장</SubmitButton>
    </form>
  );
};

export default ProductForm;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  flex-shrink: 0;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 6px;
  margin-top: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 6px;
  margin-top: 4px;
`;

const InventoryRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const InventoryDeleteButton = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #e63946;
  background: transparent;
  color: #e63946;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #e63946;
    color: #fff;
  }
`;

const InventoryAddButton = styled.button`
  margin-top: 10px;
  padding: 8px 14px;
  background-color: #457b9d;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: #1d3557;
  }
`;

const SubmitButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0e233d;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.9rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const PreviewWrapper = styled.div`
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;
