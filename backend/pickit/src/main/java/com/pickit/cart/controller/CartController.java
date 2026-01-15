package com.pickit.cart.controller;

import com.pickit.cart.dto.CartAddRequest;
import com.pickit.cart.dto.CartQuantityUpdateRequest;
import com.pickit.cart.dto.CartResponse;
import com.pickit.cart.service.CartQueryService;
import com.pickit.cart.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Cart",
        description = "장바구니 관련 API"
)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final CartQueryService cartQueryService;

    @Operation(
            summary = "장바구니 추가",
            description = "사용자 ID를 통해 상품을 사용자의 장바구니에 추가합니다. "
    )
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

    @Operation(
            summary = "장바구니 조회",
            description = "사용자 ID를 통해 사용자의 장바구니를 조회합니다. "
    )
    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            @RequestAttribute("userId") Long userId
    ) {
        return ResponseEntity.ok(cartQueryService.getCart(userId));
    }

    @Operation(
            summary = "장바구니 내 상품 수량 변경",
            description = "장바구니 내 상품의 ID를 통해 해당 상품의 수량을 변경합니다. "
    )
    @PatchMapping("/items/{cartItemId}")
    public ResponseEntity<Void> changeQuantity(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long cartItemId,
            @RequestBody @Valid CartQuantityUpdateRequest request
    ) {
        cartService.changeQuantity(userId, cartItemId, request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "장바구니 내 상품 삭제",
            description = "장바구니 내 상품을 장바구니에서 삭제합니다."
    )    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeItem(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long cartItemId
    ) {
        cartService.removeItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "장바구니 삭제",
            description = "전체 장바구니를 비웁니다."
    )
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @RequestAttribute("userId") Long userId
    ) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}