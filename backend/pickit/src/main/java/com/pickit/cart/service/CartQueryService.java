package com.pickit.cart.service;

import com.pickit.cart.dto.CartResponse;

public interface CartQueryService {

    CartResponse getCart(Long userId);

}
