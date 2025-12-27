package com.pickit.cart.repository;

import com.pickit.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndInventoryId(Long cartId, Long inventoryId);

    List<CartItem> findAllByCartId(Long cartId);
}

