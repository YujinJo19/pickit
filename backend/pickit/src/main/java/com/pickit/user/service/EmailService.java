package com.pickit.user.service;

import com.pickit.user.dto.EmailVerificationRequest;

public interface EmailService {
    void sendVerificationCode(EmailVerificationRequest request);
    boolean verifyCode(String email, String code);
}
