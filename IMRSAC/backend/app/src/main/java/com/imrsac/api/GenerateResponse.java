package com.imrsac.api;

import com.imrsac.exceptions.IMRSACExeption;

import jakarta.ws.rs.core.Response;

public interface GenerateResponse {
    
    public static Response run(Object response) {
        return Response.status(getCode(response)).entity(response).build();
    }

    private static int getCode(Object response) {
        if (response.getClass().equals(IMRSACExeption.class)) {
            return ((IMRSACExeption) response).getStatusCode();
        }
        if (response instanceof Exception) {
            return Response.Status.INTERNAL_SERVER_ERROR.getStatusCode();
        }
        return Response.Status.OK.getStatusCode();
    }
}
