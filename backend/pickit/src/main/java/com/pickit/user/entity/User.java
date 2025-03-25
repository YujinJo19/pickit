package com.pickit.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pickit.global.common.BaseEntity;
import com.pickit.global.common.Role;
import com.pickit.user.dto.UserResponse;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore     // 비밀번호 노출 방지
    private String password;

    @Column(nullable = false)
    private String name;

    private String nickname;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Pattern(regexp = "^\\d{10,11}$", message = "전화번호는 10~11자리 숫자여야 합니다.")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name ="social_login", nullable = false)
    private Boolean socialLogin;

    @Column(name = "social_provider")
    private String socialProvider;
}
