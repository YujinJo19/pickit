import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../../schemas/profileSchema";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { updateProfile } from "../../store/thunks/userThunk";
import { User } from "../../types/user";

interface ProfileFormProps {
  user: User;
}

export interface ProfileFormValues {
  nickname: string;
  phoneNumber: string;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (values: ProfileFormValues) => {
    const response = await dispatch(
      updateProfile({ id: user.id, data: values })
    );

    if (response.meta.requestStatus === "fulfilled") {
      alert("프로필이 변경되었습니다.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        field={register("nickname")}
        label="닉네임"
        error={errors.nickname?.message}
      />
      <Input
        label="이메일"
        field={{ name: "email", value: user.email } as any}
        readOnly
      />
      <Input
        field={register("phoneNumber")}
        label="전화번호"
        error={errors.phoneNumber?.message}
      />
      <Button
        contents={isSubmitting ? "저장 중" : "변경사항 저장"}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ProfileForm;
