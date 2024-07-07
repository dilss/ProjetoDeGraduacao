package com.imrsac.api;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.mappers.area.AreaMapper;
import com.imrsac.models.area.CreateAreaRequest;
import com.imrsac.services.AreaService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

@Path("/areas")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
public class AreaResource {

    @Inject
    private AreaService areaService;

    @POST
    @Path("create")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createArea(CreateAreaRequest request, @Context UriInfo uriInfo) throws IMRSACExeption {
        Area area = AreaMapper.toAreaEntity(request);
        return GenerateResponse.run( () -> this.areaService.createArea(area, request.getSoilId()) );
    }

    @GET
    @Path("list")
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.areaService.getAllAreas());
    }

    @GET
    @Path("{id}")
    public Response getArea(@PathParam("id") Long areaId) throws IMRSACExeption {
        return GenerateResponse.run( () -> this.areaService.findAreaById(areaId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteArea(@PathParam("id") Long areaId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.areaService.deleteArea(areaId));
    }
}
