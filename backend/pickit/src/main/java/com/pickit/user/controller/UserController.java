package com.pickit.user.controller;

import com.pickit.user.dto.LoginRequest;
import com.pickit.user.dto.UserResponse;
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
    public ResponseEntity<User> signup(@RequestBody User user) {
        User created = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 2. 로그인
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        return userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    // 3. 회원정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. 회원탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 5. 프로필 수정
//    @PutMapping("/{id}/profile")
//    public ResponseEntity<User> updateProfile(
//
//    )
    // 6. 역할 변경
}