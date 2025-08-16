package com.pickit.seller.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SellerUpdateRequest {
    private String storeName;
    private String storeAddress;
}
