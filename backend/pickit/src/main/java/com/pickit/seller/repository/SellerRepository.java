package com.pickit.seller.repository;

import com.pickit.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    boolean existsByBusinessNumber(String businessNumber);
    boolean existsByStoreName(String storeName);
    boolean existsByStoreAddress(String storeAddress);
    Optional<Seller> findByUserId(Long userId);
}