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
import { ZodType } from "zod";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  schema: ZodType<ProductFormValues>;
  onSubmit: SubmitHandler<ProductFormValues>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  schema,
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

  // 이미지 추가 버튼 클릭 → 숨겨진 input 발동
  const handleAddImageClick = () => {
    if (previewImages.length >= 3) {
      alert("이미지는 최대 3개까지 업로드 가능합니다.");
      return;
    }
    fileInputRef.current?.click();
  };

  // 이미지 선택 처리 (File 하나만)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 기존 이미지 + 새 이미지 → 최대 3개 제한
    const currentImages = (watch("images") as File[]) || [];
    if (currentImages.length >= 3) {
      alert("이미지는 최대 3개까지 업로드 가능합니다.");
      return;
    }

    const newImages = [...currentImages, file];

    setValue("images", newImages);

    // 미리보기 업데이트
    setPreviewImages(newImages.map((f) => URL.createObjectURL(f)));

    // input 초기화(같은 파일 다시 선택 가능)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (idx: number) => {
    const images = (watch("images") as File[]) || [];
    const newImages = images.filter((_, i) => i !== idx);

    setValue("images", newImages);
    setPreviewImages(newImages.map((f) => URL.createObjectURL(f)));
  };

  useEffect(() => {
    if (parentId) {
      setChildCategories(getChildCategories(Number(parentId)));
      setValue("categoryId", 0); // 하위 카테고리 초기화
    }
  }, [parentId, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>상품명</Label>
      <Input {...register("name")} />
      {errors.name && <Error>{errors.name.message}</Error>}

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

      <Label>가격</Label>
      <Input type="number" {...register("price", { valueAsNumber: true })} />
      {errors.price && <Error>{errors.price.message}</Error>}
      <Label>할인 가격</Label>
      <Input
        type="number"
        {...register("discountPrice", { valueAsNumber: true })}
      />
      {errors.discountPrice && <Error>{errors.discountPrice.message}</Error>}

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
            {...register(`inventory.${index}.color` as const)}
          />
          <Input
            placeholder="사이즈"
            {...register(`inventory.${index}.size` as const)}
          />
          <Input
            placeholder="수량"
            type="number"
            {...register(`inventory.${index}.quantity`, {
              valueAsNumber: true,
            })}
          />
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </InventoryRow>
      ))}
      <button
        type="button"
        onClick={() => append({ color: "", size: "", quantity: 0 })}
      >
        재고 추가
      </button>
      <SubmitButton type="submit">저장</SubmitButton>
    </form>
  );
};

export default ProductForm;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;
const Input = styled.input`
  width: 100%;
  padding: 6px;
  margin-top: 4px;
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
const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #457b9d;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #1d3557;
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
