package com.imrsac.exceptions;

import jakarta.ws.rs.core.Response.Status;

public enum IMRSACErrorEnum implements IAppError {

    AREA_ID_NOT_INFORMED("001", "Area identifier was not found in the request object.", Status.BAD_REQUEST),
    AREA_NOT_FOUND_IN_THE_DATABASE("002", "Area not found in the database.", Status.NOT_FOUND);

    private final String code;
    private final String msg;
    private final Status statusCode;

    private IMRSACErrorEnum(String code, String msg, Status statusCode) {
        this.code = code;
        this.msg = msg;
        this.statusCode = statusCode;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return msg;
    }

    @Override
    public int getStatusCode() {
        return statusCode.getStatusCode();
    }
}
