package com.pickit.global.security.util;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.user.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static Long getSellerIdFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long sellerId = userDetails.getUser().getId();

        if (sellerId == null) {
            throw new BusinessException(ErrorCode.SELLER_NOT_FOUND);
        }

        return sellerId;
    }

}
