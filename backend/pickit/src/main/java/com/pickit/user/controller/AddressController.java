package com.pickit.user.controller;

import com.pickit.user.dto.AddressRequest;
import com.pickit.user.dto.AddressResponse;
import com.pickit.user.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/{userId}/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    // 주소 설정
    @PostMapping
    public ResponseEntity<AddressResponse> create(
            @PathVariable Long userId,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addressService.createAddress(userId, request));
    }

    // 주소 가져오기
    @GetMapping
    public ResponseEntity<List<AddressResponse>> list(
            @PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddresses(userId));
    }

    // 주소 삭제
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long userId, @PathVariable Long addressId) {
        addressService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }

    // 주소 수정
    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> update(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.ok(addressService.updateAddress(userId, addressId, request));
    }

    // 기본 배송지 설정
    @PutMapping("/{addressId}/default")
    public ResponseEntity<AddressResponse> setDefault(
            @PathVariable Long userId, @PathVariable Long addressId) {
        return ResponseEntity.ok(addressService.setDefaultAddress(userId, addressId));
    }
}
