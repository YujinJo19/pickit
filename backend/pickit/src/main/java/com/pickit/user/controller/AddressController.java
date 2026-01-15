package com.pickit.user.controller;

import com.pickit.user.dto.AddressRequest;
import com.pickit.user.dto.AddressResponse;
import com.pickit.user.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Address",
        description = "사용자의 배송지 관리 API"
)
@RestController
@RequestMapping("/api/user/{userId}/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @Operation(
            summary = "배송지 생성",
            description = "회원 ID를 통해 해당 사용자의 배송지를 생성합니다."
    )    
    @PostMapping
    public ResponseEntity<AddressResponse> create(
            @PathVariable Long userId,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addressService.createAddress(userId, request));
    }

    @Operation(
            summary = "배송지 목록 조회",
            description = "회원 ID를 통해 해당 사용자의 모든 배송지 리스트를 조회합니다."
    ) 
    @GetMapping
    public ResponseEntity<List<AddressResponse>> list(
            @PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddresses(userId));
    }

    @Operation(
            summary = "배송지 삭제",
            description = "회원 ID, 배송지 ID를 통해 해당 배송지를 삭제합니다."
    )
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long userId, @PathVariable Long addressId) {
        addressService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "배송지 수정",
            description = "회원 ID, 배송지 ID를 통해 해당 배송지를 수정합니다."
    )
    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> update(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.ok(addressService.updateAddress(userId, addressId, request));
    }

    @Operation(
            summary = "기본 배송지 설정",
            description = "회원 ID, 배송지 ID를 통해 해당 배송지를 기본 배송지로 설정합니다."
    )
    @PutMapping("/{addressId}/default")
    public ResponseEntity<AddressResponse> setDefault(
            @PathVariable Long userId, @PathVariable Long addressId) {
        return ResponseEntity.ok(addressService.setDefaultAddress(userId, addressId));
    }
}
