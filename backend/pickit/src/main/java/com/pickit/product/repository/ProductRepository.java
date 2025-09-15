package com.pickit.product.repository;

import com.pickit.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 판매자별 상품 조회
    Page<Product> findAllBySeller_Id(Long sellerId, Pageable pageable);

    // 카테고리별 조회
    Page<Product> findByCategory_Id(Long categoryId, Pageable pageable);

    // 키워드 검색 (페이징 가능)
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // 상세 조회 (이미지, 인벤토리 포함)
    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.images " +
            "LEFT JOIN FETCH p.inventories " +
            "WHERE p.id = :id")
    Optional<Product> findByIdWithDetails(@Param("id") Long id);

    // 카테고리별 상세 조회 (페이징 없이 List)
    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN FETCH p.images " +
            "LEFT JOIN FETCH p.inventories " +
            "WHERE p.category.id = :categoryId")
    Page<Product> findByCategoryWithDetails(@Param("categoryId") Long categoryId, Pageable pageable);
}
