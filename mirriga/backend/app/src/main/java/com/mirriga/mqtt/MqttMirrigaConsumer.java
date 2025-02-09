package com.mirriga.mqtt;

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
import com.mirriga.influxdb.InfluxdbSensorData;
import com.mirriga.influxdb.MirrigaInfluxdbService;
import com.mirriga.websocket.WebSocketPayload;
import com.mirriga.websocket.WebSocketServer;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MqttMirrigaConsumer {

    private static final Logger LOG = LoggerFactory.getLogger(MqttMirrigaConsumer.class);

    @Inject
    private WebSocketServer webSocketServer;

    @Inject
    private MirrigaInfluxdbService mirrigaInfluxdbService;

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

            // IrrigationData irrigationData = new
            // IrrigationData(irrigationService.calculateIrrigation(sensorEui));

            // Enviar os dados da medida mais recente do sensor para evitar uma chamada http
            // por parte do front
            InfluxdbSensorData sensorData = this.mirrigaInfluxdbService
                    .getMostRecentMeasurementFromSensor(payload.getDeviceInfo().getDevEui());
            webSocketServer.sendData(new WebSocketPayload(sensorData));

            return message.ack();

        } catch (Exception e) {
            LOG.error("Falha ao extrair dados da mensagem. Motivo: {}", e.getMessage());
            return message.nack(e);
        }
    }
}
