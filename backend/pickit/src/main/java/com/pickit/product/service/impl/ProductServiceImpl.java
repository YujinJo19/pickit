package com.pickit.product.service.impl;

import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.entity.Product;
import com.pickit.product.repository.ProductRepository;
import com.pickit.product.service.ProductService;
import com.pickit.seller.entity.Seller;
import com.pickit.seller.repository.SellerRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;

    @Override
    @Transactional
    public ProductResponse create(ProductCreateRequest request, Long sellerId) {
        Seller seller =getSellerOrThrow(sellerId);

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .seller(seller)
                .build();

        Product saved = productRepository.save(product);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public ProductResponse update(Long productId, ProductUpdateRequest request, Long sellerId) {
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());

        return toResponse(product);
    }

    @Override
    @Transactional
    public void delete(Long productId, Long sellerId) {
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);
        productRepository.delete(product);
    }

    @Override
    public List<ProductResponse> getMine(Long sellerId) {
        return productRepository.findAllBySellerId(sellerId)
                .stream().map(this::toResponse).toList();
    }

    private Seller getSellerOrThrow(Long sellerId) {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new IllegalArgumentException("판매자를 찾을 수 없습니다."));
    }

    private Product getProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));
    }

    private void validateOwner(Product product, Long sellerId) {
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new IllegalArgumentException("해당 판매자의 상품이 아닙니다.");
        }
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .description(p.getDescription())
                .build();
    }
}
