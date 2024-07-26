package com.imrsac.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;
import com.imrsac.dao.entities.area.Area;
import com.imrsac.dao.entities.irrigation_system.IrrigationSystem;
import com.imrsac.dao.entities.plantation.Plantation;
import com.imrsac.dao.repositories.AgriculturalCropReposistory;
import com.imrsac.dao.repositories.AreaRepository;
import com.imrsac.dao.repositories.IrrigationSystemRepository;
import com.imrsac.dao.repositories.PlantationRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.plantation.CreatePlantationRequest;
import com.imrsac.models.plantation.UpdatePlantationRequest;

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

    public List<Plantation> getAllPlantations() throws IMRSACExeption {
        try {
            return this.plantationRepository.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_PLANTATIONS);
        }
    }

    public Plantation createPlantation(CreatePlantationRequest request) throws IMRSACExeption {
        try {
            Area area = areaRepository.findById(request.getAreaId());
            AgriculturalCrop crop = agriculturalCropReposistory.findById(request.getAgriculturalCropId());
            IrrigationSystem system = irrigationSystemRepository.findById(request.getIrrigationSystemId());
            Plantation plantation = new Plantation();
            plantation.name = request.getName();
            plantation.area = area;
            plantation.agriculturalCrop = crop;
            plantation.irrigationSystem = system;
            this.plantationRepository.persist(plantation);
            return plantation;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_PLANTATION);
        }
    }

    public Plantation editPlantation(Long plantationId, UpdatePlantationRequest request)
            throws IMRSACExeption {
        try {
            Plantation plantation = plantationRepository.findById(plantationId);
            Area area = areaRepository.findById(request.getAreaId());
            AgriculturalCrop crop = agriculturalCropReposistory.findById(request.getAgriculturalCropId());
            IrrigationSystem system = irrigationSystemRepository.findById(request.getIrrigationSystemId());
            plantation.name = request.getName();
            plantation.area = area;
            plantation.agriculturalCrop = crop;
            plantation.irrigationSystem = system;
            return plantation;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_PLANTATION);
        }
    }

    public Plantation findPlantationById(Long plantationId) throws IMRSACExeption {
        try {
            return this.plantationRepository.findByIdOptional(plantationId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.PLANTATION_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public boolean deletePlantation(Long plantationId) throws IMRSACExeption {
        try {
            return this.plantationRepository.deleteById(plantationId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_PLANTATION);
        }
    }

}
