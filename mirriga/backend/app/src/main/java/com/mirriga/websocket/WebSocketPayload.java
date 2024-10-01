package com.mirriga.websocket;

import com.mirriga.influxdb.InfluxdbSensorData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class WebSocketPayload {
    private String sensorEui;
    private String sensorName;
    private String data;
    private String timestamp;

    public WebSocketPayload(InfluxdbSensorData influxdbSensorData) {
        this.sensorEui = influxdbSensorData.getDeviceEui();
        this.sensorName = influxdbSensorData.getSensorName();
        this.data = String.valueOf(influxdbSensorData.getSoilWaterContent());
        this.timestamp = String.valueOf(influxdbSensorData.getTimestamp());
    }
}
