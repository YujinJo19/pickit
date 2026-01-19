package com.pickit.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.util.List;

@Getter
public class DeleteAddressRequest {
    private List<Long> addressIds;

}
