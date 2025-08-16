package com.pickit.seller.service;

import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerSignupRequest;
import com.pickit.seller.dto.SellerUpdateRequest;

public interface SellerService {
    // 회원 가입 - 판매자
    SellerResponse registerSeller(SellerSignupRequest request);

    // 회원 정보 조회 - 판매자
    SellerResponse getSellerById(Long id);

    // 회원 정보 수정 - 판매자
    SellerResponse updateSeller(Long id, SellerUpdateRequest request);

    // 회원 정보 삭제 - 판매자
    void deleteSeller(Long id);

}