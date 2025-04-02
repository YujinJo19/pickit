package com.pickit.user.service;

public interface EmailService {
    void sendVerificationCode(String toEmail);
    boolean verifyCode(String email, String code);
}
