package com.pickit.order.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponse {
    private Long orderItemId;
    private Long productId;
    private String productName;
    private String thumbnailUrl;

    private String color;
    private String size;

    private Integer quantity;
    private Integer unitPrice;
    private Integer unitDiscountPrice;
    private Integer lineTotal;
}
