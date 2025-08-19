package com.pickit.product.service.impl;

import com.pickit.global.exception.customException.ProductNotFoundException;
import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.entity.Product;
import com.pickit.product.entity.ProductImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.mapper.ProductMapper;
import com.pickit.product.repository.ProductRepository;
import com.pickit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

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
                .orElseThrow(() -> new ProductNotFoundException("상품이 없습니다."));

        return ProductDetailResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .images(product.getImages().stream()
                        .map(ProductImage::getImageUrl)
                        .collect(Collectors.toList()))
                .inventory(product.getInventories().stream()
                        .map(inv -> new ProductDetailResponse.InventoryDto(
                                inv.getColor(),
                                inv.getSize(),
                                inv.getQuantity()))
                        .collect(Collectors.toList()))
                .build();
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

