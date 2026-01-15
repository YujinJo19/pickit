package com.pickit.product.controller;

import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.service.ProductSellerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@Tag(
        name = "Seller Product API",
        description = "판매자의 상품 조회/등록/수정/삭제 API"
)
@RestController
@RequestMapping("/api/seller/products")
@RequiredArgsConstructor
public class ProductSellerController {

    private final ProductSellerService productSellerService;

    @Operation(
            summary = "상품 등록",
            description = "상품 정보를 입력받아 상품을 등록합니다."
    )
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @RequestPart("dto") ProductCreateRequest dto,
            @RequestPart("images")MultipartFile[] images) throws Exception {

        List<MultipartFile> imageUrls = images != null ? Arrays.asList(images) : null;
        return ResponseEntity.ok(productSellerService.create(dto, imageUrls));
    }

    @Operation(
            summary = "상품 수정",
            description = "특정 상품의 상세 정보를 수정합니다."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
                @PathVariable Long id,
                @RequestPart("dto") ProductUpdateRequest dto,
                @RequestPart(value = "images", required = false) MultipartFile[] images) throws Exception {

        List<MultipartFile> imageUrls = images != null ? Arrays.asList(images) : null;
        return ResponseEntity.ok(productSellerService.update(id, dto, imageUrls));
    }

    @Operation(
            summary = "상품 삭제",
            description = "특정 상품을 삭제합니다."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productSellerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "내 상품 조회",
            description = "판매자 정보를 기반으로 해당 판매자의 모든 상품을 조회합니다."
    )
    @GetMapping("/mine")
    public ResponseEntity<Page<ProductResponse>> getMyProducts(Pageable pageable) {
        return ResponseEntity.ok(productSellerService.getMine(pageable));
    }
}
