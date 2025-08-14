package com.pickit.seller.mapper;

import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerUpdateRequest;
import com.pickit.seller.entity.Seller;
import org.springframework.stereotype.Component;

@Component
public class SellerMapper {

    public static SellerResponse toResponse(Seller seller) {
        return SellerResponse.builder()
                .id(seller.getId())
                .businessNumber(seller.getBusinessNumber())
                .storeName(seller.getStoreName())
                .storeAddress(seller.getStoreAddress())
                .status(seller.getStatus().name())
                .build();

    }

    public static void updateSellerFromRequest(Seller seller, SellerUpdateRequest request) {
        if (request.getStoreName() != null) {
            seller.updateStoreName(request.getStoreName());
        }
        if (request.getStoreAddress() != null) {
            seller.updateStoreAddress(request.getStoreAddress());
        }
    }
}
