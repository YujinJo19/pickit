import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string({ error: "상품명을 입력해주세요." }).min(1),
  price: z.number({ error: "가격을 입력해주세요." }).min(0),
  discountPrice: z.number({ error: "할인 가격을 입력해주세요." }).min(0),
  description: z.string({ error: "상품 설명을 입력해주세요." }).min(1),
  categoryIdParent: z.number({ error: "상위 카테고리를 선택해주세요." }).min(1),
  categoryId: z.number().min(0),
  images: z
    .array(z.instanceof(File))
    .max(3, "이미지는 최대 3개까지 업로드 가능합니다.")
    .optional(),
  inventory: z
    .array(
      z.object({
        color: z.string({ error: "색상을 입력해주세요." }).min(1),
        size: z.string({ error: "사이즈를 입력해주세요." }).min(1),
        quantity: z.number({ error: "재고를 입력해주세요." }).min(0),
      })
    )
    .nonempty("최소 하나 이상의 재고 정보를 입력해야 합니다."),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
