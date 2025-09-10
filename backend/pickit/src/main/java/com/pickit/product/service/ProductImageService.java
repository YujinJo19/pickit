package com.pickit.product.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductImageService {
    String uploadFile(MultipartFile file) throws IOException;
}
