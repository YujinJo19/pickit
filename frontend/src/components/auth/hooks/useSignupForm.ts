import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "../../../schemas/signupSchema";
import { LoginFormValues, loginSchema } from "../../../schemas/loginSchema";

export const useSignupForm = () =>
  useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // 포커스 벗어날 때 검증
  });

export const useLoginForm = () =>
  useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // 포커스 벗어날 때 검증
  });
