package com.pickit.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String color;

    @Column
    private String size;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // 재고 차감 (도메인 메서드)
    public void decrease(int amount) {
        if (amount < 1) {
            throw new IllegalArgumentException("decrease amount must be >= 1");
        }
        if (this.quantity < amount) {
            throw new IllegalArgumentException("insufficient stock");
        }
        this.quantity -= amount;
    }
}
