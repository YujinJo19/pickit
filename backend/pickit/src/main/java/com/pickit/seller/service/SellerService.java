package com.pickit.seller.service;

import com.pickit.seller.dto.SellerSignupRequest;
import com.pickit.seller.entity.Seller;
import com.pickit.seller.repository.SellerRepository;
import com.pickit.user.entity.User;
import com.pickit.user.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    private final UserService userService;
    private final SellerRepository sellerRepository;

    public SellerService(UserService userService, SellerRepository sellerRepository) {
        this.userService = userService;
        this.sellerRepository = sellerRepository;
    }

    @Transactional
    public Seller registerSeller(SellerSignupRequest request) {
        User user = userService.registerUser(request);

        Seller seller = Seller.builder()
                .user(user)
                .businessNumber(request.getBusinessNumber())
                .storeName(request.getStoreName())
                .storeAddress(request.getStoreAddress())
                .build();

        return sellerRepository.save(seller);
    }
}