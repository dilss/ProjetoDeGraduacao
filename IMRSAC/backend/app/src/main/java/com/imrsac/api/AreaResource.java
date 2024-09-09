package com.imrsac.api;

import java.util.HashSet;
import java.util.Set;

import com.imrsac.dao.entities.AreaEntity;
import com.imrsac.dao.entities.CoordinateEntity;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.AreaRequestDto;
import com.imrsac.services.AreaService;

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

@Path("/areas")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class AreaResource {

    @Inject
    private AreaService areaService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createArea(AreaRequestDto request) throws IMRSACExeption {
        Set<CoordinateEntity> coordinates = new HashSet<>();
        request.getCoordinates()
                .forEach(coordinate -> coordinates.add(CoordinateEntity.builder().latitude(coordinate.getLatitude())
                        .longitude(coordinate.getLongitude()).nodeOrder(coordinate.getNodeOrder()).build()));
        AreaEntity area = AreaEntity.builder().name(request.getName()).area(request.getArea())
                .coordinates(coordinates).build();
        return GenerateResponse.run(() -> this.areaService.createArea(area, request.getSoilId()));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateArea(@PathParam("id") Long areaId, AreaRequestDto request) throws IMRSACExeption {
        return GenerateResponse
                .run(() -> this.areaService.editArea(areaId, request));
    }

    @GET
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.areaService.getAllAreas());
    }

    @GET
    @Path("{id}")
    public Response getArea(@PathParam("id") Long areaId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.areaService.findAreaById(areaId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteArea(@PathParam("id") Long areaId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.areaService.deleteArea(areaId));
    }
}
