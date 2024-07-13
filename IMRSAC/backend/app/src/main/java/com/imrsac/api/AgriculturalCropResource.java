package com.imrsac.api;

import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.mappers.agricultural_crop.AgriculturalCropMapper;
import com.imrsac.models.agricultural_crop.CreateAgricuturalCropRequest;
import com.imrsac.models.agricultural_crop.UpdateAgriculturalCropRequest;
import com.imrsac.services.AgriculturalCropService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/acricultural_crops")
public class AgriculturalCropResource {

    @Inject
    private AgriculturalCropService agriculturalCropService;

    @POST
    @Path("create")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response createCrop(CreateAgricuturalCropRequest request) {
        AgriculturalCrop crop = AgriculturalCropMapper.toEntity(request);

        return GenerateResponse.run(() -> agriculturalCropService.createAgriculturalCrop(crop));
    }

    @PUT
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response updateCrop(@PathParam("id") Long cropId, UpdateAgriculturalCropRequest request)
            throws IMRSACExeption {
        return GenerateResponse
                .run(() -> this.agriculturalCropService.editAgriculturalCrop(cropId, request));
    }

    @GET
    @Path("list")
    public Response getAll() throws IMRSACExeption {
        return GenerateResponse.run(() -> this.agriculturalCropService.getAllAgriculturalCrops());
    }

     @GET
    @Path("{id}")
    public Response getCrop(@PathParam("id") Long cropId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.agriculturalCropService.findAgriculturalCropById(cropId));
    }

    @DELETE
    @Path("{id}")
    @Transactional(Transactional.TxType.REQUIRED)
    public Response deleteCrop(@PathParam("id") Long cropId) throws IMRSACExeption {
        return GenerateResponse.run(() -> this.agriculturalCropService.deleteAgriculturalCrop(cropId));
    }
}
