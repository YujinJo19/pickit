package com.pickit.seller.dto;

import com.pickit.user.dto.UserSignupRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerSignupRequest  extends UserSignupRequest {
    @NotBlank(message = "사업자등록번호는 필수입니다.")
    private String businessNumber;

    @NotBlank(message = "가게명은 필수입니다.")
    private String storeName;

    @NotBlank(message = "가게 주소는 필수입니다.")
    private String storeAddress;

}
