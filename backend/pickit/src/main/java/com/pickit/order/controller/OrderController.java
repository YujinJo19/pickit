package com.pickit.order.controller;

import com.pickit.order.dto.OrderCreateRequest;
import com.pickit.order.dto.OrderCreateResponse;
import com.pickit.order.dto.OrderDetailResponse;
import com.pickit.order.dto.OrderListResponse;
import com.pickit.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    // 장바구니 기반 주문 생성
    @PostMapping
    public ResponseEntity<OrderCreateResponse> createOrder(
            @RequestAttribute("userId") Long userId,
            @RequestBody @Valid OrderCreateRequest request
    ) {
        return ResponseEntity.ok(orderService.createOrder(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<OrderListResponse>> getMyOrders(
            @RequestAttribute("userId") Long userId
    ) {
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    // 주문 상세
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailResponse> getOrderDetail(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long orderId
    ) {
        return ResponseEntity.ok(orderService.getOrderDetail(userId, orderId));
    }
}