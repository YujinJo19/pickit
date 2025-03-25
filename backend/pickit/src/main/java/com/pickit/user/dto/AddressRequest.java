package com.pickit.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {
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
