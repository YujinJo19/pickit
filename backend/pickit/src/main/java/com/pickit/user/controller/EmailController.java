package com.pickit.user.controller;

import com.pickit.user.dto.EmailCodeVerificationRequest;
import com.pickit.user.dto.EmailVerificationRequest;
import com.pickit.user.service.EmailService;
import com.pickit.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final UserService userService;
    private final EmailService emailService;

    // 1. 이메일 중복 확인
    @GetMapping("/check")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = userService.isEmailDuplicate(email);
        if (isDuplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 가입된 이메일입니다.");
        } else {
            return ResponseEntity.ok("사용가능한 이메일입니다.");
        }
    }

    // 2. 인증 코드 전송
    @PostMapping("/send")
    public ResponseEntity<String> sendVerificationCode(@Valid @RequestBody EmailVerificationRequest request) {
        if (userService.isEmailDuplicate(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 가입된 이메일입니다.");
        }
        emailService.sendVerificationCode(request);
        return ResponseEntity.ok("인증코드 전송 완료");
    }

    // 3. 인증 코드 검증
    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@Valid @RequestBody EmailCodeVerificationRequest request) {
        boolean verified = emailService.verifyCode(request.getEmail(), request.getCode());
        return ResponseEntity.ok("이메일 인증이 완료되었습니다.");
    }
}
