package com.pickit.user.service.impl;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.user.dto.EmailVerificationRequest;
import com.pickit.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;

    private static final long CODE_EXPIRE_MINUTES = 5;  // 인증번호 유효시간 5분
    private static final int MAX_ATTEMPTS_PER_DAY = 5;  // 인증 요청 하루 최대 5회 (이메일 당)
    private static final long ATTEMPT_EXPIRE_HOURS = 24;  // 인증 요청 갱신 시간

    @Value("${spring.mail.username}")
    private String from;

    private static final long EXPIRE_MINUTES = 5;
    private final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);


    @Override
    public void sendVerificationCode(EmailVerificationRequest request) {
        String toEmail = request.getEmail();
        String code = generateNumericCode(6);

        // 이메일 인증 요청 횟수 제한
        String attemptKey = "email:attempts:" + toEmail;
        String attemptsStr = redisTemplate.opsForValue().get(attemptKey);
        int attempts = attemptsStr != null ? Integer.parseInt(attemptsStr) : 0;

        if (attempts >= MAX_ATTEMPTS_PER_DAY) {
            throw new BusinessException(ErrorCode.EMAIL_REQUEST_LIMIT_EXCEEDED);
        }

        redisTemplate.opsForValue().increment(attemptKey);
        redisTemplate.expire(attemptKey, ATTEMPT_EXPIRE_HOURS, TimeUnit.HOURS);

        // redis에 저장
        String redisKey = "email:code:" + toEmail;
        redisTemplate.opsForValue().set(redisKey, code, EXPIRE_MINUTES, TimeUnit.MINUTES);

        // 이메일 전송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(from);
        message.setSubject("[Pickit] 이메일 인증 코드");
        message.setText("인증코드: " + code + "\n유효시간: " + EXPIRE_MINUTES);

        mailSender.send(message);
        logger.info(code);
        System.out.println(code);
    }

    @Override
    public boolean verifyCode(String email, String code) {
        String redisCodeKey = "email:code:" + email;
        String savedCode = redisTemplate.opsForValue().get(redisCodeKey);

        // 인증 코드 만료 또는 없는 경우
        if (savedCode == null) {
            throw new BusinessException(ErrorCode.EMAIL_VERIFICATION_FAILED);
        }

        // 인증 코드 불일치
        if (!savedCode.equals(code)) {
            throw new BusinessException(ErrorCode.EMAIL_VERIFICATION_FAILED);
        }

        // 인증 성공
        String verifiedKey = "email:verified:" + email;
        redisTemplate.opsForValue().set(verifiedKey, "true", CODE_EXPIRE_MINUTES, TimeUnit.MINUTES);

        // 인증 코드 삭제
        redisTemplate.delete(redisCodeKey);

        return true;
    }

    private String generateNumericCode(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append((int)(Math.random() * 10));
        }
        return sb.toString();
    }
}
