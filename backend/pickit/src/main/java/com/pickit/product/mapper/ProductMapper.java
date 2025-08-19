package com.pickit.product.mapper;

import com.pickit.product.dto.ProductCreateRequest;
import com.pickit.product.dto.ProductDetailResponse;
import com.pickit.product.dto.ProductResponse;
import com.pickit.product.dto.ProductUpdateRequest;
import com.pickit.product.entity.Product;
import com.pickit.product.entity.ProductImage;
import com.pickit.seller.entity.Seller;
import com.pickit.product.entity.Category;

import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductResponse toResponse(Product p) {
        String thumbnailUrl = p.getImages().isEmpty()
                ? null
                : p.getImages().get(0).getImageUrl();
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .thumbnailUrl(thumbnailUrl )
                .discountPrice(p.getDiscountPrice())
                .categoryId(p.getCategory().getId())
                .build();
    }

    public static ProductDetailResponse toDetailResponse(Product p) {
        return ProductDetailResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .discountPrice(p.getDiscountPrice())
                .description(p.getDescription())
                .categoryId(p.getCategory().getId())
                .images(
                        p.getImages().stream()
                                .map(ProductImage::getImageUrl)
                                .toList()
                )
                .inventory(
                        p.getInventories().stream()
                                .map(inv -> new ProductDetailResponse.InventoryDto(
                                        inv.getColor(),
                                        inv.getSize(),
                                        inv.getQuantity())
                                ).collect(Collectors.toList())
                )
                .build();
    }


    public static Product toEntity(ProductCreateRequest req, Seller seller, Category category) {
        return Product.builder()
                .name(req.getName())
                .price(req.getPrice())
                .discountPrice(req.getDiscountPrice())
                .category(category)
                .seller(seller)
                .build();
    }

    public static void updateEntity(Product product, ProductUpdateRequest req, Category category) {
        product.setName(req.getName());
        product.setPrice(req.getPrice());
        product.setDiscountPrice(req.getDiscountPrice());
        product.setCategory(category);
    }
}
