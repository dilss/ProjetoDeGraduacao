package com.imrsac.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.AgriculturalCropEntity;
import com.imrsac.dao.repositories.AgriculturalCropReposistory;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.AgriculturalCropRequestDto;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class AgriculturalCropService {

    @Inject
    private AgriculturalCropReposistory agriculturalCropReposistory;

    private static Logger LOG = LoggerFactory.getLogger(AgriculturalCropService.class);

    public List<AgriculturalCropEntity> getAllAgriculturalCrops() throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_AGRICULTURAL_CROPS);
        }
    }

    public AgriculturalCropEntity createAgriculturalCrop(AgriculturalCropEntity crop) throws IMRSACExeption {
        try {
            this.agriculturalCropReposistory.persist(crop);
            return crop;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_AGRICULTURAL_CROP);
        }
    }

    public AgriculturalCropEntity editAgriculturalCrop(Long cropId, AgriculturalCropRequestDto request)
            throws IMRSACExeption {
        try {
            AgriculturalCropEntity crop = agriculturalCropReposistory.findById(cropId);
            crop.setName(request.getName());
            crop.setRootDepth(request.getRootDepth());
            crop.setWaterAvailabilityFactor(request.getWaterAvailabilityFactor());
            crop.setCicleDurationDays(request.getCicleDurationDays());
            crop.setDurationPercentagePhaseOne(request.getDurationPercentagePhaseOne());
            crop.setDurationPercentagePhaseTwo(request.getDurationPercentagePhaseTwo());
            crop.setDurationPercentagePhaseThree(request.getDurationPercentagePhaseThree());
            crop.setDurationPercentagePhaseFour(request.getDurationPercentagePhaseFour());
            return crop;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_AGRICULTURAL_CROP);
        }
    }

    public AgriculturalCropEntity findAgriculturalCropById(Long cropId) throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.findByIdOptional(cropId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.AGRICULTURAL_CROP_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public boolean deleteAgriculturalCrop(Long cropId) throws IMRSACExeption {
        try {
            return this.agriculturalCropReposistory.deleteById(cropId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_AGRICULTURAL_CROP);
        }
    }
}
