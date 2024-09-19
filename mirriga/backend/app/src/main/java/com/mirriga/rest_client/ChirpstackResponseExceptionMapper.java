package com.mirriga.rest_client;

import org.eclipse.microprofile.rest.client.ext.ResponseExceptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.ws.rs.core.Response;

public class ChirpstackResponseExceptionMapper implements ResponseExceptionMapper<RuntimeException> {

    private static final Logger LOG = LoggerFactory.getLogger(ChirpstackResponseExceptionMapper.class);

    @Override
    public RuntimeException toThrowable(Response response) {
        LOG.error("Resposta da API do chirpstack. Status code: {}", response.getStatus());
        return null;
    }
}