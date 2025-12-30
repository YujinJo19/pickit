package com.pickit.user.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProfileImageService {
    String uploadFile(MultipartFile file);
    void deleteFile(String imageUrl);
    }
