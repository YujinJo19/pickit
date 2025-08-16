package com.pickit.seller.entity;

import com.pickit.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "seller")
public class Seller {

    public enum SellerStatus {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String businessNumber;

    @Column(nullable = false, unique = true)
    private String storeName;

    @Column(nullable = false, unique = true)
    private String storeAddress;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SellerStatus status = SellerStatus.PENDING;

    @Column(updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Builder
    public Seller(User user, String businessNumber, String storeName, String storeAddress) {
        this.user = user;
        this.businessNumber = businessNumber;
        this.storeName = storeName;
        this.storeAddress = storeAddress;
        this.status = SellerStatus.PENDING;
    }

    // 변경 메서드
    public void updateStoreName(String storeName) {
        this.storeName = storeName;
    }

    public void updateStoreAddress(String storeAddress) {
        this.storeAddress = storeAddress;
    }
}
