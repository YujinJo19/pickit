package com.pickit.cart.controller;

import com.pickit.cart.dto.CartAddRequest;
import com.pickit.cart.dto.CartQuantityUpdateRequest;
import com.pickit.cart.dto.CartResponse;
import com.pickit.cart.service.CartQueryService;
import com.pickit.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final CartQueryService cartQueryService;

    // 장바구니 추가
    @PostMapping("/items")
    public ResponseEntity<Void> addItem(
            @RequestAttribute("userId") Long userId,
            @RequestBody @Valid CartAddRequest request
            ) {
     cartService.addItem(
             userId,
             request.getProductId(),
             request.getInventoryId(),
             request.getQuantity()
     );
     return ResponseEntity.ok().build();
    }

    // 장바구니 조회
    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            @RequestAttribute("userId") Long userId
    ) {
        return ResponseEntity.ok(cartQueryService.getCart(userId));
    }

    // 수량 변경
    @PatchMapping("/items/{cartItemId}")
    public ResponseEntity<Void> changeQuantity(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long cartItemId,
            @RequestBody @Valid CartQuantityUpdateRequest request
    ) {
        cartService.changeQuantity(userId, cartItemId, request.getQuantity());
        return ResponseEntity.ok().build();
    }

    // 아이템 삭제
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeItem(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long cartItemId
    ) {
        cartService.removeItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    // 장바구니 비우기
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @RequestAttribute("userId") Long userId
    ) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}