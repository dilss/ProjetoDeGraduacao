package com.imrsac.api;

import com.imrsac.dao.entities.SoilEntity;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.SoilRequestDto;
import com.imrsac.services.SoilService;

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
    public Response createSoil(SoilRequestDto request) throws IMRSACExeption {
        SoilEntity soil = SoilEntity.builder().name(request.getName()).fieldCapacity(request.getFieldCapacity())
                .permanentWiltingPoint(request.getPermanentWiltingPoint()).density(request.getDensity()).build();
        return GenerateResponse.run(() -> soilService.createSoil(soil));
    }

    @GET
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.soilService.getAllSoils());
    }

    @GET
    @Path("{id}")
    public Response getSoil(@PathParam("id") Long soilId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.soilService.findSoilById(soilId));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSoil(SoilEntity request) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.soilService.editSoil(request));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSoil(@PathParam("id") Long soilId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.soilService.deleteSoil(soilId));
    }

}
