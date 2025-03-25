package com.pickit.user.service;

import com.pickit.global.common.Role;
import com.pickit.user.dto.UserResponse;
import com.pickit.user.entity.User;

import java.util.Optional;

public interface UserService {

    // 1. 회원가입
    User registerUser(User user);

    // 2. 로그인
    Optional<User> authenticateUser(String email, String password);

    // 3. 회원정보 조회
    Optional<UserResponse> getUserById(Long id);
    Optional<User> getUserByEmail(String email);

    // 4. 회원탈퇴
    void deleteUser(Long id);

    // 5. 프로필 수정
    User updateUserProfile(Long id, String nickname, String phoneNumber, String profileImageUrl);

    // 6. 역할 변경
    User updateUserRole(Long id, Role newRole);
}