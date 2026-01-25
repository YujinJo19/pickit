package com.pickit.cart.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItemResponse {
    private Long cartItemId;
    private Long productId;
    private String productName;
    private String thumbnailUrl;

    private String color;
    private String size;

    private int quantity;
    private int price;       // 단가
    private int totalPrice;  // 단가 * 수량

    private int maxQuantity;
}
