package com.pickit.seller.controller;

import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerUpdateRequest;
import com.pickit.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/seller")
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