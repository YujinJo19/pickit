package com.pickit.global.exception.customException;

public class TempPasswordRequestLimitExceededException extends RuntimeException {
    public TempPasswordRequestLimitExceededException(String message) { super(message); }
}
