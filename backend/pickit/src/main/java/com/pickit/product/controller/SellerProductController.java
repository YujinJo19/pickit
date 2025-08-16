package com.pickit.product.controller;

import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductCreateRequest;

import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller/products")
@RequiredArgsConstructor
public class SellerProductController {

    private final ProductService productService;

    // 상품 등록
    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestParam Long sellerId,
                                                     @RequestBody ProductCreateRequest dto) {
        return ResponseEntity.ok(productService.create(dto, sellerId));
    }

    // 상품 수정
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@RequestParam Long sellerId,
                                                     @PathVariable Long id,
                                                     @RequestBody ProductUpdateRequest dto) {
        return ResponseEntity.ok(productService.update(id, dto, sellerId));
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@RequestParam Long sellerId,
                                       @PathVariable Long id) {
        productService.delete(sellerId, id);
        return ResponseEntity.noContent().build();
    }

    // 내 상품 조회
    @GetMapping("/mine")
    public ResponseEntity<List<ProductResponse>> getMyProducts(@RequestParam Long sellerId) {
        return ResponseEntity.ok(productService.getMine(sellerId));
    }
}
