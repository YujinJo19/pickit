package com.pickit.seller.controller;

import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerUpdateRequest;
import com.pickit.seller.service.SellerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/seller")
@Tag(name = "Seller API", description = "판매자 관련 API")
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/{sellerId}")
    public ResponseEntity<SellerResponse> getSeller(@PathVariable long sellerId) {
        return ResponseEntity.ok(sellerService.getSellerById(sellerId));
    }

    @PatchMapping("/{sellerId}")
    public ResponseEntity<SellerResponse> updateSeller(
            @PathVariable Long sellerId,
            @RequestBody SellerUpdateRequest request
    ) {
        return ResponseEntity.ok(sellerService.updateSeller(sellerId, request));
    }

    @DeleteMapping("/{sellerId}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long sellerId) {
        sellerService.deleteSeller(sellerId);
        return ResponseEntity.noContent().build();
    }
}