package com.pickit.user.service;

import com.pickit.user.dto.AddressRequest;
import com.pickit.user.dto.AddressResponse;

import java.util.List;

public interface AddressService {

    // 1. 주소 생성
    AddressResponse createAddress(Long userId, AddressRequest request);

    // 2. 주소 목록 조회
    List<AddressResponse> getAddresses(Long userId);

    // 3. 주소 삭제
    void deleteAddress(Long addressId);
}
