package com.imrsac.exceptions;

public class AppException extends Exception {

    private final String code;

    public AppException(String message, String code) {
        super(message);
        this.code = code;
    }

    public AppException(IAppError error) {
        this(error.getMessage(), error.getCode());
    }

    public String getCode() {
        return this.code;
    }
}
