package com.pickit.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity  // JPA가 관리하는 엔티티 클래스
@Table(name = "User")  // DB 테이블 이름과 매핑
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto Increment 적용
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;
    private String nickname;
    private String phoneNumber;
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, updatable = false)
    private String socialProvider;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean socialLogin;

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String createdAt;
}

