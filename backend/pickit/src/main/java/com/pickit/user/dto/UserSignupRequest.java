package com.pickit.user.dto;

import com.pickit.global.common.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class UserSignupRequest {
    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식이어야 합니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하로 입력해주세요.")
    private String password;

    @NotBlank(message = "이름은 필수입니다.")
    @Size(min = 2, max = 30, message = "이름은 2~30자 이내로 입력해주세요.")
    private String name;

    @Size(min = 2, max = 20, message = "닉네임은 2~20자 이내로 입력해주세요.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "닉네임은 한글, 영문, 숫자만 입력 가능합니다.")
    private String nickname;

    @Pattern(regexp = "^\\d{10,11}$", message = "전화번호는 10~11자리 숫자여야 합니다.")
    private String phoneNumber;

    @Pattern(regexp = "^(http|https)://.*$", message = "유효한 URL 형식이 아닙니다.")
    private String profileImageUrl;

    private Boolean socialLogin;

    private String socialProvider;

    private Role role; // 선택적으로 받을 수 있음 (없으면 기본 USER로 처리)
}