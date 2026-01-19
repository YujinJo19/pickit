package com.pickit.order.entity;

import com.pickit.global.common.OrderStatus;
import com.pickit.user.entity.Address;
import com.pickit.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @Column(nullable = false)
    private Integer totalPrice = 0;

    @Column(name = "delivery_request", columnDefinition = "TEXT")
    private String deliveryRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private OrderStatus status = OrderStatus.CREATED;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<OrderItem> orderItems = new ArrayList<>();

    @PrePersist
    void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public static Order create(User user, Address address) {
        Order order = new Order();
        order.user = user;
        order.address = address;
        order.status = OrderStatus.CREATED;
        order.totalPrice = 0;
        return order;
    }

    public void addOrderItem(OrderItem item) {
        this.orderItems.add(item);
        item.attachTo(this);
        this.totalPrice += item.getLineTotal();
    }

    public void changeStatus(OrderStatus status) {
        this.status = status;
    }
}