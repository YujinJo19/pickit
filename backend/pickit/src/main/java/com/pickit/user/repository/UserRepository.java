package com.pickit.user.repository;

import com.pickit.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 회원가입 시 이메일 중복 체크
    boolean existsByEmail(String email);

    // 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);
}