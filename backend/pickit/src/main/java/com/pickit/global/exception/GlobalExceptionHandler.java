package com.pickit.global.exception;

import com.pickit.global.exception.customException.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 잘못된 요청 처리 (IllegalArgumentException)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Invalid Input", ex.getMessage());
    }

    // 존재하지 않는 리소스 처리
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NoSuchElementException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Resource Not Found", ex.getMessage());
    }

    // 유효성 검증 실패 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String messages = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> "[" + error.getField() + "] " + error.getDefaultMessage())
                .collect(Collectors.joining("; ")); // 보기 좋게 구분

        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation Failed", messages);
    }

    // 그 외 런타임 예외 처리
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage());
    }

    // 모든 예외 처리 (최후 방어)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "서버에서 오류가 발생했습니다.");
    }

    // 공통 ErrorResponse 생성 메서드
    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String error, String message) {
        ErrorResponse errorResponse = new ErrorResponse(status.value(), error, message);
        return ResponseEntity.status(status).body(errorResponse);
    }

    // 사용자를 찾을 수 없음
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "User Not Found", ex.getMessage());
    }

    // 중복된 이메일
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailExists(EmailAlreadyExistsException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Email Already Exists", ex.getMessage());
    }

    // 인증되지 않은 이메일로 요청
    @ExceptionHandler(EmailNotVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleEmailNotVerified(EmailNotVerifiedException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Email Not Verified", ex.getMessage());
    }

    // 비밀번호 재설정 요청 초과
    @ExceptionHandler(TempPasswordRequestLimitExceededException.class)
    public ResponseEntity<ErrorResponse> handleTempPasswordLimit(TempPasswordRequestLimitExceededException ex) {
        return buildErrorResponse(HttpStatus.TOO_MANY_REQUESTS, "Temp Password Limit Exceeded", ex.getMessage());
    }

    // 이메일 인증 실패
    @ExceptionHandler(EmailVerificationFailedException.class)
    public ResponseEntity<ErrorResponse> handleEmailVerificationFailed(EmailVerificationFailedException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Email Verification Failed", ex.getMessage());
    }

    // 판매자 조회 실패
    @ExceptionHandler(SellerNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleSellerNotFound(SellerNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Seller Not Found", ex.getMessage());
    }

    // 상품 조회 실패
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFound(ProductNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Product Not Found", ex.getMessage());
    }

    // 비인가 상태에서 상품 접근 시
    @ExceptionHandler(UnauthorizedProductAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedProduct(UnauthorizedProductAccessException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Unauthorized Access", ex.getMessage());
    }

}
