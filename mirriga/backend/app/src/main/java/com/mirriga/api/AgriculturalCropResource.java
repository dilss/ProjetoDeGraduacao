package com.mirriga.api;

import com.mirriga.dao.entities.AgriculturalCropEntity;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.AgriculturalCropRequestDto;
import com.mirriga.services.AgriculturalCropService;

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

@Path("/agricultural-crops")
@Consumes(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Produces(MediaType.APPLICATION_JSON + "; charset=utf-8")
@Transactional(Transactional.TxType.SUPPORTS)
@Authenticated
public class AgriculturalCropResource {

    @Inject
    private AgriculturalCropService agriculturalCropService;

    @POST
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createCrop(AgriculturalCropRequestDto request) {
        AgriculturalCropEntity crop = AgriculturalCropEntity.builder().name(request.getName())
                .rootDepth(request.getRootDepth()).waterAvailabilityFactor(request.getWaterAvailabilityFactor())
                .cicleDurationDays(request.getCicleDurationDays())
                .durationPercentagePhaseOne(request.getDurationPercentagePhaseOne())
                .durationPercentagePhaseTwo(request.getDurationPercentagePhaseTwo())
                .durationPercentagePhaseThree(request.getDurationPercentagePhaseThree())
                .durationPercentagePhaseFour(request.getDurationPercentagePhaseFour())
                .build();
        return GenerateResponse.run(() -> agriculturalCropService.createAgriculturalCrop(crop));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateCrop(@PathParam("id") Long cropId, AgriculturalCropRequestDto request)
            throws MirrigaException {
        return GenerateResponse
                .run(() -> this.agriculturalCropService.editAgriculturalCrop(cropId, request));
    }

    @GET
    public Response getAll() throws MirrigaException {
        return GenerateResponse.run(() -> this.agriculturalCropService.getAllAgriculturalCrops());
    }

    @GET
    @Path("{id}")
    public Response getCrop(@PathParam("id") Long cropId) throws MirrigaException {
        return GenerateResponse.run(() -> this.agriculturalCropService.findAgriculturalCropById(cropId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteCrop(@PathParam("id") Long cropId) throws MirrigaException {
        return GenerateResponse.run(() -> this.agriculturalCropService.deleteAgriculturalCrop(cropId));
    }
}
