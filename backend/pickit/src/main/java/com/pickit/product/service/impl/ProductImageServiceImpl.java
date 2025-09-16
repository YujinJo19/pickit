package com.pickit.product.service.impl;

import com.pickit.product.dto.ImageUploadResult;
import com.pickit.product.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final S3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${app.cloudfront.domain}")
    private String cloudFrontDomain;

    public ImageUploadResult uploadFile(MultipartFile file) throws IOException {
        // 원본 업로드
        String originalKey = "images/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
        PutObjectRequest originalRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(originalKey)
                .contentType(file.getContentType())
                .build();
        s3Client.putObject(originalRequest, RequestBody.fromBytes(file.getBytes()));
        String originalUrl = cloudFrontDomain + "/" + originalKey;

        // 썸네일 생성 (webp)
        String thumbKey = null;
        String thumbnailUrl = null;
        BufferedImage image = ImageIO.read(file.getInputStream());
        if (image != null) {
            BufferedImage thumbnail = Thumbnails.of(image)
                    .size(300, 300) // 원하는 사이즈
                    .keepAspectRatio(true)
                    .asBufferedImage();

            ByteArrayOutputStream thumbOs = new ByteArrayOutputStream();
            ImageIO.write(thumbnail, "webp", thumbOs);

            byte[] thumbBytes = thumbOs.toByteArray();
            if (thumbBytes.length > 0) {
                thumbKey = "images/" + UUID.randomUUID() + "_thumbnail.webp";
                PutObjectRequest thumbRequest = PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(thumbKey)
                        .contentType("image/webp")
                        .build();
                s3Client.putObject(thumbRequest, RequestBody.fromBytes(thumbBytes));
                thumbnailUrl = cloudFrontDomain + "/" + thumbKey;
            }
        }

        return new ImageUploadResult(originalUrl, thumbnailUrl);
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
