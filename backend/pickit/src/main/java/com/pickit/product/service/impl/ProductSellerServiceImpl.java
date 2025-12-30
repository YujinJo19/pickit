package com.pickit.product.service.impl;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.global.security.util.SecurityUtil;
import com.pickit.product.dto.ImageUploadResult;
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
import com.pickit.product.service.ProductImageService;
import com.pickit.product.service.ProductSellerService;
import com.pickit.seller.entity.Seller;
import com.pickit.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductSellerServiceImpl implements ProductSellerService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageService productImageService;

    @Override
    @Transactional
    public ProductResponse create(ProductCreateRequest request, List<MultipartFile> imageFiles) throws IOException {
        Long sellerId = SecurityUtil.getSellerIdFromContext();
        Seller seller = getSellerOrThrow(sellerId);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .description(request.getDescription())
                .seller(seller)
                .category(category)
                .build();

        // 이미지 처리
        if (imageFiles != null && !imageFiles.isEmpty()) {
            boolean first = true;
            for (MultipartFile file : imageFiles) {
                ImageUploadResult res = productImageService.uploadFile(file);
                ProductImage img = ProductImage.builder()
                        .imageUrl(res.getImageUrl())
                        .thumbnailUrl(res.getThumbnailUrl())
                        .isThumbnail(first)
                        .product(product)
                        .build();
                product.getImages().add(img);
                first = false;
            }
        }

        // 인벤토리 처리
        if (request.getInventory() != null) {
            for (var invDto : request.getInventory()) {
                Inventory inv = Inventory.builder()
                        .color(invDto.getColor())
                        .size(invDto.getSize())
                        .quantity(invDto.getQuantity())
                        .product(product)
                        .build();
                product.getInventories().add(inv);
            }
        }

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductResponse update(Long productId, ProductUpdateRequest request, List<MultipartFile> imageFiles) throws IOException {
        Long sellerId = SecurityUtil.getSellerIdFromContext();
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setDiscountPrice(request.getDiscountPrice());

        product.setCategory(category);

        // 이미지 처리
        List<ProductImage> images = product.getImages();
        images.forEach(img -> productImageService.deleteFile(img.getImageUrl())); // S3 삭제
        images.clear();

        if (imageFiles != null && !imageFiles.isEmpty()) {
            boolean first = true;
            for (MultipartFile file : imageFiles) {
                ImageUploadResult res = productImageService.uploadFile(file);
                ProductImage img = ProductImage.builder()
                        .imageUrl(res.getImageUrl())
                        .thumbnailUrl(res.getThumbnailUrl())
                        .isThumbnail(first)
                        .product(product)
                        .build();
                images.add(img);
                first = false;
            }
        }

        // 인벤토리 처리
        Set<Inventory> inventories = product.getInventories();
        inventories.clear();
        if (request.getInventory() != null && !request.getInventory().isEmpty()) {
            for (var invDto : request.getInventory()) {
                Inventory inv = Inventory.builder()
                        .color(invDto.getColor())
                        .size(invDto.getSize())
                        .quantity(invDto.getQuantity())
                        .product(product)
                        .build();
                inventories.add(inv);
            }
        }


        return ProductMapper.toResponse(productRepository.save(product));
    }



    @Override
    @Transactional
    public void delete(Long productId) {
        Long sellerId = SecurityUtil.getSellerIdFromContext();
        Product product = getProductOrThrow(productId);
        validateOwner(product, sellerId);
        productRepository.delete(product);
    }

    @Override
    public Page<ProductResponse> getMine(Pageable pageable) {
        Long sellerId = SecurityUtil.getSellerIdFromContext();
        return productRepository.findAllBySellerId(sellerId, pageable)
                .map(ProductMapper::toResponse);
    }

    private Seller getSellerOrThrow(Long sellerId) {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SELLER_NOT_FOUND));
    }

    private Product getProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    private void validateOwner(Product product, Long sellerId) {
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED_PRODUCT_ACCESS);
        }
    }
}
