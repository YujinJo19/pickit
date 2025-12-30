package com.pickit.user.service.impl;

import com.pickit.global.common.Role;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.user.dto.UserProfileUpdateRequest;
import com.pickit.user.dto.UserResponse;
import com.pickit.user.dto.UserSignupRequest;
import com.pickit.user.entity.User;
import com.pickit.user.mapper.UserMapper;
import com.pickit.user.repository.UserRepository;
import com.pickit.user.service.ProfileImageService;
import com.pickit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Slf4j  // 로그
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileImageService profileImageService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;

    // ID로 유저 조회
    private User getExistingUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    // 1. 회원가입 (비밀번호 암호화 후 저장)
    @Override
    public User registerUser(UserSignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        String verifiedKey = "email:verified:" + request.getEmail();
        String verified = redisTemplate.opsForValue().get(verifiedKey);

        if (!"true".equals(verified)) {
            throw new BusinessException(ErrorCode.EMAIL_NOT_VERIFIED);
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

    // 2. 유저 엔티티 조회
    @Override
    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    // 3. 회원정보 조회 - id
    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserMapper.toResponse(user);
    }

    // 3. 회원정보 조회 - email
    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserMapper.toResponse(user);
    }

    // 4. 회원탈퇴
    @Override
    public void deleteUser(Long id) {
        User user = getExistingUserById(id);
        userRepository.delete(user);
        log.info("회원탈퇴 성공 - ID: {}", id);
    }

    // 5. 프로필 수정 (닉네임, 전화번호)
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

    // 8. 역할 조회
    @Override
    public Role getRoleByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND))
                .getRole();
    }

    // 9. 프로필 이미지 업로드 후 유저 반환
    @Override
    public UserResponse updateProfileImage(Long userId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_PROFILE_IMAGE_FILE);
        }

        User user = getExistingUserById(userId);
        String oldUrl = user.getProfileImageUrl();

        String newUrl = profileImageService.uploadFile(file);
        user.setProfileImageUrl(newUrl);
        User updatedUser = userRepository.save(user);

        if (oldUrl != null && !oldUrl.isBlank()) {
            profileImageService.deleteFile(oldUrl);
        }
        return UserMapper.toResponse(updatedUser);
    }


    // 10. 프로필 이미지 삭제 후 유저 반환
    @Override
    public UserResponse deleteProfileImage(Long id) {
        User user = getExistingUserById(id);
        String oldUrl = user.getProfileImageUrl();

        if (oldUrl != null && !oldUrl.isBlank()) {
            profileImageService.deleteFile(oldUrl);
        }
        user.setProfileImageUrl(null);
        User updatedUser = userRepository.save(user);
        return UserMapper.toResponse(updatedUser);
    }

}