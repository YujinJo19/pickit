package com.pickit.order.dto;

import com.pickit.global.common.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderDetailResponse {
    private Long orderId;
    private OrderStatus status;
    private Integer totalPrice;
    private LocalDateTime createdAt;

    private Long addressId;

    private List<OrderItemResponse> items;
}
