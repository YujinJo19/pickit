package com.pickit.product.service;

import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductSellerService {
    // 상품 등록
    ProductResponse create(ProductCreateRequest request, List<MultipartFile> imageUrls) throws IOException;

    // 상품 정보 수정
    ProductResponse update(Long productId, ProductUpdateRequest request, List<MultipartFile> imageUrls) throws IOException;

    // 상품 삭제
    void delete(Long productId);

    // 내 상품 보기
    Page<ProductResponse> getMine(Pageable pageable);
}
