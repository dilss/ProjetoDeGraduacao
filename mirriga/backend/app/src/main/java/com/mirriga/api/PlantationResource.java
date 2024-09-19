package com.mirriga.api;

import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.PlantationRequestDto;
import com.mirriga.services.PlantationService;

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

@Path("/plantations")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class PlantationResource {

    @Inject
    private PlantationService plantationService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createPlantation(PlantationRequestDto request) {
        return GenerateResponse.run(() -> plantationService.createPlantation(request));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updatePlantation(@PathParam("id") Long plantationId, PlantationRequestDto request)
            throws MirrigaException {
        return GenerateResponse
                .run(() -> this.plantationService.editPlantation(plantationId, request));
    }

    @GET
    public Response getAll() throws MirrigaException {
        return GenerateResponse.run(() -> this.plantationService.getAllPlantations());
    }

    @GET
    @Path("{id}")
    public Response getPlantation(@PathParam("id") Long plantationId) throws MirrigaException {
        return GenerateResponse.run(() -> this.plantationService.findPlantationById(plantationId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deletePlantation(@PathParam("id") Long plantationId) throws MirrigaException {
        return GenerateResponse.run(() -> this.plantationService.deletePlantation(plantationId));
    }
}
