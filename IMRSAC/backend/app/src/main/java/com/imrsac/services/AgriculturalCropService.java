package com.imrsac.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;
import com.imrsac.dao.repositories.AgriculturalCropReposistory;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.agricultural_crop.UpdateAgriculturalCropRequest;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AgriculturalCropService {

    @Inject
    private AgriculturalCropReposistory agriculturalCropReposistory;

    private static Logger LOG = LoggerFactory.getLogger(AgriculturalCropService.class);

    public List<AgriculturalCrop> getAllAgriculturalCrops() throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_AGRICULTURAL_CROPS);
        }
    }

    public AgriculturalCrop createAgriculturalCrop(AgriculturalCrop crop) throws IMRSACExeption {
        try {
            this.agriculturalCropReposistory.persist(crop);
            return crop;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_AGRICULTURAL_CROP);
        }
    }

    public AgriculturalCrop editAgriculturalCrop(Long cropId, UpdateAgriculturalCropRequest request)
            throws IMRSACExeption {
        try {
            AgriculturalCrop crop = agriculturalCropReposistory.findById(cropId);
            crop.name = request.getName();
            crop.rootDepth = request.getRootDepth();
            crop.waterAvailabilityFactor = request.getWaterAvailabilityFactor();
            crop.cicleDurationDays = request.getCicleDurationDays();
            crop.durationPercentagePhaseOne = request.getDurationPercentagePhaseOne();
            crop.durationPercentagePhaseTwo = request.getDurationPercentagePhaseTwo();
            crop.durationPercentagePhaseThree = request.getDurationPercentagePhaseThree();
            crop.durationPercentagePhaseFour = request.getDurationPercentagePhaseFour();
            return crop;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_AGRICULTURAL_CROP);
        }
    }

    public AgriculturalCrop findAgriculturalCropById(Long cropId) throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.findByIdOptional(cropId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.AGRICULTURAL_CROP_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public boolean deleteAgriculturalCrop(Long cropId) throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.deleteById(cropId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_AGRICULTURAL_CROP);
        }
    }
}
