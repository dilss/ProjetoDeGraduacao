package com.mirriga.api;

import java.util.Map;

import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import com.mirriga.models.SensorRequestDto;
import com.mirriga.services.SensorService;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/sensors")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class SensorResource {
    @Inject
    private SensorService sensorService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createSensor(SensorRequestDto request) {
        return GenerateResponse.run(() -> sensorService.createSensor(request));
    }

    @GET
    public Response getAll() {
        return GenerateResponse.run(() -> this.sensorService.getAllSensors());
    }

    @GET
    @Path("{sensorEui}")
    public Response getSensor(String sensorEui) {
        return GenerateResponse.run(() -> this.sensorService.findSensorById(sensorEui));
    }

    @PUT
    @Path("{sensorEui}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSensor(String sensorEui, @RequestBody SensorRequestDto request) {
        return GenerateResponse.run(() -> this.sensorService.editSensor(request));
    }

    @DELETE
    @Path("{sensorEui}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSensor(String sensorEui) {
        return GenerateResponse.run(() -> this.sensorService.deleteSensor(sensorEui));
    }

    @GET
    @Path("{sensorEui}/keys")
    public Response getSensorJoinKeys(String sensorEui) {
        return GenerateResponse.run(() -> this.sensorService.getSensorKeys(sensorEui));
    }

    @POST
    @Path("{sensorEui}/keys")
    public Response addNetworkKeyToSensor(String sensorEui, @RequestBody Map<String, String> requestBody) {
        return GenerateResponse
                .run(() -> this.sensorService.addNetworkKeyToSensor(sensorEui, requestBody.get("nwkKey")));
    }

    @PUT
    @Path("{sensorEui}/keys")
    public Response updateSensorNetworkKey(String sensorEui, @RequestBody Map<String, String> requestBody) {
        return GenerateResponse
                .run(() -> this.sensorService.editSensorNetworkKey(sensorEui, requestBody.get("nwkKey")));
    }

}
