import z from "zod";

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다.")
    .max(20, "닉네임은 20자 이하로 입력해주세요."),
  phoneNumber: z
    .string()
    .min(9, "전화번호를 입력해주세요.")
    .max(11, "전화번호 형식이 올바르지 않습니다."),
});
