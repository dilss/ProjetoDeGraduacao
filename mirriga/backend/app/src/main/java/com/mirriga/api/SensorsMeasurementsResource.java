package com.mirriga.api;

import com.mirriga.influxdb.MirrigaInfluxdbService;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/sensors-measurements")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class SensorsMeasurementsResource {

    @Inject
    private MirrigaInfluxdbService mirrigaInfluxdbService;

    @GET
    @Path("{interval}")
    public Response getAllMeasurementsSince(String interval) {
        return GenerateResponse.run(() -> this.mirrigaInfluxdbService.getAllSensorsMeasurementsSince(interval));
    }

    @GET
    @Path("/each-sensor-most-recent")
    public Response getMostRecentMeasurementFromEachSensor() {
        return GenerateResponse.run(() -> this.mirrigaInfluxdbService.getMostRecentMeasurementFromEachSensor());
    }

    @GET
    @Path("{sensorEui}/{interval}")
    public Response getMeasurementsFromSensorSince(String sensorEui, String interval) {
        return GenerateResponse
                .run(() -> this.mirrigaInfluxdbService.getMeasurementsFromSensorSince(sensorEui, interval));
    }

    @GET
    @Path("{sensorEui}/most-recent")
    public Response getMostRecentMeasurementFromSensor(String sensorEui) {
        return GenerateResponse.run(() -> this.mirrigaInfluxdbService.getMostRecentMeasurementFromSensor(sensorEui));
    }

}
