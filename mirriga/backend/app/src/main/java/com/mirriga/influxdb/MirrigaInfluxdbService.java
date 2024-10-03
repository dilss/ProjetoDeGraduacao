package com.mirriga.influxdb;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxTable;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MirrigaInfluxdbService {

    private static final String organization = "mirriga-corp";
    private static final String bucket = "mirriga";

    private static Logger LOG = LoggerFactory.getLogger(MirrigaInfluxdbService.class);

    @ConfigProperty(name = "influxdb.mirriga.server_url")
    private Optional<String> serverUrl;

    @ConfigProperty(name = "influxdb.mirriga.api-key")
    private Optional<String> token;

    public List<InfluxdbSensorData> getAllSensorsMeasurementsSince(String timeAgo) throws MirrigaException {
        InfluxDBClient influxDBClient = InfluxDBClientFactory.create(serverUrl.get(), token.get().toCharArray(),
                organization,
                bucket);
        String flux = MessageFormat.format("""
                from(bucket: "mirriga")
                   |> range(start: -{0})
                   |> filter(fn: (r) => r["_measurement"] == "soil-water-content")
                   |> filter(fn: (r) => r["_field"] == "soilWaterContent")
                   """, timeAgo);
        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables;
        try {
            tables = queryApi.query(flux);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_QUERYING_MEASUREMENTS_FROM_ALL_SENSORS);
        }
        influxDBClient.close();
        List<InfluxdbSensorData> measurementsFromAllSensors = new ArrayList<>();

        tables.forEach(table -> {
            measurementsFromAllSensors
                    .addAll(table.getRecords().stream().map(InfluxdbSensorData::new).collect(Collectors.toList()));
        });

        return measurementsFromAllSensors;
    }

    public List<InfluxdbSensorData> getMeasurementsFromSensorSince(String sensorEui, String timeAgo)
            throws MirrigaException {
        InfluxDBClient influxDBClient = InfluxDBClientFactory.create(serverUrl.get(), token.get().toCharArray(),
                organization,
                bucket);
        String flux = MessageFormat.format("""
                from(bucket: "mirriga")
                |> range(start: -{0})
                |> filter(fn: (r) => r["device_eui"] == "{1}")
                |> filter(fn: (r) => r["_field"] == "soilWaterContent")
                             """, timeAgo, sensorEui);
        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables = new ArrayList<>();
        try {
            tables = queryApi.query(flux);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_GETTING_SENSOR_MEASUREMENTS);
        }
        influxDBClient.close();
        if (tables.isEmpty()) {
            return Collections.emptyList();
        }
        return tables.get(0).getRecords().stream().map(InfluxdbSensorData::new).collect(Collectors.toList());
    }

    public InfluxdbSensorData getMostRecentMeasurementFromSensor(String sensorEui) throws MirrigaException {
        InfluxDBClient influxDBClient = InfluxDBClientFactory.create(serverUrl.get(), token.get().toCharArray(),
                organization,
                bucket);
        String flux = MessageFormat.format("""
                from(bucket: "mirriga")
                |> range(start: 0, stop: now())
                |> filter(fn: (r) => r["device_eui"] == "{0}")
                |> filter(fn: (r) => r["_field"] == "soilWaterContent")
                |> last()
                             """, sensorEui);
        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables = new ArrayList<>();
        try {
            tables = queryApi.query(flux);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_GETTING_SENSOR_MOST_RECENT_MEASUREMENT);
        }
        influxDBClient.close();

        if (tables.isEmpty()) {
            return null;
        }

        return new InfluxdbSensorData(tables.get(0).getRecords().get(0));
    }

    public List<InfluxdbSensorData> getMostRecentMeasurementFromEachSensor() throws MirrigaException {
        InfluxDBClient influxDBClient = InfluxDBClientFactory.create(serverUrl.get(), token.get().toCharArray(),
                organization,
                bucket);
        String flux = """
                from(bucket: "mirriga")
                |> range(start: 0, stop: now())
                |> filter(fn: (r) => r["_measurement"] == "soil-water-content")
                |> filter(fn: (r) => r["_field"] == "soilWaterContent")
                |> last()
                              """;
        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables;

        try {
            tables = queryApi.query(flux);
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_GETTING_EACH_SENSOR_MOST_RECENT_MEASUREMENT);
        }
        influxDBClient.close();
        List<InfluxdbSensorData> eachSensorMostRecenMeasurementList = new ArrayList<>();

        tables.forEach(table -> {
            eachSensorMostRecenMeasurementList
                    .addAll(table.getRecords().stream().map(InfluxdbSensorData::new).collect(Collectors.toList()));
        });

        return eachSensorMostRecenMeasurementList;
    }
}
