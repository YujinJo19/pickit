package com.pickit.user.service;

import com.pickit.global.common.Role;
import com.pickit.seller.entity.Seller;
import com.pickit.global.security.jwt.JwtService;
import com.pickit.user.dto.TokenResponse;
import com.pickit.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

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

        if (role == Role.SELLER) {
            Seller seller = user.getSeller();
            if (seller == null || seller.getStatus() == Seller.SellerStatus.PENDING) {
                throw new RuntimeException("판매자 승인 대기 중입니다.");
            } else if (seller.getStatus() == Seller.SellerStatus.REJECTED) {
                throw new RuntimeException("판매자 가입이 거부되었습니다.");
            }
        }

        String accessToken = jwtService.createAccessToken(username, role);
        String refreshToken = jwtService.createRefreshToken(username);

        return new TokenResponse(accessToken, refreshToken);
    }

    // refreshToken 재발급
    public TokenResponse refresh(String refreshToken) {
        if (!jwtService.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String username = jwtService.getUsernameFromToken(refreshToken);

        if (!jwtService.isRefreshTokenValid(username, refreshToken)) {
            throw new RuntimeException("Refresh token mismatch");
        }

        // 유저 Role 조회
        Role role = userService.getRoleByEmail(username);

        String newAccessToken = jwtService.createAccessToken(username, role);
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
