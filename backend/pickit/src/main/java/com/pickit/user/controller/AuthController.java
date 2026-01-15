package com.pickit.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickit.seller.dto.SellerSignupRequest;
import com.pickit.seller.service.SellerService;
import com.pickit.user.dto.*;
import com.pickit.user.service.AuthService;
import com.pickit.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;

import static com.pickit.global.security.util.CookieUtil.extractRefreshToken;

@Tag(
        name = "Auth",
        description = "회원가입, 로그인, 토큰 재발급, 로그아웃 API"
)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final AuthService authService;
    private final SellerService sellerService;

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);


    @Operation(
            summary = "회원가입",
            description = "role 값(USER 또는 SELLER)에 따라 일반 사용자 또는 판매자로 회원가입을 처리합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 role 값 또는 요청 데이터 오류")
    })
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> requestBody) {
        String role = (String) requestBody.get("role");
        if ("USER".equals(role)) {
            UserSignupRequest userRequest = objectMapper.convertValue(requestBody, UserSignupRequest.class);
            userService.registerUser(userRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else if ("SELLER".equals(role)) {
            SellerSignupRequest sellerRequest = objectMapper.convertValue(requestBody, SellerSignupRequest.class);
            sellerService.registerSeller(sellerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.badRequest().body("Unsupported role");
        }
    }

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호로 로그인하며, Access Token은 응답 바디로, Refresh Token은 HttpOnly 쿠키로 반환합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "400", description = "요청 형식 오류"),
            @ApiResponse(responseCode = "401", description = "이메일 또는 비밀번호 불일치")
    })
    @PostMapping("/login")
    public ResponseEntity <TokenResponse> login(
            @Valid @RequestBody LoginRequest request,
                                                HttpServletResponse response) {
        TokenResponse tokenResponse = authService.login(request.getEmail(), request.getPassword());

        logger.info(String.valueOf(request));
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

    @Operation(
            summary = "토큰 재발급",
            description = "쿠키에 저장된 Refresh Token을 검증하여 새로운 Access Token을 발급합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않은 Refresh Token")
    })
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

        // AccessToken만 응답 바디에 반환
        TokenResponse responseBody = TokenResponse.builder()
                .accessToken(newTokens.getAccessToken())
                .build();
        return ResponseEntity.ok(responseBody);
    }

    @Operation(
            summary = "로그아웃",
            description = "Access Token을 무효화하고 Refresh Token 쿠키를 삭제합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "Authorization 헤더 누락"),
            @ApiResponse(responseCode = "401", description = "유효하지 않은 Access Token")
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletResponse response) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String accessToken = authHeader.substring(7);

        try {
            authService.logout(accessToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

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