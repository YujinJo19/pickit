package com.pickit.product.service.impl;

import com.pickit.global.exception.customException.CategoryNotFoundException;
import com.pickit.global.exception.customException.ProductNotFoundException;
import com.pickit.global.exception.customException.SellerNotFoundException;
import com.pickit.global.exception.customException.UnauthorizedProductAccessException;
import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.entity.Category;
import com.pickit.product.entity.Inventory;
import com.pickit.product.entity.Product;
import com.pickit.product.entity.ProductImage;
import com.pickit.product.mapper.ProductMapper;
import com.pickit.product.repository.CategoryRepository;
import com.pickit.product.repository.ProductRepository;
import com.pickit.product.service.ProductSellerService;
import com.pickit.seller.entity.Seller;
import com.pickit.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.pickit.product.mapper.ProductMapper.toResponse;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductSellerServiceImpl implements ProductSellerService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public ProductResponse create(ProductCreateRequest request, Long sellerId) {
        Seller seller =getSellerOrThrow(sellerId);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다."));

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .description(request.getDescription())
                .seller(seller)
                .category(category)
                .build();

        product.setImages(request.getImages().stream()
                .map(url -> ProductImage.builder()
                        .imageUrl(url)
                        .product(product)
                        .build())
                        .collect(Collectors.toList())
                );

        product.setInventories(request.getInventory().stream()
                .map(inv -> Inventory.builder()
                        .color(inv.getColor())
                        .size(inv.getSize())
                        .quantity(inv.getQuantity())
                        .product(product)
                        .build())
                .collect(Collectors.toList()));

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductResponse update(Long productId, ProductUpdateRequest request, Long sellerId) {
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다."));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setDescription(request.getDescription());
        product.setCategory(category);

        // 이미지 업데이트
        product.getImages().clear();
        product.getImages().addAll(request.getImages().stream()
                .map(url -> ProductImage.builder()
                        .imageUrl(url)
                        .product(product)
                        .build())
                .toList());

        // 인벤토리 업데이트
        product.getInventories().clear();
        product.getInventories().addAll(request.getInventory().stream()
                .map(inv -> Inventory.builder()
                        .color(inv.getColor())
                        .size(inv.getSize())
                        .quantity(inv.getQuantity())
                        .product(product)
                        .build())
                .toList());

        return ProductMapper.toResponse(product);
    }

    @Override
    @Transactional
    public void delete(Long productId, Long sellerId) {
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);
        productRepository.delete(product);
    }

    @Override
    public Page<ProductResponse> getMine(Long sellerId, Pageable pageable) {
        return productRepository.findAllBySellerId(sellerId, pageable)
                .map(ProductMapper::toResponse);
    }

    private Seller getSellerOrThrow(Long sellerId) {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new SellerNotFoundException("판매자를 찾을 수 없습니다."));
    }

    private Product getProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("상품을 찾을 수 없습니다."));
    }

    private void validateOwner(Product product, Long sellerId) {
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new UnauthorizedProductAccessException("해당 판매자의 상품이 아닙니다.");
        }
    }
}
