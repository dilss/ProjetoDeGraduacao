package com.imrsac.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.AgriculturalCropEntity;
import com.imrsac.dao.entities.AreaEntity;
import com.imrsac.dao.entities.IrrigationSystemEntity;
import com.imrsac.dao.entities.PlantationEntity;
import com.imrsac.dao.repositories.AgriculturalCropReposistory;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.dao.repositories.IrrigationSystemRepository;
import com.imrsac.dao.repositories.PlantationRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.PlantationRequestDto;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class PlantationService {

    @Inject
    private PlantationRepository plantationRepository;

    @Inject
    private AreaRepository areaRepository;

    @Inject
    private AgriculturalCropReposistory agriculturalCropReposistory;

    @Inject
    private IrrigationSystemRepository irrigationSystemRepository;

    private static Logger LOG = LoggerFactory.getLogger(PlantationService.class);

    public List<PlantationEntity> getAllPlantations() throws IMRSACExeption {
        try {
            return this.plantationRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_PLANTATIONS);
        }
    }

    public PlantationEntity createPlantation(PlantationRequestDto request) throws IMRSACExeption {
        try {
            AreaEntity area = areaRepository.findById(request.getAreaId());
            AgriculturalCropEntity crop = agriculturalCropReposistory.findById(request.getAgriculturalCropId());
            IrrigationSystemEntity system = irrigationSystemRepository.findById(request.getIrrigationSystemId());
            PlantationEntity plantation = new PlantationEntity();
            plantation.setName(request.getName());;
            plantation.setArea(area);;
            plantation.setAgriculturalCrop(crop);
            plantation.setIrrigationSystem(system);
            this.plantationRepository.persist(plantation);
            return plantation;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_PLANTATION);
        }
    }

    public PlantationEntity editPlantation(Long plantationId, PlantationRequestDto request)
            throws IMRSACExeption {
        try {
            PlantationEntity plantation = plantationRepository.findById(plantationId);
            AreaEntity area = areaRepository.findById(request.getAreaId());
            AgriculturalCropEntity crop = agriculturalCropReposistory.findById(request.getAgriculturalCropId());
            IrrigationSystemEntity system = irrigationSystemRepository.findById(request.getIrrigationSystemId());
            plantation.setName(request.getName());;
            plantation.setArea(area);
            plantation.setAgriculturalCrop(crop);
            plantation.setIrrigationSystem(system);;
            return plantation;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_PLANTATION);
        }
    }

    public PlantationEntity findPlantationById(Long plantationId) throws IMRSACExeption {
        try {
            return this.plantationRepository.findByIdOptional(plantationId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.PLANTATION_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public boolean deletePlantation(Long plantationId) throws IMRSACExeption {
        try {
            return this.plantationRepository.deleteById(plantationId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_PLANTATION);
        }
    }

}
