package com.pickit.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CartAddRequest {
    @NotNull
    private Long productId;
    @NotNull
    private Long inventoryId;
    @Min(1)
    private int quantity;
}
