package com.pickit.global.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${spring.jwt.secret}")
    private String secret;

    @Value("${spring.jwt.access-token-validity}")
    private long accessExpiration;

    @Value("${spring.jwt.refresh-token-validity}")
    private long refreshExpiration;

    private Key key;

    private final StringRedisTemplate redisTemplate;
    private final UserDetailsService userDetailsService;
    private static final String REDIS_REFRESH_TOKEN_PREFIX = "RT:";
    private static final String REDIS_BLACKLIST_PREFIX = "BL:";


    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String createAccessToken(String username) {
        return createToken(username, accessExpiration);
    }

    public String createRefreshToken(String username) {
        String token = createToken(username, refreshExpiration);
        // Redis 저장 (TTL 적용)
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
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public void blacklistAccessToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        Date expiration = claims.getExpiration();
        long now = System.currentTimeMillis();
        long expirationMs = expiration.getTime() - now;

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

    public UserDetails loadUserByUsername(String username) {
        return userDetailsService.loadUserByUsername(username);
    }

    public void deleteRefreshToken(String username) {
        redisTemplate.delete(REDIS_REFRESH_TOKEN_PREFIX + username);
    }
}
