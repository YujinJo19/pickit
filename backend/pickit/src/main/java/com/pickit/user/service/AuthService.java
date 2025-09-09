package com.pickit.user.service;

import com.pickit.user.dto.TokenResponse;

public interface AuthService {

    // 로그인 시 accessToken, refreshToken 생성 후 반환
    TokenResponse login(String username, String password);

    // refreshToken 재발급
    TokenResponse refresh(String refreshToken);

    // 로그아웃 시 블랙리스트에 accessToken 추가
    void logout(String accessToken);

}

