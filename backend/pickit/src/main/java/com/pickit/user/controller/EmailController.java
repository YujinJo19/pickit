package com.pickit.user.controller;

import com.pickit.user.dto.EmailCodeVerificationRequest;
import com.pickit.user.dto.EmailVerificationRequest;
import com.pickit.user.service.EmailService;
import com.pickit.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Email",
        description = "이메일 인증/인가/중복 확인 API"
)
@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final UserService userService;
    private final EmailService emailService;

    @Operation(
            summary = "이메일 중복 확인",
            description = "입력받은 이메일이 데이터베이스에 존재하는지 확인합니다."
    )
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

    @Operation(
            summary = "이메일 인증코드 전송",
            description = "입력받은 이메일에 인증 코드를 전송합니다."
    )
    @PostMapping("/send")
    public ResponseEntity<String> sendVerificationCode(@Valid @RequestBody EmailVerificationRequest request) {
        if (userService.isEmailDuplicate(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 가입된 이메일입니다.");
        }
        emailService.sendVerificationCode(request);
        return ResponseEntity.ok("인증코드 전송 완료");
    }

    @Operation(
            summary = "이메일 인증코드 확인",
            description = "입력 받은 인증코드가 해당 이메일에 유효한지 확인합니다."
    )
    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@Valid @RequestBody EmailCodeVerificationRequest request) {
        boolean verified = emailService.verifyCode(request.getEmail(), request.getCode());
        return ResponseEntity.ok("이메일 인증이 완료되었습니다.");
    }
}
