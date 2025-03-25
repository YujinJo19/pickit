package com.pickit.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddressResponse {
    private Long id;
    private String label;
    private String city;
    private String zipCode;
    private String recipientName;
    private String phone;
}
