package com.pickit.product.mapper;

import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.entity.Product;
import com.pickit.product.entity.ProductImage;
import com.pickit.product.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {
    // 썸네일 추출 메서드
    static String extractThumbnailUrl(Product p) {
        return p.getImages().stream()
                .filter(ProductImage::isThumbnail)
                .findFirst()
                .map(img -> img.getThumbnailUrl() != null
                ? img.getThumbnailUrl():img.getImageUrl()
                        ).orElse(null);
    }
    // DTO → Entity 변환 (생성 시)
    static Product toEntity(ProductCreateRequest req, com.pickit.seller.entity.Seller seller, Category category) {
        return Product.builder()
                .name(req.getName())
                .price(req.getPrice())
                .discountPrice(req.getDiscountPrice())
                .description(req.getDescription())
                .category(category)
                .seller(seller)
                .build();
    }

    // Entity → Response 변환 (리스트용)
    static ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .discountPrice(p.getDiscountPrice())
                .thumbnailUrl(extractThumbnailUrl(p))
                .categoryId(p.getCategory().getId())
                .build();
    }

    // Entity → 상세 응답
    static ProductDetailResponse toDetailResponse(Product p) {
        return ProductDetailResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .discountPrice(p.getDiscountPrice())
                .description(p.getDescription())
                .categoryId(p.getCategory().getId())
                .images(
                        p.getImages().stream()
                                .map(img -> img.getThumbnailUrl() != null
                                        ? img.getThumbnailUrl()
                                        : img.getImageUrl())
                                .distinct()
                                .toList()
                )
                .inventory(
                        p.getInventories().stream()
                                .map(inv -> new ProductDetailResponse.InventoryDto(
                                        inv.getId(),
                                        inv.getColor(),
                                        inv.getSize(),
                                        inv.getQuantity())
                                ).toList()
                )
                .build();
    }
}
