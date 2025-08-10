package com.pickit.user.service;

import com.pickit.global.security.jwt.JwtService;
import com.pickit.user.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public TokenResponse login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        String accessToken = jwtService.createAccessToken(username);
        String refreshToken = jwtService.createRefreshToken(username);

        return new TokenResponse(accessToken, refreshToken);
    }

    public TokenResponse refresh(String refreshToken) {
        if (!jwtService.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String username = jwtService.getUsernameFromToken(refreshToken);

        if (!jwtService.isRefreshTokenValid(username, refreshToken)) {
            throw new RuntimeException("Refresh token mismatch");
        }

        String newAccessToken = jwtService.createAccessToken(username);
        String newRefreshToken = jwtService.createRefreshToken(username);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    public void logout(String accessToken) {
        String username = jwtService.getUsernameFromToken(accessToken);
        jwtService.blacklistAccessToken(accessToken);
        // Refresh Token 삭제
        jwtService.deleteRefreshToken(username);
    }
}
