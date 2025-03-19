package com.pickit.config;

<<<<<<< HEAD
import jakarta.persistence.*;

@Entity
public class SecurityConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
=======
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll() // 모든 요청 허용
                )
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .formLogin(login -> login.disable()); // 로그인 화면 비활성화
        return http.build();
    }
}
>>>>>>> 7c95bd218e0b5a62f76228e374640e6b029cbba8
