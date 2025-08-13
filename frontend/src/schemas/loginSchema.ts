import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이어야 합니다."),
  password: z.string().min(8, "비밀번호는 8자리 이상입니다."),
  autoLogin: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
