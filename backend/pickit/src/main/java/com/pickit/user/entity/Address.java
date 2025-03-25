package com.pickit.user.entity;

import com.pickit.global.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String label;

    @Column(name = "address_raw", columnDefinition = "TEXT")
    private String addressRaw;

    private String city;
    private String district;
    private String neighborhood;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "recipient_name")
    private String recipientName;

    @Pattern(regexp = "^\\d{10,11}$", message = "전화번호는 10~11자리 숫자여야 합니다.")
    @Column(nullable = false)
    private String phone;

    @Column(name = "is_default", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isDefault; // 기본 배송지 여부 (true/false)

    @Column(name = "delivery_request", columnDefinition = "TEXT")
    private String deliveryRequest; // 배송 요청사항
}