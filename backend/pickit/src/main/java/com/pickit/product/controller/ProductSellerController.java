package com.pickit.product.controller;

import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.service.ProductSellerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;


@RestController
@Tag(name = "Product API", description = "상품 관련 API")
@RequestMapping("/api/seller/products")
@RequiredArgsConstructor
public class ProductSellerController {

    private final ProductSellerService productSellerService;

    // 상품 등록
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @RequestPart("dto") ProductCreateRequest dto,
            @RequestPart("images")MultipartFile[] images) throws Exception {

        List<MultipartFile> imageUrls = images != null ? Arrays.asList(images) : null;
        return ResponseEntity.ok(productSellerService.create(dto, imageUrls));
    }

    // 상품 수정
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
                @PathVariable Long id,
                @RequestPart("dto") ProductUpdateRequest dto,
                @RequestPart(value = "images", required = false) MultipartFile[] images) throws Exception {

        List<MultipartFile> imageUrls = images != null ? Arrays.asList(images) : null;
        return ResponseEntity.ok(productSellerService.update(id, dto, imageUrls));
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productSellerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 내 상품 조회
    @GetMapping("/mine")
    public ResponseEntity<Page<ProductResponse>> getMyProducts(Pageable pageable) {
        return ResponseEntity.ok(productSellerService.getMine(pageable));
    }
}
