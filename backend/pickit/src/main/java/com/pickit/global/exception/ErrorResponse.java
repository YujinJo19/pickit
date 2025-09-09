package com.pickit.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private final int status;
    private final String error;
    private final String message;

    public static ErrorResponse of(ErrorCode errorCode, String detailMessage) {
        return new ErrorResponse(
                errorCode.getStatus().value(),
                errorCode.name(),
                detailMessage != null ? detailMessage : errorCode.getMessage()
        );
    }
}
