package com.pickit.product.controller;

import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product API", description = "상품 관련 API")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 전체 상품 조회
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC)
                                                                    Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    // 상품 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductDetail(id));
    }

    // 카테고리별 상품 조회
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId, pageable));
    }

    // 상품 검색
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam String keyword,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return ResponseEntity.ok(productService.searchProducts(keyword, pageable));
    }
}