package com.pickit.order.service;

import com.pickit.order.dto.OrderCreateRequest;
import com.pickit.order.dto.OrderCreateResponse;
import com.pickit.order.dto.OrderDetailResponse;
import com.pickit.order.dto.OrderListResponse;

import java.util.List;

public interface OrderService {
    OrderCreateResponse createOrder(Long userId, OrderCreateRequest request);

    OrderDetailResponse getOrderDetail(Long userId, Long orderId);

    List<OrderListResponse> getMyOrders(Long userId);
}

