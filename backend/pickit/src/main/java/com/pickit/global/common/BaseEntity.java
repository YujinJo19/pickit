package com.pickit.global.common;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // 상속받는 엔티티가 이 필드를 공통으로 사용하도록 설정
@EntityListeners(AuditingEntityListener.class) // 자동으로 날짜 필드 업데이트
@Getter
public abstract class BaseEntity {

    @CreatedDate // 엔티티가 생성될 때 자동 저장
    @Column(updatable = false) // 수정 불가능
    private LocalDateTime createdAt;

    @LastModifiedDate // 엔티티가 수정될 때 자동 갱신
    private LocalDateTime updatedAt;
}
