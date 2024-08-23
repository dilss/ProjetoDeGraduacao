package com.imrsac.mqtt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.CompletionStage;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MqttMirrigaConsumer {

    private static final Logger LOG = LoggerFactory.getLogger(MqttMirrigaConsumer.class);

    @Incoming("mirriga")

    public CompletionStage<Void> consume(Message<byte[]> message) throws JsonMappingException, JsonProcessingException {
        LOG.info("Novo Pacote Recebido via MQTT");
        String payloadString = new String(message.getPayload(), StandardCharsets.UTF_8);
        ObjectMapper mapper = new ObjectMapper();
        Map<String,Object> map = mapper.readValue(payloadString, Map.class);
        var value = Base64.getDecoder().decode(map.get("data").toString());
        System.out.println("Dado: " + new String(value, StandardCharsets.UTF_8));
        return message.ack();
    }
}
