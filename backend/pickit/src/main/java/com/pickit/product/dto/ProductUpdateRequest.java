package com.pickit.product.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateRequest {
    private String name;
    private Integer price;
    private String description;
    private int discountPrice;
    private Long categoryId;

    private List<String> images;
    private List<ProductDetailResponse.InventoryDto> inventory;
}
