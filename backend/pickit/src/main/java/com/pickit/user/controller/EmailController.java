package com.pickit.user.controller;

import com.pickit.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendCode(@RequestParam String email) {
        emailService.sendVerificationCode(email);
        return ResponseEntity.ok("인증코드 전송 완료");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        boolean verified = emailService.verifyCode(email, code);
        return verified ?
                ResponseEntity.ok("인증 성공") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 실패");
    }
}
