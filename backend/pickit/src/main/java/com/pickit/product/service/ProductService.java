package com.pickit.product.service;

import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    // 전체 상품 조회
    Page<ProductResponse> getAllProducts(Pageable pageable);

    // 상품 상세 조회
    ProductDetailResponse getProductDetail(Long productId);

    // 카테고리별 상품 조회
    Page<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable);

    // 상품 검색
    Page<ProductResponse> searchProducts(String keyword, Pageable pageable);
}
