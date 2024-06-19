package com.imrsac.exceptions;

import jakarta.ws.rs.core.Response.Status;

public enum IMRSACErrorEnum implements IAppError {

    // Errors related to areas
    AREA_ID_NOT_INFORMED("001", "Area identifier was not found in the request object.", Status.BAD_REQUEST),
    AREA_NOT_FOUND_IN_THE_DATABASE("002", "Area not found in the database.", Status.NOT_FOUND),
    ERROR_PERSISTING_AREA("003", "An error occurred while persisting the area", Status.INTERNAL_SERVER_ERROR),
    ERROR_FETCHING_AREAS("004", "An error occurred while fetching the areas", Status.INTERNAL_SERVER_ERROR),
    ERROR_REMOVING_AREA("005", "An error occurred while deleting the area", Status.INTERNAL_SERVER_ERROR),

    // Errors related to soils
    SOIL_ID_NOT_INFORMED("006", "Soil identifier was not found in the request object.", Status.BAD_REQUEST),
    SOIL_NOT_FOUND_IN_THE_DATABASE("007", "Soil not found in the database.", Status.NOT_FOUND),
    ERROR_PERSISTING_SOIL("008", "An error occurred while persisting the soil parameters", Status.INTERNAL_SERVER_ERROR),
    ERROR_FETCHING_SOILS("009", "An error occurred while fetching the soils", Status.INTERNAL_SERVER_ERROR),
    ERROR_REMOVING_SOIL("010", "An error occurred while deleting the soil", Status.INTERNAL_SERVER_ERROR);


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
