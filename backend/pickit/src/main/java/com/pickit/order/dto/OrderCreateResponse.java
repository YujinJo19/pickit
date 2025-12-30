package com.pickit.order.dto;

import com.pickit.global.common.OrderStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderCreateResponse {
    private Long orderId;
    private OrderStatus status;
    private Integer totalPrice;
}
