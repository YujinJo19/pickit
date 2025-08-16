package com.pickit.global.exception.customException;

public class EmailVerificationFailedException extends RuntimeException {
    public EmailVerificationFailedException(String message) { super(message); }
}
