package com.pickit.user.service.impl;

import com.pickit.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;

    @Value("${spring.mail.username}")
    private String from;

    private static final long EXPIRE_MINUTES=5;

    @Override
    public void sendVerificationCode(String toEmail) {
        String code = UUID.randomUUID().toString().substring(0, 6);

        // redis에 저장
        redisTemplate.opsForValue().set(toEmail, code, EXPIRE_MINUTES, TimeUnit.MINUTES);

        // 이메일 전송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(from);
        message.setSubject("[Pickit] 이메일 인증 코드");
        message.setText("인증코드: " + code + "\n유효시간: " + EXPIRE_MINUTES);

        mailSender.send(message);
    }

    @Override
    public boolean verifyCode(String email, String code) {
        String savedCode = redisTemplate.opsForValue().get(email);
        boolean isVerified = savedCode != null && savedCode.equals(code);

        if (isVerified) {
            redisTemplate.opsForValue().set(email + ":verified", "true", EXPIRE_MINUTES, TimeUnit.MINUTES);
        }
        return isVerified;
    }
}
