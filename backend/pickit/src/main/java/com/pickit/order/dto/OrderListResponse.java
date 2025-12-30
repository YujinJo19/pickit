package com.pickit.order.dto;

import com.pickit.global.common.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class OrderListResponse {
    private Long orderId;
    private OrderStatus status;
    private Integer totalPrice;
    private LocalDateTime createdAt;
}