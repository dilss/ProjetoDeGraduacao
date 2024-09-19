package com.mirriga.api;

import org.junit.jupiter.api.function.ThrowingSupplier;

import com.mirriga.exceptions.MirrigaException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

public interface GenerateResponse {

    public static  Response run(ThrowingSupplier<Object> supplier) {

        try {
            Object result = supplier.get();
            return Response.status(Status.OK).entity(result).build();           
        } catch (Throwable e) {
            if (e.getClass().equals(MirrigaException.class)) {
                MirrigaException exception = (MirrigaException) e;
                return Response.status(exception.getStatusCode()).entity(exception).build(); 
            }
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e).build(); 
        }
    }
}
