package com.pickit.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageUploadResult {
    private String imageUrl;
    private String thumbnailUrl;
}
