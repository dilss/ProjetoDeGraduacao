package com.imrsac.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.websocket.Encoder;

public class PayloadEncoder implements Encoder.Text<WebSocketPayload> {

    private static Logger LOG = LoggerFactory.getLogger(PayloadEncoder.class);

    @Override
    public String encode(WebSocketPayload socketPayload) {

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(socketPayload);
        } catch (JsonProcessingException e) {
            LOG.error("Falha ao serializar websocket payload. Erro: {}", e.getLocalizedMessage());
        }
        return null;
    }
}
