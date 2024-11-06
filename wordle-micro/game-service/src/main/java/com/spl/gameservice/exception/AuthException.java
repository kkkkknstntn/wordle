package com.spl.gameservice.exception;

import com.spl.gameservice.exception.ApiException;

public class AuthException extends ApiException {
    public AuthException(String message, String errorCode) {
        super(message, errorCode);
    }
}
