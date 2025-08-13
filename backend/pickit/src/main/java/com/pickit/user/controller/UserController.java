package com.pickit.user.controller;

import com.pickit.global.common.Role;
import com.pickit.user.dto.*;
import com.pickit.user.entity.User;
import com.pickit.user.service.AuthService;
import com.pickit.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pickit.global.security.util.CookieUtil.extractRefreshToken;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    // 1. 회원가입
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody UserSignupRequest request) {
        User created = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 2. 로그인
    @PostMapping("/login")
    public ResponseEntity <TokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        TokenResponse tokenResponse = authService.login(request.getEmail(), request.getPassword());

        // 쿠키 생성
        Cookie refreshTokenCookie = new Cookie("refreshToken", tokenResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);  // 만료기간 7일
        // 로컬 개발 중 주석 처리
        // refreshTokenCookie.setSecure(true);

        // 헤더에 쿠키 추가
        response.addCookie(refreshTokenCookie);
        TokenResponse responseBody = TokenResponse.builder()
                .accessToken(tokenResponse.getAccessToken())
                .build();
        return ResponseEntity.ok(responseBody);
    }

    // 3. 회원정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    // 4. 회원탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 5. 프로필 수정
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long id,
            @RequestBody UserProfileUpdateRequest request
    ) {
        UserResponse updatedUser = userService.updateUserProfile(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    // 6. 역할 변경
    @PutMapping("{id}/role")
    public ResponseEntity<User> updateRole(@PathVariable Long id, @RequestParam Role newRole) {
        User updated = userService.updateUserRole(id, newRole);
        return ResponseEntity.ok(updated);
    }

    // 7. 토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(HttpServletRequest request,
                                                 HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        // 인증 및 토큰 재발급 처리
        TokenResponse newTokens = authService.refresh(refreshToken);

        // 필요한 경우 새 refreshToken을 쿠키로 응답에 넣기
        Cookie refreshTokenCookie = new Cookie("refreshToken", newTokens.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);

        // AccessToken만 응답 바디에 보내기
        return ResponseEntity.ok(new TokenResponse(newTokens.getAccessToken(), null));
    }

    // 8. 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader("Authorization") String authHeader,
            HttpServletResponse response) {

        String accessToken = authHeader.replace("Bearer ", "");
        authService.logout(accessToken);

        // 빈 쿠키 생성 후 쿠키 삭제
        Cookie deleteCookie = new Cookie("refreshToken", null);
        deleteCookie.setHttpOnly(true);
        deleteCookie.setPath("/");
        deleteCookie.setMaxAge(0); // 즉시 만료시켜서 삭제
        // 로컬 개발 중 주석 처리
        // deleteCookie.setSecure(true);

        response.addCookie(deleteCookie);

        return ResponseEntity.ok().build();
    }
}