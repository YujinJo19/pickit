package com.pickit.cart.service.impl;

import com.pickit.cart.dto.CartItemResponse;
import com.pickit.cart.dto.CartResponse;
import com.pickit.cart.entity.Cart;
import com.pickit.cart.entity.CartItem;
import com.pickit.cart.repository.CartRepository;
import com.pickit.cart.service.CartQueryService;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.product.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartQueryServiceImpl implements CartQueryService {
    private final CartRepository cartRepository;

    public CartResponse getCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));
        List<CartItemResponse> items = cart.getItems().stream()
                .map(this::toItemResponse)
                .toList();
        int totalPrice = items.stream()
                .mapToInt(CartItemResponse::getTotalPrice)
                .sum();
        return CartResponse.builder()
                .items(items)
                .totalPrice(totalPrice)
                .build();
    }

    private CartItemResponse toItemResponse(CartItem item) {

        int unitPrice = item.getProduct().getDiscountPrice() != null
                ? item.getProduct().getDiscountPrice()
                : item.getProduct().getPrice();

        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .thumbnailUrl(ProductMapper.extractThumbnailUrl(item.getProduct())
                )
                .color(item.getInventory().getColor())
                .size(item.getInventory().getSize())
                .quantity(item.getQuantity())
                .price(unitPrice)
                .totalPrice(unitPrice * item.getQuantity())
                .build();
    }
}
