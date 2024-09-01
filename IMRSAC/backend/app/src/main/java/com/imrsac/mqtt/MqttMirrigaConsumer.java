package com.imrsac.mqtt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.concurrent.CompletionStage;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.imrsac.websocket.WebSocketPayload;
import com.imrsac.websocket.WebSocketServer;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MqttMirrigaConsumer {

    private static final Logger LOG = LoggerFactory.getLogger(MqttMirrigaConsumer.class);

    @Inject
    private WebSocketServer webSocketServer;

    @Incoming("mirriga")
    public CompletionStage<Void> consume(Message<byte[]> message) {
        LOG.info("Novo Pacote Recebido via MQTT");

        try {
            String payloadString = new String(message.getPayload(), StandardCharsets.UTF_8);
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            SensorPayload payload = mapper.readValue(payloadString, SensorPayload.class);
            String value = new String(Base64.getDecoder().decode(payload.getData()), StandardCharsets.UTF_8);
            LOG.info("Dados recebidos do sensor \"{}\" - Umidade do solo: {}", payload.getDeviceInfo().getDeviceName(),
                    value);



        //    IrrigationData irrigationData = new IrrigationData(irrigationService.calculateIrrigation(sensorEui));


            webSocketServer.sendData(new WebSocketPayload(payload.getDeviceInfo().getDeviceName(), value));
            return message.ack();

        } catch (Exception e) {
            LOG.error("Falha ao extrair dados da mensagem. Motivo: {}", e.getMessage());
            return message.nack(e);
        }
    }
}
