package com.pickit.user.service.impl;

import com.pickit.global.exception.customException.TempPasswordRequestLimitExceededException;
import com.pickit.global.exception.customException.UserNotFoundException;
import com.pickit.user.entity.User;
import com.pickit.user.repository.UserRepository;
import com.pickit.user.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final RedisTemplate<String, String> redisTemplate;

    // 임시 비밀번호 생성 후 저장
    public void processResetPassword(String email) throws RuntimeException {
        // 하루 최대 횟수 초과 확인
        checkRequestLimit(email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 이메일입니다."));

        String tempPassword = generateTempPassword();
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        sendTempPassword(email, tempPassword);
        increaseRequestCount(email);
    };

    // 랜덤 비밀번호 생성
    private String generateTempPassword() {
        return RandomStringUtils.randomAlphanumeric(10); // Apache commons-lang3
    }

    // 비밀번호 변경 요청 카운트 제한
    private void checkRequestLimit(String email) {
        String key = "reset:" + email;
        String value = redisTemplate.opsForValue().get(key);
        int count = value == null ? 0 : Integer.parseInt(value);
        if (count >= 3) throw new TempPasswordRequestLimitExceededException("하루 최대 요청 횟수를 초과했습니다.");
    }

    // 비밀번호 변경 요청 카운트 증가
    private void increaseRequestCount(String email) {
        String key = "reset:" + email;
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        if (redisTemplate.hasKey(key)) {
            ops.increment(key);
        } else {
            ops.set(key, "1", Duration.ofDays(1));
        }
    }

    // 임시 비밀번호 이메일 전송
    private void sendTempPassword(String email, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[Pickit] 임시 비밀번호 발급");
        message.setText("임시 비밀번호: " + password + "\n로그인 후 비밀번호를 변경해주시기 바랍니다.");

        mailSender.send(message);
    }
}
