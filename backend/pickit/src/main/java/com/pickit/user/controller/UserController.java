package com.pickit.user.controller;

import com.pickit.global.common.Role;
import com.pickit.user.dto.LoginRequest;
import com.pickit.user.dto.UserProfileUpdateRequest;
import com.pickit.user.dto.UserResponse;
import com.pickit.user.dto.UserSignupRequest;
import com.pickit.user.entity.User;
import com.pickit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 1. 회원가입
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody UserSignupRequest request) {
        User created = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 2. 로그인
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        return userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("이메일 또는 비밀번호가 일치하지 않습니다."));
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

    // 7. 이메일 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = userService.isEmailDuplicate(email);
        if (isDuplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 가입된 이메일입니다.");
        } else {
            return ResponseEntity.ok("사용가능한 이메일입니다.");
        }
    }
}