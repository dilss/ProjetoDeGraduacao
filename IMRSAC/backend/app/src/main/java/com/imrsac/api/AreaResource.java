package com.imrsac.api;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.mappers.area.AreaMapper;
import com.imrsac.models.area.CreateAreaRequest;

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
    private AreaRepository areaRepository;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createArea(CreateAreaRequest request, @Context UriInfo uriInfo) {

        // try {
        //     Area area = AreaMapper.toAreaEntity(request);
        //     Long areaId = this.areaRepository.createArea(area);
        //     UriBuilder builder = uriInfo.getAbsolutePathBuilder().path(Long.toString(areaId));
        //     return Response.created(builder.build()).build();

        // } catch (Exception e) {
        //     return Response.status(Response.Status.INTERNAL_SERVER_ERROR).type(MediaType.APPLICATION_JSON)
        //             .entity(e.getMessage()).build();
        // }
        Area area = AreaMapper.toAreaEntity(request);
        return GenerateResponse.run(this.areaRepository.createArea(area));

    }

    @GET
    public Response getAll() {
        return GenerateResponse.run(this.areaRepository.listAll());
    }

    @GET
    @Path("{id}")
    public Response getArea(@PathParam("id") Long areaId) {
        return GenerateResponse.run(this.areaRepository.findById(areaId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteArea(@PathParam("id") Long areaId) {
        return GenerateResponse.run(this.areaRepository.deleteById(areaId));
    }
}
