package com.pickit.user.controller;

import com.pickit.global.common.Role;
import com.pickit.user.dto.*;
import com.pickit.user.entity.User;
import com.pickit.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(
        name = "User",
        description = "일반 사용자 정보 조회 및 프로필 관리 API"
)
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "회원 정보 조회",
            description = "회원 ID를 통해 사용자 정보를 조회합니다."
    )
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    @Operation(
            summary = "회원 탈퇴",
            description = "회원 ID를 기준으로 사용자를 삭제합니다."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "프로필 수정",
            description = "닉네임, 연락처 등 사용자 프로필 정보를 수정합니다."
    )
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserResponse> updateProfile(@PathVariable Long id, @RequestBody @Valid UserProfileUpdateRequest request) {
        UserResponse updatedUser = userService.updateUserProfile(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    @Operation(
            summary = "회원 역할 변경",
            description = "회원의 역할(Role)을 변경합니다."
    )
    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateRole(@PathVariable Long id, @RequestParam Role newRole) {
        User updated = userService.updateUserRole(id, newRole);
        return ResponseEntity.ok(updated);
    }

    @Operation(
            summary = "프로필 이미지 업로드",
            description = "사용자의 프로필 이미지를 업로드합니다."
    )
    @PostMapping("/{id}/profile-image")
    public ResponseEntity<UserResponse> updateProfileImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        UserResponse updated = userService.updateProfileImage(id, file);
        return ResponseEntity.ok(updated);

    }

    @Operation(
            summary = "프로필 이미지 삭제",
            description = "사용자의 프로필 이미지를 삭제합니다."
    )
    @DeleteMapping("/{id}/profile-image")
    public ResponseEntity<UserResponse> removeProfileImageItem(@PathVariable Long id) {
        UserResponse updated = userService.deleteProfileImage(id);
        return ResponseEntity.ok(updated);
    }
}