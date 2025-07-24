package com.pickit.user.service;

public interface PasswordResetService {

    // 임시 비밀번호 발급
    void processResetPassword(String email);
}