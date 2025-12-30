package com.pickit.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class OrderCreateRequest {
    @NotNull
    private Long addressId;
}
