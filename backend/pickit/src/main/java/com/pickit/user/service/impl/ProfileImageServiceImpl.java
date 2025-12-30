package com.pickit.user.service.impl;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.user.service.ProfileImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileImageServiceImpl implements ProfileImageService {

    private final S3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${app.cloudfront.domain}")
    private String cloudFrontDomain;

    public String uploadFile(MultipartFile file)  {
        try {
            String originalKey = "profile/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
            PutObjectRequest originalRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(originalKey)
                    .contentType(file.getContentType())
                    .build();
            s3Client.putObject(originalRequest, RequestBody.fromBytes(file.getBytes()));
            return cloudFrontDomain + "/" + originalKey;
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public void deleteFile(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return;

        String key = imageUrl.replace(cloudFrontDomain + "/", "");
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build());
    }
}
