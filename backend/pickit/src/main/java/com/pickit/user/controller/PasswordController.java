package com.pickit.user.controller;

import com.pickit.user.dto.EmailVerificationRequest;
import com.pickit.user.service.PasswordResetService;
import com.pickit.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Password",
        description = "비밀번호 관리 API"
)
@RestController
@RequestMapping("api/password")
@RequiredArgsConstructor
public class PasswordController {

    private final PasswordResetService passwordResetService;
    private final UserService userService;

    @Operation(
            summary = "임시 비밀번호 발급",
            description = "회원 이메일을 통해 임시 비밀번호를 발급 및 전송합니다."
    )    @PostMapping("/reset-request")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody EmailVerificationRequest request) {
        boolean isExcist = userService.isEmailDuplicate(request.getEmail());
        if (isExcist) {
            passwordResetService.processResetPassword(request.getEmail());
            return ResponseEntity.status(HttpStatus.OK)
                    .body("임시 비밀번호가 이메일로 전송되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("존재하지 않는 이메일입니다.");
        }
    };
}
