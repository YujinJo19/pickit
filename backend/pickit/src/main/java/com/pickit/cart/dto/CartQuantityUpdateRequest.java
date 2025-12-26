package com.pickit.cart.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
public class CartQuantityUpdateRequest {
    @Min(1)
    private int quantity;
}
