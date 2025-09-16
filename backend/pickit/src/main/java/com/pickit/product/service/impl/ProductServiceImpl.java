package com.pickit.product.service.impl;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.mapper.ProductMapper;
import com.pickit.product.repository.ProductRepository;
import com.pickit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(ProductMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDetailResponse getProductDetail(Long id) {
        Product product = productRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

        return ProductMapper.toDetailResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryWithDetails(categoryId, pageable)
                .map(ProductMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> searchProducts(String keyword, Pageable pageable) {
        return productRepository.searchByKeyword(keyword, pageable)
                .map(ProductMapper::toResponse);
    }
}

