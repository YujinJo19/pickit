package com.pickit.user.service.impl;

import com.pickit.global.common.Role;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.global.security.jwt.JwtService;
import com.pickit.seller.entity.Seller;
import com.pickit.user.dto.TokenResponse;
import com.pickit.user.entity.User;
import com.pickit.user.service.AuthService;
import com.pickit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    // 로그인 시 accessToken, refreshToken 생성 후 반환
    public TokenResponse login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        // 유저 Role 조회
        User user = userService.getUserEntityByEmail(username);
        Role role = user.getRole();
        Long sellerId = null;
        Long userId = user.getId();

        if (role == Role.SELLER) {
            Seller seller = user.getSeller();
            if (seller == null || seller.getStatus() == Seller.SellerStatus.PENDING) {
                throw new BusinessException(ErrorCode.SELLER_PENDING);
            } else if (seller.getStatus() == Seller.SellerStatus.REJECTED) {
                throw new BusinessException(ErrorCode.SELLER_REJECTED);
            }
            sellerId = seller.getId();
        }

        String accessToken = jwtService.createAccessToken(username, userId, role, sellerId);
        String refreshToken = jwtService.createRefreshToken(username);

        return new TokenResponse(accessToken, refreshToken);
    }

    // refreshToken 재발급
    public TokenResponse refresh(String refreshToken) {
        if (!jwtService.validateToken(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String username = jwtService.getUsernameFromToken(refreshToken);

        if (!jwtService.isRefreshTokenValid(username, refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 유저 Role 조회
        Role role = userService.getRoleByEmail(username);
        Long sellerId = null;
        Long userId = userService.getUserEntityByEmail(username).getId();

        if (role == Role.SELLER) {
            Seller seller = userService.getUserEntityByEmail(username).getSeller();
            sellerId = seller != null ? seller.getId() : null;
        }

        String newAccessToken = jwtService.createAccessToken(username, userId, role, sellerId);
        String newRefreshToken = jwtService.createRefreshToken(username);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    // 로그아웃 시 블랙리스트에 accessToken 추가
    public void logout(String accessToken) {
        String username = jwtService.getUsernameFromToken(accessToken);
        jwtService.blacklistAccessToken(accessToken);
        jwtService.deleteRefreshToken(username);
    }
}
