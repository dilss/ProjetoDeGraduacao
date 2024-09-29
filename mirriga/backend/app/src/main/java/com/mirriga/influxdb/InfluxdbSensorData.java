package com.mirriga.influxdb;

import java.time.OffsetDateTime;

import com.influxdb.query.FluxRecord;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class InfluxdbSensorData {
    private String deviceEui;
    private String sensorName;
    private Float soilWaterContent;
    private OffsetDateTime timestamp;

    InfluxdbSensorData(FluxRecord record) {
        deviceEui = record.getValueByKey("device_eui").toString();
        sensorName = record.getValueByKey("sensor_name").toString();
        soilWaterContent = Float.parseFloat(record.getValueByKey("_value").toString());
        timestamp = OffsetDateTime.parse(record.getValueByKey("_time").toString());
    }
}
