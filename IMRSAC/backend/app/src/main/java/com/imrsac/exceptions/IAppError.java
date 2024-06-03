package com.imrsac.exceptions;

public interface IAppError {
    String INVALID_MESSAGE = "The messgae can not be null.";
    String INVALID_CODE = "The code can not be null.";
    
    String getCode();

    String getMessage();

    default String getMessage(Object... messageArgs) {
        return String.format(this.getMessage(), messageArgs);
    }

    default int getStatusCode() {
        return 422;
    }
}
