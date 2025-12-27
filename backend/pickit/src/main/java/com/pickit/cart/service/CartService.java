package com.pickit.cart.service;

import com.pickit.cart.entity.CartItem;

public interface CartService {
    // 장바구니에 아이템 추가
    void addItem(Long userId, Long productId, Long inventoryId, int quantity);

    // 장바구니 내에서 수량 변경
    void changeQuantity(Long userId, Long cartItemId, int quantity);

    // 장바구니 아이템 삭제
    void removeItem(Long userId, Long cartItemId);

    // 장바구니 비우기
    void clearCart(Long userId);

}