package com.pickit.user.service.impl;

import com.pickit.global.common.Role;
import com.pickit.user.dto.UserProfileUpdateRequest;
import com.pickit.user.dto.UserResponse;
import com.pickit.user.dto.UserSignupRequest;
import com.pickit.user.entity.User;
import com.pickit.user.mapper.UserMapper;
import com.pickit.user.repository.UserRepository;
import com.pickit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j  // 로그
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    // ID로 유저 조회
    private User getExistingUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(()-> {
                log.error("사용자 조회 실패 - ID: {}", id);
                return new RuntimeException("해당 사용자를 찾을 수 없습니다.");
            });
    }

    // 1. 회원가입 (비밀번호 암호화 후 저장)
    @Override
    public User registerUser(UserSignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("회원가입 실패 - 이미 존재하는 이메일: {}", request.getEmail());
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .nickname(request.getNickname())
                .phoneNumber(request.getPhoneNumber())
                .profileImageUrl(request.getProfileImageUrl())
                .socialLogin(request.getSocialLogin() != null && request.getSocialLogin())
                .socialProvider(request.getSocialProvider())
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();
        return userRepository.save(user);
    }

    // 2. 로그인 (이메일로 사용자 찾고 비밀번호 확인)
    @Override
    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            log.warn("로그인 실패 - 존재하지 않는 이메일: {}", email);
            return Optional.empty();
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.warn("로그인 실패 - 이메일: {}, 비밀번호 불일치", email);
            return Optional.empty();
        }

        log.info("로그인 성공 - 이메일: {}", email);
        return Optional.of(user);
    }


    // 3. 회원정보 조회
    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        return UserMapper.toResponse(user);
    }

    // 4. 회원탈퇴
    @Override
    public void deleteUser(Long id) {
        User user = getExistingUserById(id);
        userRepository.delete(user);
        log.info("회원탈퇴 성공 - ID: {}", id);
    }

    // 5. 프로필 수정 (닉네임, 전화번호, 프로필 이미지)
    @Override
    public UserResponse updateUserProfile(Long id, UserProfileUpdateRequest request) {
        User user = getExistingUserById(id);

        UserMapper.updateUserFromRequest(user, request);

        User updatedUser = userRepository.save(user);

        return UserMapper.toResponse(updatedUser);
    }

    // 6. 역할 변경
    @Override
    public User updateUserRole(Long id, Role newRole) {
        User user = getExistingUserById(id);
        user.setRole(newRole);
        User updatedUser = userRepository.save(user);
        log.info("역할 변경 완료 - ID: {}, 새로운 역할: {}", id, newRole);
        return updatedUser;
    }

    // 7. 이메일 중복 확인
    @Override
    public boolean isEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }
}