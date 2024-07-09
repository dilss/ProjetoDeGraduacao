package com.imrsac.exceptions;

import jakarta.ws.rs.core.Response.Status;

public enum IMRSACErrorEnum implements IAppError {

    // Errors related to areas
    AREA_ID_NOT_INFORMED("000", "ID da area não encontrado na requisição", Status.BAD_REQUEST),
    AREA_NOT_FOUND_IN_THE_DATABASE("002", "Area não encontrada na base de dados", Status.NOT_FOUND),
    ERROR_PERSISTING_AREA("001", "Erro ao tentar salvar a área", Status.INTERNAL_SERVER_ERROR),
    ERROR_FETCHING_AREAS("002", "Erro ao carregar as áreas", Status.INTERNAL_SERVER_ERROR),
    ERROR_UPDATING_AREA("003", "Erro ao tentar atualizar a área", Status.INTERNAL_SERVER_ERROR),
    ERROR_REMOVING_AREA("004", "Erro na tentativa de remoção da área", Status.INTERNAL_SERVER_ERROR),

    // Errors related to soils
    SOIL_ID_NOT_INFORMED("100", "ID do solo não encontrado na requisição ", Status.BAD_REQUEST),
    SOIL_NOT_FOUND_IN_THE_DATABASE("007", "Solo não encontrado na base de dados", Status.NOT_FOUND),
    ERROR_PERSISTING_SOIL("101", "Erro ao tentar salvar o solo",
            Status.INTERNAL_SERVER_ERROR),
    ERROR_FETCHING_SOILS("102", "Erro ao carregar os solos", Status.INTERNAL_SERVER_ERROR),
    ERROR_UPDATING_SOIL("103", "Erro ao tentar atualizar o solo", Status.INTERNAL_SERVER_ERROR),
    ERROR_REMOVING_SOIL("104", "Erro na tentativa de remoção do solo", Status.INTERNAL_SERVER_ERROR);

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
