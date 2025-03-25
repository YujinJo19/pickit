package com.pickit.user.dto;

import com.pickit.global.common.Role;
import lombok.*;

@Getter
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String profileImageUrl;
    private Role role;
}