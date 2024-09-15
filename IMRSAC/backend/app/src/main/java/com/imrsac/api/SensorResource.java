package com.imrsac.api;

import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import com.imrsac.dao.entities.SensorEntity;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.SensorRequestDto;
import com.imrsac.services.SensorService;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
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
    public Response createSensor(SensorRequestDto request) throws IMRSACExeption {
        return GenerateResponse.run(() -> sensorService.createSensor(request));
    }

    @GET
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.sensorService.getAllSensors());
    }

    @GET
    @Path("{sensorEui}")
    public Response getSensor(@PathParam("sensorEui") String sensorEui) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.sensorService.findSensorById(sensorEui));
    }

    @PUT
    @Path("{sensorEui}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSensor(String sensorEui, @RequestBody SensorEntity request)
            throws IMRSACExeption {
        return GenerateResponse.run(() -> this.sensorService.editSensor(request));
    }

    @DELETE
    @Path("{sensorEui}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSensor(String sensorEui) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.sensorService.deleteSensor(sensorEui));
    }

}
