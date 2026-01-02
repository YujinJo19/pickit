package com.pickit.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddressResponse {
    private Long id;
    private String label;
    private String addressRaw;
    private String city;
    private String district;
    private String neighborhood;
    private String streetAddress;
    private String zipCode;
    private String recipientName;
    private String phone;
    private Boolean isDefault;
    private String deliveryRequest;
}
