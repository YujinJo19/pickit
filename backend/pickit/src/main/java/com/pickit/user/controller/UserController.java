package com.pickit.user.controller;

import com.pickit.global.common.Role;
import com.pickit.user.dto.*;
import com.pickit.user.entity.User;
import com.pickit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 1. 회원정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    // 2. 회원탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 3. 프로필 수정
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long id,
            @RequestBody UserProfileUpdateRequest request
    ) {
        UserResponse updatedUser = userService.updateUserProfile(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    // 4. 역할 변경
    @PutMapping("{id}/role")
    public ResponseEntity<User> updateRole(@PathVariable Long id, @RequestParam Role newRole) {
        User updated = userService.updateUserRole(id, newRole);
        return ResponseEntity.ok(updated);
    }
}