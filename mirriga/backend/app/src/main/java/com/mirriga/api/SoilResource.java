package com.mirriga.api;

import com.mirriga.dao.entities.SoilEntity;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.SoilRequestDto;
import com.mirriga.services.SoilService;

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

@Path("/soils")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class SoilResource {
    @Inject
    private SoilService soilService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createSoil(SoilRequestDto request) throws MirrigaException {
        SoilEntity soil = SoilEntity.builder().name(request.getName()).fieldCapacity(request.getFieldCapacity())
                .permanentWiltingPoint(request.getPermanentWiltingPoint()).density(request.getDensity()).build();
        return GenerateResponse.run(() -> soilService.createSoil(soil));
    }

    @GET
    public Response getAll() throws MirrigaException {
        return GenerateResponse.run(() -> this.soilService.getAllSoils());
    }

    @GET
    @Path("{id}")
    public Response getSoil(@PathParam("id") Long soilId) throws MirrigaException {
        return GenerateResponse.run(() -> this.soilService.findSoilById(soilId));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSoil(SoilEntity request) throws MirrigaException {
        return GenerateResponse.run(() -> this.soilService.editSoil(request));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSoil(@PathParam("id") Long soilId) throws MirrigaException {
        return GenerateResponse.run(() -> this.soilService.deleteSoil(soilId));
    }

}
