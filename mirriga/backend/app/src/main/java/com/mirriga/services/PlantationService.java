package com.mirriga.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mirriga.dao.entities.AgriculturalCropEntity;
import com.mirriga.dao.entities.AreaEntity;
import com.mirriga.dao.entities.IrrigationSystemEntity;
import com.mirriga.dao.entities.PlantationEntity;
import com.mirriga.dao.repositories.AgriculturalCropReposistory;
import com.mirriga.dao.repositories.AreaRepository;
import com.mirriga.dao.repositories.IrrigationSystemRepository;
import com.mirriga.dao.repositories.PlantationRepository;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.PlantationRequestDto;

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

    public List<PlantationEntity> getAllPlantations() throws MirrigaException {
        try {
            return this.plantationRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_PLANTATIONS);
        }
    }

    public PlantationEntity createPlantation(PlantationRequestDto request) throws MirrigaException {
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
            throw new MirrigaException(MirrigaErrorEnum.ERROR_PERSISTING_PLANTATION);
        }
    }

    public PlantationEntity editPlantation(Long plantationId, PlantationRequestDto request)
            throws MirrigaException {
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
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_PLANTATION);
        }
    }

    public PlantationEntity findPlantationById(Long plantationId) throws MirrigaException {
        try {
            return this.plantationRepository.findByIdOptional(plantationId)
                    .orElseThrow(() -> new MirrigaException(MirrigaErrorEnum.PLANTATION_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public boolean deletePlantation(Long plantationId) throws MirrigaException {
        try {
            return this.plantationRepository.deleteById(plantationId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_REMOVING_PLANTATION);
        }
    }

}
