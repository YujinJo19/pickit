package com.pickit.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // 공통
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "Invalid Input"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation Failed"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"),

    // 사용자 관련
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User Not Found"),
    USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "User Already Exists"),
    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Email Already Exists"),
    EMAIL_NOT_VERIFIED(HttpStatus.BAD_REQUEST, "Email Not Verified"),
    EMAIL_REQUEST_LIMIT_EXCEEDED(HttpStatus.TOO_MANY_REQUESTS, "Email Code Request Limit Exceeded"),
    PASSWORD_REQUEST_LIMIT_EXCEEDED(HttpStatus.TOO_MANY_REQUESTS, "Password Code Request Limit Exceeded"),
    EMAIL_VERIFICATION_FAILED(HttpStatus.BAD_REQUEST, "Email Verification Failed"),
    INVALID_PROFILE_IMAGE_FILE(HttpStatus.BAD_REQUEST, "Image file is Empty"),

    // 판매자 관련
    SELLER_NOT_FOUND(HttpStatus.NOT_FOUND, "Seller Not Found"),
    SELLER_PENDING(HttpStatus.FORBIDDEN, "Seller Approval Pending"),
    SELLER_REJECTED(HttpStatus.FORBIDDEN, "Seller Registration Rejected"),

    // 상품 관련
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product Not Found"),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category Not Found"),
    UNAUTHORIZED_PRODUCT_ACCESS(HttpStatus.FORBIDDEN, "Unauthorized Access"),

    // 장바구니 관련
    CART_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart Not Found"),
    CART_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart Item Not Found"),
    CART_ITEM_ACCESS_DENIED(HttpStatus.FORBIDDEN, "Cart Item Access Denied"),
    INVALID_CART_QUANTITY(HttpStatus.BAD_REQUEST, "Invalid Cart Item Quantity"),
    CART_EMPTY(HttpStatus.BAD_REQUEST, "Cart is Empty"),

    // 재고 관련
    INVENTORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Inventory Not Found"),
    INVENTORY_PRODUCT_MISMATCH(HttpStatus.BAD_REQUEST, "Inventory Does Not Belong To Product"),
    INSUFFICIENT_STOCK(HttpStatus.BAD_REQUEST, "Insufficient Stock"),

    // Address 관련
    ADDRESS_NOT_FOUND(HttpStatus.NOT_FOUND, "Address Not Found"),

    // Order 관련
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "Order Not Found"),

    // Auth/Token 관련
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid Refresh Token"),
    REFRESH_TOKEN_MISMATCH(HttpStatus.UNAUTHORIZED, "Refresh Token Mismatch"),
    ACCESS_TOKEN_BLACKLISTED(HttpStatus.UNAUTHORIZED, "Access Token Blacklisted"),

    // 인증/인가 관련 추가
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Authentication Required"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "Access Denied"),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Access Token Expired"),
    INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid Access Token");


    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
