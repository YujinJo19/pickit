package com.pickit.product.controller;

import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Product API",
        description = "일반 사용자가 이용할 수 있는 상품 관련 API"
)
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "전체 상품 조회",
            description = "전체 상품의 정보를 조회합니다."
    )
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC)
                                                                    Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @Operation(
            summary = "단일 상품 조회",
            description = "상품 ID에 해당하는 상품의 정보를 조회합니다."
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductDetail(id));
    }

    @Operation(
            summary = "카테고리별 상품 조회",
            description = "카테고리 ID를 기반으로 해당하는 상품의 정보를 조회합니다."
    )
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId, pageable));
    }

    @Operation(
            summary = "상품 검색",
            description = "검색 키워드에 해당하는 상품 목록을 조회합니다."
    )
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam String keyword,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return ResponseEntity.ok(productService.searchProducts(keyword, pageable));
    }
}