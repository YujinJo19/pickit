package com.pickit.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddressResponse {
    private Long id;
    private String label;
    private String addressRaw;
    private String addressDetail ;
    private String zipCode;
    private String recipientName;
    private String phone;
    private Boolean isDefault;
}
