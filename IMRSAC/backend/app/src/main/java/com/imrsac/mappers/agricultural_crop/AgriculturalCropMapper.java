package com.imrsac.mappers.agricultural_crop;

import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;
import com.imrsac.models.agricultural_crop.CreateAgricuturalCropRequest;

public class AgriculturalCropMapper {

    public static AgriculturalCrop toEntity(CreateAgricuturalCropRequest request) {

        AgriculturalCrop entity = new AgriculturalCrop();

        entity.name = request.getName();
        entity.rootDepth = request.getRootDepth();
        entity.waterAvailabilityFactor = request.getWaterAvailabilityFactor();
        entity.cicleDurationDays = request.getCicleDurationDays();
        entity.durationPercentagePhaseOne = request.getDurationPercentagePhaseOne();
        entity.durationPercentagePhaseTwo = request.getDurationPercentagePhaseTwo();
        entity.durationPercentagePhaseThree = request.getDurationPercentagePhaseThree();
        entity.durationPercentagePhaseFour = request.getDurationPercentagePhaseFour();
        return entity;
    }
}
