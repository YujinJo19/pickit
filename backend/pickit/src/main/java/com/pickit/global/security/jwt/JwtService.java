package com.pickit.global.security.jwt;

import com.pickit.global.common.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${spring.jwt.secret}")
    private String secret;

    @Value("${spring.jwt.access-token-validity}")
    private long accessExpiration; // ms

    @Value("${spring.jwt.refresh-token-validity}")
    private long refreshExpiration; // ms

    private Key key;
    private final StringRedisTemplate redisTemplate;

    private static final String REDIS_REFRESH_TOKEN_PREFIX = "RT:";
    private static final String REDIS_BLACKLIST_PREFIX = "BL:";

    @PostConstruct
    public void init() {
        try {
            if (isBase64(secret)) {
                byte[] decoded = Base64.getDecoder().decode(secret);
                if (decoded.length < 32) {
                    throw new IllegalArgumentException("Decoded JWT secret must be at least 32 bytes.");
                }
                this.key = Keys.hmacShaKeyFor(decoded);
            } else {
                if (secret.length() < 32) {
                    throw new IllegalArgumentException("JWT secret key must be at least 32 characters for HS256.");
                }
                this.key = Keys.hmacShaKeyFor(secret.getBytes());
            }
        } catch (IllegalArgumentException e) {
            log.error("Invalid JWT secret configuration: {}", e.getMessage());
            throw e;
        }
    }

    private boolean isBase64(String s) {
        try {
            Base64.getDecoder().decode(s);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public String createAccessToken(String username,Long userId, Role role, Long sellerId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .claim("role", role.name())
                .claim("sellerId", sellerId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String username) {
        String token = createToken(username, refreshExpiration);
        redisTemplate.opsForValue().set(REDIS_REFRESH_TOKEN_PREFIX + username, token, refreshExpiration, TimeUnit.MILLISECONDS);
        return token;
    }

    private String createToken(String username, long expiration) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getSellerIdFromToken(String token) {
        return parseClaims(token).get("sellerId", Long.class);
    }

    public String getUsernameFromToken(String token) {

        return parseClaims(token).getSubject();
    }
    public Long getUserIdFromToken(String token) {
        return parseClaims(token).get("userId", Long.class);
    }

    public void blacklistAccessToken(String token) {
        Claims claims = parseClaims(token);
        long expirationMs = claims.getExpiration().getTime() - System.currentTimeMillis();
        if (expirationMs > 0) {
            redisTemplate.opsForValue().set(REDIS_BLACKLIST_PREFIX + token, "logout", expirationMs, TimeUnit.MILLISECONDS);
        }
    }

    public boolean isBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(REDIS_BLACKLIST_PREFIX + token));
    }

    public boolean isRefreshTokenValid(String username, String refreshToken) {
        String stored = redisTemplate.opsForValue().get(REDIS_REFRESH_TOKEN_PREFIX + username);
        return stored != null && stored.equals(refreshToken);
    }

    public void deleteRefreshToken(String username) {
        redisTemplate.delete(REDIS_REFRESH_TOKEN_PREFIX + username);
    }
}
