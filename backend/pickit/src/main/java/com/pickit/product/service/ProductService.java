package com.pickit.product.service;

import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductUpdateRequest;

import java.util.List;

public interface ProductService {
    // 상품 등록
    ProductResponse create(ProductCreateRequest request, Long sellerId);

    // 상품 정보 수정
    ProductResponse update(Long productId, ProductUpdateRequest request, Long sellerId);

    // 상품 삭제
    void delete(Long productId, Long sellerId);

    // 내 상품 보기 - 판매자
    List<ProductResponse> getMine(Long sellerId);
}
