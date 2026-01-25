package com.pickit.cart.service.impl;

import com.pickit.cart.entity.Cart;
import com.pickit.cart.entity.CartItem;
import com.pickit.cart.repository.CartItemRepository;
import com.pickit.cart.repository.CartRepository;
import com.pickit.cart.service.CartService;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.product.entity.Inventory;
import com.pickit.product.entity.Product;
import com.pickit.product.repository.InventoryRepository;
import com.pickit.product.repository.ProductRepository;
import com.pickit.user.entity.User;
import com.pickit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public void addItem(Long userId, Long productId, Long inventoryId, int quantity) {
        if (quantity < 1) {
            throw new BusinessException(ErrorCode.INVALID_CART_QUANTITY);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.create(user)));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVENTORY_NOT_FOUND));

        if (!inventory.getProduct().getId().equals(product.getId())) {
            throw new BusinessException(ErrorCode.INVENTORY_PRODUCT_MISMATCH);
        }

        CartItem cartItem = cartItemRepository
                .findByCartIdAndInventoryId(cart.getId(), inventoryId)
                .orElse(null);
        int currentQuantity = cartItem != null ? cartItem.getQuantity(): 0;
        int stock = inventory.getQuantity();

        if (currentQuantity + quantity > stock) {
            throw new BusinessException(ErrorCode.EXCEEDS_STOCK);
        };
        if (cartItem != null) {
            cartItem.increase(quantity);
        } else {
            CartItem newItem = CartItem.create(product, inventory, quantity);
            cart.addItem(newItem);
        }
    }

    @Override
    public void changeQuantity(Long userId, Long cartItemId, int quantity) {
        if (quantity < 1) {
            throw new BusinessException(ErrorCode.INVALID_CART_QUANTITY);
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));

        validateOwner(cartItem, userId);

        int stock = cartItem.getInventory().getQuantity();
        if (quantity > stock) {
            throw new BusinessException(ErrorCode.EXCEEDS_STOCK);
        }
        cartItem.changeQuantity(quantity);
    }

    @Override
    public void removeItem(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));

        validateOwner(cartItem, userId);

        Cart cart = cartItem.getCart();
        cart.removeItem(cartItem);
    }

    @Override
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));

        cart.clearItems();
    }

    // 사용자 검증
    private void validateOwner(CartItem cartItem, Long userId) {
        if (!cartItem.getCart().getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.CART_ITEM_ACCESS_DENIED);
        }
    }
}
