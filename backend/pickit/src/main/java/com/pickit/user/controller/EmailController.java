package com.pickit.user.controller;

import com.pickit.user.dto.EmailVerificationRequest;
import com.pickit.user.repository.UserRepository;
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

    private final EmailService emailService;
    private final UserService userService;

    // 인증 코드 전송
    @PostMapping("/send")
    public ResponseEntity<String> sendVerificationCode(@RequestBody @Valid EmailVerificationRequest request) {
        if (userService.isEmailDuplicate(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 가입된 이메일입니다.");
        }
        emailService.sendVerificationCode(request);
        return ResponseEntity.ok("인증코드 전송 완료");
    }

    // 인증 코드 검증
    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        boolean verified = emailService.verifyCode(email, code);
        return ResponseEntity.ok("이메일 인증이 완료되었습니다.");
    }
}
