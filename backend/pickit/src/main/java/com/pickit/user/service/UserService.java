package com.pickit.user.service;

import com.pickit.global.common.Role;
import com.pickit.user.dto.UserProfileUpdateRequest;
import com.pickit.user.dto.UserResponse;
import com.pickit.user.dto.UserSignupRequest;
import com.pickit.user.entity.User;

import java.util.Optional;

public interface UserService {

    // 1. 회원가입
    User registerUser(UserSignupRequest request);

    // 2. 로그인
    Optional<User> authenticateUser(String email, String password);

    // 3. 회원정보 조회
    UserResponse getUserById(Long id);
    UserResponse getUserByEmail(String email);

    // 4. 회원탈퇴
    void deleteUser(Long id);

    // 5. 프로필 수정
    UserResponse updateUserProfile(Long id, UserProfileUpdateRequest request);

    // 6. 역할 변경
    User updateUserRole(Long id, Role newRole);

    // 7. 이메일 중복 확인
    boolean isEmailDuplicate(String email);
}