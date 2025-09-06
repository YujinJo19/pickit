import { z } from "zod";

export const sellerSignupSchema = z
  .object({
    storeName: z.string().min(1, "판매자명을 입력해주세요."),
    storeAddress: z.string().min(1, "사업장 주소를 입력해주세요."),
    businessNumber: z.string().min(1, "사업자번호 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    email: z.string().email("올바른 이메일 형식이어야 합니다."),
    code: z.string().min(1, "인증 코드를 입력해주세요."),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    password2: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, "휴대폰 번호 형식이 올바르지 않습니다."),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SellerSignupFormValues = z.infer<typeof sellerSignupSchema>;
