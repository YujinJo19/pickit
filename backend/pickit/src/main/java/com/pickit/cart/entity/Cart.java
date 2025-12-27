package com.pickit.cart.entity;

import com.pickit.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="cart",
       uniqueConstraints = {@UniqueConstraint(name = "uk_cart_user_id", columnNames = "user_id")})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<CartItem> items = new ArrayList<>();

    @Builder
    private Cart(User user) {
        this.user = user;
    }

    public static Cart create(User user) {
        return Cart.builder().user(user).build();
    }

    public void addItem(CartItem item) {
        this.items.add(item);
        item.attachTo(this);
    }

    public void removeItem(CartItem item) {
        this.items.remove(item);
        item.detach();
    }

    public void clearItems() {
        this.items.clear();
    }
}