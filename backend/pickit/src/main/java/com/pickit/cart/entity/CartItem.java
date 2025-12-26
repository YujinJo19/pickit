package com.pickit.cart.entity;

import com.pickit.product.entity.Inventory;
import com.pickit.product.entity.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "cart_item",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_cart_item_cart_inventory", columnNames = {"cart_id", "inventory_id"})
        }
)
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @Column(nullable = false)
    private int quantity;

    @Builder
    private CartItem(Product product, Inventory inventory, int quantity) {
        this.product = product;
        this.inventory = inventory;
        this.quantity = Math.max(quantity, 1);
    }

    public static CartItem create(Product product, Inventory inventory, int quantity) {
        return CartItem.builder()
                .product(product)
                .inventory(inventory)
                .quantity(quantity)
                .build();
    }

    void attachTo(Cart cart) {
        this.cart = cart;
    }

    void detach() {
        this.cart = null;
    }

    public void increase(int addQuantity) {
        if (addQuantity <= 0) return;
        this.quantity += addQuantity;
    }

    public void changeQuantity(int quantity) {
        if (quantity < 1) {
            throw new IllegalArgumentException("quantity must be >= 1");
        }
        this.quantity = quantity;
    }
}