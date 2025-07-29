package com.pickit.user.service;

import com.pickit.user.dto.EmailVerificationRequest;

public interface EmailService {

    // 1. 인증 코드 전송
    void sendVerificationCode(EmailVerificationRequest request);

    // 2. 인증 코드 검증
    boolean verifyCode(String email, String code);
}
