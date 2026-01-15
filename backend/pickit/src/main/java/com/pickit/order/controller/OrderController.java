package com.pickit.order.controller;

import com.pickit.order.dto.OrderCreateRequest;
import com.pickit.order.dto.OrderCreateResponse;
import com.pickit.order.dto.OrderDetailResponse;
import com.pickit.order.dto.OrderListResponse;
import com.pickit.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Order",
        description = "주문 관리 API"
)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Operation(
            summary = "주문 생성",
            description = "회원 ID를 기반으로 주문을 생성합니다."
    )
    @PostMapping
    public ResponseEntity<OrderCreateResponse> createOrder(
            @RequestAttribute("userId") Long userId,
            @RequestBody @Valid OrderCreateRequest request
    ) {
        return ResponseEntity.ok(orderService.createOrder(userId, request));
    }

    @Operation(
            summary = "주문 목록 조회",
            description = "회원 ID를 기반으로 전체 주문 목록을 조회합니다."
    )
    @GetMapping
    public ResponseEntity<List<OrderListResponse>> getMyOrders(
            @RequestAttribute("userId") Long userId
    ) {
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    @Operation(
            summary = "주문 상세 조회",
            description = "개별 주문의 상세 내용을 조회합니다."
    )
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailResponse> getOrderDetail(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long orderId
    ) {
        return ResponseEntity.ok(orderService.getOrderDetail(userId, orderId));
    }
}