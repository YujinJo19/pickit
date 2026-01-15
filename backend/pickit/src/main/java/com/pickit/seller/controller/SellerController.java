package com.pickit.seller.controller;

import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerUpdateRequest;
import com.pickit.seller.service.SellerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Seller API",
        description = "판매자 정보 조회 및 수정 API"
)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/seller")
public class SellerController {

    private final SellerService sellerService;
    @Operation(
            summary = "판매자 정보 조회",
            description = "회원 ID를 통해 판매자 정보를 조회합니다."
    )
    @GetMapping("/{sellerId}")
    public ResponseEntity<SellerResponse> getSeller(@PathVariable long sellerId) {
        return ResponseEntity.ok(sellerService.getSellerById(sellerId));
    }

    @Operation(
            summary = "판매자 정보 수정",
            description = "회원 ID를 통해 판매자 정보를 수정합니다."
    )
    @PatchMapping("/{sellerId}")
    public ResponseEntity<SellerResponse> updateSeller(
            @PathVariable Long sellerId,
            @RequestBody SellerUpdateRequest request
    ) {
        return ResponseEntity.ok(sellerService.updateSeller(sellerId, request));
    }
    @Operation(
            summary = "판매자 회원 탈퇴",
            description = "해당 판매자를 탈퇴 처리합니다."
    )
    @DeleteMapping("/{sellerId}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long sellerId) {
        sellerService.deleteSeller(sellerId);
        return ResponseEntity.noContent().build();
    }
}