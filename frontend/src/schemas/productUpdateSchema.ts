import z from "zod";

export const productUpdateSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요."),
  price: z.number().min(0, "가격은 0원 이상이어야 합니다."),
  discountPrice: z.number().min(0, "할인 가격은 0원 이상이어야 합니다."),
  description: z.string().min(1, "상품 설명을 입력해주세요."),
  categoryId: z.number().min(1, "카테고리를 선택해주세요."),
  inventory: z
    .array(
      z.object({
        color: z.string().min(1, "색상을 입력해주세요."),
        size: z.string().min(1, "사이즈를 입력해주세요."),
        stock: z.number().min(0, "재고는 0개 이상이어야 합니다."),
      })
    )
    .nonempty("최소 하나 이상의 재고 정보를 입력해야 합니다."),
});

export type ProductUpdateFormValues = z.infer<typeof productUpdateSchema>;
