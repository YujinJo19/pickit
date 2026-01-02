package com.pickit.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {
    @NotBlank(message = "주소 별칭은 필수입니다.")
    private String label;

    private String addressRaw;

    @NotBlank(message = "도시는 필수 입력 항목입니다.")
    @Size(min = 2, max = 20, message = "도시명은 2~20자 이내여야 합니다.")
    private String city;

    @Size(min = 2, max = 20, message = "구/군은 2~20자 이내여야 합니다.")
    private String district;

    @Size(min = 2, max = 20, message = "동/읍/면은 2~20자 이내여야 합니다.")
    private String neighborhood;

    @NotBlank(message = "상세 주소는 필수 입력 항목입니다.")
    private String streetAddress;

    @NotBlank(message = "우편번호는 필수 입력 항목입니다.")
    @Pattern(regexp = "^\\d{5}$", message = "우편번호는 5자리 숫자여야 합니다.")
    private String zipCode;

    @NotBlank(message = "수령인 이름은 필수 입력 항목입니다.")
    @Size(min = 2, max = 20, message = "수령인 이름은 2~20자 이내여야 합니다.")
    private String recipientName;

    @NotBlank(message = "전화번호는 필수 입력 항목입니다.")
    @Pattern(regexp = "^\\d{10,11}$", message = "전화번호는 10~11자리 숫자여야 합니다.")
    private String phone;

    private Boolean isDefault;

    private String deliveryRequest;
}
