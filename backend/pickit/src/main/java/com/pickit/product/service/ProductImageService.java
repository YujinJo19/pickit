package com.pickit.product.service;

import com.pickit.product.dto.ImageUploadResult;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface ProductImageService {
    ImageUploadResult uploadFile(MultipartFile file) throws IOException;
    void deleteFile(String imageUrl);
}
