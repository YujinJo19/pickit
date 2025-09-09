package com.pickit.seller.service.impl;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.seller.dto.SellerResponse;
import com.pickit.seller.dto.SellerSignupRequest;
import com.pickit.seller.dto.SellerUpdateRequest;
import com.pickit.seller.entity.Seller;
import com.pickit.seller.mapper.SellerMapper;
import com.pickit.seller.repository.SellerRepository;
import com.pickit.seller.service.SellerService;
import com.pickit.user.entity.User;
import com.pickit.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final UserService userService;
    private final SellerRepository sellerRepository;

    private Seller getExistingSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> {
                    SellerServiceImpl.log.error("판매자 조회 실패 - ID: {}", id);
                    return new BusinessException(ErrorCode.SELLER_NOT_FOUND);
                });
    }
    
    // 회원가입 - 판매자
    @Override
    @Transactional
    public SellerResponse registerSeller(SellerSignupRequest request) {
        // 중복 체크를 Map으로 관리
        Map<String, Boolean> checks = Map.of(
                "사업자번호", sellerRepository.existsByBusinessNumber(request.getBusinessNumber()),
                "가게명", sellerRepository.existsByStoreName(request.getStoreName()),
                "가게 주소", sellerRepository.existsByStoreAddress(request.getStoreAddress())
        );

        // 중복된 필드만 추출
        String errors = checks.entrySet().stream()
                .filter(Map.Entry::getValue)
                .map(Map.Entry::getKey)
                .collect(Collectors.joining(", "));

        // 하나라도 중복이면 예외 발생
        if (!errors.isEmpty()) {
            throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = userService.registerUser(request);

        Seller seller = Seller.builder()
                .user(user)
                .businessNumber(request.getBusinessNumber())
                .storeName(request.getStoreName())
                .storeAddress(request.getStoreAddress())
                .build();

        return SellerMapper.toResponse(sellerRepository.save(seller));
    }

    // 회원 정보 조회 - 판매자
    @Override
    @Transactional
    public SellerResponse getSellerById(Long id) {
        return SellerMapper.toResponse(getExistingSellerById(id));
    }

    // 회원 정보 수정 - 판매자
    @Override
    @Transactional
    public SellerResponse updateSeller(Long id, SellerUpdateRequest request) {
        Seller seller = getExistingSellerById(id);
        // 값이 없으면 예외 발생
        if ((request.getStoreName() == null || request.getStoreName().isBlank())
                && (request.getStoreAddress() == null || request.getStoreAddress().isBlank())) {
            throw new BusinessException(ErrorCode.INVALID_INPUT);
        }
        SellerMapper.updateSellerFromRequest(seller, request);
        return SellerMapper.toResponse(seller);
    }

    // 회원 정보 삭제 - 판매자
    @Override
    @Transactional
    public void deleteSeller(Long id) {
        Seller seller = getExistingSellerById(id);
        sellerRepository.delete(seller);
        SellerServiceImpl.log.info("판매자 삭제 완료 - ID: {}", id);
    }
}
