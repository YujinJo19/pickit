package com.pickit.order.entity;

import com.pickit.product.entity.Inventory;
import com.pickit.product.entity.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @Column(nullable = false)
    private Integer quantity;

    // 주문 시점 가격 스냅샷
    @Column(nullable = false)
    private Integer unitPrice;

    @Column
    private Integer unitDiscountPrice;

    public static OrderItem create(Product product, Inventory inventory, int quantity, int unitPrice, Integer unitDiscountPrice) {
        OrderItem item = new OrderItem();
        item.product = product;
        item.inventory = inventory;
        item.quantity = quantity;
        item.unitPrice = unitPrice;
        item.unitDiscountPrice = unitDiscountPrice;
        return item;
    }

    void attachTo(Order order) {
        this.order = order;
    }

    public int getFinalUnitPrice() {
        return unitDiscountPrice != null ? unitDiscountPrice : unitPrice;
    }

    public int getLineTotal() {
        return getFinalUnitPrice() * quantity;
    }
}