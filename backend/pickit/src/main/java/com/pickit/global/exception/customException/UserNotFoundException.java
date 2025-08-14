package com.pickit.global.exception.customException;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) { super(message); }
}

