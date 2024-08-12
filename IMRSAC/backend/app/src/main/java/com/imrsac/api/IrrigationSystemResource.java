package com.imrsac.api;

import com.imrsac.dao.entities.irrigation_system.IrrigationSystem;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.mappers.irrigation_system.IrrigationSysteamMapper;
import com.imrsac.models.irrigation_system.CreateIrrigationSystemRequest;
import com.imrsac.models.irrigation_system.UpdateIrrigationSystemRequest;
import com.imrsac.services.IrrigationSystemService;

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
    @Path("create")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createSystem(CreateIrrigationSystemRequest request) {
        IrrigationSystem system = IrrigationSysteamMapper.toEntity(request);
        return GenerateResponse.run(() -> irrigationSystemService.createIrrigationSystem(system));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateSystem(@PathParam("id") Long systemId, UpdateIrrigationSystemRequest request)
            throws IMRSACExeption {
        return GenerateResponse
                .run(() -> this.irrigationSystemService.editIrrigationSystem(systemId, request));
    }

    @GET
    @Path("list")
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.irrigationSystemService.getAllIrrigationSystems());
    }

    @GET
    @Path("{id}")
    public Response getSystem(@PathParam("id") Long systemId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.irrigationSystemService.findIrrigationSystemById(systemId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteSystem(@PathParam("id") Long systemId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.irrigationSystemService.deleteIrrigationSystem(systemId));
    }

}
