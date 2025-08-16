package com.pickit.seller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SellerResponse {
    private Long id;
    private String businessNumber;
    private String storeName;
    private String storeAddress;
    private String status;
}
