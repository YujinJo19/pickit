package com.pickit.product.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponse {
    private Long id;
    private String name;
    private Integer price;
    private Integer discountPrice;
    private String description;
    private Long categoryId;
    private List<String> images;
    private List<InventoryDto> inventory;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InventoryDto {
        private String color;
        private String size;
        private Integer quantity;
    }
}
