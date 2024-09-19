package com.mirriga.api;

import com.mirriga.dao.entities.IrrigationSystemEntity;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.IrrigationSystemRequestDto;
import com.mirriga.services.IrrigationSystemService;

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

@Path("/irrigation-systems")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class IrrigationSystemResource {

    @Inject
    private IrrigationSystemService irrigationSystemService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createSystem(IrrigationSystemRequestDto request) {
        IrrigationSystemEntity system = IrrigationSystemEntity.builder().name(request.getName())
                .category(request.getCategory()).type(request.getType()).efficiency(request.getEfficiency())
                .flowRate(request.getFlowRate()).build();
        return GenerateResponse.run(() -> irrigationSystemService.createIrrigationSystem(system));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSystem(@PathParam("id") Long systemId, IrrigationSystemRequestDto request)
            throws MirrigaException {
        return GenerateResponse
                .run(() -> this.irrigationSystemService.editIrrigationSystem(systemId, request));
    }

    @GET
    public Response getAll() throws MirrigaException {
        return GenerateResponse.run(() -> this.irrigationSystemService.getAllIrrigationSystems());
    }

    @GET
    @Path("{id}")
    public Response getSystem(@PathParam("id") Long systemId) throws MirrigaException {
        return GenerateResponse.run(() -> this.irrigationSystemService.findIrrigationSystemById(systemId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSystem(@PathParam("id") Long systemId) throws MirrigaException {
        return GenerateResponse.run(() -> this.irrigationSystemService.deleteIrrigationSystem(systemId));
    }

}
